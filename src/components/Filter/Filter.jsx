import PropTypes from 'prop-types';

const Filter = ({ filter, onChange }) => {
  return (
    <input
      type="text"
      name="filter"
      value={filter}
      onChange={onChange}
      placeholder="Enter name four search"
    />
  );
};

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Filter;
