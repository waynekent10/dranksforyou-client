import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import Head from 'next/head';
import { useAuth } from '../utils/context/authContext';
import { getBeverages } from '../api/beverageData';
import BeverageCard from '../components/cards/BeverageCard';

export default function BeveragesPage() {
  const [beverages, setBeverages] = useState([]);
  const { user } = useAuth();

  // Fetch beverages when user is available
  const getAllBeverages = () => {
    if (user && user.uid) {
      getBeverages(user.uid).then(setBeverages).catch(console.error);
    }
  };

  useEffect(() => {
    getAllBeverages(); // Call the function to get beverages
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <>
      <Head>
        <title>Beverages</title>
      </Head>
      <div className="text-center my-4">
        <Link href="/beverage/new" passHref>
          <Button>Add Beverage</Button>
        </Link>
      </div>
      <div style={{ margin: '20px' }} className="d-flex flex-wrap">
        {beverages.map((beverage) => (
          <BeverageCard key={beverage.id} beverageObj={beverage} onUpdate={getAllBeverages} />
        ))}
      </div>
    </>
  );
}
