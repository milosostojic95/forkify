import '../sass/main.scss';
import Search from './modules/Search';
import Recipe from './modules/Recipe';
import * as searchView from './views/searchView';
import {elements, renderLoader, clearLoader} from './views/base';

const state = {};


// search controller
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

// recipe controler

elements.searchForm.addEventListener('submit',(e)=> {
  e.preventDefault();
  controlSearch();
});

elements.resultPages.addEventListener('click', (e)=> {
  const btn = e.target.closest('.btn-inline');
  if(btn) {
    const goToPage = parseInt(btn.dataset.goto, 10);
    searchView.clearResults();
    searchView.renderResult(state.search.result, goToPage);
  }
});

