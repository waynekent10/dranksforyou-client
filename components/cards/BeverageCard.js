import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';
import { deleteSingleOrder } from '../../api/orderData';
import { useAuth } from '../../utils/context/authContext';

function BeverageCard({ beverageObj, onUpdate }) {
  const { user } = useAuth(); // Get the currently authenticated user
  const deleteTheBeverage = () => {
    if (window.confirm(`Delete ${beverageObj.name}?`)) {
      deleteSingleOrder(beverageObj.id).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={beverageObj.image} alt={beverageObj.name} style={{ height: '300px' }} />
      <Card.Body>
        <Card.Title>Name: {beverageObj.name}</Card.Title>
        <Card.Text>Description: {beverageObj.description}</Card.Text>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Link href={`/beverage/${beverageObj.id}`} passHref>
            <Button variant="success" className="m-2">VIEW</Button>
          </Link>
          {user.id === beverageObj.user.id && (
            <>
              <Link href={`/beverage/edit/${beverageObj.id}`} passHref>
                <Button variant="warning" className="m-2">EDIT</Button>
              </Link>
              <Button variant="secondary" onClick={deleteTheBeverage} className="m-2">
                DELETE
              </Button>
            </>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}

BeverageCard.propTypes = {
  beverageObj: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default BeverageCard;
