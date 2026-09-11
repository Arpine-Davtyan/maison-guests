"use client";

import Image from "next/image";
import Link from "next/link";

const Header = () => {
    return (
        <header>
            <div className="container justify-between items-center">
                <Link
                    href="/"
                >
                    <Image
                        src="/images/logo-nav.png"
                        alt="logo"
                        width={130}
                        height={30}
                        quality={100}
                        loading="eager"
                        className="h-auto"
                    />
                </Link>
            </div>
        </header>
    )
}

export default Header
