"use server";

import { supabase } from "@/lib/supabase";

export type Guest = {
    id: string;
    full_name: string;
    accepted: boolean | null;
    number: number | null;
    created_at: string;
    order_id: string | null;
};

export type CreateGuestData = {
    full_name: string;
    accepted?: boolean;
    number?: number;
    order_id?: string | null;
};

// CREATE
export async function createGuest(data: CreateGuestData) {
    const { data: guest, error } = await supabase
        .from("guests")
        .insert({
            full_name: data.full_name,
            accepted: data.accepted ?? false,
            number: data.number ?? 0,
            order_id: data.order_id ?? null,
        })
        .select()
        .single();

    if (error) {
        console.error("Create guest error:", error);
        throw new Error(error.message);
    }

    return guest;
}

// READ - all guests
export async function getGuests() {
    const { data: guests, error } = await supabase
        .from("guests")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Get guests error:", error);
        throw new Error(error.message);
    }

    return guests;
}

// READ - one guest
export async function getGuest(id: string) {
    const { data: guest, error } = await supabase
        .from("guests")
        .select("*")
        .eq("id", id)
        .single();

    if (error) {
        console.error("Get guest error:", error);
        throw new Error(error.message);
    }

    return guest;
}

// UPDATE
export async function updateGuest(
    id: string,
    data: Partial<CreateGuestData>
) {
    const { data: guest, error } = await supabase
        .from("guests")
        .update(data)
        .eq("id", id)
        .select()
        .single();

    if (error) {
        console.error("Update guest error:", error);
        throw new Error(error.message);
    }

    return guest;
}

// DELETE
export async function deleteGuest(id: string) {
    const { error } = await supabase
        .from("guests")
        .delete()
        .eq("id", id);

    if (error) {
        console.error("Delete guest error:", error);
        throw new Error(error.message);
    }

    return { success: true };
}

export async function getGuestsByOrderId(
    orderId: string,
    page = 1,
    pageSize = 25
) {
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    // All guests for pagination
    const {
        data: guests,
        error,
        count: guestsCount,
    } = await supabase
        .from("guests")
        .select("*", { count: "exact" })
        .eq("order_id", orderId)
        .order("created_at", { ascending: false })
        .range(from, to);

    if (error) {
        console.error("Get guests by order error:", error);
        throw new Error(error.message);
    }

    // Only accepted guests
    const {
        count: acceptedCount,
        error: countError,
    } = await supabase
        .from("guests")
        .select("*", { count: "exact", head: true })
        .eq("order_id", orderId)
        .eq("accepted", true);

    if (countError) {
        console.error("Get accepted guests count error:", countError);
        throw new Error(countError.message);
    }

    return {
        guests: guests ?? [],

        // Only accepted guests
        total: acceptedCount ?? 0,

        // Pagination is based on ALL guests
        totalPages: Math.ceil((guestsCount ?? 0) / pageSize),
    };
}