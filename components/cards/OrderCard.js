import React from 'react';
import PropTypes from 'prop-types';
import { Card, ListGroup, Button } from 'react-bootstrap';
import { deleteSingleOrder } from '../../api/orderData';
import { useAuth } from '../../utils/context/authContext';

function OrderCard({ orderObj, onUpdate }) {
  const { user } = useAuth();
  const userName = user?.fbUser?.displayName || 'Guest';

  const deleteTheOrder = () => {
    if (window.confirm(`Delete order with ID ${orderObj.id}?`)) {
      deleteSingleOrder(orderObj.id).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>Order ID: {orderObj.id}</Card.Title>
        <Card.Text>
          {userName}, Here is a summary of your order
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>Order Total: ${orderObj.order_total}</ListGroup.Item>
        <ListGroup.Item>Payment Type: {orderObj.payment_type}</ListGroup.Item>
      </ListGroup>
      {user.id === orderObj.user.id && (
        <Card.Body>
          <Button variant="secondary" onClick={deleteTheOrder} className="m-2">
            Delete
          </Button>
        </Card.Body>
      )}
    </Card>
  );
}

OrderCard.propTypes = {
  orderObj: PropTypes.shape({
    id: PropTypes.number.isRequired,
    order_total: PropTypes.string.isRequired,
    payment_type: PropTypes.string.isRequired,
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default OrderCard;
