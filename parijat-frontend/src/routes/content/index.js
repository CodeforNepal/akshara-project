import { favItem } from '../../actions/user';
import { connect } from 'react-redux';
import { h, Component } from 'preact';
import Header from '../../components/header';
import Footer from '../../components/footer';
import Loading from '../../components/loading';
import ContentContainer from '../../components/contentContainer';
import { getContent } from '../../api';
import style from './style';
import renderHTML from 'react-render-html';

export const withUserFavourites = connect(
	({ user }) => ({
		favs: user.favs
	}),
	{ favItem }
);

const Item = ({ result }) => (
	<div className={style.Item__Poem}>
		<h3>{result.title}</h3>
		<h4>
			<a href={'../search?author[0]=' + result.author}>{result.author}</a>
		</h4>
		<div>
			{result.text.split('\n').map(paragraph => (
				<p>{renderHTML(paragraph)}</p>
			))}
		</div>
		<h4>
			श्रोत:{' '}
			{result.source ? (
				<a href={result.source_link}>{result.source}</a>
			) : (
				<span>अज्ञात</span>
			)}
		</h4>
	</div>
);

const Content = ({ result }) => (
	<div className={style.Content__Container}>
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

	favItem = () => {
		this.props.favItem(this.state.result);
	};

	render() {
		return (
			<div>
				<Header />
				<ContentContainer>
					{this.state.result != null ? (
						<Content result={this.state.result} />
					) : (
						<Loading />
					)}
				</ContentContainer>
				<Footer />
			</div>
		);
	}
}

export default withUserFavourites(ContentPage);
