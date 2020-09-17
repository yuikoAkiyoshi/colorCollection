import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'

import Header from './Header'
import ColorList from './ColorList'
import ColorShow from './ColorShow'
import ColorNew from './ColorNew'

import "../css/common.scss"


function App({ store }){
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Header />
                <Route exact path="/" component={ColorList} />
                <Route path="/new" component={ColorNew} />
                <Route path="/show/:id" component={ColorShow} />
            </BrowserRouter>
        </Provider>
    )
}

export default App