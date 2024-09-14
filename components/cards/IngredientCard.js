import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';
import { deleteSingleIngredient } from '../../api/ingredientData';

export default function IngredientCard({ ingredientObj, onUpdate }) {
  const deleteThisIngredient = () => {
    if (window.confirm(`Delete ${ingredientObj.name}?`)) {
      deleteSingleIngredient(ingredientObj.id).then(() => onUpdate());
    }
  };

  return (
    <Card className="card" style={{ width: '18rem', margin: '10px', border: '1px solid' }}>
      <Card.Title>Name: {ingredientObj.name}</Card.Title>
      <Card.Body>
        <p style={{ textAlign: 'center' }} className="card-text bold">Image: {ingredientObj.image}</p>
        <Link href={`/ingredient/edit/${ingredientObj.id}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisIngredient} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

IngredientCard.propTypes = {
  ingredientObj: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
