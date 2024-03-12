import Logo from '../Logo'

export default function Footer() {
    return (
        <footer className="w-full">
            <div className="flex w-full flex-col items-center justify-center">
                <Logo />
                <span className="text-coldGrey block text-center text-sm">© 2024 Fabio J Raminhuk All Rights Reserved.</span>
            </div>
        </footer>
    )
}

