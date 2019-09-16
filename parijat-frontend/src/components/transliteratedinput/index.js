import { h, Component } from 'preact';
import { nepaliTransliterator } from '../../tools/transliterate';
import style from './style.css';

class TransliteratedInput extends Component {
	constructor() {
		super();
		this.state = {
			value: '',
			tranSuggestion: ''
		};
	}

	onInput = evnt => {
		const { onInput } = this.props;
		const { value } = evnt.target;
		nepaliTransliterator.transliterate(value).then(tranSuggestion => {
			this.setState({ tranSuggestion, value });
		});
		onInput && onInput({ target: { value } });
	};

	onSuggestionClick = evnt => {
		const { tranSuggestion: value } = this.state;
		const { onInput } = this.props;
		onInput && onInput({ target: { value } });
		this.setState({ value });
		this.focus();
	};

	// getBoundingClientRect = () => {
	// 	this.input.getBoundingClientRect();
	// }

	focus = () => {
		// Preact 8 doesn't support forward ref. Causing issues
		// with custom input
	// 	this.input.focus();
	};

	render() {
		const { value, ref, ...otherProps } = this.props;
		const showSuggestion = this.state.value !== this.state.tranSuggestion;
		return (
			<span className={style.TransliteratedInput}>
				<input
					ref={ref}
					defaultValue={value}
					className={style.TransliteratedInput__Input}
					{...otherProps}
					onInput={this.onInput}
				/>
				{showSuggestion ? (
					<button
						className={style.TransliteratedInput__Suggestion}
						onClick={this.onSuggestionClick}
						tooltip={this.state.tranSuggestion}
					>
						{this.state.tranSuggestion}
					</button>
				) : null}
			</span>
		);
	}

	componentDidMount() {
		this.focus();
	}
}

export default TransliteratedInput;
