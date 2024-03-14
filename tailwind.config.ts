import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                'primary': '#3a7bd5',
                'secondary': '#3a6073',
            },
            backgroundImage: {
                'gradient-custom': 'linear-gradient(to right, #267ffb, #00c16a)',
            },
            screens: {
                xs: '480px',
            },
            boxShadow: {
                'custom': '0px 0px 12px 0px rgba(0,0,0,0.15)',
            },
        },
        container: {
            center: true,
            padding: '20px',
            screens: {
                xl: '1024px',
            }
        },
    },
    plugins: [],
}
export default config
