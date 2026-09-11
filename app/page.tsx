export default function Home() {
    return (
        <section className="section container flex-1 items-center justify-center">
            <div className="w-full max-w-3xl text-center">
                <p className="mb-8 text-[11px] uppercase tracking-[0.4em] text-gold">
                    Maison Invite
                </p>

                <h1 className="font-cormorant-garamond text-3xl text-ink">
                    Հյուրերի հաստատումները, անունները և քանակը՝
                    <br />
                    <span className="italic">մեկ պարզ ու հարմար էջում</span>
                </h1>

                <div className="mx-auto mt-10 flex items-center justify-center gap-4">
                    <span className="h-px w-16 bg-gold/50" />

                    <span className="text-sm text-gold">✦</span>

                    <span className="h-px w-16 bg-gold/50" />
                </div>

                <div className="mt-10">
                    <p className="text-xs uppercase tracking-[0.25em] text-wenge">
                        Նրբագեղ հրավիրատոմսեր
                    </p>
                </div>
            </div>
        </section>
    );
}