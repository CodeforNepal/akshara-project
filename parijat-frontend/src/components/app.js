import { h, Component } from 'preact';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import PrivateRoute from './router/PrivateRoute';
import Home from 'async!../routes/home';
import Search from 'async!../routes/search';
import Content from 'async!../routes/content';
import About from 'async!../routes/about';
import FairUse from 'async!../routes/fair-use';
import Login from 'async!../routes/login';
import Admin from 'async!../routes/admin';

export default class App extends Component {
	render() {
		return (
			<div id="app">
				<Router>
					<Switch>
						<Route exact path="/">
							<Home />
						</Route>
						<Route exact path="/login" component={Login} />
						<Route path="/search/:query?">
							<Search />
						</Route>
						<Route path="/content/:id">
							<Content />
						</Route>
						<Route exact path="/about">
							<About />
						</Route>
						<Route path="/fair-use">
							<FairUse />
						</Route>
						<PrivateRoute path="/admin">
							<Admin />
						</PrivateRoute>
					</Switch>
				</Router>
			</div>
		);
	}
}
