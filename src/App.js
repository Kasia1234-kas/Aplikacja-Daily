import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Link, Navigate, Route, Routes} from 'react-router-dom';
import Stats from "./views/Stats/Stats";
import Home from "./views/Home/Home";
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import './App.css';
import Login from "./views/Login/Login";
import LocalStorage from "./tools/LocalStorage";

function App() {
    const[user, setUser] = useState(null);

    useEffect(() => {
        if (LocalStorage().has('logged')) {
            setUser(LocalStorage().load('logged'))
        }
    }, [])

    const Menu = () => user ? <div className={'d-flex'}>
        <li className="nav-item">
            <Link to={'/stats'} style={{color: 'white'}} className="nav-link">
                <b>Statystyki</b>
            </Link>
        </li>
        <li className="nav-item">
            <button style={{color: 'white'}} className="btn btn-link nav-link"
                    onClick={() => {
                        setUser(null)
                        LocalStorage().remove('logged')
                        window.location.href = '/login';
                    }}><b>Wyloguj</b> ({user.login})</button>
        </li>
    </div> : <div className={'d-flex'}>
        <li className="nav-item">
            <Link to={'/login'} style={{color: 'white'}} className="nav-link"><b>Logowanie</b></Link>
        </li>
    </div>;

    return (
        <Router>
            <div className={'gradient-custom'} style={{minWidth: '350px'}}>
                <ul className="nav align-items-center container py-5 px-2 h-100 justify-content-between">
                    <li className="nav-item">
                        <Link to={'/'} style={{color: 'white'}} className="nav-link">
                            <h1 style={{color: 'white'}}>Daily</h1>
                        </Link>
                    </li>
                    <Menu></Menu>
                </ul>
                <Routes>
                    <Route exact path="/" element={user ? <Home></Home> : <Navigate to={'/login'} />}></Route>
                    <Route path="/stats" element={user ? <Stats></Stats> : <Navigate to={'/login'} />}></Route>
                    <Route path="/login" element={user ? <Navigate to={'/'} /> : <Login></Login>}></Route>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
