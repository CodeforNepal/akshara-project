import { h, Component } from 'preact';
import Icon from 'preact-material-components/Icon';
import ReactAutocomplete from 'react-autocomplete';
import debounce from 'lodash/debounce';
import { getSuggestions } from '../../api';
import { nepaliTransliterator } from '../../tools/transliterate';
let style = {};
// import style from './style';

function isSuggestionsEmpty(sug1, sug2) {
	return sug1.length === 0 && sug2.length === 0;
}

const NoSuggestion = ({ onSuggestionClick }) => (
	<div className={style.NoSuggestion}>
		<p>
			<Icon className={style.NoSuggestion__Icon}>help</Icon>
			नेपाली साहित्य खोज्नु होस् । खोजका उदाहरणहरु -{' '}
			<a onClick={() => onSuggestionClick('लक्ष्मीप्रसाद%20देवकोटा')}>
				लक्ष्मीप्रसाद देवकोटा
			</a>
			, &nbsp;
			<a onClick={() => onSuggestionClick('भूपी%20शेरचन')}>भूपी शेरचन</a>,
			&nbsp;
			<a onClick={() => onSuggestionClick('पारिजात')}>पारिजात</a> ।
		</p>
	</div>
);

const SuggestionItem = (item, highlighted) =>
	item.header ? (
		<div className={style.SuggestionItem__Header}>{item.header}</div>
	) : (
		<div
			className={style.SuggestionItem}
			style={{ backgroundColor: highlighted ? '#eee' : 'transparent' }}
		>
			{item}
		</div>
	);

const TransliteratedList = ({ items, onSelect }) =>
	items.length > 0 ? (
		<div className={style.TransliteratedList}>
			<span className={style.TransliteratedList__Header}>लिपी परिवर्तन</span>
			{items.map(item => (
				<span
					className={style.TransliteratedList__Item}
					onClick={() => {
						onSelect(item);
					}}
				>
					{item}
				</span>
			))}
		</div>
	) : null;

export default class SearchBox extends Component {
	constructor() {
		super();
		this.state = {
			searchValue: '',
			suggestions: [],
			transliterationSuggestions: []
		};
	}

	getSuggestions = searchValue => {
		const { fields: fieldsMap } = this.props;
		const fields = Object.keys(fieldsMap);
		if (searchValue.length > 0) {
			getSuggestions(searchValue, fields).then(suggestionRes => {
				let categorizedSuggestions = [];
				fields.forEach(fieldName => {
					const suggestionList = suggestionRes[`${fieldName}-suggest`];
					const header = { header: fieldsMap[fieldName] };
					if (suggestionList.length > 0) {
						categorizedSuggestions = [
							...categorizedSuggestions,
							header,
							...suggestionList
						];
					}
				});
				this.setState({
					suggestions: categorizedSuggestions
				});
			});
		}
	};

	getSuggestionsDebounced = debounce(this.getSuggestions, 100);

	onTextInputChange = evnt => {
		const searchValue = evnt.target.value;
		this.setState({
			searchValue
		});
		if (searchValue.length > 0) {
			this.getSuggestionsDebounced(searchValue);
			if (searchValue.match(/[a-z]/i)) {
				nepaliTransliterator
					.transliterate(searchValue)
					.then(transliteratedText => {
						this.setState({
							transliterationSuggestions: [transliteratedText]
						});
					});
			}
		}
		else {
			this.setState({
				transliterationSuggestions: [],
				suggestions: []
			});
		}
	};

	onTransliterationSelect = suggestion => {
		this.setState({ searchValue: suggestion, transliterationSuggestions: [] });
		this.getSuggestions(suggestion);
	};

	onAutocompleteSelect = searchValue => {
		this.props.onSubmit(this.state.searchValue);
	};

	handleSubmit = evnt => {
		evnt.preventDefault();
		this.props.onSubmit(this.state.searchValue);
	};

	render() {
		return (
			<form onSubmit={this.handleSubmit} className={style.SearchBox}>
				<ReactAutocomplete
					className={style.SearchBox__Input}
					items={[...this.state.suggestions]}
					getItemValue={item => item}
					renderMenu={children => (
						<div className={style.SearchBox__Menu}>
							<TransliteratedList
								items={this.state.transliterationSuggestions}
								onSelect={this.onTransliterationSelect}
							/>
							{children}
							{isSuggestionsEmpty(
								this.state.suggestions,
								this.state.transliterationSuggestions
							) ? (
									<NoSuggestion onSuggestionClick={this.props.onSubmit} />
								) : null}
						</div>
					)}
					renderItem={SuggestionItem}
					value={this.state.searchValue}
					onChange={this.onTextInputChange}
					onSelect={this.onAutocompleteSelect}
					inputProps={{ className: style.SearchBox__Input }}
					isItemSelectable={item => !item.header}
				/>
				<button type="submit" className={style.SearchBox__Button}>
					<Icon>search</Icon>
				</button>
			</form>
		);
	}
}
