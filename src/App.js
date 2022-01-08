import './App.css';
import {Routes, Route} from "react-router-dom";

// Pages
import AddProduct from "./pages/AddProduct";
import Products from "./pages/Products";

function App() {
    return (
        <div className="App px-3">
            <Routes>
                <Route path="/" element={<Products/>}/>
                <Route path="add-product" element={<AddProduct/>}/>
                <Route path="add-product/:id" element={<AddProduct/>}/>
            </Routes>
            <p className="text-zinc-600 mt-20 text-center font-semibold">Built By: Shahid</p>
        </div>
    );
}

export default App;
