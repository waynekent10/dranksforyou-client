import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import Head from 'next/head';
import { useAuth } from '../utils/context/authContext';
import { getLiquors } from '../api/liquorData';
import LiquorCard from '../components/cards/LiquorCard';

export default function LiquorsPage() {
  const [liquors, setliquors] = useState([]);
  const { user } = useAuth();
  const getAllLiquors = () => {
    getLiquors(user.uid).then(setliquors);
  };
  useEffect(() => {
    getAllLiquors();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  return (
    <>
      <Head>
        <title>Liquors</title>
      </Head>
      <div className="text-center my-4">
        <Link href="/liquor/new" passHref>
          <Button>Add Liquor</Button>
        </Link>
      </div>
      <div style={{ margin: '20px' }} className="d-flex flex-wrap">
        {liquors.map((liquor) => (
          <LiquorCard key={liquor.id} liquorObj={liquor} onUpdate={getAllLiquors} />
        ))}
      </div>
    </>
  );
}
