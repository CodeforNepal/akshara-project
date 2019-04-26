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
		onInput && onInput(value);
	};

	onSuggestionClick = evnt => {
		const { tranSuggestion } = this.state;
		const { onInput } = this.props;
		onInput && onInput(tranSuggestion);
		this.setState({ value: tranSuggestion });
		this.focus();
	};

	focus = () => {
		this.inputElm.focus();
	}

	render() {
		const { props } = this.props;
		const showSuggestion = this.state.value !== this.state.tranSuggestion;
		return (
			<span className={style.TransliteratedInput}>
				<input
				  ref={ inp => this.inputElm = inp }
					className={style.TransliteratedInput__Input}
					value={this.state.value || this.props.value}
					onInput={this.onInput}
					{...props}
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
