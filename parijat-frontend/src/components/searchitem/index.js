import { h } from 'preact';
import get from 'lodash/get';
import Card from 'preact-material-components/Card';
import 'preact-material-components/Card/style.css';
import style from './style';

export default props => (
	<Card className={style.SearchItem__Container}>
		<div
			className={style.SearchItem__Title}
			dangerouslySetInnerHTML={{
				__html: get(props.result, 'highlight.title', props.result._source.title)
			}}
		/>
		<div
			className={style.SearchItem__Author}
			dangerouslySetInnerHTML={{
				__html: get(
					props.result,
					'highlight.author',
					props.result._source.author
				)
			}}
		/>
		<div
			className={style.SearchItem__Description}
			dangerouslySetInnerHTML={{
				__html: get(
					props.result,
					'highlight.content',
					props.result._source.content
				)
			}}
		/>
	</Card>
);
