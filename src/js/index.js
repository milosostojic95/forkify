import '../sass/main.scss';
import Search from './modules/Search';

const state = {};

const controlSearch = async () => {
  // 1. get quert from view
  const query = 'pizza'
  if(query) {
    //2. new search object
    state.search = new Search(query);
    //3. prepare Ui for result

    //4. search for result
    await state.search.getResults();
    //5. render result on Ui
    console.log(state.search.result)
  }
}


document.querySelector('.search-form').addEventListener('submit',(e)=> {
  e.preventDefault();
  controlSearch();
})

console.log(state)
