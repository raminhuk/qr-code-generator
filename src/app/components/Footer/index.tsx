import Link from 'next/link'

import Social from '../Social'

export default function Footer() {
    return (
        <footer className="w-full">
            <div className="flex w-full flex-col items-center justify-center pb-2 pt-4 text-sm">
                <div className="pb-3">
                    <Social />
                </div>
                <span className="text-coldGrey block text-center">© 2024 Fabio J Raminhuk All Rights Reserved.</span>
                <Link className="text-blue-800 underline" href="https://fabra.dev" target="_blank">fabra.dev</Link>
            </div>
        </footer>
    )
}

