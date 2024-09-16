import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { createLiquor, updateLiquor } from '../../api/liquorData';
import { useAuth } from '../../utils/context/authContext';

const initialState = {
  name: '',
  user_id: '',
};

export default function LiquorForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.id) setFormInput(obj);
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
      updateLiquor(formInput).then(() => router.push('/liquors'));
    } else {
      const payload = { ...formInput, user_id: user.id };
      createLiquor(payload).then(() => router.push('/liquors'));
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.id ? 'Update' : 'Create'} Liquor</h2>

      {/* Name INPUT */}
      <FloatingLabel controlId="floatingInput1" label="Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter the name"
          name="name"
          value={formInput.name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* Submit Button */}
      <Button type="submit">{obj.id ? 'Update' : 'Create'} Liquor</Button>
    </Form>
  );
}

LiquorForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    user_id: PropTypes.string,
  }),
};

LiquorForm.defaultProps = {
  obj: initialState,
};
