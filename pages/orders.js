import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import Head from 'next/head';
import { useAuth } from '../utils/context/authContext';
import { getOrders } from '../api/orderData';
import OrderCard from '../components/cards/OrderCard';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const { user } = useAuth();

  // Fetch beverages when user is available
  const getAllOrders = () => {
    if (user && user.uid) {
      getOrders(user.uid).then(setOrders).catch(console.error);
    }
  };

  useEffect(() => {
    getAllOrders(); // Call the function to get beverages
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <>
      <Head>
        <title>Orders</title>
      </Head>
      <div className="text-center my-4">
        <Link href="/order/new" passHref>
          <Button>Add Order</Button>
        </Link>
      </div>
      <div style={{ margin: '20px' }} className="d-flex flex-wrap">
        {orders.map((order) => (
          <OrderCard key={order.id} orderObj={order} onUpdate={getAllOrders} />
        ))}
      </div>
    </>
  );
}
