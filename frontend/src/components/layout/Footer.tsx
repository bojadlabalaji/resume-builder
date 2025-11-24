import Link from "next/link"

export function Footer() {
    return (
        <footer className="w-full border-t border-gold-100 bg-gold-100/20 py-6 md:py-0">
            <div className="container flex flex-col items-center justify-center gap-4 md:h-24 md:flex-row px-4 md:px-6 mx-auto">
                <p className="text-center text-sm leading-loose text-muted-foreground">
                    Built by{" "}
                    <a
                        href="https://www.linkedin.com/in/bojadlabalaji"
                        target="_blank"
                        rel="noreferrer"
                        className="font-medium underline underline-offset-4 text-gold-700"
                    >
                        Balu
                    </a>
                    . The source code is available on{" "}
                    <a
                        href="#"
                        target="_blank"
                        rel="noreferrer"
                        className="font-medium underline underline-offset-4 text-gold-700"
                    >
                        GitHub
                    </a>
                    .
                </p>
            </div>
        </footer>
    )
}
