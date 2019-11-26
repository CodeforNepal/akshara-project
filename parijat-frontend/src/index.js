import './style';
import 'searchkit/release/theme';
import { Provider } from 'preact-redux';
import App from './components/app';
import store from './store';

export default () => (
	<Provider store={store}>
		<App />
	</Provider>
);
