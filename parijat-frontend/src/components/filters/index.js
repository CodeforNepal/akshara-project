import { h, Component } from 'preact';
import Icon from 'preact-material-components/Icon';
import Dialog from 'preact-material-components/Dialog';
import 'preact-material-components/Dialog/style.css';
import 'preact-material-components/Checkbox/style.css';
import TransliteratedInput from '../transliteratedinput';
const omitBy = require('lodash/omitBy');
const isUndefined = require('lodash/isUndefined');
import Button from '../button';
import debounce from 'lodash/debounce';
import {
	FacetFilter,
	FacetAccessor,
	FilterBucket,
	TermsBucket,
	CardinalityMetric,
	RefinementListFilter
} from 'searchkit';
import style from './style';

/* This is disgusting code. We need our own state management. Searchkit abstractions are not very good */

class SearchableFacetAccessor extends FacetAccessor {
	performSearch = debounce(() => {
		this.searchkit.performSearch();
	}, 200);

	setSearchValue(searchValue) {
	 	this.searchValue = searchValue;
		this.performSearch();
	}

	buildOwnQuery(query) {
		if (!this.loadAggregations) {
			return query;
		}
		let excludedKey = this.isOrOperator() ? this.uuid : undefined;
		const result = query.setAggs(
			FilterBucket(
				this.uuid,
				/* This is changed to allow searching for filters */
				this.searchValue != null && this.searchValue !== ''
					? {
						match: { author: this.searchValue }
					  }
					: query.getFiltersWithoutKeys(excludedKey),
				...this.fieldContext.wrapAggregations(
					TermsBucket(
						this.options.field,
						this.options.field,
						omitBy(
							{
								size: this.size,
								order: this.getOrder(),
								include: this.options.include,
								exclude: this.options.exclude,
								min_doc_count: this.options.min_doc_count
							},
							isUndefined
						)
					),
					CardinalityMetric(this.options.field + '_count', this.options.field)
				)
			)
		);
		return result;
	}
}

class SearchableFacetFilter extends FacetFilter {
	getAccessorOptions() {
		const {
			field,
			id,
			operator,
			title,
			include,
			exclude,
			size,
			translations,
			orderKey,
			orderDirection,
			fieldOptions
		} = this.props;
		return {
			id,
			operator,
			title,
			size,
			include,
			exclude,
			field,
			translations,
			orderKey,
			orderDirection,
			fieldOptions
		};
	}

	componentWillReceiveProps(nextProps) {
		this.accessor.setSearchValue(nextProps.searchValue);
	}

	defineAccessor() {
		return new SearchableFacetAccessor(
			this.props.id,
			this.getAccessorOptions()
		);
	}
}

class FiltersListInput extends Component {
	state = {
		editable: false
	};

	showEdit = () => {
		this.setState({ editable: true });
	};

	hideEdit = () => {
		this.setState({ editable: false });
	};

	clear = () => {
		this.setState({ editable: false });
		this.props.clearSearchValue();
	};

	render() {
		const { editable } = this.state;
		const { title } = this.props;
		return (
			<div className={style.FiltersListInput__Container}>
				{editable ? (
					<div className={style.FiltersListInput__Editable}>
						<TransliteratedInput
							autofocus
							placeholder={`${title}`}
							value={this.props.searchValue}
							onInput={this.props.onInput}
						/>
						<button
							className={style.FiltersListInput__Button}
							onClick={this.clear}
						>
							<Icon>close</Icon>
						</button>
					</div>
				) : (
					<div className={style.FiltersListInput__NonEditable}>
						<strong>{title}</strong>
						<button
							className={style.FiltersListInput__Button}
							onClick={this.showEdit}
						>
							<Icon>search</Icon>
						</button>
					</div>
				)}
			</div>
		);
	}
}

class SearchableRefinementListFilter extends Component {
	state = {
		searchValue: ''
	};

	onSearchValueChange = (event) => {
		this.setSearchValue(event.target.value);
	}

	clearSearchValue = () => {
		this.setSearchValue('');
	}

	setSearchValue = (searchValue) => {
		this.setState({ searchValue });
	}

	render() {
		return (
			<div>
				<FiltersListInput
					searchValue={this.state.searchValue}
					onInput={this.onSearchValueChange}
					clearSearchValue={this.clearSearchValue}
					title={this.props.title}
				/>
				<SearchableFacetFilter
					id={this.props.id}
					size={this.props.size}
					title={this.props.title}
					field={this.props.field}
					operator={this.props.operator}
					searchValue={this.state.searchValue}
					itemComponent={RefinementOption}
				/>
			</div>
		);
	}
}

function StandardRefinementListFilter({ field, title, id, operator, itemComponent, size }) {
	return (
		<div>
			<div
				className={style.StandardRefinementListFilter__Title}
			>
				<strong>{title}</strong>
			</div>
			<RefinementListFilter
				field={field}
				title={title}
				id={id}
				operator={operator}
				itemComponent={itemComponent}
				size={size}
			/>
		</div>
	);
}

function FiltersList() {
	return (
		<ul className={style.FiltersList__Container}>
			<li className={style.FiltersList__Section}>
				<StandardRefinementListFilter
					field="lang"
					title="भाषा"
					id="lang"
					operator="OR"
					itemComponent={RefinementOption}
					size={7}
				/>
			</li>
			<li className={style.FiltersList__Section}>
				<StandardRefinementListFilter
					field="genre"
					title="विधा"
					id="genre"
					operator="OR"
					itemComponent={RefinementOption}
					size={7}
				/>
			</li>
			<li className={style.FiltersList__Section}>
				<SearchableRefinementListFilter
					field="author.keyword"
					title="लेखक"
					id="author"
					operator="OR"
					size={7}
				/>
			</li>
		</ul>
	);
}

const RefinementOption = props => (
	<div>
		<span onClick={props.onClick} className={style.RefinementOption__Container}>
			<input type="checkbox" checked={props.active} id="basic-checkbox" />
			<span className={style.RefinementOption__Label} for="basic-checkbox">
				{props.label}
			</span>
			<span className={style.RefinementOption__Count}>({props.count})</span>
		</span>
	</div>
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
