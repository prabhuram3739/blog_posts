import * as React from "react"
import { render } from "react-dom"
import { createStore, applyMiddleware, Store } from "redux"

import thunk from "redux-thunk"

import { App } from "./App"
import reducer from "./store/reducer"

const rootElement = document.getElementById("root")
render(
    <App />,

  rootElement
)
