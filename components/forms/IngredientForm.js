import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, FloatingLabel } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { createIngredient, updateIngredient } from '../../api/ingredientData';
import { useAuth } from '../../utils/context/authContext';

const initialState = {
  id: '',
  name: '',
  image: '',
};

function IngredientForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.id) setFormInput(obj);
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
      updateIngredient(formInput).then(() => router.push(`/ingredients/${obj.id}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createIngredient(payload).then(({ name }) => {
        const patchPayload = { id: name };
        updateIngredient(patchPayload).then(() => router.push('/ingredients'));
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.id ? 'Update' : 'Create'} Ingredient</h2>

      <FloatingLabel controlId="floatingInput1" label="Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter Ingredient name"
          name="name"
          value={formInput.name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* IMAGE INPUT */}
      <FloatingLabel controlId="floatingInput2" label="Image" className="mb-3">
        <Form.Control
          type="url"
          placeholder="Enter an image URL"
          name="image"
          value={formInput.image}
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
    id: PropTypes.string,
    name: PropTypes.string,
    image: PropTypes.string,
  }),
};

IngredientForm.defaultProps = {
  obj: initialState,
};

export default IngredientForm;
