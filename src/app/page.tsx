import { Phone, MapPin, Truck, MessageCircle, Snowflake, ArrowRight, Shield, Settings, Zap, Disc, Wrench, ShoppingBag } from "lucide-react";
import Link from "next/link";
import ShippingAction from "@/components/ShippingAction";

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
);
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
);
const MercadoLibreIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-.846 4.77c1.328-.482 3.07-.053 4.185.924.188.165.36.345.516.54l-2.16 1.57c-.39-.522-.942-.87-1.586-.87-.268 0-.546.06-.804.18l-.3.15c-.516.27-.948.72-1.236 1.29l-2.04-1.14c.6-1.11 1.62-2.01 2.82-2.49l.604-.154zm-4.56 5.04c.18-.72.486-1.38.894-1.95l2.04 1.14c-.204.39-.33.81-.36 1.26-.03.39.03.78.18 1.14l-2.22.96c-.33-.78-.48-1.59-.534-2.55zm2.136 4.65c-.42-.54-.72-1.17-.894-1.86l2.22-.96c.15.36.36.69.63.96.39.39.87.63 1.38.72l-.42 2.34c-.87-.18-1.71-.54-2.4-1.05l-.516-.15zm4.77 1.77c-.54.09-1.11.06-1.65-.09l.42-2.34c.33.06.66.03.96-.09.36-.15.66-.39.87-.72l2.04 1.17c-.54.87-1.38 1.56-2.34 1.95l-.3.12zm3.42-3.12c-.24.6-.6 1.14-1.05 1.59l-2.04-1.17c.21-.33.33-.72.36-1.11.03-.45-.06-.9-.27-1.29l2.16-1.57c.48.72.78 1.53.87 2.4.03.39.01.77-.03 1.15z"/></svg>
);

/* === ANIMATED SVG APPLIANCES === */
const FridgeSVG = () => (
  <div className="appliance-float appliance-float-1">
    <svg width="130" height="210" viewBox="0 0 140 220" fill="none" xmlns="http://www.w3.org/2000/svg">
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
    <svg width="150" height="170" viewBox="0 0 160 180" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="wg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#1a2a55"/><stop offset="100%" stopColor="#0d1528"/></linearGradient>
        <linearGradient id="dg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#0044FF" stopOpacity="0.12"/><stop offset="100%" stopColor="#0044FF" stopOpacity="0.02"/></linearGradient>
      </defs>
      <rect x="10" y="10" width="140" height="155" rx="14" fill="url(#wg)" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5"/>
      <rect x="15" y="15" width="130" height="30" rx="6" fill="#0e1225" stroke="rgba(255,255,255,0.04)" strokeWidth="0.8"/>
      <circle cx="45" cy="30" r="8" fill="#12141c" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
      <circle cx="45" cy="30" r="3" fill="#0044FF" opacity="0.4"/>
      <rect x="70" y="22" width="35" height="16" rx="3" fill="#0044FF" opacity="0.06" stroke="#0044FF" strokeWidth="0.4" strokeOpacity="0.2"/>
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
    <svg width="160" height="110" viewBox="0 0 170 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="mg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#1a2a55"/><stop offset="100%" stopColor="#0d1528"/></linearGradient>
      </defs>
      <rect x="5" y="10" width="160" height="95" rx="10" fill="url(#mg)" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5"/>
      <rect x="12" y="17" width="105" height="80" rx="6" fill="#080a14" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
      <rect x="16" y="21" width="97" height="72" rx="4" fill="#0044FF" opacity="0.02"/>
      <g className="heat-pulse">
        <path d="M50 55 Q55 48, 60 55 Q65 62, 70 55" stroke="#0044FF" strokeWidth="1" opacity="0.2" fill="none"/>
        <path d="M55 45 Q60 38, 65 45 Q70 52, 75 45" stroke="#0044FF" strokeWidth="1" opacity="0.12" fill="none"/>
      </g>
      <rect x="124" y="17" width="35" height="80" rx="4" fill="#0e1225" stroke="rgba(255,255,255,0.04)" strokeWidth="0.8"/>
      <circle cx="141" cy="35" r="6" fill="#12141c" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8"/>
      <circle cx="141" cy="35" r="2" fill="#0044FF" opacity="0.35"/>
      <rect x="132" y="78" width="18" height="12" rx="2" fill="#0044FF" opacity="0.05" stroke="#0044FF" strokeWidth="0.3" strokeOpacity="0.2"/>
    </svg>
  </div>
);


const OvenSVG = () => (
  <div className="appliance-float appliance-float-1" style={{ animationDelay: '1s' }}>
    <svg width="150" height="140" viewBox="0 0 160 150" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="og" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#1a2a55"/><stop offset="100%" stopColor="#0d1528"/></linearGradient>
      </defs>
      <rect x="10" y="10" width="140" height="130" rx="10" fill="url(#og)" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5"/>
      <rect x="15" y="15" width="130" height="30" rx="6" fill="#0e1225" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
      <circle cx="35" cy="30" r="5" fill="#12141c" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8"/>
      <circle cx="55" cy="30" r="5" fill="#12141c" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8"/>
      <circle cx="75" cy="30" r="5" fill="#12141c" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8"/>
      <rect x="15" y="55" width="130" height="75" rx="8" fill="#080a14" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
      <rect x="25" y="65" width="110" height="55" rx="4" fill="#0044FF" opacity="0.05" stroke="#0044FF" strokeWidth="0.5" strokeOpacity="0.3"/>
      <g className="heat-pulse">
        <path d="M40 110 Q60 80, 80 110 T120 110" stroke="#0044FF" strokeWidth="1" opacity="0.2" fill="none"/>
        <path d="M40 100 Q60 70, 80 100 T120 100" stroke="#0044FF" strokeWidth="1" opacity="0.1" fill="none"/>
      </g>
    </svg>
  </div>
);

const AcSVG = () => (
  <div className="appliance-float appliance-float-2" style={{ animationDelay: '2.5s' }}>
    <svg width="200" height="80" viewBox="0 0 210 90" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="acg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#1a2a55"/><stop offset="100%" stopColor="#0d1528"/></linearGradient>
      </defs>
      <rect x="5" y="10" width="200" height="65" rx="15" fill="url(#acg)" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5"/>
      <rect x="15" y="25" width="180" height="8" rx="4" fill="#0e1225" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
      <rect x="15" y="40" width="180" height="8" rx="4" fill="#0e1225" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
      <rect x="175" y="25" width="12" height="12" rx="2" fill="#080a14"/>
      <circle cx="181" cy="31" r="2" fill="#0044FF" opacity="0.6"/>
      <g className="heat-pulse">
        <path d="M40 75 L60 85" stroke="#0044FF" strokeWidth="1" opacity="0.2" strokeLinecap="round"/>
        <path d="M80 75 L100 85" stroke="#0044FF" strokeWidth="1" opacity="0.2" strokeLinecap="round"/>
        <path d="M120 75 L140 85" stroke="#0044FF" strokeWidth="1" opacity="0.2" strokeLinecap="round"/>
        <path d="M160 75 L180 85" stroke="#0044FF" strokeWidth="1" opacity="0.2" strokeLinecap="round"/>
      </g>
    </svg>
  </div>
);

const FEATURES = [
  { title: "Reparados a Nuevos", desc: "Repuestos originales y mano de obra especializada. Tu electrodoméstico queda como de fábrica." },
  { title: "Garantía Escrita", desc: "Todos nuestros trabajos tienen garantía. Trabajamos con responsabilidad y transparencia." },
  { title: "Precios Accesibles", desc: "Las mejores tarifas del mercado sin resignar calidad. Presupuesto sin compromiso." },
  { title: "Plan Canje", desc: "Tomamos tu electrodoméstico usado en parte de pago. Renová de forma inteligente." },
];

const PRODUCTOS = [
  { nombre: "Correa Lavarropas", precio: "$8.500", img: "/images/correa.png", link: "#" },
  { nombre: "Bomba de Desagote", precio: "$15.000", img: "/images/bomba.png", link: "#" },
  { nombre: "Plaqueta Universal", precio: "$45.000", img: "/images/plaqueta.jpg", link: "#" },
  { nombre: "Termostato Heladera", precio: "$12.000", img: "/images/termostato.png", link: "#" }
];

export default function Home() {
  return (
    <main className="min-h-screen bg-rm-black relative overflow-hidden">
      {/* Background Glows */}
      <div className="glow-bg-blue w-[800px] h-[800px] top-[-200px] left-1/2 -translate-x-1/2" />
      <div className="glow-bg-blue w-[500px] h-[500px] top-[55%] right-[-150px] opacity-40" />
      <div className="glow-bg-blue w-[400px] h-[400px] top-[30%] left-[-100px] opacity-30" />

      {/* === HEADER (Liquid Glass) === */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="max-w-6xl mx-auto px-4 pt-3">
          <div className="liquid-glass rounded-2xl px-6 py-3 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-rm-blue/20 rounded-xl border border-rm-blue/20">
                <Snowflake className="w-5 h-5 text-rm-blue" />
              </div>
              <span className="text-xl font-black italic tracking-tighter text-white">
                RM <span className="text-rm-text-muted font-sans font-bold text-sm not-italic tracking-normal">SERVICIO TÉCNICO</span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Link href="/admin" className="hidden sm:flex items-center justify-center w-10 h-10 rounded-xl text-rm-text-muted hover:text-white hover:bg-white/5 transition-colors" title="Panel Admin">
                <Settings className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* === HERO WITH FLOATING APPLIANCES === */}
      <section className="relative pt-36 pb-16 px-6">
        <div className="hidden lg:block">
          <Link href="/admin/inventario" className="absolute left-[3%] top-[22%] hover:scale-110 transition-transform"><FridgeSVG /></Link>
          <Link href="/admin/inventario" className="absolute right-[5%] top-[18%] hover:scale-110 transition-transform"><WashingMachineSVG /></Link>
          <Link href="/admin/inventario" className="absolute right-[3%] bottom-[5%] hover:scale-110 transition-transform"><MicrowaveSVG /></Link>
          <Link href="/admin/inventario" className="absolute left-[15%] bottom-[5%] hover:scale-110 transition-transform"><OvenSVG /></Link>
          <Link href="/admin/inventario" className="absolute left-[40%] top-[8%] hover:scale-110 transition-transform"><AcSVG /></Link>
        </div>

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-5 py-2 liquid-glass-subtle rounded-full text-white text-sm font-semibold mb-10">
            <div className="w-2 h-2 rounded-full bg-rm-blue animate-pulse" />
            Heladeras · Lavarropas · Microondas
          </div>

          <h2 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter text-white leading-[0.92] mb-8">
            Volvé a<br/>disfrutar<br/>
            <span className="text-gradient-blue">tus equipos.</span>
          </h2>

          <p className="text-lg sm:text-xl text-rm-text-muted font-medium max-w-xl mx-auto mb-12 leading-relaxed">
            Más de 20 años reparando electrodomésticos en Laferrere. Calidad, precio y confianza.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="https://wa.me/5491149723221" className="w-full sm:w-auto flex items-center justify-center gap-2 btn-pill-blue px-10 py-4 text-lg">
              <MessageCircle className="w-5 h-5" /> Pedir Presupuesto
            </a>
            <a href="#servicios" className="w-full sm:w-auto flex items-center justify-center gap-2 btn-pill-outline px-10 py-4 text-lg">
              Conocé más <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* === FEATURES (Liquid Glass Cards) === */}
      <section id="servicios" className="px-6 pb-20 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {FEATURES.map((f, i) => (
              <a href="https://wa.me/5491149723221" key={i} className="liquid-glass glass-shine rounded-2xl p-8 sm:p-9 hover:-translate-y-1 transition-transform duration-300">
                <div className="w-10 h-10 rounded-2xl bg-rm-blue/15 border border-rm-blue/20 flex items-center justify-center text-rm-blue font-black text-lg mb-5">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h4 className="text-xl font-bold text-white tracking-tight mb-3">{f.title}</h4>
                <p className="text-rm-text-muted leading-relaxed">{f.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* === CATALOG (Mock E-commerce) === */}
      <section className="px-6 pb-20 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4">
            <div>
              <h3 className="text-3xl font-black text-white tracking-tighter mb-2">Repuestos y Accesorios</h3>
              <p className="text-rm-text-muted">Encontrá lo que necesitás para tu equipo.</p>
            </div>
            <a href="#" className="hidden sm:flex items-center gap-2 text-rm-blue font-bold hover:text-white transition-colors">
              Ver tienda completa <ArrowRight className="w-4 h-4" />
            </a>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PRODUCTOS.map((prod, i) => (
              <a href={prod.link} key={i} className="lemon-card p-5 flex flex-col group block">
                <div className="bg-white rounded-xl aspect-square mb-5 flex items-center justify-center border border-white/5 relative overflow-hidden shadow-inner">
                  <div className="absolute inset-0 bg-gradient-to-br from-rm-blue/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                  <img src={prod.img} alt={prod.nombre} className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500 mix-blend-multiply" />
                </div>
                <h4 className="text-white font-bold mb-1 flex-1">{prod.nombre}</h4>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-rm-blue font-black text-lg">{prod.precio}</span>
                  <button className="p-2 bg-rm-blue/10 text-rm-blue rounded-lg group-hover:bg-rm-blue group-hover:text-white transition-colors" title="Comprar">
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                </div>
              </a>
            ))}
          </div>
          <a href="#" className="sm:hidden flex items-center justify-center gap-2 btn-pill-outline w-full py-4 mt-6">
            Ver tienda completa <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* === PROMO BANNER (Liquid Glass Blue) === */}
      <section className="px-6 pb-20 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="liquid-glass-blue glass-shine rounded-3xl p-10 sm:p-14 text-center relative overflow-hidden">
            <div className="glow-bg-blue w-[300px] h-[300px] top-[-50px] right-[-50px] opacity-60" />
            <div className="relative z-10">
              <p className="text-rm-blue font-bold text-sm tracking-[0.2em] uppercase mb-4">Promoción</p>
              <h2 className="text-5xl sm:text-7xl font-black text-white tracking-tighter mb-3">10% OFF</h2>
              <p className="text-xl sm:text-2xl font-semibold text-rm-text-muted">Abonando en efectivo</p>
            </div>
          </div>
        </div>
      </section>

      {/* === QUICK ACTIONS (Liquid Glass) === */}
      <section className="px-6 pb-20 relative z-10">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-5">
          <ShippingAction />
          <a href="https://www.google.com/maps/dir/?api=1&destination=Ruiz+de+los+Llanos+3132,+Gregorio+de+Laferrere,+Provincia+de+Buenos+Aires" target="_blank" rel="noopener noreferrer" className="liquid-glass glass-shine rounded-2xl p-7 flex items-center gap-4 group hover:-translate-y-0.5 transition-all">
            <div className="p-3 rounded-xl bg-rm-blue/10 border border-rm-blue/15 group-hover:bg-rm-blue/20 transition-colors">
              <MapPin className="w-6 h-6 text-rm-blue" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white mb-0.5">Acercate al local</h4>
              <p className="text-rm-text-muted text-xs">Ruiz de los Llanos 3132</p>
            </div>
          </a>
          <a href="#" className="liquid-glass glass-shine rounded-2xl p-7 flex items-center gap-4 group hover:-translate-y-0.5 transition-all">
            <div className="w-auto h-12 flex items-center justify-center bg-[#FFE600] rounded-xl px-4 py-2 shadow-lg group-hover:scale-105 transition-transform">
              <img src="https://http2.mlstatic.com/frontend-assets/ml-web-navigation/ui-navigation/5.21.22/mercadolibre/logo__large_plus.png" alt="MercadoLibre" className="h-6 w-auto object-contain" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white mb-0.5">MercadoLibre</h4>
              <p className="text-rm-text-muted text-xs">Comprá nuestros productos</p>
            </div>
          </a>
        </div>
      </section>

      {/* === FOOTER (Liquid Glass) === */}
      <footer className="relative z-10 px-6 pb-8">
        <div className="max-w-5xl mx-auto liquid-glass rounded-3xl px-8 py-14">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-10">
            <div className="flex flex-col gap-4 items-center md:items-start">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-rm-blue/20 rounded-xl border border-rm-blue/20">
                  <Snowflake className="w-5 h-5 text-rm-blue" />
                </div>
                <span className="text-2xl font-black italic tracking-tighter text-white">RM</span>
              </div>
              <p className="text-xs text-rm-text-muted font-bold tracking-[0.2em] uppercase">Calidad · Precio · Confianza</p>
              <div className="flex items-center gap-2 text-rm-text-muted text-xs">
                <MapPin className="w-3.5 h-3.5" />
                <span>Ruiz de los Llanos 3132, Laferrere</span>
              </div>
            </div>
            <div className="flex flex-col gap-3 w-full md:w-auto">
              <a href="https://wa.me/5491149723221" className="flex items-center justify-center gap-2 btn-pill-white px-7 py-3 text-sm">
                <Phone className="w-4 h-4" /> 11 4972-3221
              </a>
              <div className="flex gap-2">
                <a href="https://www.facebook.com/serviotecnicoRM" target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 liquid-glass-subtle rounded-xl py-3 text-rm-text-muted hover:text-white transition-colors text-xs font-medium">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="Facebook" className="w-4 h-4" /> Facebook
                </a>
                <a href="https://www.instagram.com/serviciotecnicorm_/" target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 liquid-glass-subtle rounded-xl py-3 text-rm-text-muted hover:text-white transition-colors text-xs font-medium">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg" alt="Instagram" className="w-4 h-4" /> Instagram
                </a>
                <a href="#" className="flex-1 flex items-center justify-center gap-2 liquid-glass-subtle rounded-xl py-3 text-[#FFE600]/70 hover:text-[#FFE600] transition-colors text-xs font-medium">
                  <img src="https://http2.mlstatic.com/frontend-assets/ml-web-navigation/ui-navigation/5.21.22/mercadolibre/logo__large_plus.png" alt="MercadoLibre" className="w-5 h-5 object-contain" /> MercadoLibre
                </a>
              </div>
            </div>
          </div>
          <div className="mt-10 pt-6 border-t border-white/5 text-center text-rm-text-muted text-xs">
            &copy; {new Date().getFullYear()} RM Servicio Técnico. Todos los derechos reservados.
          </div>
        </div>
      </footer>

      {/* === FLOATING WHATSAPP BUTTON === */}
      <a href="https://wa.me/5491149723221" target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 z-50 p-4 bg-[#25D366] text-white rounded-full shadow-[0_4px_14px_rgba(37,211,102,0.4)] hover:scale-110 hover:shadow-[0_6px_20px_rgba(37,211,102,0.6)] transition-all">
        <MessageCircle className="w-7 h-7" />
      </a>
    </main>
  );
}
