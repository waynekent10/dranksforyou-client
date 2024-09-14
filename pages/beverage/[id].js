import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Image } from 'react-bootstrap';
import { getSingleBeverage } from '../../api/beverageData';

export default function ViewBeverage() {
  const [beverage, setBeverage] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  const viewCreatedBeverage = () => {
    getSingleBeverage(id).then(setBeverage).catch(console.error);
  };

  useEffect(() => {
    if (id) {
      viewCreatedBeverage();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (!beverage) return <p>Loading...</p>;

  return (
    <>
      <div className="mt-5 d-flex flex-wrap">
        <div className="d-flex flex-column">
          <Image src={beverage.image} alt={beverage.name} style={{ width: '300px' }} />
        </div>
        <div className="text-red ms-5 details">
          <h5>Beverage Name: {beverage.name}</h5>
          <p>Description: {beverage.description}</p>
          <p>Price: {beverage.price}</p>
        </div>
      </div>
    </>
  );
}
