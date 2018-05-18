import { h, Component } from 'preact';
import Header from '../../components/header';
import { getContent } from '../../api';
import style from './style';

const Item = ({ result }) => (
	<div className={style.Item}>
		<h3>{result.title}</h3>
		<h4>{result.author}</h4>
		<div>{result.content.split('\n').map(paragraph => <p>{paragraph}</p>)}</div>
	</div>
);

const Content = ({ result }) => (
	<div>
		<Header>सङ्ग्रह</Header>
		{result.found ? <Item result={result._source} /> : <div>Not Found</div>}
	</div>
);

class ContentPage extends Component {
	constructor() {
		super();
		this.state = {
			result: null
		};
	}
	componentDidMount() {
		getContent(this.props.id).then(result => {
			this.setState({ result });
		});
	}

	render() {
		return (
			<div>
				{this.state.result != null ? (
					<Content result={this.state.result} />
				) : (
					<div>Loading...</div>
				)}
			</div>
		);
	}
}

export default ContentPage;
