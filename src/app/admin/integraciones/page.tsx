"use client";

import { useState } from "react";
import Tooltip from "@/app/admin/components/Tooltip";
import { Store, CreditCard, RefreshCw, CheckCircle2, AlertCircle, Settings2, ExternalLink } from "lucide-react";


const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
);


const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
);

export default function IntegracionesPage() {
  const [mlConnected, setMlConnected] = useState(true);
  const [mpConnected, setMpConnected] = useState(false);
  const [igConnected, setIgConnected] = useState(false);
  
  const [syncing, setSyncing] = useState(false);

  const handleSync = () => {
    setSyncing(true);
    setTimeout(() => setSyncing(false), 2000);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-white tracking-tight">Integraciones</h1>
        <p className="text-rm-text-muted mt-1">Conecta tus canales de venta y cobro</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* MERCADO LIBRE */}
        <div className="liquid-glass rounded-2xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFE600]/10 rounded-bl-full -z-10 transition-transform group-hover:scale-110" />
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#FFE600]/10 border border-[#FFE600]/20 flex items-center justify-center">
                <Store className="w-7 h-7 text-[#FFE600]" />
              </div>
              <div>
                <h2 className="flex items-center text-xl font-bold text-white">MercadoLibre <Tooltip content="Sincroniza tu inventario automáticamente. Al activar esta opción, los repuestos marcados se publicarán o pausarán en base al stock local." /></h2>
                <div className="flex items-center gap-2 mt-1">
                  {mlConnected ? (
                    <span className="flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-md"><CheckCircle2 className="w-3 h-3" /> Conectado</span>
                  ) : (
                    <span className="flex items-center gap-1 text-xs font-bold text-rm-text-muted bg-white/5 px-2 py-0.5 rounded-md"><AlertCircle className="w-3 h-3" /> Sin conectar</span>
                  )}
                </div>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={mlConnected} onChange={(e) => setMlConnected(e.target.checked)} />
              <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FFE600]"></div>
            </label>
          </div>
          
          

          {mlConnected && (
            <div className="space-y-4 mb-6 p-4 rounded-xl bg-black/20 border border-white/5">
              <div className="flex justify-between items-center text-sm">
                <span className="text-rm-text-muted">Estado de sincronización</span>
                <span className="text-white font-medium">Activa (cada 15 min)</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-rm-text-muted">Publicaciones activas</span>
                <span className="text-white font-bold">24 productos</span>
              </div>
            </div>
          )}

          <div className="flex gap-3">
            <button className="flex-1 btn-glass px-4 py-2.5 text-sm flex items-center justify-center gap-2" disabled={!mlConnected}>
              <Settings2 className="w-4 h-4" /> Configurar
            </button>
            <button onClick={handleSync} disabled={!mlConnected || syncing} className="flex-1 btn-pill-outline px-4 py-2.5 text-sm flex items-center justify-center gap-2 border-[#FFE600]/30 text-[#FFE600] hover:border-[#FFE600] hover:bg-[#FFE600]/10">
              <RefreshCw className={`w-4 h-4 ${syncing ? 'animate-spin' : ''}`} /> {syncing ? 'Sincronizando...' : 'Sincronizar Stock'}
            </button>
          </div>
        </div>

        {/* MERCADO PAGO */}
        <div className="liquid-glass rounded-2xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#009EE3]/10 rounded-bl-full -z-10 transition-transform group-hover:scale-110" />
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#009EE3]/10 border border-[#009EE3]/20 flex items-center justify-center">
                <CreditCard className="w-7 h-7 text-[#009EE3]" />
              </div>
              <div>
                <h2 className="flex items-center text-xl font-bold text-white">MercadoPago <Tooltip content="Acepta pagos con QR y link de pago. Los estados de las órdenes se actualizarán automáticamente cuando el cliente abone." /></h2>
                <div className="flex items-center gap-2 mt-1">
                  {mpConnected ? (
                    <span className="flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-md"><CheckCircle2 className="w-3 h-3" /> Conectado</span>
                  ) : (
                    <span className="flex items-center gap-1 text-xs font-bold text-rm-text-muted bg-white/5 px-2 py-0.5 rounded-md"><AlertCircle className="w-3 h-3" /> Sin conectar</span>
                  )}
                </div>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={mpConnected} onChange={(e) => setMpConnected(e.target.checked)} />
              <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#009EE3]"></div>
            </label>
          </div>
          
          

          <div className="flex gap-3 mt-auto pt-6">
            <button className="flex-1 btn-glass px-4 py-2.5 text-sm flex items-center justify-center gap-2" disabled={!mpConnected}>
              <Settings2 className="w-4 h-4" /> Ver credenciales
            </button>
          </div>
        </div>

        {/* INSTAGRAM / FACEBOOK CATALOG */}
        <div className="liquid-glass rounded-2xl p-6 relative overflow-hidden group lg:col-span-2">
          <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-bl-full -z-10 transition-transform group-hover:scale-110" />
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-6">
            <div className="flex items-center gap-4">
              <div className="flex -space-x-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-yellow-500/20 via-pink-500/20 to-purple-500/20 border border-pink-500/30 flex items-center justify-center z-10 backdrop-blur-sm">
                  <InstagramIcon className="w-6 h-6 text-pink-400" />
                </div>
                <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center backdrop-blur-sm">
                  <FacebookIcon className="w-6 h-6 text-blue-400" />
                </div>
              </div>
              <div>
                <h2 className="flex items-center text-xl font-bold text-white">Catálogo Meta (Instagram & FB) <Tooltip content="Vincula tu cuenta comercial para permitir que los usuarios compren repuestos etiquetados directamente desde tus posts o historias." /></h2>
                <p className="text-sm text-rm-text-muted mt-1">Exportación de inventario para Meta Business</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={igConnected} onChange={(e) => setIgConnected(e.target.checked)} />
              <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-500"></div>
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {igConnected ? (
              <div className="p-4 rounded-xl bg-black/20 border border-white/5 flex items-center justify-between">
                <div>
                  <p className="text-xs text-rm-text-muted mb-1">URL del Catálogo XML</p>
                  <p className="text-sm text-white font-mono truncate max-w-[200px]">https://rm.com.ar/api/catalog.xml</p>
                </div>
                <button className="text-rm-blue hover:text-white p-2" title="Copiar enlace">
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-center p-4 rounded-xl border border-dashed border-white/10 text-rm-text-muted text-sm">
                Activa la integración para obtener el link XML
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
