import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import BeverageForm from '../../../components/forms/BeverageForm';
import { getSingleBeverage } from '../../../api/beverageData';

export default function EditBeverage() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleBeverage(id).then(setEditItem);
  }, [id]);

  return (<BeverageForm obj={editItem} />);
}
