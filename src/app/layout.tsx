import './globals.css'

import { AntdRegistry } from '@ant-design/nextjs-registry'
import { GoogleAnalytics } from '@next/third-parties/google'
import type { Metadata, Viewport } from 'next'
import { Poppins } from 'next/font/google'

import Footer from './components/Footer'
import Header from './components/Header'

const poppins = Poppins({ 
    weight: ['300', '400', '500', '600', '700', '800', '900'],
    style: ['normal', 'italic'],
    subsets: ['latin'],
})

export const metadata: Metadata = {
    title: 'Custom QR Code Generator - Generate Personalized QR Codes | Fabio J. Raminhuk',
    description: 'Create custom QR codes for any text quickly and easily. Simply enter your desired text and generate your personalized QR code in seconds with a few clicks!',
    keywords: ['QR Code Generator', 'Custom QR Codes', 'Personalized QR Codes', 'QR Code Maker', 'QR Code Creator', 'QR Code with Logo', 'QR Code with Image', 'QR Code with Color'],
    icons: {
        icon: [
            {
                media: '(prefers-color-scheme: light)',
                url: '/favicon.ico',
                href: '/favicon.ico',
            },
            {
                media: '(prefers-color-scheme: dark)',
                url: '/favicon.ico',
                href: '/favicon.ico',
            },
        ],
    },
    creator: 'Fabio J Raminhuk',
    openGraph: {
        type: 'website',
        url: 'qrcode.fabra.dev',
        title: 'Custom QR Code Generator - Generate Personalized QR Codes | Fabio J. Raminhuk',
        description: 'Create custom QR codes for any text quickly and easily. Simply enter your desired text and generate your personalized QR code in seconds with a few clicks!',
        siteName: 'Fabra Code',
        images: [{
            url: 'https://raw.githubusercontent.com/raminhuk/qr-code-generator/master/public/images/qrcodefabra.png',
        }],
    },
    twitter: {
        site: '@fabio_rmk',
    },
}

export const viewport: Viewport = {
    themeColor: '#0c121e'
}

export const GA_TRACKING_ID: string = 'G-X084Q2PSFK'
// export const GA_TAGMANAGER_ID: string = 'GTM-NSVBBRH9'

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={poppins.className}>
                <AntdRegistry>
                    <Header />
                    {children}
                    <Footer />
                </AntdRegistry>
            </body>
            <GoogleAnalytics gaId={GA_TRACKING_ID} />
            {/* <GoogleTagManager gtmId={GA_TAGMANAGER_ID} /> */}
        </html>
    )
}
