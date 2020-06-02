import { h, Component, createRef } from 'preact';
import { HelpCircle, Search } from 'preact-feather';
import ReactAutocomplete from '../react-autocomplete';
import debounce from 'lodash/debounce';
import TransliteratedInput from '../transliteratedinput';
import { getSuggestions } from '../../api';
import style from './style.css';

const NoSuggestion = ({ onSuggestionClick }) => (
	<div className={style.NoSuggestion}>
		<p>
			<HelpCircle className={style.NoSuggestion__Icon} />
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

export default class SearchBox extends Component {
	inputRef = createRef();

	constructor() {
		super();
		this.state = {
			searchValue: '',
			suggestions: []
		};
	}

	getSuggestions = searchValue => {
		const { queryFields: fieldsMap } = this.props;
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
				console.log(categorizedSuggestions);
				this.setState({
					suggestions: categorizedSuggestions
				});
			});
		}
	};

	getSuggestionsDebounced = debounce(this.getSuggestions, 100);

	onTextInputChange = evnt => {
		const searchValue = evnt.target;
		this.setState({
			searchValue
		});
		if (searchValue && searchValue.length > 0) {
			this.getSuggestionsDebounced(searchValue);
		}
		else {
			this.setState({
				searchValue: '',
				suggestions: []
			});
		}
	};

	onAutocompleteSelect = searchValue => {
		this.props.onSubmit(searchValue);
	};

	handleSubmit = evnt => {
		evnt.preventDefault();
		this.props.onSubmit(this.state.searchValue);
	};

	renderInput = ({ onChange, ...props }) => {
		const onInput = evnt => {
			onChange && onChange({ target: evnt.target.value });
		};
		const placeholder = decodeURI(
			this.context
			&& this.context.searchkit
			&& this.context.searchkit.query.index.queryString
		  || '');
		return (
			<TransliteratedInput
				onInput={onInput}
				placeholder={placeholder}
				autofocus={this.props.autofocus}
				ref={this.inputRef}
				{...props}
			/>
		);
	};

	render() {
		return (
			<form onSubmit={this.handleSubmit} className={style.SearchBox}>
				<ReactAutocomplete
					className={style.SearchBox__Input}
					inputProps={{ className: style.SearchBox__Input }}
					isItemSelectable={item => !item.header}
					items={[...this.state.suggestions]}
					getItemValue={item => item}
					renderInput={this.renderInput}
					renderMenu={children => {
						return (
							<div className={style.SearchBox__Menu}>
								{children}
								{this.state.suggestions.length === 0 ? (
									<NoSuggestion onSuggestionClick={this.props.onSubmit} />
								) : null}
							</div>
						);
					}}
					renderItem={SuggestionItem}
					value={this.state.searchValue}
					onChange={this.onTextInputChange}
					onSelect={this.onAutocompleteSelect}
				/>
				<button type="submit" className={style.SearchBox__Button}>
					<Search />
				</button>
			</form>
		);
	}
}
