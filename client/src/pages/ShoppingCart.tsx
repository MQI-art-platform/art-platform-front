import { useEffect, useState } from "react"
import { useApiClient } from "../client/platform.api.context"
import { DeliveryType, Painting, CreateOrderRequest } from "../client/platform.models"
import CartManager from "../session/cart.manager"
import { useSession } from "../session/session.context"

export const ShoppingCart: React.FC = () => {
    const apiClient = useApiClient();
    const context = useSession();
    const [cartItems, setCartItems] = useState<Painting[]>([]);
    const cartItemIds = CartManager.getCartItems();
    const [getDeliveryType, setDeliveryType] = useState<DeliveryType>(DeliveryType.PICK_UP);

    useEffect(() => {
        apiClient.getPaintingsByIdList(cartItemIds)
            .then(response => setCartItems(response.data))
            .catch(err => console.error(err));
    }, [apiClient]);

    const total = cartItems.reduce((acc, item) => acc + item.price, 0);

    const handleOrderButtonClick = async () => {
        if (cartItemIds.length === 0) return;

        const request: CreateOrderRequest = {
            paintings: cartItemIds,
            shipmentInfo: {
                address: {
                    city: "StPete",
                    street: "",
                    houseNumber: 21,
                    zipCode: "1341234"
                },
                deliveryType: getDeliveryType,
            },
        };

        try {
            const response = await apiClient.createOrder(context.user, request);
            CartManager.clearCartItems();
            location.replace(`/success-order?orderId=${response.data.id}`);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="flex flex-col basis-full">
            <h1 className="text-3xl font-title text-neutral-950 mb-6">Shopping Cart</h1>

            {/* Cart Items List */}
            <div className="flex flex-col space-y-6 basis-full">
                {cartItems.map(cartItem => (
                    <div key={cartItem.id} className="flex items-center gap-4">
                        <img src={cartItem.paintingImages[0].imageUrl} alt={cartItem.name} className="w-[100px] h-[100px] object-cover rounded-md" />
                        <div className="flex-1">
                            <h2 className="text-lg text-neutral-950">{cartItem.name}</h2>
                        </div>
                        <div className="text-neutral-950">{cartItem.price}</div>
                    </div>
                ))}
            </div>

            {/* Delivery Information */}
            <h2 className="text-2xl font-title text-neutral-950 mt-10 mb-4">Delivery Information</h2>

            <form className="space-y-6">
                <div>
                    <label className="block text-neutral-950 mb-2">Address</label>
                    <input type="text" autoComplete="street-address" className="w-full p-2 border border-neutral-300 rounded-md" placeholder="Enter your address" />
                </div>
                <div>
                    <label className="block text-neutral-950 mb-2">Delivery Type</label>
                    <select className="w-full p-2 border border-neutral-300 rounded-md"
                        onChange={e => setDeliveryType(e.target.value as DeliveryType)}>
                        {Object.keys(DeliveryType).map(deliveryType => (
                            <option key={deliveryType} value={deliveryType}>
                                {deliveryType}
                            </option>
                        ))}
                    </select>
                </div>
            </form>

            {/* Total Price and Order Button */}
            <div className="flex justify-between items-center mt-8">
                <div className="text-neutral-950 text-xl">Total: {total} руб</div>
                <button
                    className="bg-orange-600 text-white py-2 px-6 rounded-full"
                    onClick={handleOrderButtonClick}
                    disabled={cartItemIds.length === 0}
                >
                    Order
                </button>
            </div>
        </div>
    );
};

