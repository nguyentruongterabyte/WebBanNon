import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

const CustomerItem = ({ data, onClickDetails }) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>{data.username}</Card.Title>
        <Card.Text>
          Email: {data.email}
          <br />
          Mobile: {data.mobile}
        </Card.Text>
        <Button variant="primary" onClick={() => onClickDetails(data.id)}>Details</Button>
      </Card.Body>
    </Card>
  );
};

CustomerItem.propTypes = {
  data: PropTypes.object.isRequired,
  onClickDetails: PropTypes.func.isRequired,
};

export default CustomerItem;
