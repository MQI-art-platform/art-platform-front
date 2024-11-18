/* Don't forget to download the CSS file too 
OR remove the following line if you're already using Tailwind */

import { useEffect, useState } from "react"
import logo from "../assets/art_platform_logo_2.png"
import { routes } from "../constants"
import CartManager from "../session/cart.manager"
import { useSession } from "../session/session.context"

export const Header = () => {
    const [cartItemCount, setCartItemCount] = useState<number>(CartManager.getCartItems().length);
    const { isLoggedIn } = useSession()

    useEffect(() => {
        // Subscribe to cart item updates
        const unsubscribe = CartManager.subscribe(() => {
            setCartItemCount(CartManager.getCartItems().length);
        });

        // Clean up subscription on unmount
        return () => unsubscribe();
    }, []);

    return (
        <div className="bg-white rounded-full shadow-lg px-6 py-4 w-[100%] h-[90px] mb-5">
            <header className="flex flex-row h-[100%] items-center justify-between">
                {/* Logo */}
                <div className="flex items-center space-x-2 sm:basis-1/12 basis-4/12 h-[100%]">
                    <a className="h-[100%]" href="/">
                        <img
                            src={logo}
                            alt="ArtSpark"
                            className="object-scale-down h-[100%]"
                        />
                    </a>
                </div>
                {/* Navigation Links */}
                <nav className="hidden sm:flex items-center justify-center space-x-6 basis-10/12 gap-5">
                    {
                        routes.map((route) => {
                            const { title, href } = route;
                            return (
                                <a key={title}
                                    href={href} className="text-neutral-950">
                                    {title}
                                </a>
                            )
                        })
                    }
                </nav>
                {/* Icons */}
                <div className="flex items-center space-x-4 justify-center basis-1/12 h-[100%]">
                    {/* Shopping Cart Icon */}
                    <a className="flex items-center" href="/shopping-cart">
                        <span className="material-symbols-outlined text-neutral-950 h-[100%]">
                            shopping_cart
                        </span>
                        {cartItemCount > 0 && (
                            <span className="relative -top-4 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                {cartItemCount}
                            </span>
                        )}
                    </a>
                    {/* Account Icon */}
                    <a className="flex items-center" href={ isLoggedIn ? "/personal-account" : "/login" }>
                        <span className="material-symbols-outlined text-neutral-950 h-[100%]">
                            { isLoggedIn ? `account_circle` : `login` }
                        </span>
                    </a>
                </div>
            </header>
        </div>
    )
}

