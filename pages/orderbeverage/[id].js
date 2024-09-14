import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Image } from 'react-bootstrap';
import { getSingleOrderBev } from '../../api/orderBeverageData';

export default function ViewOrderBeverage() {
  const [orderBeverage, setOrderBeverage] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  const viewCreatedOrderBeverage = () => {
    getSingleOrderBev(id).then(setOrderBeverage).catch(console.error);
  };

  useEffect(() => {
    if (id) {
      viewCreatedOrderBeverage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (!orderBeverage) return <p>Loading...</p>;

  return (
    <>
      <div className="mt-5 d-flex flex-wrap">
        <div className="d-flex flex-column">
          <Image src={orderBeverage.beverage.image} alt={orderBeverage.beverage.name} style={{ width: '300px' }} />
        </div>
        <div className="text-red ms-5 details">
          <h5>Beverage Name: {orderBeverage.beverage.name}</h5>
          <p>Description: {orderBeverage.beverage.description}</p>
          <p>Price: {orderBeverage.beverage.price}</p>
          <p>Payment Type: {orderBeverage.order.payment_type}</p>
        </div>
      </div>
    </>
  );
}
