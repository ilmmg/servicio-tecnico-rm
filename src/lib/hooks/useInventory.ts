"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Producto, DashboardStats } from "@/lib/types";
import { toast } from "sonner";
import { toSentenceCase } from "@/lib/utils";



// Mapea snake_case de la DB a camelCase de la app
function mapFromDB(row: Record<string, unknown>): Producto {
  return {
    id: row.id as string,
    nombre: row.nombre as string,
    categoria: row.categoria as Producto["categoria"],
    estado: row.estado as Producto["estado"],
    precio: row.precio as number,
    costoUSD: Number(row.costo_usd) || 0,
    costoPesos: (row.costo_pesos as number) || 0,
    cantidad: (row.cantidad as number) || 0,
    ubicacion: (row.ubicacion as string) || "",
    imagen: (row.imagen as string) || "",
    notas: (row.notas as string) || "",
    publicadoEnML: (row.publicado_en_ml as boolean) || false,
    linkML: (row.link_ml as string) || "",
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string,
  };
}

// Mapea camelCase de la app a snake_case de la DB
function mapToDB(data: Partial<Producto>): Record<string, unknown> {
  const map: Record<string, unknown> = {};
  if (data.nombre !== undefined) map.nombre = toSentenceCase(data.nombre);
  if (data.categoria !== undefined) map.categoria = data.categoria;
  if (data.estado !== undefined) map.estado = data.estado;
  if (data.precio !== undefined) map.precio = data.precio;
  if (data.costoUSD !== undefined) map.costo_usd = data.costoUSD;
  if (data.costoPesos !== undefined) map.costo_pesos = data.costoPesos;
  if (data.cantidad !== undefined) map.cantidad = data.cantidad;
  if (data.ubicacion !== undefined) map.ubicacion = data.ubicacion;
  if (data.imagen !== undefined) map.imagen = data.imagen;
  if (data.notas !== undefined) map.notas = data.notas;
  if (data.publicadoEnML !== undefined) map.publicado_en_ml = data.publicadoEnML;
  if (data.linkML !== undefined) map.link_ml = data.linkML;
  return map;
}

export function useInventory() {
  const supabase = useMemo(() => createClient(), []);
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Cargar productos desde Supabase
  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from("productos")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error cargando productos:", error);
        setProductos([]);
      } else {
        setProductos((data || []).map(mapFromDB));
      }
      setLoaded(true);
    }
    load();
  }, [supabase]);

  const addProducto = useCallback(
    async (data: Omit<Producto, "id" | "createdAt" | "updatedAt">) => {
      const dbData = mapToDB(data);
      const { data: inserted, error } = await supabase
        .from("productos")
        .insert(dbData)
        .select()
        .single();

      if (error) {
        console.error("Error agregando producto:", error);
        toast.error("Error al guardar el producto");
        return null;
      }

      const producto = mapFromDB(inserted);
      toast.success("Producto guardado correctamente");
      setProductos((prev) => [producto, ...prev]);
      return producto;
    },
    [supabase]
  );

  const updateProducto = useCallback(
    async (id: string, data: Partial<Producto>) => {
      const dbData = mapToDB(data);
      const { error } = await supabase
        .from("productos")
        .update(dbData)
        .eq("id", id);

      if (error) {
        console.error("Error actualizando producto:", error);
        toast.error("Error al actualizar el producto");
        return;
      }

      toast.success("Producto actualizado");
      setProductos((prev) =>
        prev.map((p) =>
          p.id === id
            ? { ...p, ...data, updatedAt: new Date().toISOString() }
            : p
        )
      );
    },
    [supabase]
  );

  const deleteProducto = useCallback(async (id: string) => {
    const { error } = await supabase.from("productos").delete().eq("id", id);

    if (error) {
      console.error("Error eliminando producto:", error);
      toast.error("Error al eliminar el producto");
      return;
    }

    toast.success("Producto eliminado");
    setProductos((prev) => prev.filter((p) => p.id !== id));
  }, [supabase]);

  const deductStock = useCallback(
    async (items: { productoId: string; cantidad: number }[]) => {
      for (const item of items) {
        const current = productos.find((p) => p.id === item.productoId);
        if (current) {
          const newQty = Math.max(0, current.cantidad - item.cantidad);
          await supabase
            .from("productos")
            .update({ cantidad: newQty })
            .eq("id", item.productoId);
        }
      }

      toast.success("Stock actualizado");
      setProductos((prev) =>
        prev.map((p) => {
          const item = items.find((i) => i.productoId === p.id);
          if (item) {
            return {
              ...p,
              cantidad: Math.max(0, p.cantidad - item.cantidad),
              updatedAt: new Date().toISOString(),
            };
          }
          return p;
        })
      );
    },
    [productos, supabase]
  );

  const getStats = useCallback((): Partial<DashboardStats> => {
    const totalProductos = productos.length;
    const totalUnidades = productos.reduce((sum, p) => sum + p.cantidad, 0);
    const valorStock = productos.reduce(
      (sum, p) => sum + p.precio * p.cantidad,
      0
    );
    const stockBajo = productos.filter(
      (p) => p.cantidad <= 1 && p.cantidad > 0
    ).length;
    return { totalProductos, totalUnidades, valorStock, stockBajo };
  }, [productos]);

  return {
    productos,
    loaded,
    addProducto,
    updateProducto,
    deleteProducto,
    deductStock,
    getStats,
  };
}