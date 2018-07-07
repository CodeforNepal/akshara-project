import { h } from 'preact';
import get from 'lodash/get';
import style from './style';
import { Link } from 'preact-router/match';

export default props => (
	<div className={style.SearchItem__Container}>
		<a
			href={`/content/${props.result._id}`}
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
	</div>
);
