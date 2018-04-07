import { h, Component } from 'preact';
import { route } from 'preact-router';
import Toolbar from 'preact-material-components/Toolbar';
import TextField from 'preact-material-components/TextField';
import 'preact-material-components/Toolbar/style.css';
import 'preact-material-components/TextField/style.css';
import SearchBox from '../searchbox';

export default class Header extends Component {

	linkTo = path => () => {
		route(path);
	};

	// goHome = this.linkTo('/');
	// goToMyProfile = this.linkTo('/profile');

	render() {
		return (
			<div>
				<Toolbar className="toolbar">
					<Toolbar.Row>
						<Toolbar.Section align-start>
							<Toolbar.Icon>menu</Toolbar.Icon>
							<SearchBox label="Help text" helpertext="This is the helptext" />
						</Toolbar.Section>
					</Toolbar.Row>
				</Toolbar>
			</div>
		);
	}
}
