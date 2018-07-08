import { h, Component } from 'preact';
import Dialog from 'preact-material-components/Dialog';
import 'preact-material-components/Dialog/style.css';
import Checkbox from 'preact-material-components/Checkbox';
import 'preact-material-components/Checkbox/style.css';
import Button from '../button';
import { RefinementListFilter } from 'searchkit';
import style from './style';

const RefinementOption = props => (
	<li className={style.RefinementOption__Container} onClick={props.onClick}>
		<input type="checkbox" checked={props.active} id="basic-checkbox" />
		<span className={style.RefinementOption__Label} for="basic-checkbox">
			{props.label}
		</span>
		<span className={style.RefinementOption__Count}>({props.count})</span>
	</li>
);

const FiltersList = () => (
	<ul className={style.FiltersList__Container}>
		<RefinementListFilter
			id="author"
			size={7}
			title="Author"
			field="author.keyword"
			operator="OR"
			itemComponent={RefinementOption}
		/>
	</ul>
);

class Filters extends Component {
	render() {
		return (
			<div className={style.Filters__Container}>
				<div className={style.Filters__Mobile}>
					<Button
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
				<div className={style.Filters__Desktop}>
					<FiltersList />
				</div>
			</div>
		);
	}
}

export default Filters;
