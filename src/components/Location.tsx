export function Location() {
  return (
    <section className="bg-cream">
      <div className="mx-auto grid max-w-360 grid-cols-1 items-stretch lg:grid-cols-12">
        <div className="flex items-center px-6 py-12 sm:px-10 sm:py-16 lg:col-span-4 lg:px-20">
          <h2 className="font-display text-[36px] leading-11 text-ink sm:text-[44px] sm:leading-12 lg:text-[56px] lg:leading-15">
            Located In
            <br />
            The Heart Of
            <br />
            <span className="text-brand">Downtown</span>
            <br />
            <span className="text-brand">Fort Myers</span>
          </h2>
        </div>
        <div className="relative h-110 lg:col-span-8">
          <iframe
            title="Map to DHOP"
            src="https://www.google.com/maps?q=1520+Hendry+Street+Fort+Myers+FL+33901&output=embed"
            className="absolute inset-0 h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
