import { useDispatch, useSelector } from 'react-redux';
import css from './SearchBox.module.css';
import { selectNameFilter } from '../../redux/filters/selectors';
import { changeFilter } from '../../redux/filters/slice';

const SearchBox = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectNameFilter);

  return (
    <div className={css.searchBox}>
      <label className={css.labelFilter} >
        <input
          className={css.inputFilter}
          type="text"
          value={filter}
          placeholder="Find contacts"
          onChange={e => dispatch(changeFilter(e.target.value))}
        />
      </label>
    </div>
  );
};

export default SearchBox;
