import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleIngredient } from '../../../api/ingredientData';
import IngredientForm from '../../../components/forms/IngredientForm';

export default function EditIngredient() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleIngredient(id).then(setEditItem);
  }, [id]);

  return (<IngredientForm obj={editItem} />);
}
