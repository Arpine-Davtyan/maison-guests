import GuestsTable from "@/components/GuestsTable";
import { getOrderById } from "@/lib/actions/orders";

export default async function OrderPage({
    params,
    searchParams,
}: {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ page?: string }>;
}) {
    const { id } = await params;
    const { page } = await searchParams;

    const order = await getOrderById(id);

    const currentPage = Number(page) || 1;

    return (
        <section className="section container max-w-4xl">
            <div className="mb-8 text-center">
                <p className="mb-3 text-xs uppercase tracking-[0.3em] text-gold">
                    Maison Invite
                </p>

                <h1>{order.invitationNames}</h1>

                <p className="mt-3 text-sm text-wenge">
                    Ձեր հրավերի հյուրերի ցանկը
                </p>
            </div>

            <GuestsTable
                orderId={id}
                page={currentPage}
            />
        </section>
    );
}