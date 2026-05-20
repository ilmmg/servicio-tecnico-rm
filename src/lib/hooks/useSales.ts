"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Venta, VentaItem } from "@/lib/types";
import { toast } from "sonner";



function mapVentaFromDB(row: Record<string, unknown>, items: VentaItem[] = []): Venta {
  return {
    id: row.id as string,
    items,
    total: row.total as number,
    canal: row.canal as Venta["canal"],
    metodoPago: row.metodo_pago as Venta["metodoPago"],
    clienteNombre: (row.cliente_nombre as string) || undefined,
    fecha: row.fecha as string,
  };
}

function mapVentaItemFromDB(row: Record<string, unknown>): VentaItem {
  return {
    productoId: (row.producto_id as string) || "",
    nombre: row.nombre as string,
    cantidad: row.cantidad as number,
    precioUnitario: row.precio_unitario as number,
  };
}

export function useSales() {
  const supabase = useMemo(() => createClient(), []);
  const [ventas, setVentas] = useState<Venta[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function load() {
      const { data: ventasData, error } = await supabase
        .from("ventas")
        .select("*")
        .order("fecha", { ascending: false });

      if (error) {
        console.error("Error cargando ventas:", error);
        setVentas([]);
        setLoaded(true);
        return;
      }

      const ventaIds = (ventasData || []).map((v: Record<string, unknown>) => v.id);
      let itemsData: Record<string, unknown>[] = [];
      if (ventaIds.length > 0) {
        const { data } = await supabase
          .from("venta_items")
          .select("*")
          .in("venta_id", ventaIds);
        itemsData = data || [];
      }

      const itemsMap = new Map<string, VentaItem[]>();
      itemsData.forEach((item: Record<string, unknown>) => {
        const ventaId = item.venta_id as string;
        const list = itemsMap.get(ventaId) || [];
        list.push(mapVentaItemFromDB(item));
        itemsMap.set(ventaId, list);
      });

      const mappedVentas = (ventasData || []).map((v: Record<string, unknown>) =>
        mapVentaFromDB(v, itemsMap.get(v.id as string) || [])
      );

      setVentas(mappedVentas);
      setLoaded(true);
    }
    load();
  }, [supabase]);

  const addVenta = useCallback(
    async (data: Omit<Venta, "id" | "fecha">) => {
      const { data: inserted, error } = await supabase
        .from("ventas")
        .insert({
          total: data.total,
          canal: data.canal,
          metodo_pago: data.metodoPago,
          cliente_nombre: data.clienteNombre || "",
        })
        .select()
        .single();

      if (error) {
        console.error("Error creando venta:", error);
        toast.error("Error al registrar la venta");
        return null as unknown as Venta;
      }

      const itemsToInsert = data.items.map((item) => ({
        venta_id: inserted.id,
        producto_id: item.productoId || null,
        nombre: item.nombre,
        cantidad: item.cantidad,
        precio_unitario: item.precioUnitario,
      }));

      await supabase.from("venta_items").insert(itemsToInsert);

      const venta = mapVentaFromDB(inserted, data.items);
      toast.success("Venta registrada exitosamente");
      setVentas((prev) => [venta, ...prev]);
      return venta;
    },
    [supabase]
  );

  return { ventas, loaded, addVenta };
}