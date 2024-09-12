import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import Head from 'next/head';
import { useAuth } from '../utils/context/authContext';
import { getIngredients } from '../api/ingredientData';
import IngredientCard from '../components/cards/IngredientCard';

export default function Ingredients() {
  const [ingredients, setIngredients] = useState([]);
  const { user } = useAuth();

  const getAllIngredients = () => {
    getIngredients(user.uid).then(setIngredients);
  };
  useEffect(() => {
    getAllIngredients();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <>
      <Head>
        <title>Ingredients</title>
      </Head>
      <header>
        <h1>What we put in your drinks</h1>
      </header>
      <div className="text-center my-4">
        <Link href="/ingredients/new" passHref>
          <Button>Add Ingredient</Button>
        </Link>
      </div>
      <div className="d-flex flex-wrap">
        {ingredients.map((ingredient) => (
          <IngredientCard key={ingredient.id} ingredientObj={ingredient} onUpdate={getAllIngredients} />
        ))}
      </div>
    </>
  );
}
