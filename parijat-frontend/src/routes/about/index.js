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
						<Toolbar.Title> हाम्रो बारेमा</Toolbar.Title>
					</Toolbar.Section>
				</Header>
				<div className={style.About__Content}>
					<div className={style.About__ContentGroup}>
						<h3>About <a className={style.About__Link} href="http://codefornepal.org/en/" target="_blank">Code for Nepal</a></h3>
						<p><a className={style.About__Link} href="http://codefornepal.org/en/" target="_blank">Code for Nepal</a> uses digital technology to help Nepal prosper in the 21st century. Since 2014, it has focused on increasing digital literacy, building tools to improve lives, increasing access to open data & right to information.</p>
						<p><a className={style.About__Link} href="http://codefornepal.org/en/" target="_blank">Code for Nepal</a> has identified the importance of open data and has proactively provided data on its platform. They were the pioneers to publish an interactive map (nepalmap.org) that easily showed national and district level data. They were also the first to launch an interactive, open-source map of earthquake casualties, which was picked up by Time magazine, Fast Company and the New York Times. They regularly conduct their own data mining projects, by collecting data manually from the internet or conducting surveys both online and offline.</p>
						<p><a className={style.About__Link} href="http://codefornepal.org/en/" target="_blank">Code for Nepal</a> strongly supports technological advancement that improves lives. The organization launched a prototype to rank schools in Nepal, created Asknepal.info, an open web platform, to increase the access of information to the general public & RahatPayo (rahatpayo.org), a web application, to collect real time feedback on earthquake survivors on kind of help they have received and to gauge the existing gap.</p>
						<p>As of December 2017, <a className={style.About__Link} href="http://codefornepal.org/en/" target="_blank">Code for Nepal</a> has partnered with local organizations to conduct digital training workshops in Nepal in Kathmandu, Dang, Birgunj, and few other places in Nepal. They were the first to organize a digital conference (#DigitalNepal) in Nepal</p>
						<p><a className={style.About__Link} href="http://codefornepal.org/en/" target="_blank">Code for Nepal</a> is an all-volunteer non-profit organization. The passion in the volunteers and community support has helped the organization conduct these projects so far. They received their first grant from Harvard’s Carr Center for Human Rights Policy in Spring 2014.</p>
					</div>
					<div className={style.About__Divider} />
					<div className={style.About__ContentGroup}>
						<h3>About <a className={style.About__Link} href="https://github.com/Code4Nepal/bay-area" target="_blank">Code for Nepal - Bay Area</a></h3>
						<p><a className={style.About__Link} href="https://github.com/Code4Nepal/bay-area" target="_blank">Code for Nepal's Bay Area Chapter</a> has been active since January 2017 and focuses on creating a warm open community in the bay area and elsewhere for volunteers to collaborate and engage in pushing forward digital technology for Nepal and Nepalese communities around the globe. We try to meet every Wednesday at 7:30 pm PST. Join us by subscribing to our mailing list: akshara-development-list@googlegroups.com</p>
					</div>
					<div className={style.About__Divider} />
					<div className={style.About__ContentGroup}>
						<h3>About सङ्ग्रह</h3>
						<p>सङ्ग्रह is a portal to digitize and archive literary works from Nepal and make them accessible online through a user-friendly searchable interface to readers all around the world.</p>
						<p>Recognizing the lack of an easy access to Nepali literary works in the internet, the सङ्ग्रह project started as an initiative to create an online repository that gathers literary works from Nepal in Nepali and other indigenous languages. The aim is to use digital technology to place Nepali literature before the widest possible audience and raise it to a more visible and influential position in Nepali culture. The objectives of सङ्ग्रह project are:
							<ul>
								<li>Digitize literatures of Nepal in Nepali and non-Nepali languages by established as well as emerging writers</li>
								<li>Create a platform where readers and enthusiasts of literature can browse, search and find relevant content with a customized powerful search facility</li>
								<li>Provide tools and resources for students and readers of literature to learn about different literary cultures of Nepal</li>
								<li>Maintain a free content, open source environment where users can edit the available content and upload new content</li>
							</ul>
						</p>
						<p>The सङ्ग्रह web portal will be equipped with the following features:
							<ul>
								<li>Full text search</li>
								<li>Facility to browse by different categories such as themes, genre, poets, periods, literary movements, languages, region, etc</li>
								<li>Interactive content designed to explore and learn more about the literature and the authors</li>
								<li>Links to related media - audio, video, art, and web resources </li>
								<li>Side-by-side translations of texts in different languages</li>
								<li>A dictionary, especially for materials in non Nepali languages so that they are accessible to all Nepali speakers</li>
							</ul>
						</p>
					</div>
				</div>
				<Footer/>
			</div>
		);
	}
}

export default ContentPage;
