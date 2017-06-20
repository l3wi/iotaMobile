import * as types from "./types";

export function fetchRecipes(ingredients) {
  return (dispatch, getState) => {
    // async
    dispatch(setSearchedRecipes({ recipes: resp }));
  };
}

export function setSearchedRecipes({ recipes }) {
  return {
    type: types.SET_SEARCHED_RECIPES,
    recipes
  };
}
