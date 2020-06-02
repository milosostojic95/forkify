import {elements} from './base';
export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
  elements.searchInput.value = '';
};

export const highlightSelecter = id=> {
  const resultsArr = Array.from(document.querySelectorAll('.results-link'));
  resultsArr.forEach( el =>{
    el.classList.remove('results-link-active');
  })
  document.querySelector(`a[href="#${id}"]`).classList.add('results-link-active')
}
export const clearResults = () => {
  elements.searchResList.innerHTML = '';
  elements.resultPages.innerHTML = '';
};

const limitRecipeTitle = (title, limit = 17) => {
  const newTitle = [];
    if(title.length >= limit) {
      title.split(' ').reduce((acc, cur)=> {
        if(acc + cur.length <= 17) {
          newTitle.push(cur);
        }
        return acc + cur.length;
      }, 0)
      return `${newTitle.join(' ')} ...`;
    }
    return title;
}

const renderRecipe = recipe => {
  const markup = `
  <li>
    <a class="results-link" href="#${recipe.recipe_id}">
      <figure class="results-fig">
            <img src="${recipe.image_url}" alt="${recipe.title}">
      </figure>
      <div class="results-data">
          <h4 class="results-name">${limitRecipeTitle(recipe.title)}</h4>
          <p class="results-author">${recipe.publisher}</p>
      </div>
    </a>
  </li>
 `;
  elements.searchResList.insertAdjacentHTML('beforeend',markup);
};

const createBtn = (page, type) => `
  <button class="btn-inline btn-${type}" data-goto="${type === 'prev' ? page - 1 : page + 1}">
    <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
  </button>
  `

const renderButtons = (page, numResults, numPerPage)=> {
  const pages = Math.ceil(numResults / numPerPage);
  let button;

  if(page === 1 && pages > 1) {
    // onelu next button
    button = createBtn(page, 'next');
  } else if (page < pages) {
    // display two buttons
    button =
    `
    ${createBtn(page, 'prev')}
    ${createBtn(page, 'next')}
    `
  } else if(page === pages && pages > 1) {
    // display prev btn
    button = createBtn(page, 'prev')
  }

  elements.resultPages.insertAdjacentHTML('afterbegin',button)
};

export const renderResult = (recipis, page = 1, postPerPage = 10) => {
  const start = (page - 1) * postPerPage;
  const end = page * postPerPage;
  recipis.slice(start, end).forEach(renderRecipe);

  renderButtons(page, recipis.length, postPerPage);
};
