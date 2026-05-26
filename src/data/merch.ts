export type MerchCategoryId =
  | "apparel"
  | "headwear"
  | "drinkware"
  | "accessories"
  | "pet"
  | "stickers";

export type MerchProduct = {
  id: string;
  name: string;
  short: string;
  price: number;
  image: string;
  href: string;
  category: MerchCategoryId;
  featured?: boolean;
};

export const MERCH_STORE_URL = "https://dhop-pizza.printify.me";

export const MERCH_CATEGORIES: { id: MerchCategoryId | "all"; label: string }[] =
  [
    { id: "all", label: "All" },
    { id: "apparel", label: "Apparel" },
    { id: "headwear", label: "Headwear" },
    { id: "drinkware", label: "Drinkware" },
    { id: "accessories", label: "Accessories" },
    { id: "pet", label: "Pet" },
    { id: "stickers", label: "Stickers" },
  ];

const product = (p: MerchProduct) => p;

export const MERCH_PRODUCTS: MerchProduct[] = [
  product({
    id: "28828713",
    name: "DHOP Pullover Hoodie",
    short: "Lightweight unisex hooded sweatshirt",
    price: 48,
    image: "/img/merch/hoodie.png",
    href: `${MERCH_STORE_URL}/product/28828713`,
    category: "apparel",
    featured: true,
  }),
  product({
    id: "28828626",
    name: "DHOP Crewneck Sweatshirt",
    short: "Heavyweight unisex crewneck",
    price: 41,
    image: "/img/merch/crewneck.png",
    href: `${MERCH_STORE_URL}/product/28828626`,
    category: "apparel",
  }),
  product({
    id: "28829588",
    name: "DHOP Long Sleeve Tee",
    short: "Unisex lightweight long sleeve",
    price: 33,
    image: "/img/merch/long-sleeve.png",
    href: `${MERCH_STORE_URL}/product/28829588`,
    category: "apparel",
  }),
  product({
    id: "28828070",
    name: "DHOP Jersey Tee",
    short: "Unisex short-sleeve jersey tee",
    price: 28,
    image: "/img/merch/tee-jersey.png",
    href: `${MERCH_STORE_URL}/product/28828070`,
    category: "apparel",
    featured: true,
  }),
  product({
    id: "28827855",
    name: "DHOP Garment-Dyed Tee",
    short: "Unisex garment-dyed soft tee",
    price: 30,
    image: "/img/merch/tee-garment-dyed.png",
    href: `${MERCH_STORE_URL}/product/28827855`,
    category: "apparel",
  }),
  product({
    id: "28829187",
    name: "DHOP Muscle Tank",
    short: "Unisex jersey muscle tank",
    price: 27,
    image: "/img/merch/muscle-tank.png",
    href: `${MERCH_STORE_URL}/product/28829187`,
    category: "apparel",
  }),
  product({
    id: "28828918",
    name: "DHOP Racerback Tank",
    short: "Women's ideal racerback tank",
    price: 25,
    image: "/img/merch/racerback-tank.png",
    href: `${MERCH_STORE_URL}/product/28828918`,
    category: "apparel",
  }),
  product({
    id: "28855193",
    name: "DHOP Toddler Tee",
    short: "Kids' DHOP logo shirt",
    price: 20.65,
    image: "/img/merch/toddler-tee.jpg",
    href: `${MERCH_STORE_URL}/product/28855193`,
    category: "apparel",
  }),
  product({
    id: "28829367",
    name: "DHOP Snapback Hat",
    short: "Unisex snapback cap",
    price: 22,
    image: "/img/merch/snapback.png",
    href: `${MERCH_STORE_URL}/product/28829367`,
    category: "headwear",
    featured: true,
  }),
  product({
    id: "28829460",
    name: "DHOP Low-Profile Cap",
    short: "Classic six-panel ballcap",
    price: 18,
    image: "/img/merch/low-cap.png",
    href: `${MERCH_STORE_URL}/product/28829460`,
    category: "headwear",
  }),
  product({
    id: "28853651",
    name: "20oz DHOP Tumbler",
    short: "Insulated cup, keeps cold for hours",
    price: 28,
    image: "/img/merch/tumbler-20oz.png",
    href: `${MERCH_STORE_URL}/product/28853651`,
    category: "drinkware",
    featured: true,
  }),
  product({
    id: "28853818",
    name: "12oz DHOP Tumbler",
    short: "Compact insulated tumbler",
    price: 25,
    image: "/img/merch/tumbler-12oz.png",
    href: `${MERCH_STORE_URL}/product/28853818`,
    category: "drinkware",
  }),
  product({
    id: "28854091",
    name: "DHOP Water Bottle",
    short: "Stainless steel, all-day cold",
    price: 28,
    image: "/img/merch/water-bottle.png",
    href: `${MERCH_STORE_URL}/product/28854091`,
    category: "drinkware",
  }),
  product({
    id: "28853273",
    name: "DHOP Frosted Pint Glass",
    short: "16oz frosted pub glass",
    price: 11,
    image: "/img/merch/pint-glass.png",
    href: `${MERCH_STORE_URL}/product/28853273`,
    category: "drinkware",
  }),
  product({
    id: "28853305",
    name: "DHOP Whiskey Glass",
    short: "Heavy-bottom whiskey rocks glass",
    price: 11,
    image: "/img/merch/whiskey-glass.jpg",
    href: `${MERCH_STORE_URL}/product/28853305`,
    category: "drinkware",
  }),
  product({
    id: "28853404",
    name: "DHOP Can Cooler",
    short: "Red neoprene can koozie",
    price: 5.5,
    image: "/img/merch/can-cooler.png",
    href: `${MERCH_STORE_URL}/product/28853404`,
    category: "drinkware",
  }),
  product({
    id: "28854277",
    name: "DHOP Canvas Tote",
    short: "Heavy canvas everyday tote",
    price: 19,
    image: "/img/merch/tote-bag.png",
    href: `${MERCH_STORE_URL}/product/28854277`,
    category: "accessories",
  }),
  product({
    id: "28854524",
    name: "DHOP Golf Towel",
    short: "Grommet ring, made for the bag",
    price: 13,
    image: "/img/merch/golf-towel.png",
    href: `${MERCH_STORE_URL}/product/28854524`,
    category: "accessories",
  }),
  product({
    id: "28854742",
    name: "DHOP Pet Bandana",
    short: "For the pizza-loving pup",
    price: 20,
    image: "/img/merch/pet-bandana.jpg",
    href: `${MERCH_STORE_URL}/product/28854742`,
    category: "pet",
  }),
  product({
    id: "28854439",
    name: "DHOP Vinyl Decal",
    short: "Kiss-cut sticker for the car or laptop",
    price: 2,
    image: "/img/merch/vinyl-decal.jpg",
    href: `${MERCH_STORE_URL}/product/28854439`,
    category: "stickers",
  }),
];

export function getFeaturedMerch(): MerchProduct[] {
  return MERCH_PRODUCTS.filter((p) => p.featured);
}
