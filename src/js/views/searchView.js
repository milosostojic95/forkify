import {elements} from './base';
export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
  elements.searchInput.value = '';
};

export const clearResults = () => {
  elements.searchResList.innerHTML = '';
};

const renderRecipe = recipe => {
  const markup = `
  <li>
    <a class="results-link results-link-active" href="#${recipe.recipe_id}">
      <figure class="results-fig">
            <img src="${recipe.image_url}" alt="${recipe.title}">
      </figure>
      <div class="results-data">
          <h4 class="results-name">${recipe.title}</h4>
          <p class="results-author">${recipe.publisher}</p>
      </div>
    </a>
  </li>
 `;
  elements.searchResList.insertAdjacentHTML('beforeend',markup);
};

export const renderResult = recipis => {
  recipis.forEach(renderRecipe)
};
