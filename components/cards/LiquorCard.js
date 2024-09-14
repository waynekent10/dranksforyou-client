import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';
import { deleteSingleLiquor } from '../../api/liquorData';

export default function LiquorCard({ liquorObj, onUpdate }) {
  const deleteThisLiquor = () => {
    if (window.confirm(`Delete ${liquorObj.name}?`)) {
      deleteSingleLiquor(liquorObj.id).then(() => onUpdate());
    }
  };

  return (
    <Card className="card" style={{ width: '18rem', margin: '10px', border: '1px solid' }}>
      <Card.Title>Name: {liquorObj.name}</Card.Title>
      <Card.Body>
        <Link href={`/liquor/edit/${liquorObj.id}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisLiquor} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

LiquorCard.propTypes = {
  liquorObj: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
