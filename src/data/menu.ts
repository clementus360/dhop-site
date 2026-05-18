/**
 * Central menu data source for DHOP.
 *
 * This module is the single source of truth for the entire site's menu.
 * All page components (the /menu page, the homepage explore strip, the
 * breakfast slices section, the header mega menu) read from here.
 *
 * Replacement plan: when the backend menu API lands, swap the inline
 * `MENU` constant for a fetch (e.g. `await fetch('/api/menu')`) returning
 * the same `MenuData` shape. Consumers import the typed `getMenu()`
 * helper rather than the raw constant, so no caller needs to change.
 */

export type Diet = "vegetarian" | "vegan" | "gluten-free";

export type Badge = "new" | "best-seller" | "fan-favorite" | "limited";

/** Two-axis price for items that have a clear small / large pricing. */
export type SizePrice = { size: string; price: number };

/** A pizza-style multi-size price grid (e.g. LG/XL/Jumbo/Sicilian/GF). */
export type PizzaPriceGrid = {
  large?: number; // 16"
  xlarge?: number; // 18"
  jumbo?: number; // 20"
  sicilian?: number; // 16" square
  glutenFree?: number; // 10" GF / Cauliflower
  /** Override displayed sizes when a pizza only sells in one cut (e.g. Grandma's). */
  onlyAvailableIn?: Array<keyof Omit<PizzaPriceGrid, "onlyAvailableIn">>;
};

/** Per-count price line (e.g. wings, pinwheels). */
export type CountPrice = { count: number; price: number };

export type MenuItem = {
  id: string;
  name: string;
  description?: string;
  image?: string;
  diet?: Diet[];
  badges?: Badge[];
  /** Simple flat price, used when a single number is enough. */
  price?: number;
  /** Item with multiple sizes (subs, calzones, salads, etc.). */
  sizes?: SizePrice[];
  /** Pizzas. */
  pizzaPrices?: PizzaPriceGrid;
  /** Wings, pinwheels, etc. */
  counts?: CountPrice[];
  /** Free-form add-ons like "+ Grilled Chicken $4". */
  addOns?: Array<{ label: string; price: number }>;
  /** Short note appended to the card (e.g. "Served hot or cold"). */
  note?: string;
  /**
   * Optional grid layout. The menu page uses this to break uniformity by
   * promoting a few items to wider or full-row treatments. Defaults to a
   * standard single-column card.
   *
   * - "default": single grid column
   * - "wide": spans two grid columns from sm+, image-and-copy side-by-side
   * - "full": spans the full grid row, hero-style horizontal card
   */
  layout?: "default" | "wide" | "full";
};

export type MenuCategory = {
  id: string;
  /** Display name in nav, mega menu, and section headers. */
  name: string;
  /** Short subtitle shown under the section header on the menu page. */
  tagline?: string;
  /** Optional intro paragraph shown above the items. */
  description?: string;
  /** Optional pricing hint shown as a chip / sub-header. */
  pricingNote?: string;
  items: MenuItem[];
  /** IDs of items featured in the mega menu / homepage strips. */
  featuredItemIds?: string[];
};

export type MenuData = {
  /** Ordered top-level categories. */
  categories: MenuCategory[];
  /** Cross-cutting pricing reference tables. */
  pizzaSizes: Array<{
    id: keyof Omit<PizzaPriceGrid, "onlyAvailableIn">;
    label: string;
    dims: string;
    cheesePrice: number;
    addRegularTopping: number;
    addPremiumTopping: number;
  }>;
  toppings: { regular: string[]; premium: string[] };
  wingSauces: string[];
  premiumWingSauces: string[];
  dressings: string[];
  /** Free-form notes shown on the menu page (delivery, dough info, etc.). */
  notes: string[];
};

/**
 * Branded fallback shown on any menu item that doesn't yet have a real
 * photo. Using the round 20-year logo gives every card a consistent on-
 * brand look until product photography is shot and swapped in.
 */
const FALLBACK_IMG = "/img/brand/dhop-20-circle.webp";

const PIZZA_IMG = {
  pepperoni: "/img/pizzas/pepperoni.webp",
  tomatoBasil: "/img/pizzas/tomato-basil.webp",
  white: "/img/pizzas/white.webp",
  chickenBaconRanch: "/img/pizzas/chicken-bacon-ranch.webp",
  hero: "/img/hero-pizza.webp",
  fallback: FALLBACK_IMG,
};

const BENTO = {
  philly: "/img/bento/philly.webp",
  wings: "/img/bento/wings.webp",
  greekSalad: "/img/bento/greek-salad.webp",
  houseSalad: "/img/bento/house-salad.webp",
  stromboli: "/img/bento/stromboli.webp",
  pinwheels: "/img/bento/pinwheels.webp",
  tiramisu: "/img/bento/tiramisu.webp",
};

/**
 * Real product photography lifted from the legacy WordPress site. Each
 * entry is a 1:1 match for the menu item it's used on — when we don't
 * have a matching photo we still fall back to FALLBACK_IMG.
 */
const M = {
  // Pizzas
  supreme: "/img/menu/supreme.webp",
  bbqChicken: "/img/menu/bbq-chicken.webp",
  veggie: "/img/menu/veggie-pizza.webp",
  grandmasSicilian: "/img/menu/grandmas-sicilian.webp",
  tomatoBasil: "/img/menu/tomato-basil.webp",
  meatLovers: "/img/menu/meat-lovers.webp",
  lasagna: "/img/menu/lasagna-pizza.webp",
  hawaiian: "/img/menu/hawaiian.webp",
  chickenBaconRanch: "/img/menu/chicken-bacon-ranch.webp",
  taco: "/img/menu/taco-pizza.webp",
  caprese: "/img/menu/caprese.webp",
  florentine: "/img/menu/florentine.webp",
  sweetMeat: "/img/menu/sweet-meat.webp",
  classicItalian: "/img/menu/classic-italian.webp",
  whitePizza: "/img/menu/white-pizza.webp",
  cheesePizza: "/img/menu/cheese-pizza.webp",
  // Subs
  phillyChicken: "/img/menu/philly-chicken.webp",
  phillySteak: "/img/menu/philly-steak.webp",
  phillySpecial: "/img/menu/philly-special.webp",
  meatballParm: "/img/menu/meatball-parm.webp",
  italianSub: "/img/menu/italian-sub.webp",
  sausagePeppersSub: "/img/menu/sausage-peppers-sub.webp",
  // Stromboli / calzone
  meatStromboli: "/img/menu/meat-stromboli.webp",
  veggieStromboli: "/img/menu/veggie-stromboli.webp",
  calzone: "/img/menu/calzone.webp",
  // Wings
  wings: "/img/menu/wings.webp",
  // Salads
  pastaSalad: "/img/menu/pasta-salad.webp",
  caesarSalad: "/img/menu/caesar-salad.webp",
  houseSalad: "/img/menu/house-salad.webp",
  greekSalad: "/img/menu/greek-salad.webp",
  // Desserts
  chocolateCannoli: "/img/menu/chocolate-cannoli.webp",
  chocolateCake: "/img/menu/chocolate-cake.webp",
  chocolateMousse: "/img/menu/chocolate-mousse.webp",
  tiramisu: "/img/menu/tiramisu.webp",
  gfBrownie: "/img/menu/gf-brownie.webp",
  carrotCake: "/img/menu/carrot-cake.webp",
  cheesecake: "/img/menu/cheesecake.webp",
  cheesecakeChoc: "/img/menu/cheesecake-chocolate.webp",
  // Catering / beverages
  pinwheels: "/img/menu/pinwheels.webp",
  doughBalls: "/img/menu/dough-balls.webp",
  beerTaps: "/img/menu/beer-taps.webp",
  beerCase: "/img/menu/beer-case.webp",
  // Breakfast
  breakfastSlice: "/img/breakfast/breakfast-slice.jpg",
};

const MENU: MenuData = {
  pizzaSizes: [
    { id: "large", label: 'Large', dims: '16"', cheesePrice: 18, addRegularTopping: 2.5, addPremiumTopping: 4 },
    { id: "sicilian", label: "Sicilian", dims: '16" square', cheesePrice: 21, addRegularTopping: 3, addPremiumTopping: 5 },
    { id: "xlarge", label: "X-Large", dims: '18"', cheesePrice: 20, addRegularTopping: 3, addPremiumTopping: 5 },
    { id: "jumbo", label: "Jumbo", dims: '20"', cheesePrice: 22, addRegularTopping: 3.5, addPremiumTopping: 6 },
    { id: "glutenFree", label: "GF / Cauliflower", dims: '10"', cheesePrice: 12, addRegularTopping: 1.5, addPremiumTopping: 2 },
  ],
  toppings: {
    regular: [
      "Pepperoni",
      "Ham",
      "Sausage",
      "Ground Beef",
      "Bacon",
      "Salami",
      "Capicola",
      "Anchovies",
      "Fresh Tomatoes",
      "Pineapple",
      "Fresh Basil",
      "Pesto",
      "Banana Peppers",
      "Black Olives",
      "Fresh Red Onions",
      "Artichoke Hearts",
      "Fresh Mushrooms",
      "Fresh Spinach",
      "Roasted Red Peppers",
      "Fresh Green Peppers",
      "Fresh Onions",
      "Fresh Garlic",
      "Jalapeños",
      "Dairy Free Mozzarella",
    ],
    premium: [
      "Chicken",
      "Provolone",
      "Ricotta",
      "Feta",
      "Crumbled Blue Cheese",
      "Extra Mozzarella",
      "Meatballs (not GF)",
      "Mike's Hot Honey",
      "Shaved Steak",
    ],
  },
  wingSauces: ["Mild", "Medium", "Hot", "Barbecue"],
  premiumWingSauces: ["Mike's Hot Honey", "Garlic Parm"],
  dressings: [
    "Balsamic Vinaigrette",
    "Ranch",
    "Blue Cheese",
    "Greek",
    "Caesar",
    "Creamy Italian",
  ],
  notes: [
    "Our pizza dough is vegan. Cauliflower crust contains eggs and cheese.",
    "Consuming raw or undercooked meats, poultry, seafood, shellfish, or eggs may increase your risk of food-borne illness.",
    "All subs served on a 10” authentic Amoroso’s Italian roll from Philadelphia.",
    "Limited menu after 10 PM. Menu prices subject to change.",
    "3-mile delivery radius. Delivery charge $3 (fee to driver).",
  ],
  categories: [
    {
      id: "specialty-pizzas",
      name: "Specialty Pizzas",
      tagline: "Hand-tossed signatures, made in the front of the house",
      pricingNote: "LG $22 · XL $26 · Jumbo $30 · Sicilian $28 · GF/Cauli $16",
      featuredItemIds: ["supreme", "bbq-chicken", "buffalo-chicken", "meat-lovers"],
      items: [
        {
          id: "supreme",
          name: "Supreme",
          description:
            "Mushrooms, onions, green peppers, pepperoni, sausage, ham and ground beef.",
          image: M.supreme,
          badges: ["best-seller"],
          pizzaPrices: { large: 22, xlarge: 26, jumbo: 30, sicilian: 28, glutenFree: 16 },
        },
        {
          id: "bbq-chicken",
          name: "BBQ Chicken",
          description:
            "Chicken breast, red onions, bacon and our BBQ pizza sauce blend.",
          image: M.bbqChicken,
          pizzaPrices: { large: 22, xlarge: 26, jumbo: 30, sicilian: 28, glutenFree: 16 },
        },
        {
          id: "veggie-pizza",
          name: "Veggie Pizza",
          description:
            "Fresh green peppers, onions, spinach, black olives, mushrooms, tomatoes and garlic.",
          image: M.veggie,
          diet: ["vegetarian"],
          pizzaPrices: { large: 22, xlarge: 26, jumbo: 30, sicilian: 28, glutenFree: 16 },
        },
        {
          id: "grandmas-sicilian",
          name: "Grandma’s Sicilian",
          description:
            "Thin crust Sicilian with fresh basil, garlic, tomatoes and marinara.",
          image: M.grandmasSicilian,
          diet: ["vegetarian"],
          pizzaPrices: { sicilian: 21, onlyAvailableIn: ["sicilian"] },
          note: '16" square only',
        },
        {
          id: "tomato-basil",
          name: "Tomato Basil",
          description:
            "Garlic and oil base, fresh garlic, basil, tomatoes and mozzarella.",
          image: M.tomatoBasil,
          diet: ["vegetarian"],
          badges: ["fan-favorite"],
          pizzaPrices: { large: 22, xlarge: 26, jumbo: 30, sicilian: 28, glutenFree: 16 },
        },
        {
          id: "meat-lovers",
          name: "Meat Lovers",
          description: "Sausage, pepperoni, ham and ground beef.",
          image: M.meatLovers,
          pizzaPrices: { large: 22, xlarge: 26, jumbo: 30, sicilian: 28, glutenFree: 16 },
        },
        {
          id: "lasagna-pizza",
          name: "Lasagna Pizza",
          description:
            "Light marinara, ricotta, parmigiana, sausage, seasoned ground beef, topped with fresh basil.",
          image: M.lasagna,
          pizzaPrices: { large: 22, xlarge: 26, jumbo: 30, sicilian: 28, glutenFree: 16 },
        },
        {
          id: "hawaiian",
          name: "Hawaiian",
          description: "Ham, pineapple and light pizza sauce.",
          image: M.hawaiian,
          pizzaPrices: { large: 22, xlarge: 26, jumbo: 30, sicilian: 28, glutenFree: 16 },
        },
        {
          id: "chicken-bacon-ranch",
          name: "Chicken Bacon Ranch",
          description:
            "Chicken, bacon and mozzarella over a light ranch base, finished with a ranch drizzle.",
          image: M.chickenBaconRanch,
          badges: ["fan-favorite"],
          pizzaPrices: { large: 22, xlarge: 26, jumbo: 30, sicilian: 28, glutenFree: 16 },
        },
        {
          id: "taco-pizza",
          name: "Taco Pizza",
          description:
            "Seasoned ground beef, mozzarella & cheddar blend, light pizza sauce, topped with fresh lettuce, homemade pico, red onion and a sour cream drizzle.",
          image: M.taco,
          pizzaPrices: { large: 22, xlarge: 26, jumbo: 30, sicilian: 28, glutenFree: 16 },
        },
        {
          id: "buffalo-chicken",
          name: "Buffalo Chicken",
          description:
            "Chopped breaded chicken, buffalo sauce, blue cheese crumble, mozzarella with ranch drizzle.",
          image: PIZZA_IMG.fallback,
          pizzaPrices: { large: 22, xlarge: 26, jumbo: 30, sicilian: 28, glutenFree: 16 },
        },
        {
          id: "caprese",
          name: "Caprese",
          description:
            "Grilled chicken, garlic, tomatoes, basil, pesto and balsamic reduction.",
          image: M.caprese,
          pizzaPrices: { large: 22, xlarge: 26, jumbo: 30, sicilian: 28, glutenFree: 16 },
        },
        {
          id: "florentine",
          name: "Florentine",
          description: "Spinach, ricotta, parmesan and garlic blend.",
          image: M.florentine,
          diet: ["vegetarian"],
          pizzaPrices: { large: 22, xlarge: 26, jumbo: 30, sicilian: 28, glutenFree: 16 },
        },
        {
          id: "sweet-meat",
          name: "Sweet Meat",
          description:
            "Ranch base with pineapple, ham, bacon, pepperoni, capicola and salami.",
          image: M.sweetMeat,
          pizzaPrices: { large: 22, xlarge: 26, jumbo: 30, sicilian: 28, glutenFree: 16 },
        },
        {
          id: "classic-italian",
          name: "Classic Italian",
          description:
            "Garlic & oil base, salami, pepperoni, red onion, ricotta cheese and fresh garlic.",
          image: M.classicItalian,
          pizzaPrices: { large: 22, xlarge: 26, jumbo: 30, sicilian: 28, glutenFree: 16 },
        },
        {
          id: "white-pizza",
          name: "White Pizza",
          description: "Garlic & oil base, fresh garlic, ricotta and mozzarella.",
          image: M.whitePizza,
          diet: ["vegetarian"],
          pizzaPrices: { large: 22, xlarge: 26, jumbo: 30, sicilian: 28, glutenFree: 16 },
        },
      ],
    },
    {
      id: "build-your-own",
      name: "Build Your Own Pizza",
      tagline: "Start with cheese — choose your size and pile it on.",
      pricingNote: "Sized from $12 (10\" GF) to $22 (20\" Jumbo)",
      featuredItemIds: ["cheese-pizza"],
      items: [
        {
          id: "cheese-pizza",
          name: "Cheese Pizza",
          description:
            "Our hand-tossed dough, house red sauce and mozzarella. Pick any size and stack on regular or premium toppings.",
          image: M.cheesePizza,
          diet: ["vegetarian"],
          pizzaPrices: { large: 18, sicilian: 21, xlarge: 20, jumbo: 22, glutenFree: 12 },
        },
      ],
    },
    {
      id: "breakfast-pizzas",
      name: "Breakfast Pizzas",
      tagline: "Served 9 AM – 11 AM",
      pricingNote: "LG $22 · XL $26 · GF/Cauli $16 — Breakfast Stromboli $12 · Pinwheels $5",
      featuredItemIds: [
        "breakfast-slice",
        "strawberry-french-toast-pizza",
        "southwest-breakfast-pizza",
        "bacon-egg-cheese-pizza",
      ],
      items: [
        {
          id: "breakfast-slice",
          name: "Breakfast Slice",
          description:
            "A single hand-cut slice of any breakfast pizza on the line. Grab-and-go and ready in minutes — see the cooler for today's cut.",
          image: M.breakfastSlice,
          badges: ["new"],
          price: 5,
          note: "By the slice — 9 AM to 11 AM",
        },
        {
          id: "strawberry-french-toast-pizza",
          name: "Strawberry French Toast Pizza",
          description:
            "French toast custard, strawberry glaze, maple syrup, cinnamon, sugar and powdered sugar.",
          image: PIZZA_IMG.fallback,
          badges: ["new"],
          pizzaPrices: { large: 22, xlarge: 26, glutenFree: 16 },
        },
        {
          id: "southwest-breakfast-pizza",
          name: "Southwest Breakfast Pizza",
          description:
            "Egg, sausage, ham, onion, green peppers, pico de gallo and a sour cream drizzle.",
          image: PIZZA_IMG.fallback,
          badges: ["new"],
          pizzaPrices: { large: 22, xlarge: 26, glutenFree: 16 },
        },
        {
          id: "raspberry-danish-pizza",
          name: "Raspberry Danish Pizza",
          description: "Cream cheese blend, sugar and raspberry glaze.",
          image: PIZZA_IMG.fallback,
          badges: ["new"],
          pizzaPrices: { large: 22, xlarge: 26, glutenFree: 16 },
        },
        {
          id: "meat-lovers-breakfast-pizza",
          name: "Meat Lovers Breakfast Pizza",
          description:
            "Egg, bacon, ham, sausage, pepperoni, mozzarella and cheddar jack cheese.",
          image: PIZZA_IMG.fallback,
          pizzaPrices: { large: 22, xlarge: 26, glutenFree: 16 },
        },
        {
          id: "bacon-egg-cheese-pizza",
          name: "Bacon, Egg & Cheese Pizza",
          description: "Smoked bacon, fresh-cracked egg and melty mozzarella.",
          image: PIZZA_IMG.fallback,
          pizzaPrices: { large: 22, xlarge: 26, glutenFree: 16 },
        },
        {
          id: "sausage-egg-cheese-pizza",
          name: "Sausage, Egg & Cheese Pizza",
          description: "Italian sausage, fresh-cracked egg and mozzarella.",
          image: PIZZA_IMG.fallback,
          pizzaPrices: { large: 22, xlarge: 26, glutenFree: 16 },
        },
        {
          id: "breakfast-stromboli",
          name: "Breakfast Stromboli",
          description: "Stuffed and baked — breakfast in a hand-held roll.",
          image: BENTO.stromboli,
          price: 12,
        },
        {
          id: "breakfast-pinwheels",
          name: "Breakfast Pinwheels",
          description: "Sausage or bacon, rolled into our dough and sliced.",
          image: BENTO.pinwheels,
          price: 5,
        },
      ],
    },
    {
      id: "dessert-pizzas",
      name: "Dessert Pizzas",
      tagline: "Available all day",
      pricingNote: "LG $22 · XL $26 · GF/Cauli $16",
      featuredItemIds: ["key-lime-pizza", "strawberry-cheesecake-pizza"],
      items: [
        {
          id: "key-lime-pizza",
          name: "Key Lime Pizza",
          description:
            "Key lime cream cheese blend, lime zest, sugar glaze with graham cracker crumble.",
          image: PIZZA_IMG.fallback,
          badges: ["new"],
          pizzaPrices: { large: 22, xlarge: 26, glutenFree: 16 },
        },
        {
          id: "strawberry-cheesecake-pizza",
          name: "Strawberry Cheesecake Pizza",
          description:
            "Cream cheese blend, strawberry sugar glaze with graham cracker crumble.",
          image: PIZZA_IMG.fallback,
          badges: ["new"],
          pizzaPrices: { large: 22, xlarge: 26, glutenFree: 16 },
        },
      ],
    },
    {
      id: "subs",
      name: "Hot & Cold Subs",
      tagline: "Served on a 10” Amoroso’s Italian roll from Philadelphia",
      pricingNote: "$11 – $13",
      featuredItemIds: ["italian-sub", "philly-steak-special", "chicken-parm", "meatball-parmesan"],
      items: [
        {
          id: "philly-chicken",
          name: "Philly Chicken",
          description: "Grilled chicken, American cheese, sautéed onions and peppers.",
          image: M.phillyChicken,
          price: 12,
        },
        {
          id: "philly-steak",
          name: "Philly Steak",
          description: "Shaved steak and American cheese.",
          image: M.phillySteak,
          price: 12,
        },
        {
          id: "philly-steak-special",
          name: "Philly Steak Special",
          description: "Steak, sautéed onions, peppers, mushrooms and American cheese.",
          image: M.phillySpecial,
          price: 13,
        },
        {
          id: "meatball-parmesan",
          name: "Meatball Parmesan",
          description: "House meatballs, marinara sauce and mozzarella.",
          image: M.meatballParm,
          price: 11,
        },
        {
          id: "chicken-parm",
          name: "Chicken Parm Sandwich",
          description:
            "Chopped breaded chicken, marinara sauce and mozzarella, all stacked on a 10\" Amoroso's roll. New on the menu and already a regular for the lunch crowd.",
          image: BENTO.philly,
          badges: ["new"],
          layout: "full",
          price: 13,
        },
        {
          id: "italian-sub",
          name: "Italian Sub",
          description:
            "Ham, salami, capicola, provolone, lettuce, tomato, red onions and creamy Italian dressing.",
          image: M.italianSub,
          price: 11,
          note: "Served hot or cold",
        },
        {
          id: "sausage-peppers-sub",
          name: "Sausage & Peppers Sub",
          description: "Mild Italian sausage, peppers and onions with marinara.",
          image: M.sausagePeppersSub,
          price: 12,
        },
      ],
    },
    {
      id: "strombolis",
      name: "Strombolis",
      tagline: "Stuffed, rolled and baked with a side of marinara",
      featuredItemIds: ["meat-lovers-stromboli", "veggie-lovers-stromboli"],
      items: [
        {
          id: "meat-lovers-stromboli",
          name: "Meat Lovers Stromboli",
          description:
            "Pepperoni, sausage, ham, capicola, salami and mozzarella with a side of marinara.",
          image: M.meatStromboli,
          sizes: [
            { size: "Small", price: 12 },
            { size: "Large", price: 16 },
          ],
        },
        {
          id: "veggie-lovers-stromboli",
          name: "Veggie Lovers Stromboli",
          description:
            "Peppers, mushrooms, spinach, onions, black olives, garlic and mozzarella with a side of marinara.",
          image: M.veggieStromboli,
          diet: ["vegetarian"],
          sizes: [
            { size: "Small", price: 12 },
            { size: "Large", price: 16 },
          ],
        },
        {
          id: "create-your-own-stromboli",
          name: "Create Your Own Stromboli",
          description:
            "Mozzarella and parmesan cheeses with a side of marinara. Add toppings to make it yours.",
          image: M.meatStromboli,
          sizes: [
            { size: "Small", price: 10 },
            { size: "Large", price: 14 },
          ],
          addOns: [
            { label: "Regular topping (Small)", price: 1.5 },
            { label: "Regular topping (Large)", price: 2.5 },
            { label: "Premium topping (Small)", price: 2.5 },
            { label: "Premium topping (Large)", price: 4.5 },
          ],
        },
      ],
    },
    {
      id: "calzones",
      name: "Calzones",
      tagline: "Folded over and stuffed with cheese, with marinara on the side",
      featuredItemIds: ["meat-lovers-calzone", "veggie-lovers-calzone"],
      items: [
        {
          id: "meat-lovers-calzone",
          name: "Meat Lovers Calzone",
          description:
            "Pepperoni, sausage, ham, capicola, salami, mozzarella, parmesan, ricotta and romano cheeses with a side of marinara.",
          image: M.calzone,
          sizes: [
            { size: "Small", price: 15 },
            { size: "Large", price: 20 },
          ],
        },
        {
          id: "veggie-lovers-calzone",
          name: "Veggie Lovers Calzone",
          description:
            "Veggies, mozzarella, parmesan, ricotta and romano cheeses with a side of marinara.",
          image: M.calzone,
          diet: ["vegetarian"],
          sizes: [
            { size: "Small", price: 15 },
            { size: "Large", price: 20 },
          ],
        },
        {
          id: "create-your-own-calzone",
          name: "Create Your Own Calzone",
          description:
            "Mozzarella, parmesan, ricotta and romano cheeses with a side of marinara. Build it your way.",
          image: M.calzone,
          sizes: [
            { size: "Small", price: 12 },
            { size: "Large", price: 16 },
          ],
          addOns: [
            { label: "Regular topping (Small)", price: 1.5 },
            { label: "Regular topping (Large)", price: 2.5 },
            { label: "Premium topping (Small)", price: 2.5 },
            { label: "Premium topping (Large)", price: 4.5 },
          ],
        },
      ],
    },
    {
      id: "wings",
      name: "Wings",
      tagline: "Tossed in your choice of sauce — flats, drums or mixed",
      featuredItemIds: ["boneless-wings", "bone-in-wings"],
      items: [
        {
          id: "boneless-wings",
          name: "Boneless Wings",
          description:
            "Hand-breaded boneless wings, tossed in mild, medium, hot or barbecue. Upgrade to Mike's Hot Honey or Garlic Parm for the full DHOP treatment.",
          image: M.wings,
          badges: ["new"],
          counts: [
            { count: 6, price: 8 },
            { count: 12, price: 14 },
            { count: 25, price: 25 },
          ],
          addOns: [
            { label: "All flats or all drums (6 ct)", price: 1 },
            { label: "All flats or all drums (12 ct)", price: 2 },
            { label: "All flats or all drums (25 ct)", price: 3 },
            { label: "Mike's Hot Honey or Garlic Parm (6 ct)", price: 2 },
            { label: "Mike's Hot Honey or Garlic Parm (12 ct)", price: 3 },
            { label: "Mike's Hot Honey or Garlic Parm (25 ct)", price: 4 },
            { label: "Extra ranch or blue cheese (3.5 oz)", price: 1 },
          ],
        },
        {
          id: "bone-in-wings",
          name: "Bone-In Wings",
          description:
            "Classic bone-in wings, tossed in mild, medium, hot or barbecue.",
          image: M.wings,
          counts: [
            { count: 6, price: 10 },
            { count: 12, price: 16 },
            { count: 25, price: 30 },
          ],
          addOns: [
            { label: "All flats or all drums (6 ct)", price: 1 },
            { label: "All flats or all drums (12 ct)", price: 2 },
            { label: "All flats or all drums (25 ct)", price: 3 },
            { label: "Mike's Hot Honey or Garlic Parm (6 ct)", price: 2 },
            { label: "Mike's Hot Honey or Garlic Parm (12 ct)", price: 3 },
            { label: "Mike's Hot Honey or Garlic Parm (25 ct)", price: 4 },
            { label: "Extra ranch or blue cheese (3.5 oz)", price: 1 },
          ],
        },
      ],
    },
    {
      id: "salads",
      name: "Salads",
      tagline: "Tossed to order with your choice of house dressing",
      featuredItemIds: ["caesar-salad", "house-salad", "greek-salad", "pasta-salad"],
      items: [
        {
          id: "pasta-salad",
          name: "Pasta Salad",
          description:
            "Rotini pasta, cucumbers, green peppers, onions and sundried tomatoes in our Italian dressing.",
          image: M.pastaSalad,
          diet: ["vegetarian"],
          sizes: [
            { size: "Regular", price: 6 },
            { size: "With Parm", price: 6.5 },
          ],
        },
        {
          id: "caesar-salad",
          name: "Caesar Salad",
          description:
            "Bed of romaine, shredded parmesan & romano cheeses, Caesar dressing. Make it a meal by adding our grilled chicken.",
          image: M.caesarSalad,
          diet: ["vegetarian"],
          badges: ["fan-favorite"],
          layout: "wide",
          sizes: [
            { size: "Small", price: 6 },
            { size: "Large", price: 9.5 },
          ],
          addOns: [{ label: "Add grilled chicken", price: 4 }],
        },
        {
          id: "house-salad",
          name: "House Salad",
          description:
            "Romaine, tomatoes, cucumbers, red onions, green peppers, shredded carrots and your choice of dressing. The everyday classic — pairs with any pizza.",
          image: M.houseSalad,
          diet: ["vegetarian"],
          layout: "wide",
          sizes: [
            { size: "Small", price: 6 },
            { size: "Large", price: 9.5 },
          ],
          addOns: [{ label: "Add grilled chicken", price: 4 }],
        },
        {
          id: "greek-salad",
          name: "Greek Salad",
          description:
            "Romaine, tomatoes, feta, olives, cucumbers, red onions, peppers, pepperoncini and Greek dressing.",
          image: M.greekSalad,
          diet: ["vegetarian"],
          sizes: [
            { size: "Small", price: 6 },
            { size: "Large", price: 9.5 },
          ],
          addOns: [{ label: "Add grilled chicken", price: 4 }],
        },
      ],
    },
    {
      id: "desserts",
      name: "Desserts",
      tagline: "Sweet finishers, all $5",
      featuredItemIds: [
        "tiramisu",
        "ny-cheesecake",
        "chocolate-dipped-cannoli",
        "carrot-cake",
      ],
      items: [
        { id: "chocolate-dipped-cannoli", name: "Chocolate Dipped Cannoli", image: M.chocolateCannoli, price: 5 },
        { id: "cannoli", name: "Cannoli", image: M.chocolateCannoli, price: 5 },
        { id: "chocolate-cake", name: "Chocolate Cake", image: M.chocolateCake, price: 5 },
        { id: "chocolate-mousse", name: "Chocolate Mousse", image: M.chocolateMousse, price: 5 },
        { id: "tiramisu", name: "Tiramisu", image: M.tiramisu, price: 5, badges: ["fan-favorite"] },
        { id: "gluten-free-brownie", name: "Gluten Free Brownie", image: M.gfBrownie, diet: ["gluten-free"], price: 5 },
        { id: "carrot-cake", name: "Carrot Cake", description: "With cream cheese frosting.", image: M.carrotCake, price: 5 },
        { id: "ny-cheesecake", name: "NY Cheesecake", image: M.cheesecake, price: 5 },
        { id: "ny-cheesecake-choc", name: "NY Cheesecake (Chocolate Drizzle)", image: M.cheesecakeChoc, price: 5 },
      ],
    },
    {
      id: "beverages",
      name: "Beverages",
      tagline: "Brewed Lavazza, soft drinks, water and local craft beer",
      featuredItemIds: ["lavazza-brewed-coffee", "canned-drinks", "local-craft-beer"],
      items: [
        {
          id: "lavazza-brewed-coffee",
          name: "Lavazza Brewed Coffee",
          description:
            "Freshly brewed Italian Lavazza — rich, smooth and a perfect pairing with our breakfast slices.",
          image: FALLBACK_IMG,
          badges: ["new"],
          sizes: [
            { size: "12 oz", price: 3 },
            { size: "16 oz", price: 3.75 },
          ],
        },
        { id: "canned-drinks", name: "Canned Drinks", image: FALLBACK_IMG, price: 2.25 },
        { id: "bottled-drinks", name: "Bottled Drinks", image: FALLBACK_IMG, price: 3.5 },
        { id: "bottled-water", name: "Bottled Water", image: FALLBACK_IMG, price: 2 },
        {
          id: "local-craft-beer",
          name: "Local Craft Beer",
          description:
            "A rotating selection of craft beers from local and regional Florida breweries — ask your server what's on this week.",
          image: M.beerTaps,
          layout: "wide",
        },
        {
          id: "canned-beer",
          name: "Canned Beer Selection",
          description:
            "Our cooler is stocked with a wide variety of popular beers.",
          image: M.beerCase,
        },
      ],
    },
    {
      id: "catering",
      name: "Catering & Extras",
      tagline: "Feed the office, the team or the whole block",
      description:
        "Please call 239-337-3467 for pizza and other catering pricing — we also cater desserts.",
      featuredItemIds: [
        "catering-greek-salad",
        "catering-pasta-salad",
        "catering-pinwheels",
        "pizza-dough-balls",
      ],
      items: [
        {
          id: "catering-greek-salad",
          name: "Greek, Caesar or House Salad (Catering)",
          description: "Our signature salads, scaled for a crowd.",
          image: M.greekSalad,
          sizes: [
            { size: "Small", price: 45 },
            { size: "Large", price: 55 },
          ],
          addOns: [
            { label: "Add chicken (Small)", price: 12 },
            { label: "Add chicken (Large)", price: 18 },
          ],
        },
        {
          id: "catering-pasta-salad",
          name: "Pasta Salad (Catering)",
          description: "Rotini, veggies and sundried tomatoes in Italian dressing.",
          image: M.pastaSalad,
          sizes: [
            { size: "Small", price: 50 },
            { size: "Large", price: 80 },
          ],
          addOns: [
            { label: "Add parmesan (Small)", price: 8 },
            { label: "Add parmesan (Large)", price: 14 },
          ],
        },
        {
          id: "salad-dressings",
          name: "Salad Dressings",
          description:
            "House dressings to go: balsamic vinaigrette, ranch, blue cheese, Greek, Caesar or creamy Italian.",
          image: FALLBACK_IMG,
          sizes: [
            { size: "Pint", price: 12 },
            { size: "Quart", price: 6 },
          ],
        },
        {
          id: "pizza-dough-balls",
          name: "Pizza Dough Balls",
          description: "Our scratch-made vegan dough — 18 oz portions.",
          image: M.doughBalls,
          price: 5,
          note: "18 oz",
        },
        {
          id: "marinara-sauce",
          name: "Marinara / Pizza Sauce",
          description: "Our house red, by the pint or quart.",
          image: FALLBACK_IMG,
          sizes: [
            { size: "Pint", price: 9 },
            { size: "Quart", price: 16 },
          ],
        },
        {
          id: "catering-pinwheels",
          name: "Pepperoni Pinwheels",
          description: "Hand-rolled, sliced and baked — pack of 8.",
          image: M.pinwheels,
          price: 35,
          note: "Qty 8",
        },
      ],
    },
  ],
};

export function getMenu(): MenuData {
  return MENU;
}

export function getCategory(id: string): MenuCategory | undefined {
  return MENU.categories.find((c) => c.id === id);
}

export function getItem(itemId: string): MenuItem | undefined {
  for (const c of MENU.categories) {
    const found = c.items.find((i) => i.id === itemId);
    if (found) return found;
  }
  return undefined;
}

export function getFeaturedItems(categoryId: string, limit = 4): MenuItem[] {
  const cat = getCategory(categoryId);
  if (!cat) return [];
  const ids = cat.featuredItemIds ?? [];
  const featured = ids
    .map((id) => cat.items.find((i) => i.id === id))
    .filter((i): i is MenuItem => Boolean(i));
  if (featured.length >= limit) return featured.slice(0, limit);
  // Fill remaining slots from the category in source order.
  const rest = cat.items.filter((i) => !ids.includes(i.id));
  return [...featured, ...rest].slice(0, limit);
}

/**
 * Format a number as USD without trailing zero-cents (so $22 not $22.00,
 * but $6.50 stays as $6.50). Suitable for menu cards and totals.
 */
export function formatPrice(value: number): string {
  return value % 1 === 0 ? `$${value}` : `$${value.toFixed(2)}`;
}

/**
 * Compute a "starting at" price for an item, used in card thumbnails and
 * the mega menu. Falls back to undefined when the item has no numeric
 * pricing (e.g. "Local Craft Beer").
 */
export function getStartingPrice(item: MenuItem): number | undefined {
  if (typeof item.price === "number") return item.price;
  if (item.sizes && item.sizes.length > 0) {
    return Math.min(...item.sizes.map((s) => s.price));
  }
  if (item.counts && item.counts.length > 0) {
    return Math.min(...item.counts.map((c) => c.price));
  }
  if (item.pizzaPrices) {
    const values = Object.entries(item.pizzaPrices)
      .filter(([k]) => k !== "onlyAvailableIn")
      .map(([, v]) => v as number)
      .filter((v): v is number => typeof v === "number");
    if (values.length > 0) return Math.min(...values);
  }
  return undefined;
}
