import {elements} from './base';

const createIngredient = ingredient => `
  <li>
    <div class="recipe-icon center">
      <svg>
        <use href="./images/icons.svg#icon-check"></use>
      </svg>
    </div>
    <div class="recipe-count"> ${ingredient.count} </div>
    <div class="recipe-unit"> ${ingredient.unit} </div>
    <div class="recipe-ingrediant"> ${ingredient.ingredient}</div>
  </li>
`;
export const clearRecipe = () => {
  elements.recipe.innerHTML = '';
}

export const renderRecipe = (recipe) => {
  const markup = `
    <div class="recipe-wrapper">
      <div class="recipe-image">
        <img src="${recipe.img}" alt="${recipe.title}" class="recipe-img">
        <h1 class="recipe-title">
            <span>${recipe.title}</span>
        </h1>
      </div>
      <div class="recipe-details">
        <div class="recipe-info center">
          <svg class="recipe-info-icon">
            <use href="./images/icons.svg#icon-stopwatch"></use>
          </svg>
          <span class="recipe-info-data-minuts">${recipe.time}</span>
          <span class="recipe-info-text">min</span>
        </div>
        <div class="recipe-info center">
          <svg class="recipe-info-icon">
            <use href="./images/icons.svg#icon-man"></use>
          </svg>
          <span class="recipe-info-data-minuts">${recipe.servings}</span>
          <span class="recipe-info-text">min</span>
        </div>
        <div class="recipe-info-buttons center">
          <button class="negative">
            <svg>
              <use href="./images/icons.svg#icon-circle-with-minus"></use>
          </svg>
          </button>
          <button class="add">
            <svg>
              <use href="./images/icons.svg#icon-circle-with-plus"></use>
          </svg>
          </button>
        </div>
        <div class="recipe-love center">
          <button class="love center">
            <svg class="header-likes">
              <use href="./images/icons.svg#icon-heart-outlined"></use>
          </svg>
          </button>
        </div>
      </div>
      <div class="recipe-ingrediants">
        <ul class="recipe-ingrediants-list">
        ${recipe.ingredients.map(el => createIngredient(el)).join('')}
        </ul>
      </div>
    </div>
  `;

  elements.recipe.insertAdjacentHTML('beforeend', markup);
}
