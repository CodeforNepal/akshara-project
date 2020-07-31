import { h, Component } from 'preact';
import { route } from 'preact-router';
import { LogOut } from 'preact-feather';
import Header from '../../components/header';
import Footer from '../../components/footer';
import Button from '../../components/button';
import { login, admin } from '../../api';
import style from './style';


class Admin extends Component {
	constructor() {
		super();
	}

	logout = () => {
		route('/login');
	}

	render() {
		return (
			<div>
				<Header>
					<div className={style.Header__Content}>
						<h2>व्यवस्थापन क्षेत्र</h2>
						<Button onClick={this.logout}><LogOut /> बाहिर</Button>
					</div>
				</Header>
				<div className={style.Admin__Content}>
					<p>
            This is admin page.
					</p>
				</div>
				<Footer />
			</div>
		);
	}
}

export default Admin;
