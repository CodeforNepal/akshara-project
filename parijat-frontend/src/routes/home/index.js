import { h, Component } from 'preact';
import 'preact-material-components/Button/style.css';
import { route } from 'preact-router';
import SearchBox from '../../components/searchbox';
import Footer from '../../components/footer';
import Logo from '../../components/logo';
import style from './style';

export default class Home extends Component {
	render() {
		return (
			<div class={style.Home}>
				<div class={style.Logo}>
					<Logo />
				</div>
				<div class={style.SearchBox}>
					<SearchBox
						fields={['title', 'author']}
						onSubmit={queryValue => {
							route(`search?q=${queryValue}`);
						}}
					/>
				</div>
				<Footer/>
			</div>
		);
	}
}
