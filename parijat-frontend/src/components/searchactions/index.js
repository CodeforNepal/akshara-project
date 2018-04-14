import { h } from 'preact';
import Filters from '../filters';
import style from './style';

const SearchActions = () => (
	<div className={style.SearchActions__Container}>
		<Filters />
	</div>
);

export default SearchActions;
