import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

const CustomerItem = ({ data, onClickDetails }) => {
  return (
    <tr>
      <td>{data.id}</td>
      <td>{data.username}</td>
      <td>{data.email}</td>
      <td>{data.mobile}</td>
      <td>
        <Button variant="primary" onClick={() => onClickDetails(data.id)}>
          Details
        </Button>
      </td>
    </tr>
  );
};

CustomerItem.propTypes = {
  data: PropTypes.object.isRequired,
  onClickDetails: PropTypes.func.isRequired,
};

export default CustomerItem;
