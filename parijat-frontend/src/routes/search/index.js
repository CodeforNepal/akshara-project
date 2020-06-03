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
import { route } from 'preact-router';
import Header from '../../components/header';
import Footer from '../../components/footer';
import SearchItem from '../../components/searchitem';
import CurrentQuery from '../../components/CurrentQuery';
import SelectedFilter from '../../components/selectedfilter';
import ContentContainer from '../../components/contentContainer';
import Filters from '../../components/filters';
import Loading from '../../components/loading';
import ResetFiltersComponent from '../../components/resetfilters';
import SearchActions from '../../components/searchactions';
import SearchBox from './SearchBox';
import style from './style';
import { API_ENDPOINT, INDEX_NAME } from '../../api';

const searchkit = new SearchkitManager(`${API_ENDPOINT}${INDEX_NAME}`, { timeout: 60000 });

searchkit.translateFunction = key => {
	let translations = {
		'pagination.previous': 'पछिल्लो पृष्ठ',
		'pagination.next': 'अर्को पृष्ठ',
		'reset.clear_all': 'छनोटहरु हटाउनुहोस्',
		'facets.view_all': 'सबै हेर्नुहोस्',
		'facets.view_more': 'अरु हेर्नुहोस्',
		'NoHits.NoResultsFound': '{query} को लागि नतिजा भेटिएन ।',
		'hitstats.results_found': '{hitCount} नतिजा {timeTaken}ms मा भेटियो ।'
	};
	return translations[key];
};

export default class Search extends Component {
	render() {
		return (
			<SearchkitProvider searchkit={searchkit}>
				<div>
					<Header>
						<SearchBox
							autofocus
							searchOnChange
							queryFields={{
								'title': 'शिर्षक',
								'author': 'लेखक'
							}}
						/>
					</Header>
					<ContentContainer>
						<div className={style.Search__Container}>
							<div className={style.Search__Actions}>
								<SearchActions />
							</div>
							<div>
								<div className={style.Search__Context}>
									<div>
										<CurrentQuery />
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
							</div>
						</div>
					</ContentContainer>
					<Footer />
				</div>
			</SearchkitProvider>
		);
	}
}
