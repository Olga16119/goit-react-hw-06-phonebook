import { useDispatch, useSelector } from 'react-redux';
import { getFilter } from 'redux/selectors';
import { changeFilter } from 'redux/filterSlice';

const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(getFilter);

  return (
    <input
      type="text"
      name="filter"
      value={filter}
      onChange={event => {
        dispatch(changeFilter(event.target.value));
      }}
      placeholder="Enter name four search"
    />
  );
};

export default Filter;
