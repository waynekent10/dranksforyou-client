import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';
import { deleteSingleLiquor } from '../../api/liquorData';
import { useAuth } from '../../utils/context/authContext';

export default function LiquorCard({ liquorObj, onUpdate }) {
  const { user } = useAuth();
  const deleteThisLiquor = () => {
    if (window.confirm(`Delete ${liquorObj.name}?`)) {
      deleteSingleLiquor(liquorObj.id).then(() => onUpdate());
    }
  };

  return (
    <Card className="card" style={{ width: '18rem', margin: '10px', border: '1px solid' }}>
      <Card.Title>Name: {liquorObj.name}</Card.Title>
      <Card.Body>
        {user.id === liquorObj.user.id && (
          <>
            <Link href={`/liquor/edit/${liquorObj.id}`} passHref>
              <Button variant="info">EDIT</Button>
            </Link>
            <Button variant="danger" onClick={deleteThisLiquor} className="m-2">
              DELETE
            </Button>
          </>
        )}
      </Card.Body>
    </Card>
  );
}

LiquorCard.propTypes = {
  liquorObj: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
