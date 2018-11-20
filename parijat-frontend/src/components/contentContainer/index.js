import { h } from 'preact';
import style from './style.css';

export default function ContentContainer({ children, ...otherProps }) {
	return (
		<div {...otherProps} className={style.ContentContainer}>
			{children}
		</div>
	);
}
