"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { createClient } from "@/lib/supabase/client";
import type { AppSettings } from "@/lib/types";
import { toast } from "sonner";



const DEFAULT_SETTINGS: AppSettings = {
  cotizacionDolar: 1200,
  margenGlobal: 50,
};

export function useSettings() {
  const supabase = useMemo(() => createClient(), []);
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);
  const [loaded, setLoaded] = useState(false);

  const syncDolar = useCallback(async () => {
    try {
      const res = await fetch("https://dolarapi.com/v1/dolares/blue");
      const data = await res.json();
      if (data && data.compra && data.venta) {
        const promedio = Math.round((data.compra + data.venta) / 2);
        setSettings((prev) => ({ ...prev, cotizacionDolar: promedio }));

        await supabase
          .from("settings")
          .upsert({ key: "cotizacion_dolar", value: promedio, updated_at: new Date().toISOString() });

        return promedio;
      }
    } catch (error) {
      console.error("Error fetching dolar API:", error);
    }
    return null;
  }, [supabase]);

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from("settings")
        .select("*");

      if (error) {
        console.error("Error cargando settings:", error);
        setLoaded(true);
        await syncDolar();
        return;
      }

      const s = { ...DEFAULT_SETTINGS };
      (data || []).forEach((row: Record<string, unknown>) => {
        if (row.key === "cotizacion_dolar") s.cotizacionDolar = Number(row.value) || DEFAULT_SETTINGS.cotizacionDolar;
        if (row.key === "margen_global") s.margenGlobal = Number(row.value) || DEFAULT_SETTINGS.margenGlobal;
      });

      setSettings(s);
      setLoaded(true);
      await syncDolar();
    }
    void load();
  }, [supabase, syncDolar]);

  const updateCotizacion = useCallback(async (value: number) => {
    setSettings((prev) => ({ ...prev, cotizacionDolar: value }));
    const { error } = await supabase
      .from("settings")
      .upsert({ key: "cotizacion_dolar", value: value, updated_at: new Date().toISOString() });
    if (error) {
      toast.error("Error al actualizar cotizacion");
    } else {
      toast.success("Cotizacion actualizada");
    }
  }, [supabase]);

  const updateMargenGlobal = useCallback(async (value: number) => {
    setSettings((prev) => ({ ...prev, margenGlobal: value }));
    const { error } = await supabase
      .from("settings")
      .upsert({ key: "margen_global", value: value, updated_at: new Date().toISOString() });
    if (error) {
      toast.error("Error al actualizar margen");
    } else {
      toast.success("Margen actualizado");
    }
  }, [supabase]);

  return { settings, loaded, updateCotizacion, updateMargenGlobal, syncDolar };
}