import { QueryAccessor, SearchkitComponent } from 'searchkit';
import SearchBoxComponent from '../../components/searchbox';

export default class SearchBox extends SearchkitComponent {
	static defaultProps = {
		id: 'q'
	};

	defineAccessor() {
		const {
			id,
			prefixQueryFields,
			queryFields,
			queryBuilder,
			queryOptions,
			prefixQueryOptions
		} = this.props;
		return new QueryAccessor(id, {
			prefixQueryFields,
			prefixQueryOptions: { ...prefixQueryOptions },
			queryFields: Object.keys(queryFields) || ['_all'],
			queryOptions: { ...queryOptions },
			queryBuilder,
			onQueryStateChange: () => {
				if (!this.unmounted && this.state.input) {
					this.setState({ input: undefined });
				}
			}
		});
	}

	onSubmit = query => {
		const shouldResetOtherState = true;
		this.accessor.setQueryString(query, shouldResetOtherState);
		this.searchkit.performSearch(true);
	};

	render() {
		return (
			<SearchBoxComponent
				queryFields={this.props.queryFields}
				onSubmit={this.onSubmit}
			/>
		);
	}
}
