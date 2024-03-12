import Link from 'next/link'

import QRCode from './QRCode'

export default function Logo(){
    return <>
        <Link className="flex py-10" href="/">
            <div className="flex gap-3 bg-gradient-custom bg-clip-text text-transparent">
                <span>
                    <QRCode />
                </span>
                <span className="text-4xl font-bold">Fabra Code</span>
            </div>
        </Link>
    </>
}