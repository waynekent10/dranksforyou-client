import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import Head from 'next/head';
import { useAuth } from '../utils/context/authContext';
import { getOrderBevs } from '../api/orderBeverageData';
import OrderBeverageCard from '../components/cards/OrderBeverageCard';

export default function OrderBeveragesPage() {
  const [orderBeverages, setOrderBeverages] = useState([]);
  const { user } = useAuth();

  const getAllOrderBeverages = () => {
    getOrderBevs(user.uid).then(setOrderBeverages);
  };

  useEffect(() => {
    getAllOrderBeverages();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <>
      <Head>
        <title>Order Beverages</title>
      </Head>
      <div className="text-center my-4">
        <Link href="/orderbeverage/new" passHref>
          <Button>Add Order Beverage</Button>
        </Link>
      </div>
      <div style={{ margin: '20px' }} className="d-flex flex-wrap">
        {orderBeverages.map((orderBeverage) => (
          <OrderBeverageCard key={orderBeverage.id} orderBeverageObj={orderBeverage} onUpdate={getAllOrderBeverages} />
        ))}
      </div>
    </>
  );
}
