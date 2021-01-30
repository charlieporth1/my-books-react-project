import {Route, BrowserRouter, Switch, Router} from "react-router-dom";
import BooksPage from "./App";
import SearchBooksPage from "./Search";
import React from "react";
import history from './history';
class App extends React.Component<> {


    render() {
        const {location} = this.props;
        return (
            <div>
                <Router history={history}>
                <Switch>
                    <Route path='/' exact component={BooksPage} location={location}/>
                        <Route path="/search" component={SearchBooksPage} location={location}/>

                </Switch>
                </Router>
            </div>

        )
    }
}

export default App;