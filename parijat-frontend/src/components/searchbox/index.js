import { h, Component } from 'preact';
import Icon from 'preact-material-components/Icon';
import ReactAutocomplete from 'react-autocomplete';
import debounce from 'lodash/debounce';
import { getSuggestions } from '../../api';
import { nepaliTransliterator } from '../../tools/transliterate';
import style from './style';

function isSuggestionsEmpty(sug1, sug2) {
	return sug1.length === 0 && sug2.length === 0;
}

const NoSuggestion = () => (
	<div className={style.NoSuggestion}>
		<Icon>help</Icon>
		<span>नेपाली साहित्य खोज्नु होस् । खोजका उदाहरणहरु - देवकोटा </span>
	</div>
);

const SuggestionItem = (item, highlighted) => (
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
		if (searchValue.length > 0) {
			getSuggestions(searchValue, this.props.fields).then(suggestions => {
				console.log('New Suggestions', suggestions);
				this.setState({
					suggestions: suggestions.map(item => `${item.title} - ${item.author}`)
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
		this.setState({ searchValue, transliterationSuggestions: [] });
	};

	handleSubmit = evnt => {
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
						<div className="SearchBox__Menu">
							<TransliteratedList
								items={this.state.transliterationSuggestions}
								onSelect={this.onTransliterationSelect}
							/>
							{children}
							{isSuggestionsEmpty(
								this.state.suggestions,
								this.state.transliterationSuggestions
							) ? (
									<NoSuggestion />
								) : null}
						</div>
					)}
					renderItem={SuggestionItem}
					value={this.state.searchValue}
					onChange={this.onTextInputChange}
					onSelect={this.onAutocompleteSelect}
					inputProps={{ className: style.SearchBox__Input }}
				/>
				<button type="submit" className={style.SearchBox__Button}>
					<Icon>search</Icon>
				</button>
			</form>
		);
	}
}
