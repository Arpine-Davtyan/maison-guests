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
        <section className="section container">
            <h2>{order.invitationNames}</h2>

            <GuestsTable
                orderId={id}
                page={currentPage}
            />
        </section>
    );
}