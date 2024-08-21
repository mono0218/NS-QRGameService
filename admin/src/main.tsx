import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import "./main.css"
import Login from "./page/login.tsx";
import GameServiceList from "./page/gameServiceList.tsx";
import GameServiceDetails from "./page/gameServiceDetails.tsx";
import AppNav from "./components/AppBar.tsx";


const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login/>} />
                <Route path="/service/list" element={<GameServiceList/>}/>
                <Route path="/service/details/:id" element={<GameServiceDetails/>}/>
            </Routes>
        </BrowserRouter>
    )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <AppNav/>
        <AppRouter/>
    </React.StrictMode>
)

