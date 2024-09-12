import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../../utils/context/authContext';
import { getSingleIngredient } from '../../../api/ingredientData';
import IngredientForm from '../../../components/forms/IngredientForm';

export default function EditSingleIngredient() {
  const [editIngredient, setEditIngredient] = useState({});
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();

  useEffect(() => {
    getSingleIngredient(id).then(setEditIngredient);
  }, [id]);

  return (
    <div>
      <button
        type="button"
        className="btn btn-outline-danger"
        onClick={() => {
          router.push('/ingredients');
        }}
      >Cancel
      </button>
      <IngredientForm ingredientObj={editIngredient} user={user} />
    </div>
  );
}
