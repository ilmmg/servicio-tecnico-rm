"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import type { AppSettings } from "@/lib/types";



const DEFAULT_SETTINGS: AppSettings = {
  cotizacionDolar: 1200,
  margenGlobal: 50,
};

export function useSettings() {
  const supabase = createClient();
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from("settings")
        .select("*");

      if (error) {
        console.error("Error cargando settings:", error);
        setLoaded(true);
        return;
      }

      const s = { ...DEFAULT_SETTINGS };
      (data || []).forEach((row: Record<string, unknown>) => {
        if (row.key === "cotizacion_dolar") s.cotizacionDolar = Number(row.value) || DEFAULT_SETTINGS.cotizacionDolar;
        if (row.key === "margen_global") s.margenGlobal = Number(row.value) || DEFAULT_SETTINGS.margenGlobal;
      });

      setSettings(s);
      setLoaded(true);
    }
    load();
  }, []);

  const syncDolar = useCallback(async () => {
    try {
      const res = await fetch("https://dolarapi.com/v1/dolares/blue");
      const data = await res.json();
      if (data && data.compra && data.venta) {
        const promedio = Math.round((data.compra + data.venta) / 2);
        setSettings((prev) => ({ ...prev, cotizacionDolar: promedio }));

        // Guardar en Supabase
        await supabase
          .from("settings")
          .upsert({ key: "cotizacion_dolar", value: promedio, updated_at: new Date().toISOString() });

        return promedio;
      }
    } catch (error) {
      console.error("Error fetching dolar API:", error);
    }
    return null;
  }, []);

  useEffect(() => {
    if (loaded) {
      syncDolar();
    }
  }, [loaded, syncDolar]);

  const updateCotizacion = useCallback(async (value: number) => {
    setSettings((prev) => ({ ...prev, cotizacionDolar: value }));
    await supabase
      .from("settings")
      .upsert({ key: "cotizacion_dolar", value: value, updated_at: new Date().toISOString() });
  }, []);

  const updateMargenGlobal = useCallback(async (value: number) => {
    setSettings((prev) => ({ ...prev, margenGlobal: value }));
    await supabase
      .from("settings")
      .upsert({ key: "margen_global", value: value, updated_at: new Date().toISOString() });
  }, []);

  return { settings, loaded, updateCotizacion, updateMargenGlobal, syncDolar };
}
