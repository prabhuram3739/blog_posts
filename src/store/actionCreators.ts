import * as actionTypes from "./actionTypes";
import axios from 'axios';

export function addArticle(article: IArticle) {
  const action: ArticleAction = {
    type: actionTypes.ADD_ARTICLE,
    article,
  }

  return simulateHttpRequest(action)
}

export function removeArticle(article: IArticle) {
  const action: ArticleAction = {
    type: actionTypes.REMOVE_ARTICLE,
    article,
  }
  return simulateHttpRequest(action)
}

export function fetchArticle(article: IArticle) {
    const action: ArticleAction = {
      type: actionTypes.FETCH_ARTICLE,
      article,
    }
    return simulateHttpRequest(action)
  }

export function simulateHttpRequest(action: ArticleAction) {
  return (dispatch: DispatchType) => {
    setTimeout(() => {
      dispatch(action)
    }, 500)
  }
}

export function fetchArticleDetails() {
    return function(dispatch: DispatchType) {
      return axios.get("https://jsonplaceholder.typicode.com/posts")
        .then(({ data }) => {
            console.log('Articles:', data);
        dispatch(data);
      });
    };
  }