import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent } from "react";
import heroHome from "@/assets/hero-home.webp";
import { Reveal } from "@/components/Reveal";
import { WorkGalleryModal } from "@/components/WorkGalleryModal";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { getGalleryData } from "@/lib/gallery";
import { sendInquiry } from "@/lib/contact";
import {
  ADDRESS_LINES,
  AREAS_SERVED,
  GOOGLE_REVIEWS_URL,
  PHONE,
  PHONE_DISPLAY,
  SITE_NAME,
  SITE_URL,
  WHATSAPP,
} from "@/lib/site";
import {
  BadgeCheck,
  BugOff,
  Bug,
  Wind,
  ShieldAlert,
  Car,
  Home,
  Building2,
  Factory,
  BedDouble,
  Hospital,
  GraduationCap,
  Utensils,
  Wine,
  CheckCircle2,
  Clock,
  Leaf,
  MapPin,
  Quote,
  Star,
  ShieldCheck,
  PhoneCall,
  ChevronDown,
  Menu,
  X,
  Images,
  Sparkles,
} from "lucide-react";

const PAGE_TITLE = "Pest Control in Chennai | Global Elite Pest Management";
const PAGE_DESCRIPTION =
  "Chennai's trusted pest control since 2012. Eco-friendly termite, cockroach, mosquito and rat treatment in Ambattur and across Chennai. Book a free inspection.";

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "PestControlService"],
  "@id": `${SITE_URL}/#business`,
  name: SITE_NAME,
  description: PAGE_DESCRIPTION,
  url: `${SITE_URL}/`,
  image: `${SITE_URL}/og-image.jpg`,
  telephone: PHONE,
  priceRange: "₹₹",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Tiruvalluvar Street, Lenin Nagar, Venkateswara Nagar, Ambattur",
    addressLocality: "Chennai",
    addressRegion: "Tamil Nadu",
    postalCode: "600053",
    addressCountry: "IN",
  },
  geo: { "@type": "GeoCoordinates", latitude: 13.1067, longitude: 80.1521 },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "20:00",
    },
  ],
  areaServed: AREAS_SERVED.map((area) => ({
    "@type": "Place",
    name: `${area}, Chennai`,
  })),
  ...(GOOGLE_REVIEWS_URL ? { sameAs: [GOOGLE_REVIEWS_URL] } : {}),
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  inLanguage: "en-IN",
  publisher: { "@id": `${SITE_URL}/#business` },
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: PAGE_TITLE },
      { name: "description", content: PAGE_DESCRIPTION },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { name: "author", content: SITE_NAME },
      { property: "og:title", content: PAGE_TITLE },
      { property: "og:description", content: PAGE_DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_IN" },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:url", content: `${SITE_URL}/` },
      { property: "og:image", content: `${SITE_URL}/og-image.jpg` },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: `${SITE_NAME} — pest control in Chennai` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: PAGE_TITLE },
      { name: "twitter:description", content: PAGE_DESCRIPTION },
      { name: "twitter:image", content: `${SITE_URL}/og-image.jpg` },
      { "script:ld+json": localBusinessJsonLd },
      { "script:ld+json": websiteJsonLd },
      {
        "script:ld+json": {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map(([question, answer]) => ({
            "@type": "Question",
            name: question,
            acceptedAnswer: { "@type": "Answer", text: answer },
          })),
        },
      },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/` }],
  }),
  component: Index,
});

function Logo() {
  return (
    <a href="#top" className="group flex items-center gap-2">
      <img
        src="/profile_img.png"
        alt="Global Elite Logo"
        className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
      />
      <span className="text-lg font-bold tracking-tighter text-primary">
        GLOBAL<span className="font-light text-foreground">ELITE</span>
      </span>
    </a>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    ["Services", "#services"],
    ["About", "#about"],
    ["Process", "#process"],
    ["Areas", "#areas"],
    ["Reviews", "#testimonials"],
    ["FAQ", "#faq"],
  ];

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled || mobileMenuOpen
          ? "border-b border-border bg-background/90 shadow-sm backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Logo />

        {/* Desktop Nav */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="relative text-sm font-medium text-foreground/80 transition-colors after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 hover:text-primary hover:after:origin-left hover:after:scale-x-100"
            >
              {label}
            </a>
          ))}
          <a
            href="#contact"
            className="sweep-on-hover relative overflow-hidden rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg"
          >
            Book Free Inspection
          </a>
        </div>

        {/* Mobile quick contact & menu toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <a
            href={`tel:${PHONE}`}
            className="inline-flex size-9 items-center justify-center rounded-full border border-primary/20 bg-primary/10 text-primary transition-colors hover:bg-primary/20"
            aria-label="Call now"
          >
            <PhoneCall className="size-4" />
          </a>
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="inline-flex size-9 items-center justify-center rounded-xl border border-border bg-card text-foreground transition-colors hover:bg-muted"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="border-b border-border bg-background/95 px-5 py-5 shadow-2xl backdrop-blur-2xl md:hidden animate-reveal">
          <div className="flex flex-col gap-2">
            {navLinks.map(([label, href]) => (
              <a
                key={href}
                href={href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between rounded-xl px-4 py-3 text-base font-semibold text-foreground transition-colors hover:bg-primary/10 hover:text-primary active:bg-primary/15"
              >
                <span>{label}</span>
                <span className="text-xs text-muted-foreground">→</span>
              </a>
            ))}
            <div className="mt-3 flex flex-col gap-2.5 border-t border-border pt-3">
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full rounded-full bg-primary py-3.5 text-center text-sm font-bold text-primary-foreground shadow-md transition-all hover:bg-primary/90"
              >
                Book Free Inspection
              </a>
              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`tel:${PHONE}`}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-border py-2.5 text-xs font-semibold text-foreground hover:bg-muted"
                >
                  <PhoneCall className="size-3.5 text-primary" />
                  Call Now
                </a>
                <a
                  href={WHATSAPP}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#25D366]/30 bg-[#25D366]/10 py-2.5 text-xs font-semibold text-[#25D366] hover:bg-[#25D366]/20"
                >
                  <WhatsAppIcon className="size-3.5 fill-current" />
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

function Counter({
  to,
  suffix = "",
  decimals = 0,
}: {
  to: number;
  suffix?: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  // SSR/HTML ships the real value so crawlers and no-JS users never see "0".
  const [value, setValue] = useState(to);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const rect = el.getBoundingClientRect();
    const startsVisible = rect.top < window.innerHeight && rect.bottom > 0;
    // Only rewind off-screen counters; on-screen ones keep the real value so
    // nothing visible ever flashes back to zero.
    if (!startsVisible) setValue(0);
    const io = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const duration = 1400;
      const tick = (now: number) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setValue(to * eased);
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => io.disconnect();
  }, [to]);

  return (
    <span ref={ref}>
      {decimals ? value.toFixed(decimals) : Math.round(value).toLocaleString()}
      {suffix}
    </span>
  );
}

function Hero() {
  return (
    <header id="top" className="relative overflow-hidden pt-8 pb-16 sm:pt-16 sm:pb-32">
      <div className="pointer-events-none absolute inset-0 -z-10 grid-lines" />
      <div className="pointer-events-none absolute inset-x-0 -top-40 -z-10 h-[42rem] aurora opacity-70" />

      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:gap-16 sm:px-6 lg:grid-cols-2">
        <div>
          <Reveal>
            <div className="mb-4 sm:mb-6 inline-flex max-w-full items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1.5 backdrop-blur">
              <span className="relative flex size-2.5 sm:size-3 shrink-0 items-center justify-center">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex size-1.5 sm:size-2 rounded-full bg-primary" />
              </span>
              <span className="font-mono text-[11px] sm:text-[11px] uppercase tracking-wider sm:tracking-widest text-primary font-bold sm:text-wrap">
                Trusted since 2012 · 5★ rated pest experts in Chennai
              </span>
            </div>
          </Reveal>

          <Reveal delay={90}>
            <h1 className="mb-6 sm:mb-8 text-balance text-3xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl sm:leading-[0.95]">
              Chennai's trusted{" "}
              <span className="bg-gradient-to-r from-primary via-primary-light to-accent bg-clip-text text-transparent">
                pest control experts.
              </span>
            </h1>
          </Reveal>

          <Reveal delay={180}>
            <p className="mb-8 sm:mb-10 max-w-lg text-pretty text-base sm:text-lg leading-relaxed text-muted-foreground">
              Protect your home and business with safe, eco-friendly and guaranteed pest control
              solutions — delivered by certified specialists with over a decade of experience.
            </p>
          </Reveal>

          <Reveal delay={260}>
            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4">
              <a
                href="#contact"
                className="sweep-on-hover relative overflow-hidden rounded-full bg-primary px-6 py-3.5 sm:px-8 sm:py-4 text-center text-base sm:text-lg font-bold text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-2xl"
              >
                Book Free Inspection
              </a>
              <div className="flex items-center gap-3">
                <a
                  href={WHATSAPP}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 text-center rounded-full border border-[#25D366]/30 bg-[#25D366]/10 px-5 py-3 sm:px-6 sm:py-4 text-sm font-semibold text-[#25D366] transition-all hover:bg-[#25D366]/20 hover:border-[#25D366]/50"
                >
                  <WhatsAppIcon className="size-4 shrink-0 fill-current" />
                  <span>WhatsApp Now</span>
                </a>
                <a
                  href={`tel:${PHONE}`}
                  className="flex-1 sm:flex-initial text-center rounded-full border border-border px-5 py-3 sm:px-6 sm:py-4 text-sm font-semibold transition-all hover:border-primary/40 hover:bg-primary/5"
                >
                  Call Now
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={340}>
            <div className="mt-6 sm:mt-8 flex items-center gap-3">
              <span className="text-accent">★★★★★</span>
              <span className="text-xs font-medium text-muted-foreground">
                5.0 · 14 Google Reviews
              </span>
            </div>
          </Reveal>
        </div>

        <Reveal delay={200} className="relative mt-4 lg:mt-0">
          <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-tr from-primary/20 via-transparent to-accent/20 blur-2xl" />
          <div className="aspect-square overflow-hidden rounded-3xl bg-card shadow-2xl ring-1 ring-border">
            <img
              src={heroHome}
              alt="Protected Chennai home exterior at dusk"
              width={1200}
              height={1200}
              className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.19,1,0.22,1)] hover:scale-105"
            />
          </div>
          <div className="animate-float absolute -bottom-4 left-4 sm:-bottom-6 sm:-left-6 flex items-center gap-3 sm:gap-4 rounded-2xl bg-card p-4 sm:p-6 shadow-xl ring-1 ring-border max-w-[calc(100%-2rem)]">
            <div className="flex size-10 sm:size-12 shrink-0 items-center justify-center rounded-xl bg-accent/15 font-bold text-accent text-sm sm:text-base">
              13+
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-card-foreground">
                Years of trusted service
              </div>
              <div className="text-[11px] sm:text-[11px] uppercase tracking-tighter text-muted-foreground">
                Serving Chennai since 2012
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </header>
  );
}

const TRUST_POINTS = [
  {
    icon: ShieldCheck,
    title: "Government-approved chemicals",
    desc: "Certified formulations safe for children, pets and food areas.",
  },
  {
    icon: BadgeCheck,
    title: "Certified technicians",
    desc: "Trained, uniformed specialists — 13+ years in Chennai.",
  },
  {
    icon: Leaf,
    title: "Eco-friendly treatments",
    desc: "Low-toxicity treatments that target pests, not your family.",
  },
  {
    icon: Clock,
    title: "30-minute response",
    desc: "Same-day inspection slots and free follow-up support.",
  },
];

function TrustStrip() {
  return (
    <section
      aria-label="Why choose Global Elite Pest Management"
      className="border-y border-border bg-card/60 py-8 sm:py-10"
    >
      <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        {TRUST_POINTS.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="flex items-start gap-3">
            <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Icon className="size-5" aria-hidden="true" />
            </span>
            <div>
              <div className="text-sm font-bold text-foreground">{title}</div>
              <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground sm:text-xs">
                {desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

const MARQUEE = [
  "Certified Experts",
  "Eco-Friendly Chemicals",
  "Guaranteed Results",
  "Affordable Pricing",
  "Fast Response",
  "Safe for Children",
  "Modern Equipment",
  "Commercial Specialists",
];

function Marquee() {
  return (
    <div className="overflow-hidden border-y border-border bg-card/50 py-4">
      <div className="flex w-max animate-marquee gap-12 pr-12">
        {[...MARQUEE, ...MARQUEE].map((item, i) => (
          <span
            key={i}
            aria-hidden={i >= MARQUEE.length ? "true" : undefined}
            className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground"
          >
            <span className="size-1.5 rounded-full bg-primary/60" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

const SERVICES = [
  {
    icon: BugOff,
    title: "Termite Control",
    desc: "Deep-penetration treatment that eliminates colonies and safeguards wooden structures for years.",
    image: "/services/termite.webp",
    tag: "Woodwork Protection",
  },
  {
    icon: Bug,
    title: "Cockroach Control",
    desc: "Gel-based, odourless treatment reaching hidden nests in kitchens, bathrooms and offices.",
    image: "/services/cockroach.webp",
    tag: "Kitchen & Pantry",
  },
  {
    icon: Wind,
    title: "Mosquito Treatment",
    desc: "Fogging + larvicide programs that break the breeding cycle indoors and outdoors.",
    image: "/services/mosquito.webp",
    tag: "Lawn & Garden",
  },
  {
    icon: ShieldAlert,
    title: "Rat Control",
    desc: "Bait-station and exclusion strategy to remove rodents without harm to pets or children.",
    image: "/services/rat.webp",
    tag: "Rodent Exclusion",
  },
  {
    icon: Car,
    title: "Car Anti-Rat Spray",
    desc: "Specialised herbal spray to protect vehicle wiring and interiors from rodent damage.",
    image: "/services/car.webp",
    tag: "Automotive Engine",
  },
  {
    icon: Home,
    title: "Residential Pest Control",
    desc: "Whole-home protection plans tailored to Chennai apartments, villas and independent houses.",
    image: "/services/residential.webp",
    tag: "Homes & Villas",
  },
  {
    icon: Building2,
    title: "Commercial Pest Control",
    desc: "Scheduled service contracts for offices, showrooms and retail spaces — zero disruption.",
    image: "/services/commercial.webp",
    tag: "Offices & Retail",
  },
  {
    icon: Factory,
    title: "Factory Pest Control",
    desc: "Industrial-grade solutions for warehouses, factories and manufacturing floors.",
    image: "/services/factory.webp",
    tag: "Plants & Warehouses",
  },
  {
    icon: BedDouble,
    title: "Hotel Pest Control",
    desc: "Discreet, guest-safe programs meeting hospitality hygiene standards.",
    image: "/services/hotel.webp",
    tag: "Hospitality & Suites",
  },
  {
    icon: Hospital,
    title: "Hospital Pest Control",
    desc: "Certified protocols for hospitals and clinics — medical-grade safety compliance.",
    image: "/services/hospital.webp",
    tag: "Clinics & Healthcare",
  },
  {
    icon: GraduationCap,
    title: "School Pest Control",
    desc: "Child-safe treatments delivered during off-hours across schools and campuses.",
    image: "/services/school.webp",
    tag: "Schools & Campuses",
  },
  {
    icon: Utensils,
    title: "Restaurant Pest Control",
    desc: "HACCP-aligned kitchen treatments protecting your reputation and rating.",
    image: "/services/restaurant.webp",
    tag: "Commercial Kitchens",
  },
  {
    icon: Wine,
    title: "Restro Bar Pest Control",
    desc: "Discreet, high-efficacy treatments tailored for bars and pubs to maintain hygiene and protect inventory.",
    image: "/services/restro-bar.webp",
    tag: "Bars & Lounges",
  },
];

function Services() {
  const [galleryOpen, setGalleryOpen] = useState(false);
  const galleryData = getGalleryData();

  return (
    <section id="services" className="relative overflow-hidden bg-card py-16 sm:py-32">
      <div className="pointer-events-none absolute inset-x-0 -top-40 -z-10 h-[42rem] aurora opacity-20" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="mb-12 sm:mb-20 flex flex-col items-center text-center">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.3em] text-primary backdrop-blur">
              <span className="size-1.5 animate-pulse rounded-full bg-primary" />
              Our Services
            </p>
            <h2 className="max-w-3xl text-balance text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-card-foreground">
              Complete pest protection, for every environment.
            </h2>
            <p className="mt-4 max-w-2xl text-pretty text-base sm:text-lg text-muted-foreground">
              Explore our specialized treatments delivered by certified technicians across homes,
              commercial spaces, and industrial facilities in Chennai.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {SERVICES.map(({ icon: Icon, title, desc, image, tag }, i) => (
            <Reveal key={title} delay={(i % 4) * 100}>
              <div className="card-lift group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl sm:rounded-[2rem] border border-border bg-background/50 p-5 sm:p-6 transition-all duration-300 hover:border-primary/40 hover:bg-card">
                <div className="pointer-events-none absolute -right-16 -top-16 size-40 rounded-full bg-primary/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:animate-pulse group-hover:opacity-100" />
                <div>
                  <div className="relative mb-5 h-44 w-full overflow-hidden rounded-xl sm:rounded-2xl bg-muted">
                    <img
                      src={image}
                      alt={`${title} in Chennai`}
                      width={800}
                      height={534}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/60 px-3 py-1 text-[11px] font-medium text-white shadow-sm backdrop-blur-md">
                      <Icon className="size-3 text-primary-light" />
                      <span>{tag}</span>
                    </span>
                  </div>
                  <h3 className="mb-2 text-base sm:text-lg font-bold tracking-tight text-card-foreground transition-colors group-hover:text-primary">
                    {title}
                  </h3>
                  <p className="mb-6 text-sm leading-relaxed text-muted-foreground">{desc}</p>
                </div>
                <a
                  href="#contact"
                  className="mt-auto inline-flex items-center gap-2 font-mono text-xs font-semibold tracking-wide text-primary opacity-80 transition-all hover:opacity-100 group-hover:gap-3 py-1"
                >
                  Book Service{" "}
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </a>
              </div>
            </Reveal>
          ))}

          {/* Work Gallery Card filling the side of Restro Bar */}
          <Reveal
            delay={100}
            className="col-span-1 sm:col-span-1 lg:col-span-2 xl:col-span-3 h-full"
          >
            <div className="card-lift group relative flex h-full min-h-[380px] flex-col justify-between overflow-hidden rounded-2xl sm:rounded-[2rem] border border-border bg-card p-6 sm:p-8 shadow-xl transition-all duration-300 hover:border-primary hover:shadow-2xl">
              {/* Right side background image with technician spraying */}
              <div className="pointer-events-none absolute inset-y-0 right-0 w-full sm:w-3/5 lg:w-1/2 overflow-hidden">
                <img
                  src="/services/spray-technician.webp"
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover object-right opacity-5 sm:opacity-100 dark:opacity-100 transition-transform duration-700 ease-out group-hover:scale-105"
                />
                {/* Gradient mask blending to card background */}
                <div className="absolute inset-0 bg-gradient-to-r from-card via-card/90 to-card/30 sm:to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent pointer-events-none" />
              </div>

              {/* Decorative aura & subtle grid lines */}
              <div className="pointer-events-none absolute -left-16 -top-16 size-48 rounded-full bg-primary/10 blur-3xl" />
              <div className="pointer-events-none absolute inset-0 grid-lines opacity-15" />

              <div className="relative z-10 flex flex-col justify-between h-full">
                <div>
                  {/* Badge */}
                  <div className="mb-3 sm:mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1.5 font-mono text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-primary backdrop-blur-md">
                    <Images className="size-3.5 text-primary" />
                    <span>Field Work Gallery</span>
                  </div>

                  {/* Heading */}
                  <h3 className="mb-2 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-card-foreground">
                    Real Treatment{" "}
                    <span className="text-primary font-black">Evidence &amp; Results</span>
                  </h3>

                  {/* Subtitle */}
                  <p className="mb-6 max-w-xl text-xs sm:text-sm leading-relaxed text-muted-foreground">
                    Browse verified site photos from our recent termite drillings, commercial
                    kitchen treatments, car anti-rat sprays, and industrial sanitizations across
                    Chennai.
                  </p>

                  {/* Thumbnail Row */}
                  <div className="mb-6 flex flex-wrap items-center gap-2.5 sm:gap-3">
                    {galleryData.images.slice(0, 6).map((img, idx) => {
                      return (
                        <button
                          key={img.id || idx}
                          type="button"
                          onClick={() => setGalleryOpen(true)}
                          className="group/thumb relative size-11 overflow-hidden rounded-xl border border-border/80 shadow-md transition-all duration-300 hover:scale-110 hover:border-primary/60 sm:size-14"
                          title={img.title}
                          aria-label={`Open work gallery photo: ${img.title}`}
                        >
                          <img
                            src={img.thumbnailUrl || img.url}
                            alt=""
                            loading="lazy"
                            onError={(e) => {
                              const el = e.currentTarget;
                              if (img.isDrive && el.dataset["fb"] !== "1") {
                                el.dataset["fb"] = "1";
                                el.src = img.url;
                              } else {
                                el.style.display = "none";
                              }
                            }}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover/thumb:scale-110"
                          />
                        </button>
                      );
                    })}
                    {galleryData.images.length > 6 && (
                      <button
                        type="button"
                        onClick={() => setGalleryOpen(true)}
                        className="flex size-11 cursor-pointer items-center justify-center rounded-xl border border-border bg-muted/60 font-mono text-xs font-bold text-muted-foreground transition-all hover:border-primary/60 hover:bg-primary/10 hover:text-primary sm:size-14"
                        title="View all photos"
                        aria-label={`View all ${galleryData.images.length} work gallery photos`}
                      >
                        +{galleryData.images.length - 6}
                      </button>
                    )}
                  </div>
                </div>

                {/* Bottom Bar: Verified count on left, View Work Gallery button on right */}
                <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-border/80">
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-muted-foreground">
                    <CheckCircle2 className="size-4 text-primary shrink-0" />
                    <span>{galleryData.images.length} verified project photos</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setGalleryOpen(true)}
                    className="group/btn sweep-on-hover relative inline-flex items-center gap-2.5 rounded-full border border-primary/40 bg-primary/10 px-6 py-2.5 font-mono text-xs sm:text-sm font-bold text-primary shadow-sm backdrop-blur transition-all duration-300 hover:border-primary hover:bg-primary hover:text-primary-foreground hover:shadow-lg active:scale-95"
                  >
                    <Images className="size-4 transition-transform group-hover/btn:scale-110" />
                    <span>View Work Gallery</span>
                    <span className="transition-transform group-hover/btn:translate-x-1">→</span>
                  </button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <WorkGalleryModal open={galleryOpen} onOpenChange={setGalleryOpen} />
      </div>
    </section>
  );
}
const HIGHLIGHTS = [
  "Certified Experts",
  "Eco-Friendly Chemicals",
  "Guaranteed Results",
  "Affordable Pricing",
  "Fast Response",
  "Safe for Children",
  "Modern Equipment",
  "Commercial Specialists",
  "13+ Years Experience",
];

function About() {
  return (
    <section id="about" className="relative py-16 sm:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-10 sm:gap-16 px-4 sm:px-6 lg:grid-cols-2">
        <Reveal>
          <div>
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.3em] text-primary">
              About Us
            </p>
            <h2 className="mb-6 sm:mb-8 text-3xl sm:text-4xl font-bold tracking-tight">
              A decade of protection, engineered for Chennai.
            </h2>
            <p className="mb-8 sm:mb-10 text-sm sm:text-base leading-relaxed text-muted-foreground">
              Global Elite Pest Management has been providing professional pest control services in
              Chennai since 2012. We specialize in termite treatment, cockroach control, mosquito
              control, rodent management, and car anti-rat treatment. Using safe, eco-friendly
              methods and advanced technology, we deliver reliable protection for residential and
              commercial properties across Ambattur and greater Chennai.
            </p>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {HIGHLIGHTS.map((h) => (
                <span
                  key={h}
                  className="group flex cursor-default items-center gap-2 rounded-full border border-border bg-background/50 px-3.5 py-1.5 sm:px-4 sm:py-2 text-[11px] sm:text-xs font-medium text-muted-foreground transition-all hover:border-primary/40 hover:bg-card hover:text-primary hover:shadow-lg hover:shadow-primary/5"
                >
                  <CheckCircle2 className="size-3 text-primary/70 transition-transform group-hover:scale-110 group-hover:text-primary" />
                  {h}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div className="grid gap-3 sm:gap-6 grid-cols-2">
            {[
              { to: 13, suffix: "+", label: "Years Experience" },
              { to: 5, suffix: "★", label: "Google Rating", decimals: 1 },
              { to: 14, suffix: "+", label: "Happy Reviews" },
              { to: 1000, suffix: "+", label: "Properties Protected" },
              { to: 98, suffix: "%", label: "Customer Retention" },
              { to: 30, suffix: "min", label: "Response Time" },
            ].map((s) => (
              <div
                key={s.label}
                className="card-lift group relative overflow-hidden rounded-2xl sm:rounded-[2rem] border border-border bg-background/50 p-4 sm:p-6 text-center hover:border-primary/40 hover:bg-card"
              >
                <div className="pointer-events-none absolute -inset-6 -z-10 bg-gradient-to-tr from-primary/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 blur-xl" />
                <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-primary transition-transform duration-300 group-hover:scale-110">
                  <Counter to={s.to} suffix={s.suffix} decimals={s.decimals ?? 0} />
                </div>
                <div className="mt-2 sm:mt-3 font-mono text-[11px] sm:text-[11px] uppercase tracking-wider sm:tracking-[0.2em] text-muted-foreground transition-colors group-hover:text-foreground">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const STEPS = [
  ["01", "Book Inspection", "Reach us via call, WhatsApp or form."],
  ["02", "Site Visit", "Our team arrives at your scheduled slot."],
  ["03", "Detailed Inspection", "We identify pest species, sources & risks."],
  ["04", "Professional Treatment", "Targeted, eco-friendly application."],
  ["05", "Quality Check", "Follow-up review to confirm results."],
  ["06", "After-Service Support", "Ongoing support & warranty backing."],
] as const;

function Process() {
  return (
    <section id="process" className="relative border-y border-border bg-background py-16 sm:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10 grid-lines opacity-60" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="mb-10 sm:mb-16 max-w-2xl">
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.3em] text-primary">
              How It Works
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              A seamless 6-step pest control process.
            </h2>
          </div>
        </Reveal>
        <div className="grid gap-5 sm:gap-12 md:grid-cols-2 lg:grid-cols-3">
          {STEPS.map(([number, title, description], i) => (
            <Reveal key={number} delay={(i % 3) * 120}>
              <div className="card-lift group relative h-full overflow-hidden rounded-2xl sm:rounded-[2rem] border border-border bg-background/50 p-6 sm:p-8 hover:border-primary/40 hover:bg-card">
                <div className="pointer-events-none absolute -right-16 -top-16 size-40 rounded-full bg-primary/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:animate-pulse group-hover:opacity-100" />
                <span className="absolute top-4 right-6 font-mono text-5xl sm:text-6xl font-black text-primary/15 sm:text-primary/20 transition-colors group-hover:text-primary/30">
                  {number}
                </span>
                <div className="relative mt-2 sm:mt-4">
                  <h3 className="mb-2 sm:mb-4 text-base sm:text-lg font-bold text-card-foreground transition-colors group-hover:text-primary">
                    {title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function AreasServed() {
  return (
    <section id="areas" className="relative overflow-hidden py-16 sm:py-32">
      <div className="pointer-events-none absolute inset-x-0 -top-40 -z-10 h-[42rem] aurora opacity-20" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <Reveal>
            <div>
              <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.3em] text-primary">
                Areas We Serve
              </p>
              <h2 className="mb-5 sm:mb-6 text-3xl sm:text-4xl font-bold tracking-tight">
                Pest control in Ambattur and across Chennai.
              </h2>
              <p className="mb-6 sm:mb-8 text-sm sm:text-base leading-relaxed text-muted-foreground">
                From independent houses and apartments in Ambattur to offices on OMR, factories in
                Sriperumbudur and hotels in T. Nagar — our technicians cover every neighbourhood in
                Chennai with same-day inspection slots and free follow-up visits.
              </p>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {AREAS_SERVED.map((area) => (
                  <span
                    key={area}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/60 px-3.5 py-1.5 text-[11px] sm:text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:bg-card hover:text-primary"
                  >
                    <MapPin className="size-3 shrink-0 text-primary/70" aria-hidden="true" />
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="card-lift relative overflow-hidden rounded-2xl sm:rounded-[2rem] border border-border bg-card p-6 sm:p-8 shadow-xl">
              <div className="pointer-events-none absolute -right-16 -top-16 size-40 rounded-full bg-primary/10 blur-2xl" />
              <h3 className="mb-4 text-lg sm:text-xl font-bold text-card-foreground">
                Need a technician near you?
              </h3>
              <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                Tell us your locality and pest problem — we'll match you with the nearest certified
                team and share a no-obligation quote within 24 hours.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href="#contact"
                  className="sweep-on-hover relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-lg"
                >
                  Book Free Inspection
                </a>
                <a
                  href={`tel:${PHONE}`}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold transition-all hover:border-primary/40 hover:bg-primary/5"
                >
                  <PhoneCall className="size-4 text-primary" aria-hidden="true" />
                  {PHONE_DISPLAY}
                </a>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-3 border-t border-border pt-5 text-[11px] sm:text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Sparkles className="size-3.5 shrink-0 text-accent" aria-hidden="true" />
                  Free site inspection
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="size-3.5 shrink-0 text-primary" aria-hidden="true" />
                  30-minute response
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

const REVIEWS = [
  [
    "Excellent termite treatment. The team was professional, punctual and thorough. Highly recommend!",
    "Karthik R.",
  ],
  [
    "Best pest control in Ambattur. Solved our cockroach problem in one visit. Very safe for kids.",
    "Priya S.",
  ],
  [
    "Rat problem in my car — fixed completely. Their herbal spray really works. 5 stars!",
    "Ravi Kumar",
  ],
  [
    "13 years of trust. My family has been using their service since 2015. Never disappointed.",
    "Anitha M.",
  ],
  [
    "Highly professional team, eco-friendly chemicals, and reasonable pricing. Truly elite service.",
    "Suresh V.",
  ],
  ["The mosquito treatment made a huge difference. Follow-up support was excellent.", "Deepa L."],
] as const;

function Testimonials() {
  return (
    <section id="testimonials" className="overflow-hidden py-16 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="mb-10 sm:mb-16 max-w-2xl">
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.3em] text-primary">
              {GOOGLE_REVIEWS_URL ? (
                <a
                  href={GOOGLE_REVIEWS_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-primary-light"
                >
                  5.0 · 14 Google Reviews →
                </a>
              ) : (
                "5.0 · 14 Google Reviews"
              )}
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Loved by customers across Chennai.
            </h2>
          </div>
        </Reveal>
        <div className="grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {REVIEWS.map(([quote, name], i) => (
            <Reveal key={name} delay={(i % 3) * 100}>
              <figure className="card-lift group relative flex h-full flex-col overflow-hidden rounded-2xl sm:rounded-[2rem] border border-border bg-background/50 p-6 sm:p-8 hover:border-primary/40 hover:bg-card">
                <div className="pointer-events-none absolute -right-16 -top-16 size-40 rounded-full bg-primary/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:animate-pulse group-hover:opacity-100" />
                <Quote className="absolute -right-4 -top-4 size-20 sm:size-24 text-primary/5 transition-transform duration-500 group-hover:-rotate-12 group-hover:scale-110 group-hover:text-primary/10" />
                <div className="relative flex h-full flex-col">
                  <div className="mb-3 sm:mb-4 flex gap-1 text-accent">
                    <Star className="size-3.5 sm:size-4 fill-current" />
                    <Star className="size-3.5 sm:size-4 fill-current" />
                    <Star className="size-3.5 sm:size-4 fill-current" />
                    <Star className="size-3.5 sm:size-4 fill-current" />
                    <Star className="size-3.5 sm:size-4 fill-current" />
                  </div>
                  <blockquote className="mb-6 sm:mb-8 text-sm leading-relaxed text-muted-foreground">
                    "{quote}"
                  </blockquote>
                  <figcaption className="mt-auto flex items-center gap-3">
                    <span className="flex size-9 sm:size-10 items-center justify-center rounded-full bg-primary/10 font-bold text-primary ring-2 ring-transparent transition-all group-hover:bg-primary/20 group-hover:ring-primary/30 text-sm">
                      {name.charAt(0)}
                    </span>
                    <span>
                      <span className="block text-sm font-bold text-card-foreground">{name}</span>
                      <span className="block font-mono text-[11px] uppercase tracking-widest text-muted-foreground transition-colors group-hover:text-primary/70">
                        {GOOGLE_REVIEWS_URL ? (
                          <a
                            href={GOOGLE_REVIEWS_URL}
                            target="_blank"
                            rel="noreferrer"
                            className="hover:text-primary"
                          >
                            Google Review
                          </a>
                        ) : (
                          "Google Review"
                        )}
                      </span>
                    </span>
                  </figcaption>
                </div>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const FAQS = [
  [
    "What pests do you control?",
    "We handle termites, cockroaches, mosquitoes, rats, bed bugs, ants, and lizards — for both residential and commercial properties across Chennai.",
  ],
  [
    "How long does treatment take?",
    "Most residential treatments are completed within 1–3 hours. Larger commercial and industrial sites are scheduled around your operating hours.",
  ],
  [
    "Are the chemicals safe?",
    "Yes. We use eco-friendly, government-approved formulations that are safe for children, pets and food areas when applied by our certified technicians.",
  ],
  [
    "Do you offer a warranty?",
    "All major treatments come with a service warranty and free follow-up visits within the covered period.",
  ],
  [
    "How much does pest control cost?",
    "Pricing depends on property size, pest type and severity. Book a free inspection and we'll share a no-obligation quote within 24 hours.",
  ],
  [
    "Do you offer same-day pest control in Chennai?",
    "Yes — same-day inspection and treatment slots are available across Chennai, subject to technician availability. Call or WhatsApp us to confirm the earliest visit.",
  ],
  [
    "Which areas in Chennai do you serve?",
    "We cover Ambattur, Anna Nagar, Mogappair, Avadi, Porur, Adyar, Velachery, T. Nagar, Guindy, OMR, Chromepet, Tambaram, Sriperumbudur, Koyambedu, Mylapore and the rest of Chennai.",
  ],
  [
    "How often should pest control be done?",
    "Most homes benefit from a quarterly or half-yearly schedule. Restaurants, hospitals and factories usually need monthly or bi-monthly contracts to stay audit-ready.",
  ],
] as const;

function Faq() {
  return (
    <section id="faq" className="border-y border-border bg-card py-16 sm:py-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Reveal>
          <div className="mb-8 sm:mb-12 text-center">
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.3em] text-primary">
              FAQ
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-card-foreground">
              Pest control questions, answered.
            </h2>
          </div>
        </Reveal>
        <div className="space-y-3 sm:space-y-4">
          {FAQS.map(([q, a], i) => (
            <Reveal key={q} delay={i * 70}>
              <details className="group rounded-2xl sm:rounded-[2rem] border border-border bg-background/50 p-4 sm:p-6 transition-all hover:border-primary/40 hover:bg-card hover:shadow-lg hover:shadow-primary/5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 sm:gap-6 text-sm sm:text-base font-bold text-card-foreground">
                  <span>{q}</span>
                  <span className="flex size-7 sm:size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform duration-500 group-hover:bg-primary/20 group-open:rotate-180">
                    <ChevronDown className="size-3.5 sm:size-4" />
                  </span>
                </summary>
                <p className="mt-3 sm:mt-4 text-xs sm:text-sm leading-relaxed text-muted-foreground animate-reveal">
                  {a}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

type FormStatus = "idle" | "sending" | "success" | "error";

const EMPTY_FORM = {
  name: "",
  phone: "",
  email: "",
  location: "",
  service: SERVICES[0]!.title,
  message: "",
  company: "",
};

function Contact() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [feedback, setFeedback] = useState("");
  const [form, setForm] = useState(EMPTY_FORM);

  const update = (key: keyof typeof EMPTY_FORM) => (e: { target: { value: string } }) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setFeedback("");
    try {
      const res = await sendInquiry({ data: { ...form } });
      if (res.ok) {
        setStatus("success");
        setFeedback(res.message);
        setForm({ ...EMPTY_FORM });
      } else {
        setStatus("error");
        setFeedback(res.message);
      }
    } catch (error) {
      console.error("Contact form submission failed:", error);
      setStatus("error");
      setFeedback(
        `Something went wrong — please call ${PHONE_DISPLAY} or chat with us on WhatsApp.`,
      );
    }
  }

  const inputClass =
    "w-full rounded-lg border-none bg-secondary px-4 py-3 text-sm transition-all focus:ring-2 focus:ring-primary/30";
  const labelClass = "mb-2 block font-mono text-[11px] uppercase text-muted-foreground";

  return (
    <section id="contact" className="relative py-16 sm:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-96 aurora opacity-40" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-10 lg:gap-16 lg:grid-cols-2">
          <Reveal>
            <div>
              <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.3em] text-primary">
                Get in touch
              </p>
              <h2 className="mb-4 sm:mb-6 text-3xl sm:text-4xl font-bold tracking-tight">
                Book your free pest inspection in Chennai.
              </h2>
              <p className="mb-8 sm:mb-10 text-sm sm:text-base text-muted-foreground">
                Get an on-site assessment and a no-obligation quote within 24 hours.
              </p>

              <div className="mb-8 sm:mb-10 grid gap-3 sm:gap-4 sm:grid-cols-2">
                <a
                  href={`tel:${PHONE}`}
                  className="card-lift group rounded-2xl sm:rounded-[2rem] border border-border bg-background/50 p-4 sm:p-6 hover:border-primary/40 hover:bg-card"
                >
                  <div className="mb-3 sm:mb-4 inline-flex size-10 sm:size-12 items-center justify-center rounded-xl sm:rounded-2xl bg-primary/10 text-primary transition-transform group-hover:scale-110 group-hover:bg-primary/20">
                    <PhoneCall className="size-4 sm:size-5" aria-hidden="true" />
                  </div>
                  <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                    Call Us
                  </div>
                  <div className="mt-1 sm:mt-2 text-sm sm:text-base font-bold text-card-foreground group-hover:text-primary transition-colors">
                    {PHONE_DISPLAY}
                  </div>
                </a>
                <a
                  href={WHATSAPP}
                  target="_blank"
                  rel="noreferrer"
                  className="card-lift group rounded-2xl sm:rounded-[2rem] border border-border bg-background/50 p-4 sm:p-6 hover:border-[#25D366]/40 hover:bg-card"
                >
                  <div className="mb-3 sm:mb-4 inline-flex size-10 sm:size-12 items-center justify-center rounded-xl sm:rounded-2xl bg-[#25D366]/10 text-[#25D366] transition-transform group-hover:scale-110 group-hover:bg-[#25D366]/20">
                    <WhatsAppIcon className="size-5 sm:size-6 fill-current" aria-hidden="true" />
                  </div>
                  <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                    WhatsApp
                  </div>
                  <div className="mt-1 sm:mt-2 text-sm sm:text-base font-bold text-card-foreground group-hover:text-[#25D366] transition-colors">
                    Chat with us now
                  </div>
                </a>
              </div>

              <div>
                <div className="mb-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                  Address
                </div>
                <address className="not-italic text-sm leading-relaxed text-foreground/80">
                  {ADDRESS_LINES[0]}
                  <br />
                  {ADDRESS_LINES[1]}
                  <br />
                  {ADDRESS_LINES[2]}
                </address>
                <div className="mt-6 overflow-hidden rounded-2xl border border-border ring-1 ring-border">
                  <iframe
                    title="Global Elite Pest Management office location — Ambattur, Chennai"
                    src="https://www.google.com/maps?q=Tiruvalluvar%20Street%2C%20Lenin%20Nagar%2C%20Ambattur%2C%20Chennai%20600053&output=embed"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="h-52 w-full border-0 sm:h-60"
                  />
                </div>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Tiruvalluvar+Street,+Lenin+Nagar,+Ambattur,+Chennai+600053"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
                >
                  <MapPin className="size-3.5" aria-hidden="true" />
                  Get directions
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="rounded-2xl sm:rounded-3xl bg-card p-5 sm:p-10 shadow-xl ring-1 ring-border">
              <form className="relative grid grid-cols-2 gap-4 sm:gap-6" onSubmit={handleSubmit}>
                {/* Honeypot — hidden from humans, tempting for bots */}
                <div
                  aria-hidden="true"
                  className="absolute -left-[9999px] h-px w-px overflow-hidden"
                >
                  <label htmlFor="contact-company">Company</label>
                  <input
                    id="contact-company"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={form.company}
                    onChange={update("company")}
                  />
                </div>

                <div className="col-span-2 md:col-span-1">
                  <label htmlFor="contact-name" className={labelClass}>
                    Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    minLength={2}
                    autoComplete="name"
                    className={inputClass}
                    placeholder="Your name"
                    value={form.name}
                    onChange={update("name")}
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label htmlFor="contact-phone" className={labelClass}>
                    Phone
                  </label>
                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    required
                    inputMode="tel"
                    autoComplete="tel"
                    className={inputClass}
                    placeholder="+91 98765 43210"
                    value={form.phone}
                    onChange={update("phone")}
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label htmlFor="contact-email" className={labelClass}>
                    Email (for confirmation)
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className={inputClass}
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={update("email")}
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label htmlFor="contact-location" className={labelClass}>
                    Location
                  </label>
                  <input
                    id="contact-location"
                    name="location"
                    type="text"
                    autoComplete="address-level2"
                    className={inputClass}
                    placeholder="Ambattur, Chennai"
                    value={form.location}
                    onChange={update("location")}
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label htmlFor="contact-service" className={labelClass}>
                    Service Required
                  </label>
                  <select
                    id="contact-service"
                    name="service"
                    className={`${inputClass} text-foreground`}
                    value={form.service}
                    onChange={update("service")}
                  >
                    {SERVICES.map(({ title }) => (
                      <option key={title}>{title}</option>
                    ))}
                  </select>
                </div>
                <div className="col-span-2">
                  <label htmlFor="contact-message" className={labelClass}>
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    maxLength={2000}
                    className={inputClass}
                    placeholder="Tell us about the pest issue"
                    value={form.message}
                    onChange={update("message")}
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="sweep-on-hover relative col-span-2 overflow-hidden rounded-xl bg-primary py-3.5 sm:py-4 font-bold text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {status === "sending" ? "Sending…" : "Submit"}
                </button>

                <div className="col-span-2" role="status" aria-live="polite">
                  {feedback ? (
                    <p
                      className={`flex items-start justify-center gap-2 rounded-xl px-4 py-3 text-xs sm:text-sm font-medium ${
                        status === "success"
                          ? "bg-primary/10 text-primary"
                          : "bg-destructive/10 text-destructive"
                      }`}
                    >
                      {status === "success" && (
                        <CheckCircle2 className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                      )}
                      {feedback}
                    </p>
                  ) : (
                    <p className="text-center text-xs text-muted-foreground">
                      We respond within 30 minutes during business hours.
                    </p>
                  )}
                </div>
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

const FOOTER_SERVICES = [
  "Termite Control",
  "Cockroach Control",
  "Mosquito Treatment",
  "Rat Control",
  "Car Anti-Rat Spray",
  "Restaurant Pest Control",
] as const;

function Footer() {
  return (
    <footer className="border-t border-border bg-background pb-28 pt-10 sm:pb-14 sm:pt-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Logo />
            <p className="mt-4 max-w-xs text-xs leading-relaxed text-muted-foreground">
              Professional, eco-friendly pest control for homes, offices, factories, hotels and
              hospitals across Chennai since 2012.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <a
                href={`tel:${PHONE}`}
                className="rounded-full border border-border px-4 py-2 text-xs font-semibold text-primary transition-colors hover:border-primary/40 hover:bg-primary/5"
              >
                {PHONE_DISPLAY}
              </a>
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-[#25D366]/30 bg-[#25D366]/10 px-4 py-2 text-xs font-semibold text-[#25D366] transition-colors hover:bg-[#25D366]/20"
              >
                WhatsApp
              </a>
            </div>
          </div>

          <nav aria-label="Popular services">
            <h2 className="mb-3 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              Services
            </h2>
            <ul className="space-y-2">
              {FOOTER_SERVICES.map((title) => (
                <li key={title}>
                  <a
                    href="#services"
                    className="text-xs text-foreground/70 transition-colors hover:text-primary"
                  >
                    {title} in Chennai
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Areas we serve">
            <h2 className="mb-3 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              Areas We Serve
            </h2>
            <ul className="space-y-2">
              {AREAS_SERVED.slice(0, 8).map((area) => (
                <li key={area}>
                  <a
                    href="#areas"
                    className="text-xs text-foreground/70 transition-colors hover:text-primary"
                  >
                    Pest Control {area}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="mb-3 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              Contact
            </h2>
            <address className="not-italic text-xs leading-relaxed text-foreground/70">
              {ADDRESS_LINES.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
            <p className="mt-3 text-xs text-foreground/70">Mon–Sat · 9:00 AM – 8:00 PM</p>
            <a
              href={`tel:${PHONE}`}
              className="mt-2 block text-xs font-semibold text-primary hover:underline"
            >
              {PHONE_DISPLAY}
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-center md:flex-row md:text-left">
          <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            © {new Date().getFullYear()} {SITE_NAME} — Ambattur, Chennai
          </p>
          <p className="text-[11px] text-muted-foreground">
            Serving Ambattur, Anna Nagar, Porur, OMR, Tambaram & all of Chennai
          </p>
        </div>
      </div>
    </footer>
  );
}

function FloatingWhatsApp() {
  return (
    <a
      href={WHATSAPP}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-24 right-5 z-50 flex size-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-[#25D366]/30 transition-all hover:-translate-y-2 hover:scale-110 hover:shadow-2xl hover:shadow-[#25D366]/50 active:scale-95 sm:bottom-6 sm:right-6 sm:size-14"
      aria-label="Chat on WhatsApp"
    >
      <WhatsAppIcon className="size-6 fill-white sm:size-7" />
    </a>
  );
}

function MobileActionBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 backdrop-blur-xl md:hidden">
      <div className="mx-auto grid max-w-7xl grid-cols-3 gap-2 px-3 py-2.5">
        <a
          href={`tel:${PHONE}`}
          className="inline-flex items-center justify-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 py-3 text-xs font-bold text-primary"
        >
          <PhoneCall className="size-3.5" aria-hidden="true" />
          Call
        </a>
        <a
          href={WHATSAPP}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center gap-1.5 rounded-full border border-[#25D366]/30 bg-[#25D366]/10 py-3 text-xs font-bold text-[#25D366]"
        >
          <WhatsAppIcon className="size-3.5 fill-current" aria-hidden="true" />
          WhatsApp
        </a>
        <a
          href="#contact"
          className="inline-flex items-center justify-center rounded-full bg-primary py-3 text-xs font-bold text-primary-foreground"
        >
          Book Free
        </a>
      </div>
    </div>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground selection:bg-primary/10 selection:text-primary">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-primary focus:px-5 focus:py-3 focus:text-sm focus:font-bold focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main" tabIndex={-1}>
        <Hero />
        <TrustStrip />
        <Marquee />
        <Services />
        <About />
        <Process />
        <AreasServed />
        <Testimonials />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <MobileActionBar />
    </div>
  );
}
