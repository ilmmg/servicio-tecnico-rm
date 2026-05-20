"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { createClient } from "@/lib/supabase/client";
import type { OrdenTrabajo, HistorialEntry, EstadoOrden, DashboardStats } from "@/lib/types";
import { toast } from "sonner";



function mapOrdenFromDB(row: Record<string, unknown>, historial: HistorialEntry[] = []): OrdenTrabajo {
  return {
    id: row.id as string,
    clienteNombre: row.cliente_nombre as string,
    clienteTelefono: row.cliente_telefono as string,
    equipo: row.equipo as string,
    marca: (row.marca as string) || "",
    modelo: (row.modelo as string) || "",
    problemaReportado: row.problema_reportado as string,
    diagnostico: (row.diagnostico as string) || "",
    estado: row.estado as EstadoOrden,
    fechaIngreso: row.fecha_ingreso as string,
    fechaEstimada: (row.fecha_estimada as string) || "",
    presupuesto: (row.presupuesto as number) || 0,
    historial,
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string,
  };
}

function mapHistorialFromDB(row: Record<string, unknown>): HistorialEntry {
  return {
    id: row.id as string,
    estadoAnterior: (row.estado_anterior as EstadoOrden) || null,
    estadoNuevo: row.estado_nuevo as EstadoOrden,
    nota: (row.nota as string) || "",
    fecha: row.fecha as string,
  };
}

function mapOrdenToDB(data: Partial<OrdenTrabajo>): Record<string, unknown> {
  const map: Record<string, unknown> = {};
  if (data.clienteNombre !== undefined) map.cliente_nombre = data.clienteNombre;
  if (data.clienteTelefono !== undefined) map.cliente_telefono = data.clienteTelefono;
  if (data.equipo !== undefined) map.equipo = data.equipo;
  if (data.marca !== undefined) map.marca = data.marca;
  if (data.modelo !== undefined) map.modelo = data.modelo;
  if (data.problemaReportado !== undefined) map.problema_reportado = data.problemaReportado;
  if (data.diagnostico !== undefined) map.diagnostico = data.diagnostico;
  if (data.estado !== undefined) map.estado = data.estado;
  if (data.fechaIngreso !== undefined) map.fecha_ingreso = data.fechaIngreso;
  if (data.fechaEstimada !== undefined) map.fecha_estimada = data.fechaEstimada || null;
  if (data.presupuesto !== undefined) map.presupuesto = data.presupuesto;
  return map;
}

export function useOrders() {
  const supabase = useMemo(() => createClient(), []);
  const [ordenes, setOrdenes] = useState<OrdenTrabajo[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function load() {
      const { data: ordenesData, error: ordError } = await supabase
        .from("ordenes")
        .select("*")
        .order("created_at", { ascending: false });

      if (ordError) {
        console.error("Error cargando ordenes:", ordError);
        setOrdenes([]);
        setLoaded(true);
        return;
      }

      const { data: historialData } = await supabase
        .from("historial_ordenes")
        .select("*")
        .order("fecha", { ascending: true });

      const historialMap = new Map<string, HistorialEntry[]>();
      (historialData || []).forEach((h: Record<string, unknown>) => {
        const hEntry = mapHistorialFromDB(h);
        const list = historialMap.get(h.orden_id as string) || [];
        list.push(hEntry);
        historialMap.set(h.orden_id as string, list);
      });

      const mappedOrdenes = (ordenesData || []).map((o: Record<string, unknown>) =>
        mapOrdenFromDB(o, historialMap.get(o.id as string) || [])
      );

      setOrdenes(mappedOrdenes);
      setLoaded(true);
    }
    load();
  }, [supabase]);

  const addOrden = useCallback(
    async (data: Omit<OrdenTrabajo, "id" | "historial" | "createdAt" | "updatedAt">) => {
      const dbData = mapOrdenToDB(data);
      const { data: inserted, error } = await supabase
        .from("ordenes")
        .insert(dbData)
        .select()
        .single();

      if (error) {
        console.error("Error creando orden:", error);
        toast.error("Error al crear la orden");
        return null;
      }

      const { data: hInserted } = await supabase
        .from("historial_ordenes")
        .insert({
          orden_id: inserted.id,
          estado_anterior: null,
          estado_nuevo: data.estado,
          nota: "Orden creada",
        })
        .select()
        .single();

      const historial = hInserted ? [mapHistorialFromDB(hInserted)] : [];
      const orden = mapOrdenFromDB(inserted, historial);
      toast.success("Orden creada exitosamente");
      setOrdenes((prev) => [orden, ...prev]);
      return orden;
    },
    [supabase]
  );

  const updateOrden = useCallback(
    async (id: string, data: Partial<OrdenTrabajo>) => {
      const dbData = mapOrdenToDB(data);
      const { error } = await supabase
        .from("ordenes")
        .update(dbData)
        .eq("id", id);

      if (error) {
        console.error("Error actualizando orden:", error);
        toast.error("Error al actualizar la orden");
        return;
      }

      toast.success("Orden actualizada");
      setOrdenes((prev) =>
        prev.map((o) =>
          o.id === id
            ? { ...o, ...data, updatedAt: new Date().toISOString() }
            : o
        )
      );
    },
    [supabase]
  );

  const changeEstado = useCallback(
    async (id: string, nuevoEstado: EstadoOrden, nota: string = "") => {
      const orden = ordenes.find((o) => o.id === id);
      if (!orden) return;

      const { error } = await supabase
        .from("ordenes")
        .update({ estado: nuevoEstado })
        .eq("id", id);

      if (error) {
        console.error("Error cambiando estado:", error);
        toast.error("Error al cambiar el estado");
        return;
      }

      const { data: hInserted } = await supabase
        .from("historial_ordenes")
        .insert({
          orden_id: id,
          estado_anterior: orden.estado,
          estado_nuevo: nuevoEstado,
          nota,
        })
        .select()
        .single();

      const entry = hInserted ? mapHistorialFromDB(hInserted) : {
        id: crypto.randomUUID(),
        estadoAnterior: orden.estado,
        estadoNuevo: nuevoEstado,
        nota,
        fecha: new Date().toISOString(),
      };

      toast.success("Estado actualizado");
      setOrdenes((prev) =>
        prev.map((o) => {
          if (o.id !== id) return o;
          return {
            ...o,
            estado: nuevoEstado,
            historial: [...o.historial, entry],
            updatedAt: new Date().toISOString(),
          };
        })
      );
    },
    [ordenes, supabase]
  );

  const deleteOrden = useCallback(async (id: string) => {
    const { error } = await supabase.from("ordenes").delete().eq("id", id);
    if (error) {
      console.error("Error eliminando orden:", error);
      toast.error("Error al eliminar la orden");
      return;
    }
    toast.success("Orden eliminada");
    setOrdenes((prev) => prev.filter((o) => o.id !== id));
  }, [supabase]);

  const getStats = useCallback((): Partial<DashboardStats> => {
    const today = new Date().toDateString();
    const activas = ordenes.filter((o) => o.estado !== "entregado").length;
    const completadasHoy = ordenes.filter(
      (o) =>
        o.estado === "entregado" &&
        new Date(o.updatedAt).toDateString() === today
    ).length;
    return { ordenesActivas: activas, ordenesCompletadasHoy: completadasHoy };
  }, [ordenes]);

  return { ordenes, loaded, addOrden, updateOrden, changeEstado, deleteOrden, getStats };
}