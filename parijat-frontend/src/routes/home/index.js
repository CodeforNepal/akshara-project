import { h, Component } from 'preact';
import 'preact-material-components/Button/style.css';
import { route } from 'preact-router';
import SearchBox from '../../components/searchbox';
import style from './style';

export default class Home extends Component {
	render() {
		return (
			<div class={style.Home}>
				<div class={style.Logo}>सङ्ग्रह</div>
				<div class={style.SearchBox}>
					<SearchBox
						onSubmit={queryValue => {
							route(`search?q=${queryValue}`);
						}}
					/>
				</div>
			</div>
		);
	}
}
