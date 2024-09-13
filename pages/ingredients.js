import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import Head from 'next/head';
import { getIngredients } from '../api/ingredientData';
import IngredientCard from '../components/cards/IngredientCard';

export default function Activity() {
  const [ingredients, setIngredients] = useState([]);

  const getAllIngredients = () => {
    getIngredients().then(setIngredients);
  };
  useEffect(() => {
    getAllIngredients();
  }, []);
  return (
    <>
      <Head>
        <title>Ingredients</title>
      </Head>
      <div className="text-center my-4">
        <Link href="/ingredient/new" passHref>
          <Button>Add Ingredient</Button>
        </Link>
      </div>
      <div style={{ margin: '20px' }} className="d-flex flex-wrap">
        {ingredients.map((ingredient) => (
          <IngredientCard key={ingredient.id} ingredientObj={ingredient} onUpdate={getAllIngredients} />
        ))}
      </div>
    </>
  );
}
