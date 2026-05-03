import { CalendarCheck, Mail, MapPin, PhoneCall, ShieldCheck, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BRAND_IMAGES, CONTACT } from "@/data/serfixContent";

const stats = [
  { label: "Local", value: "Regina", testId: "hero-stat-local" },
  { label: "Reliable", value: "On time", testId: "hero-stat-reliable" },
  { label: "Trusted", value: "Quality work", testId: "hero-stat-trusted" },
];

export const SerfixHero = () => {
  return (
    <section id="top" className="relative overflow-hidden bg-zinc-950 text-zinc-50" data-testid="hero-section">
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(250,204,21,0.16)_0%,transparent_30%,transparent_72%,rgba(250,204,21,0.12)_100%)]" />
      <div className="industrial-grid absolute inset-0 opacity-25" />

      <div className="relative mx-auto grid min-h-[86vh] max-w-7xl grid-cols-1 items-center gap-12 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-12 lg:px-8">
        <div className="animate-rise lg:col-span-6">
          <div className="mb-7 inline-flex items-center gap-3 border-2 border-yellow-400 bg-zinc-900 px-4 py-3 text-xs font-bold uppercase tracking-[0.22em] text-yellow-300" data-testid="hero-location-badge">
            <MapPin className="h-4 w-4" strokeWidth={3} />
            Proudly serving {CONTACT.location}
          </div>

          <h1 className="max-w-4xl font-display text-5xl font-bold uppercase leading-[0.92] tracking-tight text-white sm:text-6xl md:text-7xl" data-testid="hero-heading">
            Fixing the small stuff. <span className="block text-yellow-400">Making a big difference.</span>
          </h1>

          <p className="mt-7 max-w-2xl text-base leading-relaxed text-zinc-300 sm:text-lg" data-testid="hero-subheading">
            SERFIX Service Limited provides reliable handyman services for homes and businesses in Regina — appliance repair, drywall, painting, doors, fixtures, and general maintenance.
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row" data-testid="hero-cta-group">
            <Button
              asChild
              className="h-14 rounded-none border-2 border-yellow-400 bg-yellow-400 px-7 font-display text-base font-bold uppercase tracking-wide text-zinc-950 shadow-[6px_6px_0px_0px_rgba(250,204,21,0.22)] transition-[transform,background-color] duration-200 hover:-translate-y-1 hover:bg-yellow-300"
              data-testid="hero-call-button"
            >
              <a href={CONTACT.phoneHref} data-testid="hero-call-link">
                <PhoneCall className="h-5 w-5" strokeWidth={3} />
                Call {CONTACT.phoneDisplay}
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-14 rounded-none border-2 border-zinc-50 bg-transparent px-7 font-display text-base font-bold uppercase tracking-wide text-zinc-50 transition-[transform,background-color,color] duration-200 hover:-translate-y-1 hover:bg-zinc-50 hover:text-zinc-950"
              data-testid="hero-form-button"
            >
              <a href="#contact" data-testid="hero-form-link">
                <CalendarCheck className="h-5 w-5" strokeWidth={3} />
                Book today
              </a>
            </Button>
          </div>

          <div className="mt-9 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3" data-testid="hero-stats-grid">
            {stats.map((stat) => (
              <div key={stat.testId} className="border border-zinc-700 bg-zinc-900/70 p-4" data-testid={stat.testId}>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-zinc-500" data-testid={`${stat.testId}-label`}>
                  {stat.label}
                </p>
                <p className="mt-1 font-display text-2xl font-bold uppercase text-zinc-50" data-testid={`${stat.testId}-value`}>
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="animate-rise-delay relative lg:col-span-6" data-testid="hero-visual-wrap">
          <div className="absolute -left-4 -top-4 h-28 w-28 border-2 border-yellow-400 bg-yellow-400/20" />
          <div className="relative border-2 border-yellow-400 bg-zinc-900 p-3 shadow-[16px_16px_0px_0px_rgba(250,204,21,0.22)]">
            <img
              src={BRAND_IMAGES.servicePoster}
              alt="SERFIX Service Limited handyman services poster"
              className="aspect-[16/10] w-full bg-zinc-950 object-contain object-center"
              data-testid="hero-brand-image"
            />
          </div>
          <div className="absolute -bottom-6 left-6 right-6 grid grid-cols-2 border-2 border-zinc-950 bg-zinc-50 text-zinc-950 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.7)] sm:left-auto sm:right-4 sm:w-[330px]" data-testid="hero-contact-card">
            <a href={CONTACT.mailHref} className="flex items-center gap-2 border-r-2 border-zinc-950 p-4 font-bold transition-colors duration-200 hover:bg-yellow-300" data-testid="hero-email-link">
              <Mail className="h-4 w-4" strokeWidth={3} /> Email
            </a>
            <a href="#services" className="flex items-center gap-2 p-4 font-bold transition-colors duration-200 hover:bg-yellow-300" data-testid="hero-services-link">
              <Wrench className="h-4 w-4" strokeWidth={3} /> Services
            </a>
          </div>
          <div className="absolute -right-3 top-10 hidden border-2 border-zinc-50 bg-zinc-950 px-4 py-3 text-xs font-black uppercase tracking-[0.2em] text-yellow-400 lg:flex" data-testid="hero-trust-stamp">
            <ShieldCheck className="mr-2 h-4 w-4" strokeWidth={3} /> Local | Reliable | Trusted
          </div>
        </div>
      </div>
    </section>
  );
};