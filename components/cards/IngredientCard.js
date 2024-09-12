import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';
import { deleteSingleIngredient } from '../../api/ingredientData';

function IngredientCard({ ingredientObj, onUpdate }) {
  const deleteAnIngredient = () => {
    if (window.confirm(`Delete ${ingredientObj.name}?`)) {
      deleteSingleIngredient(ingredientObj.id).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={ingredientObj.image} alt={ingredientObj.name} style={{ height: '300px' }} />
      <Card.Body>
        <Card.Title>Name: {ingredientObj.name}</Card.Title>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Link href={`/ingredients/${ingredientObj.id}`} passHref>
            <Button variant="success" className="m-2">VIEW</Button>
          </Link>
          <Link href={`/ingredients/edit/${ingredientObj.id}`} passHref>
            <Button variant="warning" className="m-2">EDIT</Button>
          </Link>
          <Button variant="secondary" onClick={deleteAnIngredient} className="m-2">
            DELETE
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

IngredientCard.propTypes = {
  ingredientObj: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default IngredientCard;
