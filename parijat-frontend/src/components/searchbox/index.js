import { h, Component } from 'preact';
import Icon from 'preact-material-components/Icon';
import Button from 'preact-material-components/Button';
import 'preact-material-components/Button/style.css'
import style from './style';

export default class SearchBox extends Component {
	constructor() {
		super();
		this.state = {
			searchValue: ''
		};
	}

	onTextInputChange = (evnt) => {
		this.setState({
			searchValue: evnt.target.value
		});
	}

	handleSubmit = (evnt) => {
		evnt.preventDefault();
		this.props.onSubmit(this.state.searchValue);
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit} className={style.SearchBox}>
				<input value={this.state.searchValue} onChange={this.onTextInputChange} className={style.SearchBox__Input} />
				<Button type="submit" className={style.SearchBox__Button}><Icon>search</Icon></Button>
			</form>
		);
	}
}
