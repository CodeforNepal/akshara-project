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
	InitialLoader,
	NoHits
} from 'searchkit';
import LayoutGrid from 'preact-material-components/LayoutGrid';
import 'preact-material-components/LayoutGrid/style.css';
import Chips from 'preact-material-components/Chips';
import 'preact-material-components/Chips/style.css';
import Header from '../../components/header';
import Footer from '../../components/footer';
import SearchItem from '../../components/searchitem';
import SelectedFilter from '../../components/selectedfilter';
import Filters from '../../components/filters';
import Loading from '../../components/loading';
import ResetFiltersComponent from '../../components/resetfilters';
import SearchActions from '../../components/searchactions';
import style from './style';
import { API_ENDPOINT, INDEX_NAME } from '../../api';

const searchkit = new SearchkitManager(`${API_ENDPOINT}${INDEX_NAME}`);

export default class Search extends Component {
	render() {
		return (
			<SearchkitProvider searchkit={searchkit}>
				<div className={style.Search__Container}>
					<Header>
						<SearchBox
							autofocus
							searchOnChange
							queryFields={[
								'title',
								'author',
								'content',
								'content.latin',
								'title.latin',
								'author.latin'
							]}
						/>
					</Header>
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
					<Footer/>
				</div>
			</SearchkitProvider>
		);
	}
}
