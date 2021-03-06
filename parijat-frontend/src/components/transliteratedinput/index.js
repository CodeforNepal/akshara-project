import { h, Component, createRef } from 'preact';
import { forwardRef } from 'preact/compat';
import { connect } from 'react-redux';
import { setTransliterationEnabled } from '../../actions/user';
import { nepaliTransliterator } from '../../tools/transliterate';
import style from './style.css';

export const withUserTransliteration = connect(
	({ user }) => ({
		transliterationEnable: user.transliteration
	}),
	{ setTransliterationEnabled },
);

class TransliterationSettings extends Component {
		toggleTransliterationEnabled = () => {
			this.props.setTransliterationEnabled(!this.props.transliterationEnable);
			this.props.onTransliterationSettingsChange();
		}

		render() {
			return (
				<input
					type="checkbox"
					checked={this.props.transliterationEnable}
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
		const { onInput, transliterationEnable } = this.props;
		const { value } = evnt.target;
		this.updateTransliterationSuggestion(value, transliterationEnable);
		onInput && onInput({ target: { value } });
	};

	updateTransliterationSuggestion = (value, transliterationEnable) => {
		if (!transliterationEnable) {
			this.setState({ value, tranSuggestion: '' });
			return;
		}
		if (value && value.length > 0) {
			nepaliTransliterator.transliterate(value).then(tranSuggestion => {
				this.setState({ tranSuggestion, value });
			});
		} else {
			this.setState({ value, tranSuggestion: '' });
		}
	}

	onTransliterationSettingsChange = evnt => {
		this.focusInput();
	}

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
					<div className={style.TransliteratedInput__Suggestion__Container}>
						{ this.state.tranSuggestion ?
							<button
								className={style.TransliteratedInput__Suggestion}
								onClick={this.onSuggestionClick}
								tooltip={this.state.tranSuggestion}
							>
								{this.state.tranSuggestion}
							</button>
							: null
						}
						<ConnectedTransliterationSettings onTransliterationSettingsChange={this.onTransliterationSettingsChange} />
					</div>
				) : null}
			</span>
		);
	}

	// using deprecated lifecycle method, need to update using hooks
	componentWillReceiveProps(nextProps) {
		if (nextProps.transliterationEnable !== this.props.transliterationEnable) {
			this.updateTransliterationSuggestion(this.state.value, nextProps.transliterationEnable);
		}
	}

	componentDidMount() {
		const { autofocus } = this.props;
		if (autofocus) {
			this.focusInput();
		}
	}
}

const TransliteratedInputWithSettings = withUserTransliteration(TransliteratedInput);

export default forwardRef((props, ref) => <TransliteratedInputWithSettings
  innerRef={ref} {...props}
/>);
