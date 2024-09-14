import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FloatingLabel, Form, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { createOrder, updateOrder } from '../../api/orderData';
import { getUsers } from '../../api/userData';
import { useAuth } from '../../utils/context/authContext';

const initialState = {
  userId: '',
  orderTotal: '',
  paymentType: '',
  id: 0,
};

export default function OrderForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [users, setUsers] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getUsers().then(setUsers);

    if (obj.id) {
      setFormInput({
        id: obj.id,
        orderTotal: obj.orderTotal,
        paymentType: obj.paymentType,
        userId: obj.userId,
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
    if (obj.id) {
      updateOrder(formInput).then(() => router.push('/orders'));
    } else {
      createOrder(formInput).then(() => router.push('/orders'));
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {/* User Select */}
      <FloatingLabel controlId="floatingSelect" label="User" className="mb-3">
        <Form.Select
          aria-label="User"
          name="userId"
          onChange={handleChange}
          value={formInput.userId}
          required
        >
          <option value="">Select a User</option>
          {users?.map(() => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </Form.Select>
      </FloatingLabel>

      {/* Order Total Input */}
      <FloatingLabel controlId="floatingInput2" label="Order Total" className="mb-3">
        <Form.Control
          type="number"
          placeholder="Enter Order Total"
          name="orderTotal"
          value={formInput.orderTotal}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* Payment Type Input */}
      <FloatingLabel controlId="floatingInput3" label="Payment Type" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter Payment Type"
          name="paymentType"
          value={formInput.paymentType}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* Submit Button */}
      <Button type="submit">{obj.id ? 'Update' : 'Create'} Order</Button>
    </Form>
  );
}

OrderForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    userId: PropTypes.string,
    orderTotal: PropTypes.string,
    paymentType: PropTypes.string,
  }),
};

OrderForm.defaultProps = {
  obj: initialState,
};
