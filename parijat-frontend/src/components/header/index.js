import { h, Component } from 'preact';
import { route } from 'preact-router';
import SearchBox from '../searchbox';
import Logo from '../logo';
import style from './style.css';

const HeaderLogo = () => (
	<div className={style.HeaderLogo}>
		<Logo />
	</div>
);

export default class Header extends Component {
	linkTo = path => () => {
		route(path);
	};

	render() {
		const { query, children } = this.props;

		const shouldShowSearchBox = children == null || children && children.length === 0;
		return (
			<div className={style.Header}>
				<HeaderLogo />
				{shouldShowSearchBox ? (
					<SearchBox
						queryFields={{
							'title': 'शिर्षक',
							'author': 'लेखक'
						}}
						onSubmit={queryValue => {
							route(`search?q=${queryValue}`);
						}}
					/>
				) : (
					children
				)}
			</div>
		);
	}
}
