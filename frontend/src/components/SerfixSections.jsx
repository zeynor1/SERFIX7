import { CheckCircle2, DoorOpen, Hammer, Mail, MapPin, PaintRoller, PhoneCall, PlugZap, ShieldCheck, Wrench } from "lucide-react";
import { BRAND_IMAGES, BENEFITS, CONTACT, SERVICES } from "@/data/serfixContent";

const iconMap = {
  appliance: PlugZap,
  drywall: PaintRoller,
  doors: DoorOpen,
  maintenance: Hammer,
};

export const ServicesSection = () => {
  return (
    <section id="services" className="bg-zinc-50 px-4 py-20 text-zinc-950 sm:px-6 lg:px-8 lg:py-24" data-testid="services-section">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="section-kicker" data-testid="services-kicker">Services</p>
            <h2 className="mt-4 font-display text-4xl font-bold uppercase leading-none tracking-tight sm:text-5xl" data-testid="services-heading">
              Practical handyman help for home and business.
            </h2>
          </div>
          <p className="text-base leading-relaxed text-zinc-600 sm:text-lg lg:col-span-5" data-testid="services-description">
            From one-hour fixes to larger punch lists, SERFIX focuses on dependable work, clean communication, and results that make daily life easier.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-4" data-testid="services-grid">
          {SERVICES.map((service, index) => {
            const Icon = iconMap[service.id] || Wrench;
            const spanClass = index === 0 || index === 3 ? "md:col-span-2" : "md:col-span-1";
            return (
              <article
                key={service.id}
                className={`service-card ${spanClass}`}
                data-testid={`service-card-${service.id}`}
              >
                <div className="flex items-start justify-between gap-6">
                  <Icon className="h-12 w-12 text-yellow-500" strokeWidth={3} data-testid={`service-icon-${service.id}`} />
                  <span className="font-display text-4xl font-bold text-zinc-200" data-testid={`service-number-${service.id}`}>
                    0{index + 1}
                  </span>
                </div>
                <h3 className="mt-8 font-display text-2xl font-bold uppercase leading-tight sm:text-3xl" data-testid={`service-title-${service.id}`}>
                  {service.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-zinc-700" data-testid={`service-short-${service.id}`}>
                  {service.short}
                </p>
                <p className="mt-4 border-t-2 border-zinc-950 pt-4 text-sm font-medium text-zinc-500" data-testid={`service-detail-${service.id}`}>
                  {service.detail}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export const TrustSection = () => {
  return (
    <section id="about" className="relative overflow-hidden bg-zinc-900 px-4 py-20 text-zinc-50 sm:px-6 lg:px-8 lg:py-24" data-testid="trust-section">
      <img
        src={BRAND_IMAGES.regina}
        alt="Regina Saskatchewan city architecture"
        className="absolute inset-0 h-full w-full object-cover opacity-20"
        data-testid="trust-background-image"
      />
      <div className="absolute inset-0 bg-zinc-950/78" />
      <div className="industrial-grid absolute inset-0 opacity-15" />

      <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-7">
          <p className="section-kicker text-yellow-400" data-testid="trust-kicker">Local | Reliable | Trusted</p>
          <h2 className="mt-4 max-w-3xl font-display text-4xl font-bold uppercase leading-none tracking-tight sm:text-5xl" data-testid="trust-heading">
            A Regina handyman service built around straight answers and solid work.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-300 sm:text-lg" data-testid="trust-description">
            SERFIX handles the small stuff before it becomes a big headache — with clear scheduling, practical pricing, and friendly local service.
          </p>

          <div className="mt-10 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2" data-testid="benefits-grid">
            {BENEFITS.map((benefit) => (
              <div key={benefit} className="flex items-center gap-3 border-2 border-zinc-700 bg-zinc-950/70 p-4" data-testid={`benefit-item-${benefit.toLowerCase().replaceAll(" ", "-").replaceAll("&", "and")}`}>
                <CheckCircle2 className="h-6 w-6 text-yellow-400" strokeWidth={3} data-testid={`benefit-icon-${benefit.toLowerCase().replaceAll(" ", "-").replaceAll("&", "and")}`} />
                <span className="font-bold uppercase tracking-wide" data-testid={`benefit-text-${benefit.toLowerCase().replaceAll(" ", "-").replaceAll("&", "and")}`}>
                  {benefit}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5" data-testid="trust-card-wrap">
          <div className="border-2 border-yellow-400 bg-zinc-950 p-6 shadow-[12px_12px_0px_0px_rgba(250,204,21,0.22)]" data-testid="trust-card">
            <ShieldCheck className="h-14 w-14 text-yellow-400" strokeWidth={3} data-testid="trust-card-icon" />
            <p className="mt-8 font-display text-5xl font-bold uppercase leading-none" data-testid="trust-card-title">
              You can trust your local service.
            </p>
            <div className="mt-8 space-y-4 border-t-2 border-zinc-800 pt-6" data-testid="trust-contact-list">
              <a href={CONTACT.phoneHref} className="contact-strip" data-testid="trust-phone-link">
                <PhoneCall className="h-5 w-5" strokeWidth={3} />
                <span data-testid="trust-phone-text">{CONTACT.phoneDisplay}</span>
              </a>
              <a href={CONTACT.mailHref} className="contact-strip" data-testid="trust-email-link">
                <Mail className="h-5 w-5" strokeWidth={3} />
                <span data-testid="trust-email-text">{CONTACT.email}</span>
              </a>
              <div className="contact-strip" data-testid="trust-location-item">
                <MapPin className="h-5 w-5" strokeWidth={3} />
                <span data-testid="trust-location-text">Proudly serving Regina</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const FooterSection = () => {
  return (
    <footer className="border-t border-zinc-900 bg-zinc-950 px-4 py-12 text-zinc-400 sm:px-6 lg:px-8" data-testid="footer-section">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3">
        <div data-testid="footer-brand-block">
          <p className="font-display text-3xl font-bold uppercase text-zinc-50" data-testid="footer-brand-name">
            SER<span className="text-yellow-400">FIX</span>
          </p>
          <p className="mt-2 text-sm uppercase tracking-[0.22em]" data-testid="footer-brand-tagline">Service Limited</p>
        </div>
        <div data-testid="footer-service-area-block">
          <p className="font-bold uppercase text-zinc-50" data-testid="footer-service-area-title">Service area</p>
          <p className="mt-2" data-testid="footer-service-area-text">Regina, Saskatchewan</p>
        </div>
        <div className="space-y-2 md:text-right" data-testid="footer-contact-block">
          <a href={CONTACT.phoneHref} className="block font-bold text-zinc-50 transition-colors duration-200 hover:text-yellow-400" data-testid="footer-phone-link">
            {CONTACT.phoneDisplay}
          </a>
          <a href={CONTACT.mailHref} className="block transition-colors duration-200 hover:text-yellow-400" data-testid="footer-email-link">
            {CONTACT.email}
          </a>
        </div>
      </div>
    </footer>
  );
};