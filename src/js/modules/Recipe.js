import axios from 'axios';

export default class Recipe {
  constructor(id) {
    this.id = id;
  }

  async getResipis() {
    try {
      const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
      this.title = res.data.recipe.title;
      this.author = res.data.recipe.publisher;
      this.img =  res.data.recipe.image_url;
      this.url =  res.data.recipe.source_url;
      this.ingredients =  res.data.recipe.ingredients;
    } catch (error) {
      console.log('error');
    }
  }

  calcTime () {
    const numInt = this.ingredients.length;
    const period = Math.ceil(numInt / 3);
    this.time = period * 15;
  }

  caclServings() {
    this.servings = 4;
  }
}