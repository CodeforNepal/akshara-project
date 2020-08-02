import { h, Component } from 'preact';
import { AlertTriangle, LogIn } from 'preact-feather';
import Loading from '../../components/loading';
import Button from '../../components/button';
import Logo from '../../components/logo';
import Footer from '../../components/footer';
import { login, admin } from '../../api';
import style from './style';


class LoginPage extends Component {
	constructor() {
		super();
    this.state = {
      username: '',
      paassword: '',
			error: null,
			loading: false,
    };
	}

  setUsername = ({ target: { value }}) => {
    this.setState({ username:  value, error: false });
  }

  setPassword = ({ target: { value }}) => {
    this.setState({ password:  value, error: false });
  }

	submitForm = (event) => {
		event.preventDefault();
		this.login();
	}

  login = () => {
    const { username, password } = this.state;
		this.setState({ loading: true });
    login({ username, password }).then(({ token }) => {
			this.setState({ loading: false });
			if (!token) {
				this.setState({ error: true });
				return
			}
			localStorage.setItem('token', token);
			this.props.history.push('/admin');
    });
  }

	componentWillMount = () => {
		localStorage.removeItem('token');
	}

	render() {
		const { loading } = this.state;
		return (
			<div className={style.LoginPage}>
				{ loading ? <Loading /> : null }
				<Logo />
				<div className={style.Login__Container}>
					<form onSubmit={this.submitForm} className={style.Login__Content}>
						<h2>सुरक्षित प्रवेश</h2>
						{ this.state.error ? <div className={style.Login__Content__Error}><AlertTriangle /> प्रवेश गर्न सकिएन</div> : null }
						<p>
	            <input disabled={loading} placeholder="प्रयोग कर्ता" value={this.state.username} onChange={this.setUsername} />
						</p>
	          <p>
	            <input disabled={loading} placeholder="गोप्य शब्द" type="password" value={this.state.password} onChange={this.setPassword} />
	          </p>
	          <Button disabled={loading} type="submit"><LogIn /> प्रवेश</Button>
					</form>
				</div>
				<Footer />
			</div>
		);
	}
}

export default LoginPage;
