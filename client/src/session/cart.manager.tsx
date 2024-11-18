
class CartManager {
    private static listeners: Listener[] = [];
    private static CART_ITEMS = "cartItems"

    static getCartItems(): string[] {
        const cartItems = localStorage.getItem(CartManager.CART_ITEMS);
        return cartItems ? JSON.parse(cartItems) : []
    }

    static addCartItem(itemId: string): boolean {
        const cartItems = this.getCartItems();
        if (cartItems.includes(itemId)) {
            return false;
        }
        cartItems.push(itemId);
        this.setCartItems(cartItems);
        this.notifyListeners();
        return true;
    }

    static clearCartItems() {
        localStorage.removeItem(this.CART_ITEMS);
        this.notifyListeners()
    }

    // Allows components to listen for changes
    static subscribe(listener: Listener) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }

    private static notifyListeners() {
        this.listeners.forEach(listener => listener());
    }

    private static setCartItems(cartItems: string[]) {
        localStorage.setItem(CartManager.CART_ITEMS, JSON.stringify(cartItems));
    }

}

type Listener = () => void;

export default CartManager;