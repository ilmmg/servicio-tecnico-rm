import { Phone, MessageCircle, MapPin, CheckCircle, Wrench, Settings, ChevronRight, Thermometer, Cog, Zap, Wind } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const SERVICIOS = [
  {
    icon: Thermometer,
    title: "Heladeras y Freezers",
    desc: "Diagnóstico de sistema de frío, cambio de compresor, reparación de termostatos y sellado de burletes.",
    img: "/images/termostato.png",
  },
  {
    icon: Cog,
    title: "Lavarropas y Secarropas",
    desc: "Motor, bomba de desagote, correas, rodamientos y plaquetas electrónicas. Todas las marcas.",
    img: "/images/correa.png",
  },
  {
    icon: Zap,
    title: "Plaquetas Inverter",
    desc: "Reparación a nivel componente. No cambiamos la plaqueta entera: detectamos el componente dañado y lo reemplazamos.",
    img: "/images/plaqueta.jpg",
  },
  {
    icon: Wind,
    title: "Motores Eléctricos",
    desc: "Rebobinado y reparación de motores monofásicos y trifásicos. Bombas de agua y extractores.",
    img: "/images/bomba.png",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* ============================================= */}
      {/* NAVBAR FIJO */}
      {/* ============================================= */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-slate-900 rounded-lg flex items-center justify-center">
              <Wrench className="w-4.5 h-4.5 text-white" />
            </div>
            <div className="leading-tight">
              <span className="text-lg font-extrabold tracking-tight text-slate-900">RM</span>
              <span className="hidden sm:inline text-sm font-semibold text-slate-500 ml-1.5">Servicio Técnico</span>
            </div>
          </Link>

          {/* Nav links - desktop */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <a href="#servicios" className="hover:text-slate-900 transition-colors">Servicios</a>
            <a href="#nosotros" className="hover:text-slate-900 transition-colors">Nosotros</a>
            <a href="#contacto" className="hover:text-slate-900 transition-colors">Contacto</a>
          </div>

          {/* CTA + Admin */}
          <div className="flex items-center gap-2">
            <a
              href="https://wa.me/5491149723221"
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm font-bold px-5 py-2.5 rounded-lg transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
            <Link
              href="/admin"
              className="w-10 h-10 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              title="Panel Admin"
            >
              <Settings className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </nav>

      {/* ============================================= */}
      {/* HERO */}
      {/* ============================================= */}
      <section className="relative pt-28 pb-16 sm:pt-32 sm:pb-20 overflow-hidden">
        {/* Subtle dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(circle, #334155 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            {/* Text */}
            <div>
              <div className="inline-flex items-center gap-2 bg-slate-200/80 text-slate-600 text-xs font-bold tracking-wide uppercase px-4 py-2 rounded-full mb-6">
                <MapPin className="w-3.5 h-3.5" />
                Laferrere y Zona Oeste · Atención a domicilio
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.05] mb-5">
                Reparaciones definitivas.{" "}
                <span className="text-slate-500">Sin adivinanzas.</span>
              </h1>

              <p className="text-lg text-slate-600 leading-relaxed max-w-xl mb-8">
                Recuperamos tu electrodoméstico rápido y con diagnóstico preciso. Especialistas en línea blanca y electrónica avanzada.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="https://wa.me/5491149723221"
                  className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold px-7 py-3.5 rounded-lg transition-colors text-base shadow-sm"
                >
                  <MessageCircle className="w-5 h-5" />
                  Solicitar visita por WhatsApp
                </a>
                <a
                  href="tel:+5491149723221"
                  className="flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 font-bold px-7 py-3.5 rounded-lg border border-slate-300 hover:border-slate-400 transition-colors text-base"
                >
                  <Phone className="w-4.5 h-4.5" />
                  Llamar al 11 4972-3221
                </a>
              </div>
            </div>

            {/* Hero image */}
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-slate-200 shadow-lg bg-white">
                <Image
                  src="/images/hero-tecnico.png"
                  alt="Técnico profesional usando instrumental de medición"
                  width={800}
                  height={600}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-3 sm:-left-6 bg-white rounded-xl border border-slate-200 shadow-md px-4 py-3 flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">+20 años</p>
                  <p className="text-xs text-slate-500">de experiencia</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================= */}
      {/* BLOQUE DE AUTORIDAD */}
      {/* ============================================= */}
      <section id="nosotros" className="bg-white py-16 sm:py-20 scroll-mt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            {/* Image */}
            <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100 order-2 lg:order-1">
              <Image
                src="/images/equipo.png"
                alt="Rubén e Iván - Equipo RM Servicio Técnico"
                width={800}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Text */}
            <div className="order-1 lg:order-2">
              <p className="text-orange-600 text-xs font-bold tracking-[0.2em] uppercase mb-3">+20 años de oficio</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-5">
                El taller de tu barrio, con tecnología de hoy.
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                Somos una empresa familiar. Rubén e Iván atienden cada equipo de manera personal.
                Combinamos la mecánica tradicional con instrumental de última generación para resolver
                desde un motor quemado hasta los problemas más complejos de electrónica.
              </p>
              <div className="space-y-3">
                {["Atención personalizada en cada reparación", "Piezas originales y de calidad probada", "Garantía escrita en cada trabajo"].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                    <span className="text-slate-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================= */}
      {/* GRILLA DE SERVICIOS */}
      {/* ============================================= */}
      <section id="servicios" className="bg-slate-50 py-16 sm:py-20 scroll-mt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-orange-600 text-xs font-bold tracking-[0.2em] uppercase mb-3">Servicios</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Especialistas en Línea Blanca
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {SERVICIOS.map((servicio) => {
              const Icon = servicio.icon;
              return (
                <div
                  key={servicio.title}
                  className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden hover:shadow-md hover:border-slate-300 transition-all group"
                >
                  {/* Image */}
                  <div className="aspect-[4/3] bg-slate-100 relative overflow-hidden">
                    <Image
                      src={servicio.img}
                      alt={servicio.title}
                      width={400}
                      height={300}
                      className="w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-center gap-2.5 mb-3">
                      <div className="w-8 h-8 bg-slate-100 rounded-md flex items-center justify-center">
                        <Icon className="w-4 h-4 text-slate-600" />
                      </div>
                      <h3 className="font-bold text-slate-900 text-sm">{servicio.title}</h3>
                    </div>
                    <p className="text-slate-500 text-sm leading-relaxed">{servicio.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================= */}
      {/* ESTÁNDAR DE TRABAJO (dark) */}
      {/* ============================================= */}
      <section className="bg-slate-900 py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            {/* Text */}
            <div>
              <p className="text-orange-400 text-xs font-bold tracking-[0.2em] uppercase mb-3">Estándar de trabajo</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-8">
                Trabajamos con precisión.
              </h2>

              <div className="space-y-5">
                {[
                  {
                    title: "Diagnóstico con instrumental digital",
                    desc: "Multímetro, pinza amperométrica y balanza electrónica. Medimos antes de desarmar.",
                  },
                  {
                    title: "Presupuesto claro antes de reparar",
                    desc: "Te decimos exactamente qué falla, qué piezas hacen falta y cuánto va a costar. Sin sorpresas.",
                  },
                  {
                    title: "Garantía escrita",
                    desc: "Cada reparación queda documentada. Si algo no anda, volvemos sin costo.",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-4">
                    <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold mb-1">{item.title}</h3>
                      <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tools image */}
            <div className="grid grid-cols-2 gap-3">
              <div className="aspect-square rounded-xl overflow-hidden border border-slate-700">
                <Image
                  src="/images/herramientas.png"
                  alt="Instrumental digital de medición"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square rounded-xl overflow-hidden border border-slate-700">
                <Image
                  src="/images/plaqueta.jpg"
                  alt="Reparación de plaqueta electrónica"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square rounded-xl overflow-hidden border border-slate-700">
                <Image
                  src="/images/bomba.png"
                  alt="Bomba de desagote"
                  width={400}
                  height={400}
                  className="w-full h-full object-contain bg-slate-800 p-4"
                />
              </div>
              <div className="aspect-square rounded-xl overflow-hidden border border-slate-700">
                <Image
                  src="/images/termostato.png"
                  alt="Termostato profesional"
                  width={400}
                  height={400}
                  className="w-full h-full object-contain bg-slate-800 p-4"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================= */}
      {/* FOOTER DE CONVERSIÓN */}
      {/* ============================================= */}
      <section id="contacto" className="bg-white py-16 sm:py-20 scroll-mt-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          {/* Promo banner */}
          <div className="bg-orange-50 border-2 border-orange-200 rounded-xl px-6 py-4 mb-10 inline-flex items-center gap-3">
            <span className="text-2xl">🏷️</span>
            <p className="text-orange-800 font-bold text-sm sm:text-base">
              PROMOCIÓN: <span className="text-orange-600">10% OFF</span> abonando en efectivo
            </p>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
            ¿Se rompió?{" "}
            <span className="text-green-600">Lo arreglamos hoy.</span>
          </h2>

          <p className="text-slate-500 text-lg mb-8 max-w-lg mx-auto">
            Contanos qué equipo es y qué falla tiene. Con eso alcanza para orientarte rápido.
          </p>

          <a
            href="https://wa.me/5491149723221"
            className="inline-flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white font-bold px-10 py-4.5 rounded-xl transition-colors text-lg shadow-md hover:shadow-lg"
          >
            <MessageCircle className="w-6 h-6" />
            Escribir por WhatsApp
            <ChevronRight className="w-5 h-5" />
          </a>

          {/* Info strip */}
          <div className="mt-12 pt-8 border-t border-slate-200">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm text-slate-500">
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=Ruiz+de+los+Llanos+3132,+Gregorio+de+Laferrere,+Provincia+de+Buenos+Aires"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-slate-700 transition-colors"
              >
                <MapPin className="w-4 h-4 text-slate-400" />
                Ruiz de los Llanos 3132, Laferrere
              </a>
              <span className="hidden sm:block text-slate-300">|</span>
              <a href="tel:+5491149723221" className="flex items-center gap-2 hover:text-slate-700 transition-colors">
                <Phone className="w-4 h-4 text-slate-400" />
                11 4972-3221
              </a>
              <span className="hidden sm:block text-slate-300">|</span>
              <span className="flex items-center gap-2">
                Lun a Vie · 09:00 a 18:00 hs
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================= */}
      {/* FOOTER */}
      {/* ============================================= */}
      <footer className="bg-slate-900 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-slate-800 rounded-md flex items-center justify-center">
                <Wrench className="w-3.5 h-3.5 text-slate-400" />
              </div>
              <span className="font-bold text-slate-300">RM</span>
              <span>Servicio Técnico</span>
            </div>
            <div className="flex items-center gap-5">
              <a
                href="https://www.facebook.com/serviotecnicoRM"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-slate-300 transition-colors"
              >
                Facebook
              </a>
              <a
                href="https://www.instagram.com/serviciotecnicorm_/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-slate-300 transition-colors"
              >
                Instagram
              </a>
              <span>© {new Date().getFullYear()}</span>
            </div>
          </div>
        </div>
      </footer>

      {/* ============================================= */}
      {/* FLOATING WHATSAPP */}
      {/* ============================================= */}
      <a
        href="https://wa.me/5491149723221"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 p-3.5 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all"
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
      </a>
    </div>
  );
}
