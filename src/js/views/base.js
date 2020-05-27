export const elements = {
  searchForm: document.querySelector('.search-form'),
  searchInput: document.querySelector('.search-field'),
  searchRes: document.querySelector('.results'),
  searchResList: document.querySelector('.result-list'),
  resultPages: document.querySelector('.result-pages'),
};

export const elementString = {
  loader: 'loader',
};

export const renderLoader = parent => {
  const loader = `
    <div class="${elementString.loader}">
      <img href="./images/spiner.png">
    </div>
  `;
  parent.insertAdjacentHTML('afterbegin', loader);
};

export const clearLoader = ()=> {
  const loader =  document.querySelector(`.${elementString.loader}`);
  if(loader) {
    loader.remove();
  }
}
