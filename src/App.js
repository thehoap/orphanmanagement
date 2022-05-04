import { BrowserRouter, Route, Routes } from "react-router-dom";
import ListAccount from "./pages/list/ListAccount";
import Home from "./pages/home/Home";
import ListFurniture from "./pages/list/ListFurniture";
import Login from "./pages/login/Login";
import "./scss/App.scss";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/admin" element={<ListAccount/>}/>
                    <Route path="/admin/users" element={<ListAccount/>}/>
                    <Route path="/manager/children" element={<ListAccount/>}/> 
                    <Route path="/manager/furniture" element={<ListFurniture/>}/>         
                </Routes>
                {/* <Routes>
                    <Route index element={<Login />} />
                </Routes>
                <Routes>
                    <Route path="/admin">
                        <Route index element={<ListAccount />} />
                        {/* <Route path="/admin/users"></Route> */}
                    {/* </Route>
                    <Route path="/manager">
                        {/* <Route path="/manager/children" index element={<List />} /> */}
                        {/* <Route path="/admin/users"></Route> 
                    </Route>
                </Routes> */} 
            </BrowserRouter>
        </div>
    );
}

export default App;

