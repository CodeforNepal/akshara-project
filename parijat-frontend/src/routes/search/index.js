import { h, Component } from 'preact';
import {
	SearchkitManager,
	SearchkitProvider,
	SearchBox,
	Hits,
	HitsStats,
	Pagination,
	InputFilter,
	HierarchicalMenuFilter,
	RefinementListFilter,
	Layout,
	LayoutResults,
	LayoutBody,
	SelectedFilters,
	ResetFilters,
	ActionBar,
	ActionBarRow,
	SideBar,
	TopBar,
	NoHits
} from 'searchkit';
import Chips from 'preact-material-components/Chips';
import 'preact-material-components/Chips/style.css';
import Header from '../../components/header';
import SearchItem from '../../components/searchitem';
import SelectedFilter from '../../components/selectedfilter';
import Filters from '../../components/filters';
import ResetFiltersComponent from '../../components/resetfilters';
import SearchActions from '../../components/searchactions';
import style from './style';

const searchkit = new SearchkitManager('http://localhost:9200/nepali');

export default class Search extends Component {
	render() {
		return (
			<SearchkitProvider searchkit={searchkit}>
				<Layout>
					<Header>
						<SearchBox
							autofocus
							searchOnChange
							queryFields={['title', 'author', 'content']}
						/>
					</Header>
					<SearchActions />
					<ActionBar>
						<ActionBarRow>
							<SelectedFilters itemComponent={SelectedFilter} />
							<ResetFilters component={ResetFiltersComponent} />
						</ActionBarRow>
						<ActionBarRow>
							<HitsStats />
						</ActionBarRow>
					</ActionBar>
					<Hits
						mod="sk-hits-grid"
						hitsPerPage={10}
						highlightFields={['title', 'author', 'content']}
						itemComponent={SearchItem}
					/>
					<Pagination />
					<NoHits />
				</Layout>
			</SearchkitProvider>
		);
	}
}
