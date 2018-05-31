import { h } from 'preact';
import style from './style.css';

const Loading = () => (
	<div className={style.Loading__Backdrop}>
		<span className={style.Loading__Content}>Loading...</span>
	</div>
);

export default Loading;
