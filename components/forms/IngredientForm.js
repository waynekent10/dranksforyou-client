import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { createIngredient, updateIngredient } from '../../api/ingredientData';
import { useAuth } from '../../utils/context/authContext';

const initialState = {
  name: '',
  image: '',
  user_id: '',
};

export default function IngredientForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.id) {
      setFormInput({
        id: obj.id,
        name: obj.name,
        user_id: user.id,
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
      updateIngredient(formInput).then(() => router.push('/ingredients'));
    } else {
      const payload = { ...formInput, user_id: user.id };
      createIngredient(payload).then(() => router.push('/ingredients'));
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.id ? 'Update' : 'Create'} Ingredient</h2>

      {/* Name INPUT */}
      <FloatingLabel controlId="floatingInput1" label="Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter a Name"
          name="name"
          value={formInput.name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* SUBMIT BUTTON */}
      <Button type="submit">{obj.id ? 'Update' : 'Create'} Ingredient</Button>
    </Form>
  );
}

IngredientForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    user_id: PropTypes.string,
  }),
};

IngredientForm.defaultProps = {
  obj: initialState,
};
