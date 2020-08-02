import { h } from 'preact';
import { useHistory } from 'react-router-dom';
import SearchBox from '../searchbox';
import Logo from '../logo';
import style from './style.css';

const HeaderLogo = () => (
	<div className={style.HeaderLogo}>
		<Logo />
	</div>
);

function Header({ query, children }) {
	let history = useHistory();

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
						history.push(`search?q=${queryValue}`);
					}}
				/>
			) : (
				children
			)}
		</div>
	);
}

export default Header;
