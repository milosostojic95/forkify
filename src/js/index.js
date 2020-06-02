import '../sass/main.scss';
import Search from './modules/Search';
import Recipe from './modules/Recipe';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
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
    try {
      await state.search.getResults();
      clearLoader();
      //5. render result on Ui
      searchView.renderResult(state.search.result);
    } catch(err) {
      console.log(err);
      clearLoader();
    }
  }
}

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

// recipe controler
const controlRecipe =  async () => {
  // get id form url
  const id = window.location.hash.replace('#', '');

  if(id) {
    // create new object
    recipeView.clearRecipe();
    renderLoader(elements.recipe);

    if(state.search) {
      searchView.highlightSelecter(id);
    }

    state.recipe = new Recipe(id);

    try {
      //get recipe from data
      await state.recipe.getRecipe();
      state.recipe.parseIngredients();
      state.recipe.calcTime();
      state.recipe.calcServings();
      //reneder recipe
      clearLoader();
      recipeView.renderRecipe(state.recipe);

    } catch (error) {
      console.log(error);
    }
  }
}

['hashchange','load'].forEach(event => window.addEventListener(event,controlRecipe));

// update details on click
elements.recipe.addEventListener('click', e => {

  if(e.target.matches('.negative, .negative *')) {
    state.recipe.updateDetails('negative');
  } else if(e.target.matches('.add, .add *')) {
    state.recipe.updateDetails('add');
  }
  recipeView.updateServingsIngrediants(state.recipe);
})
