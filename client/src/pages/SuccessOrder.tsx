import React, { useContext, useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom'; // or use `useRouter` if you're using Next.js
import { useApiClient } from '../client/platform.api.context';
import { useSession } from '../session/session.context';
import { Order } from '../client/platform.models';

const OrderSuccess: React.FC = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const apiClient = useApiClient()
  const { user } = useSession()

  useEffect(() => {
    if (!orderId) return;

      try {
        setLoading(true);
        apiClient.getOrder(user, orderId)
            .then(response => response.data ? setOrder(response.data) : setError("Order is not found"))
            .catch((err) => setError(err))
      } catch (err) {
        setError('Failed to load order details.');
      } finally {
        setLoading(false);
      }
  }, [orderId]);

  if (loading) return <p className="text-center mt-4 text-gray-600">Loading order details...</p>;
  if (error) return <p className="text-center mt-4 text-red-500">{error}</p>;

  return (
    <div className="max-w-2xl mx-auto my-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-green-600 mb-4">Order Success</h2>
      <p className="text-gray-700 mb-4">Thank you for your order! Here are your order details:</p>

      <div className="mb-4">
        <h3 className="text-lg font-semibold">Order ID:</h3>
        <p className="text-gray-800">{order?.id}</p>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold">Order Date:</h3>
        <p className="text-gray-800">{new Date(order?.creationDateTime ?? '').toLocaleString()}</p>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold">Total Amount:</h3>
        <p className="text-gray-800">${order?.total.toFixed(2)}</p>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold">Status:</h3>
        <p className="text-gray-800 capitalize">{order?.status}</p>
      </div>
    </div>
  );
};

export default OrderSuccess;
