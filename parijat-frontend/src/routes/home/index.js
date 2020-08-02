import { h, Component } from 'preact';
import { useHistory } from 'react-router-dom';
import SearchBox from '../../components/searchbox';
import Footer from '../../components/footer';
import Logo from '../../components/logo';
import style from './style';

function Home() {
	let history = useHistory();
	return (
		<div class={style.Home}>
			<div class={style.Logo}>
				<Logo animated />
			</div>
			<div class={style.SearchBox}>
				<SearchBox
					autofocus
					queryFields={{
						title: 'शिर्षक',
						author: 'लेखक'
					}}
					onSubmit={queryValue => {
						history.push(`search?q=${queryValue}`);
					}}
				/>
			</div>
			<Footer/>
		</div>
	);
}

export default Home;
