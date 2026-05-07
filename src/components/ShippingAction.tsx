"use client";

import { useState } from "react";
import { Truck, X, MapPin, Calculator } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export default function ShippingAction() {
  const [isOpen, setIsOpen] = useState(false);
  const [cp, setCp] = useState("");
  const [cost, setCost] = useState<number | null>(null);
  const [error, setError] = useState("");

  const calculateShipping = () => {
    setError("");
    setCost(null);
    
    if (!cp || cp.length < 4) {
      setError("Ingresá un código postal válido.");
      return;
    }

    const postalCode = parseInt(cp);
    
    // Simple logic based on Laferrere (1757)
    if (postalCode === 1757) {
      setCost(0); // Free local shipping
    } else if (postalCode >= 1700 && postalCode <= 1799) {
      setCost(4500); // Nearby areas
    } else if (postalCode >= 1000 && postalCode <= 1999) {
      setCost(8000); // AMBA / CABA
    } else {
      setCost(12500); // Interior
    }
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="text-left w-full liquid-glass glass-shine rounded-2xl p-7 flex items-center gap-4 group hover:-translate-y-0.5 transition-all cursor-pointer">
        <div className="p-3 rounded-xl bg-rm-blue/10 border border-rm-blue/15 group-hover:bg-rm-blue/20 transition-colors">
          <Truck className="w-6 h-6 text-rm-blue" />
        </div>
        <div>
          <h4 className="text-base font-bold text-white mb-0.5">Envíos a domicilio</h4>
          <p className="text-rm-text-muted text-xs">Calculá con tu código postal</p>
        </div>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="liquid-glass rounded-3xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-white/10 flex justify-between items-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-rm-blue/10 rounded-bl-full -z-10" />
              <div className="flex items-center gap-3">
                <div className="p-2 bg-rm-blue/20 rounded-xl">
                  <Calculator className="w-5 h-5 text-rm-blue" />
                </div>
                <h3 className="text-xl font-bold text-white">Costo de Envío</h3>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-full text-rm-text-muted transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-bold text-rm-text-muted mb-2 uppercase tracking-wider">Código Postal</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-rm-text-muted" />
                  <input 
                    type="number" 
                    value={cp} 
                    onChange={(e) => setCp(e.target.value)} 
                    placeholder="Ej: 1757" 
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white font-bold focus:outline-none focus:border-rm-blue/50 transition-colors text-lg"
                    onKeyDown={(e) => e.key === 'Enter' && calculateShipping()}
                  />
                </div>
                {error && <p className="text-red-400 text-xs mt-2 font-medium">{error}</p>}
              </div>

              <button onClick={calculateShipping} className="w-full btn-pill-blue py-3.5 font-bold text-base shadow-lg">
                Calcular Costo
              </button>

              {cost !== null && (
                <div className="pt-6 border-t border-white/5 text-center animate-in slide-in-from-bottom-2">
                  <p className="text-sm text-rm-text-muted mb-1">Costo estimado para CP {cp}:</p>
                  <p className="text-4xl font-black text-white tracking-tighter">
                    {cost === 0 ? "¡Envío Gratis!" : formatCurrency(cost)}
                  </p>
                  {cost > 0 && <p className="text-xs text-rm-text-muted mt-2">Los tiempos de entrega varían entre 2 y 5 días hábiles.</p>}
                  {cost === 0 && <p className="text-xs text-emerald-400 mt-2 font-bold">Zonas aledañas a Laferrere tienen envío bonificado.</p>}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
