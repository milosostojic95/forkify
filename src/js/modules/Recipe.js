import axios from 'axios';

export default class Recipe {
  constructor(id) {
    this.id = id;
  }

  async getRecipe() {
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

  calcServings() {
    this.servings = 4;
  }

  parseIngredients() {
    const unitsLong = ['tablespoons','tablespoon','ounce','ounces','teaspoon','teaspoons','cups','pounds'];
    const unitsShort = ['tbsp','tbsp','oz','oz','tsp','tsp','cup','pound'];
    const units = [...unitsShort, 'kg', 'g']
    const newIngredients = this.ingredients.map(el =>{
      // uniform units
      let ingredient = el.toLowerCase();
      unitsLong.forEach((unit,i) => {
        ingredient = ingredient.replace(unit,unitsShort[i]);
      });
      //remove parentheses
      ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');
      // parse ingrediants into count,unit and ingrsdient
       const arrIng = ingredient.split(' ');
       const unitIndex = arrIng.findIndex(el2 => units.includes(el2));
       let objIng;
       if(unitIndex > -1) {
         //there is a unit
         const arrCount = arrIng.slice(0,unitIndex);
         let count;
         if(arrCount === 1) {
           count = arrIng[0].replace('-','+');
         } else {
          count = eval(arrIng.slice(0, unitIndex).join('+'));
         }

         objIng = {
           count,
           unit: arrIng[unitIndex],
           ingredient: arrIng.slice(unitIndex + 1).join(' ')
         }
       } else if(parseInt(arrIng[0],10)) {
        // no units but 1 elements is number
        objIng = {
          count: parseInt(arrIng[0],10),
          unit: '',
          ingredient: arrIng.slice(1).join(' ')
          }
       } else if(unitIndex === -1) {
          // there is no unit and 1st elemne  is not number
         objIng = {
           count: 1,
           unit: '',
           ingredient
        }
      }
      return objIng;
    });
    this.ingredients = newIngredients;
  }

  updateDetails(type) {
    const newServings = type === 'negative' ? this.servings -1 : this.servings + 1;
    this.ingredients.forEach( ing => {
      ing.count = ing.count * (newServings/this.servings);
    })
    this.servings = newServings;
  }
}
