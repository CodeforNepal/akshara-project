import { h } from 'preact';
import { SearchkitComponent } from 'searchkit';

export default class CurrentQuery extends SearchkitComponent {
	render() {
		const queryString = decodeURI(this.getQuery().index.queryString);
		return queryString !== '' ? (
			<div>"{queryString}" को नतिजा</div>
		) : null;
	}
}
