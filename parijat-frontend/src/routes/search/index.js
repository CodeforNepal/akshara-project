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
import LayoutGrid from 'preact-material-components/LayoutGrid';
import 'preact-material-components/LayoutGrid/style.css';
import Chips from 'preact-material-components/Chips';
import 'preact-material-components/Chips/style.css';
import Header from '../../components/header';
import SearchItem from '../../components/searchitem';
import SelectedFilter from '../../components/selectedfilter';
import Filters from '../../components/filters';
import ResetFiltersComponent from '../../components/resetfilters';
import SearchActions from '../../components/searchactions';
import style from './style';

const searchkit = new SearchkitManager(
	`${location.protocol}//${location.hostname}:9200/nepali_poems`
);

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
								'text',
								'text.latin',
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
										mod="sk-hits-grid"
										hitsPerPage={10}
										highlightFields={['title', 'author', 'text']}
										itemComponent={SearchItem}
									/>
									<Pagination />
									<NoHits />
								</div>
							</LayoutGrid.Cell>
						</LayoutGrid.Inner>
					</LayoutGrid>
				</div>
			</SearchkitProvider>
		);
	}
}
