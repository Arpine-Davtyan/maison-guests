import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { getGuestsByOrderId } from "@/lib/actions/guests";
import {
    CheckIcon,
    ChevronLeft,
    ChevronRight,
    XIcon,
} from "lucide-react";
import Link from "next/link";

type GuestsTableProps = {
    orderId: string;
    page?: number;
};

export default async function GuestsTable({
    orderId,
    page = 1,
}: GuestsTableProps) {
    const pageSize = 25;

    const {
        guests,
        total,
        totalPages,
    } = await getGuestsByOrderId(orderId, page, pageSize);

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <p className="text-sm text-wenge">
                    Ընդանհուր՝{" "}
                    <span className="font-medium text-ink">
                        {total}
                    </span>{" "}
                    հյուր
                </p>
            </div>

            <div className="overflow-hidden rounded-sm border border-beige bg-ivory-light">
                <Table>
                    <TableHeader>
                        <TableRow className="border-b border-beige hover:bg-transparent">
                            <TableHead className="h-10 px-2 pl-5 text-xs font-medium uppercase tracking-wider text-wenge">
                                Անուն
                            </TableHead>

                            <TableHead className="h-10 px-2 text-right text-xs font-medium uppercase tracking-wider text-wenge">
                                Հյուրեր
                            </TableHead>
                            <TableHead className="h-10 px-2 pr-5 text-xs font-medium uppercase tracking-wider text-wenge"></TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {guests.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={3}
                                    className="h-28 text-center text-sm text-wenge"
                                >
                                    Հյուրեր դեռ չկան
                                </TableCell>
                            </TableRow>
                        ) : (
                            guests.map((guest) => (
                                <TableRow
                                    key={guest.id}
                                    className="border-b border-beige/70 transition-colors last:border-0 hover:bg-beige/30"
                                >
                                    <TableCell className="p-2 pl-5 text-ink">
                                        {guest.full_name}
                                    </TableCell>

                                    <TableCell className="p-2 text-right text-wenge">
                                        {guest.accepted
                                            ? guest.number ?? 0
                                            : 0}
                                    </TableCell>

                                    <TableCell className="flex py-2 pr-5 justify-end">
                                        {guest.accepted ? (
                                            <CheckIcon
                                                size={20}
                                                className="text-green-600"
                                            />
                                        ) : (
                                            <XIcon
                                                size={20}
                                                className="text-red-500"
                                            />
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            {totalPages > 1 && (
                <div className="flex items-center justify-end">
                    <div className="flex items-center gap-2">
                        {page > 1 && (
                            <Link
                                href={`?page=${page - 1}`}
                                className="flex size-9 items-center justify-center rounded-md border border-gold text-ink transition-colors hover:bg-beige"
                                aria-label="Previous page"
                            >
                                <ChevronLeft className="size-4" />
                            </Link>
                        )}

                        <span className="min-w-16 text-center text-sm text-wenge">
                            {page} / {totalPages}
                        </span>

                        {page < totalPages && (
                            <Link
                                href={`?page=${page + 1}`}
                                className="flex size-9 items-center justify-center rounded-md border border-gold text-ink transition-colors hover:bg-beige"
                                aria-label="Next page"
                            >
                                <ChevronRight className="size-4" />
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}