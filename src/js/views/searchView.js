import {elements} from './base';
export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
  elements.searchInput.value = '';
};

export const clearResults = () => {
  elements.searchResList.innerHTML = '';
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
    <a class="results-link results-link-active" href="#${recipe.recipe_id}">
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

export const renderResult = recipis => {
  recipis.forEach(renderRecipe)
};
