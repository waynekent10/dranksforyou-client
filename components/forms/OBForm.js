import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { getOrders } from '../../api/orderData';
import { getBeverages } from '../../api/beverageData';
import { createOrderBev } from '../../api/orderBeverageData';

const initialState = {
  orderId: 0,
  beverageId: 0,
  id: 0,
};

export default function OrderBeverageForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [orders, setOrders] = useState([]);
  const [beverages, setBeverages] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getOrders().then(setOrders);
    getBeverages().then(setBeverages);

    if (obj.id) {
      setFormInput({
        id: obj.id,
        beverageId: obj.beverage?.id || 0,
        orderId: obj.order?.id || 0,
      });
    }
  }, [obj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      order: formInput.orderId,
      beverage: formInput.beverageId,
    };
    createOrderBev(payload).then(() => router.push('/orderbeverages'));
  };

  return (
    <Form onSubmit={handleSubmit}>

      {/* Order Select */}
      <FloatingLabel controlId="floatingSelect" label="Order" className="mb-3">
        <Form.Select
          aria-label="Order"
          name="orderId"
          onChange={handleChange}
          value={formInput.orderId}
          required
        >
          <option value="">Select an Order</option>
          {orders?.map((order) => (
            <option key={order.id} value={order.id}>
              {order.id}
            </option>
          ))}
        </Form.Select>
      </FloatingLabel>

      {/* Beverage Select */}
      <FloatingLabel controlId="floatingSelect2" label="Beverage" className="mb-3">
        <Form.Select
          aria-label="Beverage"
          name="beverageId"
          onChange={handleChange}
          value={formInput.beverageId}
          required
        >
          <option value="">Select a Beverage</option>
          {beverages?.map((beverage) => (
            <option key={beverage.id} value={beverage.id}>
              {beverage.id}
            </option>
          ))}
        </Form.Select>
      </FloatingLabel>

      {/* Submit Button */}
      <Button type="submit">Create Order Beverage</Button>

    </Form>
  );
}

OrderBeverageForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    order: PropTypes.shape({
      id: PropTypes.number,
    }),
    beverage: PropTypes.shape({
      id: PropTypes.number,
    }),
  }),
};

OrderBeverageForm.defaultProps = {
  obj: initialState,
};
