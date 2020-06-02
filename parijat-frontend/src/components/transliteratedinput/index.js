import { h, Component, createRef } from 'preact';
import { forwardRef } from 'preact/compat';
import { connect } from 'react-redux';
import { setTransliterationEnabled } from '../../actions/user';
import { nepaliTransliterator } from '../../tools/transliterate';
import style from './style.css';

export const withUserTransliteration = connect(
	({ user }) => ({
		transliteration: user.transliteration
	}),
	{ setTransliterationEnabled },
);

export const withUserTransliteration2 = connect(
	({ user }) => ({
		isTransliterationEnable: user.transliteration
	})
)

class TransliterationSettings extends Component {
		toggleTransliterationEnabled = () => {
			this.props.setTransliterationEnabled(!this.props.transliteration);
		}

		render() {
			return (
				<input
					type="checkbox"
					checked={this.props.transliteration}
					onClick={this.toggleTransliterationEnabled}
				/>
			);
		}
}

const ConnectedTransliterationSettings = withUserTransliteration(TransliterationSettings);

class TransliteratedInput extends Component {
	ref = createRef();

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
		if (value && value.length > 0) {
			nepaliTransliterator.transliterate(value).then(tranSuggestion => {
				this.setState({ tranSuggestion, value });
			});
		} else {
			this.setState({ value, tranSuggestion: '' });
		}
		onInput && onInput({ target: { value } });
	};

	onSuggestionClick = evnt => {
		const { tranSuggestion: value } = this.state;
		const { onInput } = this.props;
		onInput && onInput({ target: { value } });
		this.setState({ value });
		setTimeout(this.focusInput, 100);
	};

	focusInput = () => {
		const inputElm = this.ref.current.firstElementChild;
		inputElm.focus();
		inputElm.setSelectionRange(999, 999);
	}

	render() {
		const { value, innerRef, ...otherProps } = this.props;
		const showSuggestion = this.state.value !== this.state.tranSuggestion;
		return (
			<span ref={this.ref} className={style.TransliteratedInput}>
				<input
					ref={innerRef}
					value={value}
					className={style.TransliteratedInput__Input}
					{...otherProps}
					onInput={this.onInput}
				/>
				{showSuggestion ? (
					<div>
						<button
							className={style.TransliteratedInput__Suggestion}
							onClick={this.onSuggestionClick}
							tooltip={this.state.tranSuggestion}
						>
							{this.state.tranSuggestion}
						</button>
						<ConnectedTransliterationSettings />
					</div>
				) : null}
			</span>
		);
	}

	componentDidMount() {
		const { autofocus } = this.props;
		if (autofocus) {
			this.focusInput();
		}
	}
}

export default forwardRef((props, ref) => <TransliteratedInput
  innerRef={ref} {...props}
/>);
