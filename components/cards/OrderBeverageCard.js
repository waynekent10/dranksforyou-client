import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { deleteSingleOrderBev } from '../../api/orderBeverageData';

export default function OrderBeverageCard({ orderBeverageObj, onUpdate }) {
  const deleteTheOb = () => {
    if (window.confirm`Delete ${orderBeverageObj.id}?`) {
      deleteSingleOrderBev(orderBeverageObj.id).then(() => onUpdate());
    }
  };

  return (
    <Card className="card" style={{ width: '18rem', margin: '10px', border: '1px solid' }}>
      <Card.Title style={{ textAlign: 'center', paddingTop: '10px' }}>{orderBeverageObj.id}</Card.Title>
      <Card.Body>

        <Button variant="danger" onClick={deleteTheOb} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

OrderBeverageCard.propTypes = {
  orderBeverageObj: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
