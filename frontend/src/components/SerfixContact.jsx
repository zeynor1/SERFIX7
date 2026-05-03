import { useState } from "react";
import axios from "axios";
import { CalendarCheck, Mail, PhoneCall, Send } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CONTACT, SERVICES } from "@/data/serfixContent";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const initialForm = {
  name: "",
  phone: "",
  email: "",
  service: "General maintenance",
  message: "",
};

export const ContactSection = () => {
  const [form, setForm] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = {
        ...form,
        email: form.email.trim() ? form.email.trim() : null,
      };
      await axios.post(`${API}/inquiries`, payload);
      toast.success("Request sent", {
        description: "SERFIX has received your request and can follow up soon.",
      });
      setForm(initialForm);
    } catch (error) {
      toast.error("Request was not sent", {
        description: "Please call or email SERFIX directly if this continues.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="bg-zinc-100 px-4 py-20 text-zinc-950 sm:px-6 lg:px-8 lg:py-24" data-testid="contact-section">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-12 lg:items-start">
        <div className="lg:col-span-5" data-testid="contact-info-block">
          <p className="section-kicker" data-testid="contact-kicker">Book your handyman today</p>
          <h2 className="mt-4 font-display text-4xl font-bold uppercase leading-none tracking-tight sm:text-5xl" data-testid="contact-heading">
            Call, email, or send a quick request.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-zinc-600 sm:text-lg" data-testid="contact-description">
            Tell SERFIX what needs fixing, where you are in Regina, and the best way to reach you.
          </p>

          <div className="mt-10 grid gap-4" data-testid="contact-direct-actions">
            <a href={CONTACT.phoneHref} className="direct-action" data-testid="contact-phone-link">
              <PhoneCall className="h-6 w-6 text-yellow-500" strokeWidth={3} />
              <span>
                <span className="block text-xs font-bold uppercase tracking-[0.18em] text-zinc-500" data-testid="contact-phone-label">Phone</span>
                <span className="block font-display text-2xl font-bold text-zinc-950" data-testid="contact-phone-value">{CONTACT.phoneDisplay}</span>
              </span>
            </a>
            <a href={CONTACT.mailHref} className="direct-action" data-testid="contact-email-link">
              <Mail className="h-6 w-6 text-yellow-500" strokeWidth={3} />
              <span>
                <span className="block text-xs font-bold uppercase tracking-[0.18em] text-zinc-500" data-testid="contact-email-label">Email</span>
                <span className="block break-all font-display text-2xl font-bold text-zinc-950" data-testid="contact-email-value">{CONTACT.email}</span>
              </span>
            </a>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="border-2 border-zinc-950 bg-white p-5 shadow-[10px_10px_0px_0px_rgba(24,24,27,1)] sm:p-8 lg:col-span-7"
          data-testid="contact-form"
        >
          <div className="mb-8 flex items-center gap-3 border-b-2 border-zinc-950 pb-5" data-testid="contact-form-heading-row">
            <CalendarCheck className="h-9 w-9 text-yellow-500" strokeWidth={3} data-testid="contact-form-icon" />
            <div>
              <p className="font-display text-3xl font-bold uppercase leading-none" data-testid="contact-form-title">Service request</p>
              <p className="mt-1 text-sm text-zinc-500" data-testid="contact-form-subtitle">Required fields: name, phone, service, message.</p>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2" data-testid="contact-form-fields-grid">
            <div className="space-y-2" data-testid="contact-name-field-wrap">
              <Label htmlFor="name" className="form-label" data-testid="contact-name-label">Name</Label>
              <Input
                id="name"
                value={form.name}
                onChange={(event) => updateField("name", event.target.value)}
                required
                minLength={2}
                placeholder="Your name"
                className="form-input"
                data-testid="contact-name-input"
              />
            </div>
            <div className="space-y-2" data-testid="contact-phone-field-wrap">
              <Label htmlFor="phone" className="form-label" data-testid="contact-phone-input-label">Phone</Label>
              <Input
                id="phone"
                value={form.phone}
                onChange={(event) => updateField("phone", event.target.value)}
                required
                minLength={7}
                placeholder="Best callback number"
                className="form-input"
                data-testid="contact-phone-input"
              />
            </div>
            <div className="space-y-2" data-testid="contact-email-field-wrap">
              <Label htmlFor="email" className="form-label" data-testid="contact-email-input-label">Email optional</Label>
              <Input
                id="email"
                type="email"
                value={form.email}
                onChange={(event) => updateField("email", event.target.value)}
                placeholder="name@example.com"
                className="form-input"
                data-testid="contact-email-input"
              />
            </div>
            <div className="space-y-2" data-testid="contact-service-field-wrap">
              <Label htmlFor="service" className="form-label" data-testid="contact-service-label">Service</Label>
              <select
                id="service"
                value={form.service}
                onChange={(event) => updateField("service", event.target.value)}
                className="form-input h-12"
                data-testid="contact-service-select"
              >
                {SERVICES.map((service) => (
                  <option key={service.id} value={service.title} data-testid={`contact-service-option-${service.id}`}>
                    {service.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-5 space-y-2" data-testid="contact-message-field-wrap">
            <Label htmlFor="message" className="form-label" data-testid="contact-message-label">What needs fixing?</Label>
            <Textarea
              id="message"
              value={form.message}
              onChange={(event) => updateField("message", event.target.value)}
              required
              minLength={10}
              placeholder="Describe the repair, installation, or maintenance task..."
              className="form-input min-h-36 resize-y"
              data-testid="contact-message-textarea"
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="mt-7 h-14 w-full rounded-none border-2 border-zinc-950 bg-yellow-400 font-display text-base font-bold uppercase tracking-wide text-zinc-950 shadow-[5px_5px_0px_0px_rgba(24,24,27,1)] transition-[transform,background-color] duration-200 hover:-translate-y-1 hover:bg-yellow-300 disabled:translate-y-0 disabled:opacity-70"
            data-testid="contact-form-submit-button"
          >
            <Send className="h-5 w-5" strokeWidth={3} />
            {isSubmitting ? "Sending request..." : "Send request"}
          </Button>
        </form>
      </div>
    </section>
  );
};