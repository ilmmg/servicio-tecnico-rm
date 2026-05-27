import { MessageCircle, Phone, MapPin, Wrench, Settings, CheckCircle } from "lucide-react";
import Link from "next/link";
import ThemeToggleButton from "@/components/ThemeToggleButton";

const SERVICIOS = [
  "Heladeras",
  "Freezers",
  "Lavarropas",
  "Secarropas",
  "Microondas",
  "Hornos",
  "Aires acondicionados",
  "Plaquetas Inverter",
  "Motores eléctricos",
];

const PASOS = [
  {
    num: "01",
    title: "Escribinos",
    desc: "Contanos qué equipo es y qué le pasa. Te respondemos rápido por WhatsApp.",
  },
  {
    num: "02",
    title: "Visitamos",
    desc: "Vamos a tu casa con instrumental digital. Diagnosticamos y presupuestamos en el lugar.",
  },
  {
    num: "03",
    title: "Reparamos",
    desc: "Trabajamos con repuestos de calidad. Probamos todo y dejamos garantía escrita.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-rm-black text-rm-text transition-colors">

      {/* ============================== */}
      {/* NAVBAR */}
      {/* ============================== */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-rm-black/80 backdrop-blur-md border-b border-rm-border/50">
        <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-rm-blue/15 border border-rm-blue/20 rounded-lg flex items-center justify-center">
              <Wrench className="w-4 h-4 text-rm-blue" />
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
      {/* HERO */}
      {/* ============================== */}
      <section className="pt-32 pb-20 sm:pt-44 sm:pb-28 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm font-medium text-rm-text-muted tracking-wide mb-6 landing-fade-in">
            Taller en Laferrere · +20 años reparando electrodomésticos
          </p>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.08] mb-6 landing-fade-in landing-delay-1">
            Tu equipo se rompió.
            <br />
            <span className="text-gradient-blue">Nosotros lo arreglamos.</span>
          </h1>

          <p className="text-lg text-rm-text-muted max-w-lg mx-auto mb-10 leading-relaxed landing-fade-in landing-delay-2">
            Diagnóstico con instrumental digital, presupuesto antes de reparar y garantía escrita. Así trabajamos.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 landing-fade-in landing-delay-3">
            <a
              href="https://wa.me/5491149723221"
              className="flex items-center gap-2.5 bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-3.5 rounded-full transition-all hover:shadow-lg hover:shadow-green-600/20 text-base"
            >
              <MessageCircle className="w-5 h-5" />
              Consultar por WhatsApp
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
      {/* TRUST MARKERS */}
      {/* ============================== */}
      <section className="pb-20 sm:pb-24 px-6 landing-fade-in landing-delay-4">
        <div className="max-w-3xl mx-auto">
          <div className="liquid-glass-subtle rounded-2xl px-6 py-5 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm text-rm-text-muted font-medium">
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              Visita a domicilio
            </span>
            <span className="hidden sm:block w-1 h-1 bg-rm-border rounded-full" />
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              Garantía escrita
            </span>
            <span className="hidden sm:block w-1 h-1 bg-rm-border rounded-full" />
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              Presupuesto sin cargo
            </span>
          </div>
        </div>
      </section>

      {/* ============================== */}
      {/* QUÉ REPARAMOS */}
      {/* ============================== */}
      <section id="servicios" className="pb-24 sm:pb-32 px-6 scroll-mt-20">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-bold text-rm-blue uppercase tracking-[0.2em] mb-3 text-center">
            Especialidad
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-center mb-10">
            Línea blanca y electrónica
          </h2>

          <div className="flex flex-wrap justify-center gap-2.5">
            {SERVICIOS.map((item) => (
              <span
                key={item}
                className="px-4 py-2 bg-rm-card border border-rm-border rounded-full text-rm-text-muted text-sm font-medium hover:border-rm-blue/30 hover:text-rm-text transition-colors cursor-default"
              >
                {item}
              </span>
            ))}
          </div>

          <p className="text-center text-sm text-rm-text-muted mt-6">
            ¿No está en la lista?{" "}
            <a href="https://wa.me/5491149723221" className="text-rm-blue hover:underline font-medium">
              Consultanos →
            </a>
          </p>
        </div>
      </section>

      {/* ============================== */}
      {/* CÓMO FUNCIONA */}
      {/* ============================== */}
      <section className="pb-24 sm:pb-32 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-bold text-rm-blue uppercase tracking-[0.2em] mb-3 text-center">
            Proceso
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-center mb-14">
            Simple y sin vueltas
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {PASOS.map((step) => (
              <div key={step.num} className="liquid-glass rounded-xl p-6 text-center md:text-left">
                <p className="text-3xl font-extrabold text-rm-blue/20 mb-3 tracking-tight">
                  {step.num}
                </p>
                <h3 className="text-base font-bold mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-rm-text-muted leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================== */}
      {/* PROMO + CTA FINAL */}
      {/* ============================== */}
      <section id="contacto" className="pb-24 sm:pb-32 px-6 scroll-mt-20">
        <div className="max-w-2xl mx-auto text-center">
          <div className="liquid-glass rounded-2xl px-8 py-12 sm:px-12 sm:py-16">
            <p className="text-sm text-orange-500 font-bold mb-6">
              🏷️ 10% OFF abonando en efectivo
            </p>

            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3">
              ¿Se rompió algo en casa?
            </h2>
            <p className="text-rm-text-muted mb-8">
              Escribinos y te orientamos sin compromiso.
            </p>

            <a
              href="https://wa.me/5491149723221"
              className="inline-flex items-center gap-2.5 bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-3.5 rounded-full transition-all hover:shadow-lg hover:shadow-green-600/20 text-base"
            >
              <MessageCircle className="w-5 h-5" />
              Escribir por WhatsApp
            </a>

            <div className="mt-10 pt-6 border-t border-rm-border/50 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-xs text-rm-text-muted">
              <a href="tel:+5491149723221" className="flex items-center gap-1.5 hover:text-rm-text transition-colors">
                <Phone className="w-3.5 h-3.5 text-rm-blue" />
                11 4972-3221
              </a>
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=Ruiz+de+los+Llanos+3132,+Gregorio+de+Laferrere"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-rm-text transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 text-rm-blue" />
                Ruiz de los Llanos 3132, Laferrere
              </a>
              <span>Lun a Vie · 9 a 18 hs</span>
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
            <Wrench className="w-3.5 h-3.5 text-rm-blue" />
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
