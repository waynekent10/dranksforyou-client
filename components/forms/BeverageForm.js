import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createBeverage, updateBeverage } from '../../api/beverageData';
import { getIngredients } from '../../api/ingredientData';
import { getLiquors } from '../../api/liquorData';

const initialState = {
  name: '',
  price: '',
  description: '',
  ingredientId: 0,
  liquorId: 0,
  image: '',
  id: 0,
};

export default function BeverageForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [ingredients, setIngredients] = useState([]);
  const [liquors, setLiquors] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getIngredients().then(setIngredients);
    getLiquors().then(setLiquors);

    if (obj.id) {
      setFormInput({
        id: obj.id,
        name: obj.name,
        image: obj.image,
        price: obj.price,
        userId: user.id,
        liquor_id: obj.liquor?.id || 1,
        ingredient_id: obj.ingredient?.id || 1,
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
      updateBeverage(formInput).then(() => router.push('/beverages'));
    } else {
      const payload = { ...formInput };
      createBeverage(payload).then(() => router.push('/beverages'));
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.id ? 'Update' : 'Create'} Beverage</h2>

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

      {/* Name INPUT */}
      <FloatingLabel controlId="floatingInput1" label="Description" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter a Description"
          name="description"
          value={formInput.description}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* Image URL INPUT */}
      <FloatingLabel controlId="floatingInput2" label="Image URL" className="mb-3">
        <Form.Control
          type="url"
          placeholder="Enter Image URL"
          name="image"
          value={formInput.image}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* Liquor Select */}
      <FloatingLabel controlId="floatingSelect" label="Liquor" className="mb-3">
        <Form.Select
          aria-label="Liquor"
          name="liquor_id"
          onChange={handleChange}
          value={formInput.liquor_id}
          required
        >
          <option value="">Select a Liquor</option>
          {liquors?.map((liquor) => (
            <option key={liquor.id} value={liquor.id}>
              {liquor.name}
            </option>
          ))}
        </Form.Select>
      </FloatingLabel>

      {/* Ingredient Select */}
      <FloatingLabel controlId="floatingSelect2" label="Ingredient" className="mb-3">
        <Form.Select
          aria-label="Ingredient"
          name="ingredient_id"
          onChange={handleChange}
          value={formInput.ingredient_id}
          required
        >
          <option value="">Select an Ingredient</option>
          {ingredients?.map((ingredient) => (
            <option key={ingredient.id} value={ingredient.id}>
              {ingredient.name}
            </option>
          ))}
        </Form.Select>
      </FloatingLabel>

      {/* Price INPUT */}
      <FloatingLabel controlId="floatingInput3" label="Price" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter Price"
          name="price"
          value={formInput.price}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* Submit Button */}
      <Button type="submit">{obj.id ? 'Update' : 'Create'} Beverage</Button>
    </Form>
  );
}

BeverageForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    liquor: PropTypes.shape({
      id: PropTypes.number,
    }),
    ingredient: PropTypes.shape({
      id: PropTypes.number,
    }),
  }),
};

BeverageForm.defaultProps = {
  obj: initialState,
};
