import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import MusicAppBar from "./components/MusicAppBar";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
        };
    }


    onLoginChange = loginState => {
        this.setState({
            isLoggedIn: loginState
        })
    }


    render() {

        let componentToShow =  this.state.isLoggedIn ? <Dashboard></Dashboard> : <Login loginCallback={this.onLoginChange}></Login>;
        return <div className="App">
            <MusicAppBar></MusicAppBar>
            <header className="App-header">
                {componentToShow}
            </header>
        </div>;
    }
}

export default App;
