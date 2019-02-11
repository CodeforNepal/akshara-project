import { h, Component } from 'preact';
import Toolbar from 'preact-material-components/Toolbar';
import 'preact-material-components/Toolbar/style.css';
import { route } from 'preact-router';
import Header from '../../components/header';
import Footer from '../../components/footer';
import Loading from '../../components/loading';
import { getContent } from '../../api';
import style from './style';

function goBack() {
	route('/');
}

const NavigationBack = () => (
	<Toolbar.Icon navigation onClick={goBack}>
		arrow_back_ios
	</Toolbar.Icon>
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
						<Toolbar.Title> उचित उपयोग जानकारी</Toolbar.Title>
					</Toolbar.Section>
				</Header>
				<div className={style.FairUse__Content}>
					<div className={style.FairUse__ContentGroup}>
						<p>

            यस वेबसाइटको सबै सामग्री एक
            <a href="https://www.copyright.gov/fair-use/more-info.html" target="_blank"> उचित उपयोगको </a> आधारमा प्रदान गरिएको छ।
            हामी कुनै पनि हानिको लागि जिम्मेवार छैनौं।
            यदि तपाइँ कुनै सामग्रीलाई वेबसाइटबाट हटाउन अनुरोध गर्न चाहनुहुन्छ भने, कृपया हामीलाई
            <a href="mailto:sangraha@codefornepal.org"> sangraha@codefornepal.org</a>  मा ईमेल पठाउनुहोस्।
						</p>
					</div>

					<div className={style.FairUse__Divider} />
				</div>
				<Footer />
			</div>
		);
	}
}

export default ContentPage;
