import { Hammer, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CONTACT, NAV_ITEMS } from "@/data/serfixContent";

export const SerfixHeader = () => {
  return (
    <header
      className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/95 text-zinc-50 backdrop-blur-md"
      data-testid="site-header"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <a
          href="#top"
          className="group flex items-center gap-3"
          data-testid="header-brand-link"
          aria-label="SERFIX Service Limited home"
        >
          <span className="grid h-11 w-11 place-items-center border-2 border-yellow-400 bg-zinc-950 text-yellow-400 transition-transform duration-200 group-hover:-translate-y-0.5">
            <Hammer className="h-6 w-6" strokeWidth={3} />
          </span>
          <span className="leading-none">
            <span className="block font-display text-2xl font-bold tracking-tight" data-testid="header-brand-name">
              SER<span className="text-yellow-400">FIX</span>
            </span>
            <span className="block text-[10px] font-semibold uppercase tracking-[0.28em] text-zinc-400" data-testid="header-brand-tagline">
              Service Limited
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation" data-testid="header-navigation">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-bold uppercase tracking-[0.18em] text-zinc-300 transition-colors duration-200 hover:text-yellow-400"
              data-testid={item.testId}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <Button
          asChild
          className="hidden rounded-none border-2 border-yellow-400 bg-yellow-400 px-5 font-display text-sm font-bold uppercase tracking-wide text-zinc-950 shadow-[4px_4px_0px_0px_rgba(250,204,21,0.18)] transition-[transform,background-color] duration-200 hover:-translate-y-0.5 hover:bg-yellow-300 sm:inline-flex"
          data-testid="header-call-button"
        >
          <a href={CONTACT.phoneHref} data-testid="header-call-link">
            <PhoneCall className="h-4 w-4" strokeWidth={3} />
            {CONTACT.phoneDisplay}
          </a>
        </Button>
      </div>
    </header>
  );
};