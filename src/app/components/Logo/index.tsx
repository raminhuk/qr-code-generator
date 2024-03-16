import Link from 'next/link'

import QRCodeLogo from './QRCodeLogo'


export default function Logo(){
    return <>
        <Link className="flex py-10 max-lg:py-4" href="/">
            <div className="flex gap-3 bg-gradient-custom bg-clip-text text-transparent">
                <span>
                    <QRCodeLogo />
                </span>
                <span className="text-4xl font-bold">Fabra Code</span>
            </div>
        </Link>
    </>
}