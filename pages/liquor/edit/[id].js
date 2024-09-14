import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleLiquor } from '../../../api/liquorData';
import LiquorForm from '../../../components/forms/LiquorForm';

export default function EditLiquor() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleLiquor(id).then(setEditItem);
  }, [id]);

  return (<LiquorForm obj={editItem} />);
}
