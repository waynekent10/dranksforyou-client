import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { deleteSingleOrderBev } from '../../api/orderBeverageData';

export default function OrderBeverageCard({ orderBeverageObj, onUpdate }) {
  const deleteTheOb = () => {
    if (window.confirm(`Delete ${orderBeverageObj.beverage.name}?`)) {
      deleteSingleOrderBev(orderBeverageObj.id).then(() => onUpdate());
    }
  };

  return (
    <Card className="card" style={{ width: '18rem', margin: '10px', border: '1px solid' }}>
      <Card.Img variant="top" src={orderBeverageObj.beverage.image} alt={orderBeverageObj.beverage.name} style={{ height: '200px' }} />
      <Card.Body>
        <Card.Title>{orderBeverageObj.beverage.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Price: ${orderBeverageObj.beverage.price}</Card.Subtitle>
        <Card.Text>
          Description: {orderBeverageObj.beverage.description}
        </Card.Text>
        <Card.Text>
          Order Total: ${orderBeverageObj.order.order_total} <br />
          Payment Type: {orderBeverageObj.order.payment_type}
        </Card.Text>
        <Button variant="danger" onClick={deleteTheOb} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

OrderBeverageCard.propTypes = {
  orderBeverageObj: PropTypes.shape({
    id: PropTypes.number.isRequired,
    order: PropTypes.shape({
      id: PropTypes.number.isRequired,
      order_total: PropTypes.string.isRequired,
      payment_type: PropTypes.string.isRequired,
    }).isRequired,
    beverage: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
