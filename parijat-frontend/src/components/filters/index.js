import { h, Component } from 'preact';
import Dialog from 'preact-material-components/Dialog';
import Button from 'preact-material-components/Button';
import List from 'preact-material-components/List';
import 'preact-material-components/List/style.css';
import 'preact-material-components/Button/style.css';
import 'preact-material-components/Dialog/style.css';
import Checkbox from 'preact-material-components/Checkbox';
import 'preact-material-components/Checkbox/style.css';
import { RefinementListFilter } from 'searchkit';
import style from './style';

const RefinementOption = props => (
	<List.LinkItem onClick={props.onClick}>
		<Checkbox checked={props.active} id="basic-checkbox" />
		<span className={style.RefinementOption__Label} for="basic-checkbox">{props.label}</span>
		<span className={style.RefinementOption__Option}>{props.count}</span>
	</List.LinkItem>
);

const FiltersList = () => (
	<List>
		<RefinementListFilter
			id="author"
			title="Author"
			field="author.keyword"
			operator="OR"
			itemComponent={RefinementOption}
		/>
	</List>
);

class Filters extends Component {
	render() {
		return (
			<div>
				<Button
					primary
					raised
					onClick={() => {
						this.scrollingDlg.MDComponent.show();
					}}
				>
					Filters
				</Button>
				<Dialog
					ref={scrollingDlg => {
						this.scrollingDlg = scrollingDlg;
					}}
				>
					<Dialog.Header>Select Filters</Dialog.Header>
					<Dialog.Body scrollable>
						<FiltersList />
					</Dialog.Body>
					<Dialog.Footer>
						<Dialog.FooterButton cancel>Close</Dialog.FooterButton>
					</Dialog.Footer>
				</Dialog>
			</div>
		);
	}
}

export default Filters;
