import { useEffect, useState } from "react";
import "react-day-picker/style.css";
import { Order, Painting } from "../client/platform.models";
import { useApiClient } from "../client/platform.api.context";
import { useSession } from "../session/session.context";

export const PersonalAccount = () => {
	const apiClient = useApiClient()
	const { user } = useSession()
	const [orders, setOrders] = useState<Order[]>([]);
	const [paintings, setPaintings] = useState<Painting[]>([]);

	useEffect(() => {
		apiClient.getOrders(user)
			.then((response) => {
				setOrders(response.data)
			})
			.catch((err) => {
				console.log(err)
			});
	}, [apiClient])

	useEffect(() => {
		const paintingIds = orders.flatMap(value => value.paintings)

		if (paintingIds.length != 0) {
			apiClient.getPaintingsByIdList(paintingIds)
				.then((response) => {
					setPaintings(response.data);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}, [apiClient, orders])

	return (
		<div>
			{/* Order History Section */}
			<section className="my-6">
				<h2 className="text-lg font-bold text-neutral-950">Order History</h2>
				{
					(orders.length == 0)
						? (<p className="text-center mt-4 text-gray-600">History is empty now</p>)
						: orders?.map((order) => {
							return (
								<details className="mt-4 border border-neutral-200 p-4 rounded-md">
									<summary className="cursor-pointer flex justify-between items-center">
										<span>Order #{order.id} - Total: {order.total} - Status: {order.status}</span>
										<span className="material-symbols-outlined">expand_more</span>
									</summary>
									<div className="mt-4 space-y-4">
										{/* Delivery Details */}
										<div className="text-neutral-950">
											<p className="break-all">
												<strong>Delivery Address:</strong> {JSON.stringify(order.shipmentInfo?.address)}</p>
											<p>
												<strong>Delivery Type:</strong> {order.shipmentInfo?.deliveryType}</p>
										</div>
										{/* Ordered Items */}
										<div className="grid md:grid-cols-2 gap-4">
											{
												order.paintings.map((paintingId) => {
													const painting = paintings?.find((value, _) => value.id == paintingId)
													return (
														<div className="flex items-center space-x-4">
															<img
																className="w-[100px] h-[100px] object-cover"
																src={painting?.paintingImages[0].imageUrl}
															/>
															<div>
																<p className="font-semibold text-neutral-950">{painting?.name}</p>
																<p className="text-neutral-950">Size: {painting?.dimensions.width} x {painting?.dimensions.height}</p>
																<p className="text-neutral-950">{painting?.price}</p>
															</div>
														</div>
													)
												})
											}
										</div>
									</div>
								</details>
							)
						})
				}
			</section>
		</div>
	)
}

