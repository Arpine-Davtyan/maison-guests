"use server";

import { supabase } from "@/lib/supabase";

export async function getOrderById(orderId: string) {
    const { data: order, error } = await supabase
        .from("orders")
        .select("*")
        .eq("id", orderId)
        .single();

    if (error) {
        console.error("Get order by id error:", error);
        throw new Error(error.message);
    }

    return order;
}