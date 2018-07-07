import { h, Component } from 'preact';
import Toolbar from 'preact-material-components/Toolbar';
import 'preact-material-components/Toolbar/style.css';
import { route } from 'preact-router';
import Header from '../../components/header';
import Loading from '../../components/loading';
import { getContent } from '../../api';
import style from './style';

function goBack() {
	route('/search');
}

const Item = ({ result }) => (
	<div className={style.Item__Poem}>
		<h3>{result.title}</h3>
		<h4><a href={"../search?author[0]="+result.author}>{result.author}</a></h4>
		<div>{result.content.split('\n').map(paragraph => <p>{paragraph}</p>)}</div>
	</div>
);

const NavigationBack = () => (
	<Toolbar.Icon navigation onClick={goBack}>
		arrow_back_ios
	</Toolbar.Icon>
);

const Content = ({ result }) => (
	<div>
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
				<Header>
					<Toolbar.Section align-start>
						<NavigationBack />
						<Toolbar.Title> सङ्ग्रह</Toolbar.Title>
					</Toolbar.Section>
				</Header>
				{this.state.result != null ? (
					<Content result={this.state.result} />
				) : (
					<Loading />
				)}
			</div>
		);
	}
}

export default ContentPage;
