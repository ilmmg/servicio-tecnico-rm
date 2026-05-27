import { Phone, MapPin, MessageCircle, Snowflake, CalendarDays, HousePlus, CheckCircle2, Settings } from "lucide-react";
import Link from "next/link";
import ThemeToggleButton from "@/components/ThemeToggleButton";

/* === ANIMATED SVG APPLIANCES === */
const FridgeSVG = () => (
  <div className="appliance-float appliance-float-1">
    <svg width="110" height="180" viewBox="0 0 140 220" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="fg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#1a2a55"/><stop offset="100%" stopColor="#0d1528"/></linearGradient>
      </defs>
      <rect x="15" y="10" width="110" height="195" rx="12" fill="url(#fg)" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5"/>
      <rect x="20" y="15" width="100" height="55" rx="8" fill="#0e1225" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
      <rect x="20" y="78" width="100" height="120" rx="8" fill="#0e1225" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
      <rect x="105" y="35" width="4" height="20" rx="2" fill="#0044FF" opacity="0.6"/>
      <rect x="105" y="120" width="4" height="30" rx="2" fill="#0044FF" opacity="0.6"/>
      <circle cx="45" cy="42" r="6" fill="#0044FF" opacity="0.12"/>
      <text x="45" y="46" textAnchor="middle" fill="#0044FF" fontSize="9" opacity="0.7">&#10052;</text>
      <line x1="30" y1="15" x2="30" y2="70" stroke="white" strokeWidth="0.5" opacity="0.04"/>
    </svg>
  </div>
);

const WashingMachineSVG = () => (
  <div className="appliance-float appliance-float-2">
    <svg width="130" height="150" viewBox="0 0 160 180" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="wg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#1a2a55"/><stop offset="100%" stopColor="#0d1528"/></linearGradient>
        <linearGradient id="dg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#0044FF" stopOpacity="0.12"/><stop offset="100%" stopColor="#0044FF" stopOpacity="0.02"/></linearGradient>
      </defs>
      <rect x="10" y="10" width="140" height="155" rx="14" fill="url(#wg)" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5"/>
      <rect x="15" y="15" width="130" height="30" rx="6" fill="#0e1225" stroke="rgba(255,255,255,0.04)" strokeWidth="0.8"/>
      <circle cx="45" cy="30" r="8" fill="#12141c" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
      <circle cx="45" cy="30" r="3" fill="#0044FF" opacity="0.4"/>
      <circle cx="80" cy="105" r="45" fill="url(#dg)" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5"/>
      <circle cx="80" cy="105" r="35" fill="#080a14" stroke="rgba(255,255,255,0.04)" strokeWidth="0.8"/>
      <g className="drum-spin" style={{transformOrigin: '80px 105px'}}>
        <rect x="77" y="75" width="6" height="20" rx="3" fill="#0044FF" opacity="0.12"/>
        <rect x="77" y="115" width="6" height="20" rx="3" fill="#0044FF" opacity="0.12"/>
        <rect x="60" y="102" width="20" height="6" rx="3" fill="#0044FF" opacity="0.12"/>
        <rect x="100" y="102" width="20" height="6" rx="3" fill="#0044FF" opacity="0.12"/>
      </g>
    </svg>
  </div>
);

const MicrowaveSVG = () => (
  <div className="appliance-float appliance-float-3">
    <svg width="140" height="95" viewBox="0 0 170 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="mg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#1a2a55"/><stop offset="100%" stopColor="#0d1528"/></linearGradient>
      </defs>
      <rect x="5" y="10" width="160" height="95" rx="10" fill="url(#mg)" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5"/>
      <rect x="12" y="17" width="105" height="80" rx="6" fill="#080a14" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
      <g className="heat-pulse">
        <path d="M50 55 Q55 48, 60 55 Q65 62, 70 55" stroke="#0044FF" strokeWidth="1" opacity="0.2" fill="none"/>
        <path d="M55 45 Q60 38, 65 45 Q70 52, 75 45" stroke="#0044FF" strokeWidth="1" opacity="0.12" fill="none"/>
      </g>
      <rect x="124" y="17" width="35" height="80" rx="4" fill="#0e1225" stroke="rgba(255,255,255,0.04)" strokeWidth="0.8"/>
      <circle cx="141" cy="35" r="6" fill="#12141c" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8"/>
      <circle cx="141" cy="35" r="2" fill="#0044FF" opacity="0.35"/>
    </svg>
  </div>
);

const STEPS = [
  {
    icon: CalendarDays,
    title: "Coordinamos la visita",
    desc: "Nos escribís por WhatsApp y te respondemos con una ventana horaria simple, sin vueltas.",
  },
  {
    icon: HousePlus,
    title: "Revisamos en el lugar",
    desc: "Evaluamos la falla, te contamos qué conviene reparar y qué piezas harían falta.",
  },
  {
    icon: CheckCircle2,
    title: "Entregamos listo para usar",
    desc: "Probamos el equipo contigo y dejamos las indicaciones básicas para cuidarlo mejor.",
  },
];

const SERVICE_AREAS = ["Heladeras", "Lavarropas", "Microondas", "Hornos", "Aires", "Pequeños electrodomésticos"];

export default function Home() {
  return (
    <main className="min-h-screen bg-rm-black relative overflow-hidden">
      {/* Background Glows */}
      <div className="glow-bg-blue w-[700px] h-[700px] top-[-200px] left-1/2 -translate-x-1/2 opacity-80" />
      <div className="glow-bg-blue w-[400px] h-[400px] top-[60%] right-[-100px] opacity-30" />

      {/* === HEADER === */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="max-w-5xl mx-auto px-4 pt-3">
          <div className="liquid-glass rounded-2xl px-5 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-rm-blue/20 rounded-xl border border-rm-blue/20">
                <Snowflake className="w-5 h-5 text-rm-blue" />
              </div>
              <span className="text-xl font-black italic tracking-tighter text-white">
                RM <span className="text-rm-text-muted font-sans font-bold text-sm not-italic tracking-normal">SERVICIO TÉCNICO</span>
              </span>
            </div>
            <div className="flex items-center gap-1">
              <div className="hidden md:flex items-center gap-1 text-sm font-medium">
                <a href="#como-trabajamos" className="px-3 py-2 rounded-xl text-rm-text-muted hover:text-white hover:bg-white/5 transition-colors">Cómo trabajamos</a>
                <a href="#contacto" className="px-3 py-2 rounded-xl text-rm-text-muted hover:text-white hover:bg-white/5 transition-colors">Contacto</a>
              </div>
              <ThemeToggleButton className="flex items-center gap-2 px-3 py-2 rounded-xl text-rm-text-muted hover:text-white hover:bg-white/5 transition-colors" />
              <Link href="/admin" className="hidden sm:flex items-center justify-center w-10 h-10 rounded-xl text-rm-text-muted hover:text-white hover:bg-white/5 transition-colors" title="Panel Admin">
                <Settings className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* === HERO === */}
      <section className="relative pt-40 pb-20 px-6">
        {/* Floating appliances — desktop only */}
        <div className="hidden lg:block">
          <div className="absolute left-[4%] top-[25%] hover:scale-105 transition-transform"><FridgeSVG /></div>
          <div className="absolute right-[5%] top-[20%] hover:scale-105 transition-transform"><WashingMachineSVG /></div>
          <div className="absolute right-[4%] bottom-[10%] hover:scale-105 transition-transform"><MicrowaveSVG /></div>
        </div>

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 liquid-glass-subtle rounded-full text-rm-text-muted text-xs font-medium mb-10 tracking-wide uppercase">
            Laferrere · +20 años de experiencia
          </div>

          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter text-white leading-[0.9] mb-6">
            Reparamos tu<br />
            <span className="text-gradient-blue">electrodoméstico.</span>
          </h1>

          <p className="text-lg text-rm-text-muted font-medium max-w-xl mx-auto mb-10 leading-relaxed">
            Visita a domicilio, diagnóstico claro y garantía escrita. Sin formularios ni esperas largas.
          </p>

          <a
            href="https://wa.me/5491149723221"
            className="inline-flex items-center gap-2.5 btn-pill-blue px-10 py-4 text-lg"
          >
            <MessageCircle className="w-5 h-5" />
            Consultar por WhatsApp
          </a>

          {/* Service chips */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
            {SERVICE_AREAS.map((area) => (
              <span key={area} className="px-3 py-1.5 rounded-full liquid-glass-subtle text-rm-text-muted text-sm">
                {area}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* === CÓMO TRABAJAMOS === */}
      <section id="como-trabajamos" className="px-6 pb-20 relative z-10 scroll-mt-24">
        <div className="max-w-4xl mx-auto">
          <p className="text-rm-blue font-bold text-xs tracking-[0.2em] uppercase mb-3 text-center">Cómo trabajamos</p>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tighter mb-12 text-center">
            Tres pasos, sin complicaciones
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {STEPS.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className="liquid-glass rounded-2xl p-6">
                  <div className="w-10 h-10 rounded-xl bg-rm-blue/15 border border-rm-blue/20 flex items-center justify-center text-rm-blue mb-4">
                    <Icon className="w-4.5 h-4.5" />
                  </div>
                  <div className="text-xs font-bold text-rm-blue uppercase tracking-[0.15em] mb-1.5">Paso {index + 1}</div>
                  <h3 className="text-lg font-bold text-white tracking-tight mb-2">{step.title}</h3>
                  <p className="text-rm-text-muted text-sm leading-relaxed">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* === PROMO === */}
      <section className="px-6 pb-20 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="liquid-glass-blue rounded-3xl px-10 py-12 text-center relative overflow-hidden">
            <div className="glow-bg-blue w-[250px] h-[250px] top-[-50px] right-[-30px] opacity-50" />
            <div className="relative z-10">
              <p className="text-rm-blue font-bold text-xs tracking-[0.2em] uppercase mb-3">Promoción</p>
              <p className="text-6xl sm:text-7xl font-black text-white tracking-tighter mb-1">10% OFF</p>
              <p className="text-rm-text-muted text-lg font-medium">Abonando en efectivo</p>
            </div>
          </div>
        </div>
      </section>

      {/* === CONTACTO === */}
      <section id="contacto" className="px-6 pb-24 relative z-10 scroll-mt-24">
        <div className="max-w-4xl mx-auto">
          <div className="liquid-glass rounded-3xl p-8 sm:p-12">
            <h2 className="text-3xl font-black text-white tracking-tighter mb-2">Empezá con un mensaje</h2>
            <p className="text-rm-text-muted mb-8 max-w-lg">
              Contanos qué equipo es y qué falla tiene. Con eso alcanza para orientarte rápido.
            </p>

            <a
              href="https://wa.me/5491149723221"
              className="inline-flex items-center gap-2.5 btn-pill-blue px-9 py-4 text-base mb-8"
            >
              <MessageCircle className="w-5 h-5" />
              Escribir por WhatsApp
            </a>

            <div className="flex flex-col sm:flex-row gap-5 text-sm text-rm-text-muted pt-6 border-t border-white/5">
              <a href="tel:+5491149723221" className="flex items-center gap-2 hover:text-white transition-colors">
                <Phone className="w-4 h-4 text-rm-blue" />
                11 4972-3221
              </a>
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=Ruiz+de+los+Llanos+3132,+Gregorio+de+Laferrere,+Provincia+de+Buenos+Aires"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <MapPin className="w-4 h-4 text-rm-blue" />
                Ruiz de los Llanos 3132, Laferrere
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* === FOOTER === */}
      <footer className="relative z-10 px-6 pb-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/5 text-xs text-rm-text-muted">
            <div className="flex items-center gap-2">
              <Snowflake className="w-3.5 h-3.5 text-rm-blue" />
              <span className="font-bold text-white">RM</span>
              <span>Servicio Técnico</span>
            </div>
            <div className="flex items-center gap-4">
              <a href="https://www.facebook.com/serviotecnicoRM" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Facebook</a>
              <a href="https://www.instagram.com/serviciotecnicorm_/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a>
              <span>© {new Date().getFullYear()}</span>
            </div>
          </div>
        </div>
      </footer>

      {/* === FLOATING WHATSAPP === */}
      <a
        href="https://wa.me/5491149723221"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 p-4 bg-[#25D366] text-white rounded-full shadow-[0_4px_14px_rgba(37,211,102,0.4)] hover:scale-110 hover:shadow-[0_6px_20px_rgba(37,211,102,0.6)] transition-all"
      >
        <MessageCircle className="w-6 h-6" />
      </a>
    </main>
  );
}
