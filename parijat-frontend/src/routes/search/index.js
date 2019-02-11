import { h, Component } from 'preact';
import {
	SearchkitManager,
	SearchkitProvider,
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
	InitialLoader,
	NoHits
} from 'searchkit';
import Toolbar from 'preact-material-components/Toolbar';
import { route } from 'preact-router';
import LayoutGrid from 'preact-material-components/LayoutGrid';
import 'preact-material-components/LayoutGrid/style.css';
import Chips from 'preact-material-components/Chips';
import 'preact-material-components/Chips/style.css';
import Header from '../../components/header';
import Footer from '../../components/footer';
import SearchItem from '../../components/searchitem';
import SelectedFilter from '../../components/selectedfilter';
import ContentContainer from '../../components/contentContainer';
import Filters from '../../components/filters';
import Loading from '../../components/loading';
import ResetFiltersComponent from '../../components/resetfilters';
import SearchActions from '../../components/searchactions';
import SearchBox from './SearchBox';
import style from './style';
import { API_ENDPOINT, INDEX_NAME } from '../../api';

const searchkit = new SearchkitManager(`${API_ENDPOINT}${INDEX_NAME}`);

searchkit.translateFunction = (key) => {
  let translations = {
    "pagination.previous":"पछिल्लो पृष्ठ",
    "pagination.next":"अर्को पृष्ठ", 
    "reset.clear_all" : "छनोटहरु हटाउनुहोस्",
    "facets.view_all" : "सबै हेर्नुहोस्",
    "facets.view_more": "अरु हेर्नुहोस्"
  }
  return translations[key]
}


function goHome() {
	route('/');
}

const NavigationHome = () => (
	<Toolbar.Icon navigation onClick={goHome}>
		home
	</Toolbar.Icon>
);

export default class Search extends Component {
	render() {
		return (
			<SearchkitProvider searchkit={searchkit}>
				<div>
					<Header>
						<Toolbar.Section>
							<NavigationHome/>
							<div className={style.SearchBox__Container}>
								<SearchBox
									autofocus
									searchOnChange
									queryFields={[
										'title',
										'author',
										'text',
										'text.latin',
										'title.latin',
										'author.latin'
									]}
								/>
							</div>
						</Toolbar.Section>
					</Header>
					<ContentContainer>
						<LayoutGrid>
							<LayoutGrid.Inner>
								<LayoutGrid.Cell cols="3">
									<div className={style.Search__Actions}>
										<SearchActions />
									</div>
								</LayoutGrid.Cell>
								<LayoutGrid.Cell cols="9">
									<div className={style.Search__Context}>
										<div>
											<SelectedFilters itemComponent={SelectedFilter} />
											<ResetFilters component={ResetFiltersComponent} />
										</div>
										<div>
											<HitsStats />
										</div>
									</div>
									<div className={style.Search__Body}>
										<Hits
											hitsPerPage={10}
											highlightFields={['title', 'author', 'text']}
											itemComponent={SearchItem}
										/>
										<Pagination />
										<NoHits />
										<InitialLoader component={Loading} />
									</div>
								</LayoutGrid.Cell>
							</LayoutGrid.Inner>
						</LayoutGrid>
					</ContentContainer>
					<Footer />
				</div>
			</SearchkitProvider>
		);
	}
}
