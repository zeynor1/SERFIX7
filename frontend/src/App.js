import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { SerfixHeader } from "@/components/SerfixHeader";
import { SerfixHero } from "@/components/SerfixHero";
import { ContactSection } from "@/components/SerfixContact";
import { FooterSection, ServicesSection, TrustSection } from "@/components/SerfixSections";

const Home = () => {
  return (
    <main className="min-h-screen overflow-x-hidden bg-zinc-50" data-testid="serfix-home-page">
      <SerfixHeader />
      <SerfixHero />
      <ServicesSection />
      <TrustSection />
      <ContactSection />
      <FooterSection />
      <Toaster richColors position="top-right" />
    </main>
  );
};

function App() {
  return (
    <div className="App" data-testid="app-root">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
