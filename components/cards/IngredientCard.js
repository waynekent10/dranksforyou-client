import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';
import { deleteSingleIngredient } from '../../api/ingredientData';
import { useAuth } from '../../utils/context/authContext';

export default function IngredientCard({ ingredientObj, onUpdate }) {
  const { user } = useAuth();
  const deleteThisIngredient = () => {
    if (window.confirm(`Delete ${ingredientObj.name}?`)) {
      deleteSingleIngredient(ingredientObj.id).then(() => onUpdate());
    }
  };

  return (
    <Card className="card" style={{ width: '18rem', margin: '10px', border: '1px solid' }}>
      <Card.Title>Name: {ingredientObj.name}</Card.Title>
      <Card.Body>
        {user.id === ingredientObj.user.id && (
          <>
            <Link href={`/ingredient/edit/${ingredientObj.id}`} passHref>
              <Button variant="info">EDIT</Button>
            </Link>
            <Button variant="danger" onClick={deleteThisIngredient} className="m-2">
              DELETE
            </Button>
          </>
        )}
      </Card.Body>
    </Card>
  );
}

IngredientCard.propTypes = {
  ingredientObj: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
