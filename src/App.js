import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { unregister } from "./core/inteceptor";
import Login from './views/Login.jsx';
import Layout from "./views/Layout";
import Dispatcher from "./views/Dispatcher";
import Deliverer from "./views/Deliverer";
import Customer from "./views/Customer";
import NotFound from "./views/NotFound";
import MainPage from './views/MainPage';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout/>}>
                        <Route path="dispatcher/:name" element={<Dispatcher/>}/>
                        <Route path="deliverer/:name" element={<Deliverer/>}/>
                        <Route path="customer/:name" element={<Customer/>}/>
                    </Route>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/main" element={<MainPage/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
