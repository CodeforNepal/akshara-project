import { h, Component } from 'preact';
import Header from '../../components/header';
// import Button from 'preact-material-components/Button';
// import 'preact-material-components/Button/style.css';
import style from './style';

export default class Search extends Component {
	render({ query }) {
		return (
			<div class={style.profile}>
				<Header />
				<h1>Search: {query}</h1>
			</div>
		);
	}
}
