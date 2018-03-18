import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, BrowserRouter } from "react-router-dom";

import AppComponent from "./app";
import { Provider } from "react-redux";
import store from "./store";
// import "babel-polyfill";

import createBrowserHistory from 'history/createBrowserHistory'

const customHistory = createBrowserHistory()

const mountNode = document.getElementById("root");
// console.log(<Routes />);
const appRender = () => {
    ReactDOM.render(
        <Provider store={store}  history={customHistory}>
            <BrowserRouter>
                <Route component={AppComponent} />
            </BrowserRouter>
        </Provider>,
        mountNode
    );
};
appRender();

// if(module.hot && process.env.NODE_ENV !== 'production'){
//     module.hot.accept('./TodoApp',()=>{
//         ReactDOM.unmountComponentAtNode(mountNode);
//         // const App = require('./TodoApp').default;
//         appRender(App);
//     })
// }
