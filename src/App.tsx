import React, {useEffect} from "react"
import { useSelector, shallowEqual, useDispatch } from "react-redux"


import { Article } from "./components/Article"
import { AddArticle } from "./components/AddArticle"
import { FetchArticle } from "./components/FetchArticle"
import { addArticle, removeArticle, fetchArticleDetails } from "./store/actionCreators"
import { Dispatch } from "redux";
import ReactDOM from "react-dom";
import Redux from "redux"
import ReactRedux from "react-redux"
import ReduxThunk from "redux-thunk"

const {Provider, connect} = ReactRedux;
const {createStore, applyMiddleware} = Redux;
const thunk = ReduxThunk.default;

function fetchPostsRequest(){
  return {
    type: "FETCH_REQUEST"
  }
}

function fetchPostsSuccess(payload) {
  return {
    type: "FETCH_SUCCESS",
    payload
  }
}

function fetchPostsError() {
  return {
    type: "FETCH_ERROR"
  }
}

const reducer = (state = {}, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return state;
    case "FETCH_SUCCESS": 
      return {...state, posts: action.payload};
    default:
      return state;
  }
} 

function fetchPostsWithRedux() {
	return (dispatch) => {
  	dispatch(fetchPostsRequest());
    return fetchPosts().then(([response, json]) =>{
    	if(response.status === 200){
      	dispatch(fetchPostsSuccess(json))
      }
      else{
      	dispatch(fetchPostsError())
      }
    })
  }
}

function fetchPosts() {
  const URL = "https://jsonplaceholder.typicode.com/posts";
  return fetch(URL, { method: 'GET'})
     .then( response => Promise.all([response, response.json()]));
}

export class App extends React.Component<any, any> {
	componentDidMount(){
  	this.props.fetchPostsWithRedux()
  }
	render(){
	  return (
    		<ul>
				{
        	this.props.posts && 
          this.props.posts.map((post) =>{
          	return(
            	<li>{post.title}</li>
            )
          })
        }
        </ul>
    )
  }
}


function mapStateToProps(state){
	return {
  	posts: state.posts
  }
}


let Container = connect(mapStateToProps, {fetchPostsWithRedux})(App);

const store = createStore(
    reducer,
    applyMiddleware(thunk)
);
ReactDOM.render(
    <Provider store={store}>
        <Container/>
    </Provider>,
    document.getElementById('container')
);