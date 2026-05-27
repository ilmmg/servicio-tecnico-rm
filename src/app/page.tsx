"use client";

import { useEffect, useRef } from "react";
import {
  MessageCircle,
  Phone,
  MapPin,
  Wrench,
  Settings,
  Shield,
  Clock,
  Search,
  Snowflake,
  Flame,
  Wind,
  Zap,
  Cpu,
  WashingMachine,
  Refrigerator,
  CookingPot,
  Microwave,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import ThemeToggleButton from "@/components/ThemeToggleButton";

/* ============================== */
/* DATA                           */
/* ============================== */

const SERVICIOS = [
  { name: "Heladeras", icon: Refrigerator },
  { name: "Freezers", icon: Snowflake },
  { name: "Lavarropas", icon: WashingMachine },
  { name: "Secarropas", icon: Wind },
  { name: "Microondas", icon: Microwave },
  { name: "Hornos", icon: CookingPot },
  { name: "Aires acondicionados", icon: Flame },
  { name: "Plaquetas Inverter", icon: Cpu },
  { name: "Motores eléctricos", icon: Zap },
];

const PASOS = [
  {
    num: "01",
    icon: MessageCircle,
    title: "Escribinos",
    desc: "Contanos qué equipo tenés y qué le pasa. Te respondemos en minutos por WhatsApp.",
    highlight: "Sin compromiso",
  },
  {
    num: "02",
    icon: Search,
    title: "Diagnosticamos",
    desc: "Vamos a tu domicilio con instrumental digital profesional. Te damos presupuesto en el momento, sin cargo.",
    highlight: "Presupuesto gratis",
  },
  {
    num: "03",
    icon: Shield,
    title: "Reparamos con garantía",
    desc: "Trabajamos con repuestos de calidad y probamos todo antes de irnos. Si vuelve a fallar, volvemos sin costo.",
    highlight: "Garantía escrita",
  },
];

/* ============================== */
/* SECTION REVEAL HOOK            */
/* ============================== */
function useSectionReveal() {
  const refs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    refs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (index: number) => (el: HTMLElement | null) => {
    refs.current[index] = el;
  };
}

/* ============================== */
/* COMPONENT                      */
/* ============================== */
export default function Home() {
  const setRef = useSectionReveal();

  return (
    <div className="min-h-screen bg-rm-black text-rm-text transition-colors">

      {/* ============================== */}
      {/* NAVBAR */}
      {/* ============================== */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-rm-black/80 backdrop-blur-md border-b border-rm-border/50">
        <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 flex items-center justify-center overflow-hidden rounded-lg">
              <Image src="/images/logo-rm.png" alt="RM Logo" width={32} height={32} className="object-contain" />
            </div>
            <span className="text-lg font-extrabold tracking-tight">RM</span>
          </Link>

          <div className="flex items-center gap-1">
            <a
              href="#servicios"
              className="hidden sm:block px-3 py-2 text-sm font-medium text-rm-text-muted hover:text-rm-text rounded-lg transition-colors"
            >
              Servicios
            </a>
            <a
              href="#como-funciona"
              className="hidden sm:block px-3 py-2 text-sm font-medium text-rm-text-muted hover:text-rm-text rounded-lg transition-colors"
            >
              Proceso
            </a>
            <a
              href="#contacto"
              className="hidden sm:block px-3 py-2 text-sm font-medium text-rm-text-muted hover:text-rm-text rounded-lg transition-colors"
            >
              Contacto
            </a>
            <ThemeToggleButton className="p-2.5 rounded-lg text-rm-text-muted hover:text-rm-blue transition-colors" />
            <Link
              href="/admin"
              className="p-2.5 rounded-lg text-rm-text-muted hover:text-rm-text transition-colors"
              title="Admin"
            >
              <Settings className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </nav>

      {/* ============================== */}
      {/* HERO — v2.0 */}
      {/* ============================== */}
      <section className="relative pt-32 pb-20 sm:pt-44 sm:pb-28 px-6 overflow-hidden">
        {/* Glow animado */}
        <div className="hero-glow" />

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.08] mb-6 landing-fade-in">
            Tu equipo se rompió.
            <br />
            <span className="text-gradient-blue">Nosotros lo arreglamos.</span>
          </h1>

          <p className="text-lg text-rm-text-muted max-w-xl mx-auto mb-8 leading-relaxed landing-fade-in landing-delay-1">
            Servicio técnico en Laferrere con más de 20 años de experiencia.
            Vamos a tu domicilio, diagnosticamos y reparamos.
          </p>

          {/* Trust pills integrados en el hero */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10 landing-fade-in landing-delay-2">
            <span className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-rm-card border border-rm-border text-xs font-semibold text-rm-text-muted">
              <Shield className="w-3.5 h-3.5 text-rm-blue" />
              Garantía escrita
            </span>
            <span className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-rm-card border border-rm-border text-xs font-semibold text-rm-text-muted">
              <Search className="w-3.5 h-3.5 text-rm-blue" />
              Diagnóstico digital
            </span>
            <span className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-rm-card border border-rm-border text-xs font-semibold text-rm-text-muted">
              <Clock className="w-3.5 h-3.5 text-rm-blue" />
              Respuesta rápida
            </span>
          </div>

          {/* CTA principal */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 landing-fade-in landing-delay-3">
            <a
              href="https://wa.me/5491149723221"
              className="flex items-center gap-2.5 bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-3.5 rounded-full transition-all hover:shadow-lg hover:shadow-green-600/20 text-base"
            >
              <MessageCircle className="w-5 h-5" />
              Escribinos por WhatsApp
            </a>
            <a
              href="tel:+5491149723221"
              className="flex items-center gap-2 btn-pill-outline px-7 py-3.5 text-base"
            >
              <Phone className="w-4 h-4" />
              11 4972-3221
            </a>
          </div>
        </div>
      </section>

      {/* ============================== */}
      {/* QUÉ REPARAMOS — v2.0 con íconos */}
      {/* ============================== */}
      <section
        id="servicios"
        className="pb-24 sm:pb-32 px-6 scroll-mt-20 reveal-section"
        ref={setRef(0)}
      >
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-bold text-rm-blue uppercase tracking-[0.2em] mb-3 text-center">
            Especialidad
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-center mb-12">
            Línea blanca y electrónica
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {SERVICIOS.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.name} className="service-card">
                  <div className="service-icon">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-semibold text-rm-text">
                    {item.name}
                  </span>
                </div>
              );
            })}
          </div>

          <p className="text-center text-sm text-rm-text-muted mt-8">
            ¿Tu equipo no está en la lista?{" "}
            <a
              href="https://wa.me/5491149723221"
              className="text-rm-blue hover:underline font-medium"
            >
              Consultanos →
            </a>
          </p>
        </div>
      </section>

      {/* ============================== */}
      {/* CÓMO FUNCIONA — v2.0 timeline  */}
      {/* ============================== */}
      <section
        id="como-funciona"
        className="pb-24 sm:pb-32 px-6 scroll-mt-20 reveal-section"
        ref={setRef(1)}
      >
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-bold text-rm-blue uppercase tracking-[0.2em] mb-3 text-center">
            Proceso
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-center mb-16">
            Simple y sin vueltas
          </h2>

          {/* Timeline */}
          <div className="relative">
            {/* Connector line (hidden on mobile, replaced by vertical) */}
            <div className="timeline-connector hidden md:block" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-5">
              {PASOS.map((step) => {
                const Icon = step.icon;
                return (
                  <div key={step.num} className="flex flex-col items-center text-center relative">
                    {/* Dot */}
                    <div className="timeline-dot timeline-dot-active mb-5">
                      <Icon className="w-6 h-6 text-rm-blue" />
                    </div>

                    {/* Step number */}
                    <p className="text-xs font-bold text-rm-blue uppercase tracking-widest mb-2">
                      Paso {step.num}
                    </p>

                    {/* Title */}
                    <h3 className="text-lg font-bold mb-2">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-rm-text-muted leading-relaxed mb-3 max-w-[280px]">
                      {step.desc}
                    </p>

                    {/* Highlight tag */}
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rm-blue/8 border border-rm-blue/15 text-xs font-semibold text-rm-blue">
                      {step.highlight}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ============================== */}
      {/* CONTACTO + CTA FINAL — v2.0   */}
      {/* ============================== */}
      <section
        id="contacto"
        className="pb-24 sm:pb-32 px-6 scroll-mt-20 reveal-section"
        ref={setRef(2)}
      >
        <div className="max-w-2xl mx-auto">
          <div className="liquid-glass rounded-2xl px-8 py-12 sm:px-12 sm:py-14">
            <div className="text-center mb-10">
              <span className="inline-block px-4 py-1.5 promo-badge rounded-full text-orange-400 text-xs font-bold mb-5">
                🏷️ 10% OFF abonando en efectivo
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
                ¿Listo para reparar?
              </h2>
              <p className="text-sm text-rm-text-muted">
                Encontranos por estos medios
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
              <a
                href="tel:+5491149723221"
                className="liquid-glass-subtle rounded-xl p-5 text-center hover:border-rm-blue/30 transition-colors group"
              >
                <div className="w-10 h-10 bg-rm-blue/10 border border-rm-blue/20 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-rm-blue/15 transition-colors">
                  <Phone className="w-4 h-4 text-rm-blue" />
                </div>
                <p className="text-sm font-bold mb-0.5">Teléfono</p>
                <p className="text-sm text-rm-text-muted">11 4972-3221</p>
              </a>

              <a
                href="https://www.google.com/maps/dir/?api=1&destination=Ruiz+de+los+Llanos+3132,+Gregorio+de+Laferrere"
                target="_blank"
                rel="noopener noreferrer"
                className="liquid-glass-subtle rounded-xl p-5 text-center hover:border-rm-blue/30 transition-colors group"
              >
                <div className="w-10 h-10 bg-rm-blue/10 border border-rm-blue/20 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-rm-blue/15 transition-colors">
                  <MapPin className="w-4 h-4 text-rm-blue" />
                </div>
                <p className="text-sm font-bold mb-0.5">Dirección</p>
                <p className="text-sm text-rm-text-muted">Ruiz de los Llanos 3132, Laferrere</p>
              </a>

              <div className="liquid-glass-subtle rounded-xl p-5 text-center">
                <div className="w-10 h-10 bg-rm-blue/10 border border-rm-blue/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Clock className="w-4 h-4 text-rm-blue" />
                </div>
                <p className="text-sm font-bold mb-0.5">Horario</p>
                <p className="text-sm text-rm-text-muted">Lun a Vie · 9 a 18 hs</p>
              </div>
            </div>

            {/* CTA final de cierre */}
            <div className="text-center">
              <a
                href="https://wa.me/5491149723221"
                className="inline-flex items-center gap-2.5 bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-3.5 rounded-full transition-all hover:shadow-lg hover:shadow-green-600/20 text-base"
              >
                <MessageCircle className="w-5 h-5" />
                Escribinos por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============================== */}
      {/* FOOTER */}
      {/* ============================== */}
      <footer className="px-6 pb-8">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-rm-text-muted">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 flex items-center justify-center overflow-hidden rounded-md">
              <Image src="/images/logo-rm.png" alt="RM Logo" width={20} height={20} className="object-contain" />
            </div>
            <span className="font-bold text-rm-text">RM</span>
            <span>Servicio Técnico</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://www.facebook.com/serviotecnicoRM" target="_blank" rel="noopener noreferrer" className="hover:text-rm-text transition-colors">Facebook</a>
            <a href="https://www.instagram.com/serviciotecnicorm_/" target="_blank" rel="noopener noreferrer" className="hover:text-rm-text transition-colors">Instagram</a>
            <span>© {new Date().getFullYear()}</span>
          </div>
        </div>
      </footer>

      {/* ============================== */}
      {/* FLOATING WHATSAPP */}
      {/* ============================== */}
      <a
        href="https://wa.me/5491149723221"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 p-3.5 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg shadow-green-600/20 hover:shadow-xl hover:shadow-green-600/30 hover:scale-105 transition-all"
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle className="w-5 h-5" />
      </a>
    </div>
  );
}
