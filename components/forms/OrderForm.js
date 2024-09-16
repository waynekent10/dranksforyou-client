import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FloatingLabel, Form, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { createOrder, updateOrder } from '../../api/orderData';
import { getUsers } from '../../api/userData';
import { useAuth } from '../../utils/context/authContext';

const initialState = {
  user_id: '',
  order_total: '',
  paymen_type: '',
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
        order_total: obj.order_total,
        payment_type: obj.payment_type,
        user_id: obj.user_id || user.id,
      });
    }
  }, [obj, user]);

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
      const payload = { ...formInput, user_id: user.id };
      createOrder(payload).then(() => router.push('/orders'));
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {/* User Select */}
      <FloatingLabel controlId="floatingSelect" label="User" className="mb-3">
        <Form.Select
          aria-label="User"
          name="user_id"
          onChange={handleChange}
          value={formInput.user_id}
          required
        >
          <option value="">Select a User</option>
          {users?.map((u) => (
            <option key={u.id} value={u.id}>
              {u.name}
            </option>
          ))}
        </Form.Select>
      </FloatingLabel>

      {/* Order Total Input */}
      <FloatingLabel controlId="floatingInput2" label="Order Total" className="mb-3">
        <Form.Control
          type="number"
          placeholder="Enter Order Total"
          name="order_total"
          value={formInput.order_total}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* Payment Type Input */}
      <FloatingLabel controlId="floatingInput3" label="Payment Type" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter Payment Type"
          name="payment_type"
          value={formInput.payment_type}
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
    user_id: PropTypes.string,
    order_total: PropTypes.string,
    payment_type: PropTypes.string,
  }),
};

OrderForm.defaultProps = {
  obj: initialState,
};
