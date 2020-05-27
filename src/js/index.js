import '../sass/main.scss';
import Search from './modules/Search';
import * as searchView from './views/searchView';
import {elements, renderLoader, clearLoader} from './views/base';

const state = {};

const controlSearch = async () => {
  // 1. get quert from view
  const query = searchView.getInput();

  if(query) {
    //2. new search object
    state.search = new Search(query);
    //3. prepare Ui for result
    searchView.clearInput();
    searchView.clearResults();
    renderLoader(elements.searchRes);
    //4. search for result
    await state.search.getResults();
    clearLoader();
    //5. render result on Ui
    searchView.renderResult(state.search.result);
  }
}


elements.searchForm.addEventListener('submit',(e)=> {
  e.preventDefault();
  controlSearch();
});
