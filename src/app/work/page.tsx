"use client";

import { useState } from "react";
import { Search, Snowflake, ClipboardList, Clock, CheckCircle2, AlertCircle, Wrench, Package, ArrowLeft } from "lucide-react";
import { useOrders } from "@/lib/hooks/useOrders";
import { ESTADO_ORDEN_LABELS, ESTADO_ORDEN_COLORS, formatDate } from "@/lib/utils";
import Link from "next/link";

export default function PublicWorkStatus() {
  const { ordenes, loaded } = useOrders();
  const [searchId, setSearchId] = useState("");
  const [result, setResult] = useState<ReturnType<typeof ordenes.find> | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    const found = ordenes.find((o) => o.id.toLowerCase() === searchId.toLowerCase());
    setResult(found || null);
  };

  const states = ["recibido", "en_diagnostico", "en_reparacion", "listo", "entregado"];
  const currentStateIdx = result ? states.indexOf(result.estado) : -1;

  return (
    <div className="min-h-screen bg-rm-black text-white p-6">
      <div className="max-w-2xl mx-auto space-y-12 pt-12">
        <div className="text-center space-y-4">
          <Link href="/" className="inline-flex items-center gap-2 text-rm-text-muted hover:text-white transition-colors mb-4">
            <ArrowLeft className="w-4 h-4" /> Volver al inicio
          </Link>
          <div className="flex justify-center mb-6">
            <div className="p-3 bg-rm-blue/20 rounded-2xl border border-rm-blue/20">
              <Snowflake className="w-8 h-8 text-rm-blue" />
            </div>
          </div>
          <h1 className="text-4xl font-black tracking-tight">Seguimiento de Reparacion</h1>
          <p className="text-rm-text-muted">Ingresa el numero de tu orden para conocer el estado actual.</p>
        </div>

        <form onSubmit={handleSearch} className="liquid-glass p-2 rounded-2xl flex gap-2 border border-white/5 shadow-2xl">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-rm-text-muted" />
            <input 
              type="text" 
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              placeholder="Ej: ORD-1234..."
              className="w-full bg-transparent border-none py-4 pl-12 pr-4 text-white focus:ring-0 placeholder:text-white/20 font-bold" 
            />
          </div>
          <button type="submit" className="bg-rm-blue hover:bg-rm-blue/80 text-white font-bold px-8 rounded-xl transition-all shadow-lg shadow-rm-blue/20">
            Buscar
          </button>
        </form>

        {hasSearched && !result && (
          <div className="liquid-glass p-8 rounded-2xl text-center border border-red-500/10 animate-in fade-in slide-in-from-bottom-4">
            <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">No encontramos esa orden</h3>
            <p className="text-rm-text-muted text-sm">Verifica que el numero sea correcto e intentalo de nuevo.</p>
          </div>
        )}

        {result && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-500">
            <div className="liquid-glass rounded-3xl p-8 border border-white/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10"><ClipboardList className="w-32 h-32" /></div>
              <div className="relative z-10 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-bold text-rm-blue uppercase tracking-widest bg-rm-blue/10 px-3 py-1 rounded-full border border-rm-blue/20">Orden #{result.id}</span>
                    <h2 className="text-3xl font-black mt-2">{result.equipo}</h2>
                    <p className="text-rm-text-muted font-medium">{result.marca} {result.modelo}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-rm-text-muted uppercase font-bold">Estado Actual</p>
                    <p className={`text-xl font-black ${ESTADO_ORDEN_COLORS[result.estado] || ""}`}>{ESTADO_ORDEN_LABELS[result.estado] || result.estado}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
