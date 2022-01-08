import {Link, useNavigate, useParams} from "react-router-dom";
import {useState} from "react";
import {INVENTORY_STORAGE_KEY} from "../helper/constant";

export default function AddProduct(props) {
    const navigate  = useNavigate();

    const productData = JSON.parse(localStorage.getItem(INVENTORY_STORAGE_KEY) || "[]");

    // Params
    const params = useParams();
    let product = null;
    if (params.id) {
        // Data Exists
        product = productData.filter(product => {
            if (product.id == params.id) {
                return product
            }
        });
    }

    // States
    const [name, setName] = useState(product != null ? product[0].name : '');
    const [code, setCode] = useState(product != null ? product[0].code : '');
    const [displayUnit, setDisplayUnit] = useState(product != null ? product[0].displayUnit : '');
    const [tax, setTax] = useState(product != null ? product[0].tax : '');
    const [price, setPrice] = useState(product != null ? product[0].price : '');
    const [productType, setProductType] = useState(product != null ? product[0].productType : '');
    const [description, setDescription] = useState(product != null ? product[0].description : '');

    const addData = () => {

        if (product != null) {
            let objIndex = productData.findIndex((obj => obj.id == params.id));
            productData[objIndex] = {id: parseInt(params.id), name, code, displayUnit, tax, price, productType, description}
        } else {
            productData.push({
                id: Math.floor(Math.random() * 10000),
                name, code, displayUnit, tax, price, productType, description
            });
        }

        navigate('/');
        localStorage.setItem(INVENTORY_STORAGE_KEY, JSON.stringify(productData));
    }

    return (
        <div className="bg-zinc-800 text-white max-w-6xl mx-auto mt-20 rounded">
            <div className="px-5 py-5 font-semibold">
                Add Product {props.name}
            </div>
            <div className="bg-zinc-700 px-5 py-5 rounded">
                <div className="border-2 border-zinc-800 px-5 py-5">
                    <div className="w-full">
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-widest text-white text-xs font-bold mb-2"
                                       htmlFor="name">
                                    Name
                                </label>
                                <input
                                    value={name}
                                    onChange={(e) => {
                                        setName(e.target.value)
                                    }}
                                    className="appearance-none block w-full bg-zinc-800 text-zinc-300 border border-zinc-900 rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                                    id="name" type="text"/>
                            </div>
                            <div className="w-full md:w-1/3 px-3">
                                <label className="block uppercase tracking-widest text-white text-xs font-bold mb-2"
                                       htmlFor="code">
                                    HSN Code
                                </label>
                                <input
                                    value={code}
                                    onChange={(e) => {
                                        setCode(e.target.value)
                                    }}
                                    className="appearance-none block w-full bg-zinc-800 text-zinc-300 border border-zinc-900 rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                                    id="code" type="text"/>
                            </div>
                            <div className="w-full md:w-1/3 px-3">
                                <label className="block uppercase tracking-widest text-white text-xs font-bold mb-2"
                                       htmlFor="display-unit">
                                    Display Unit
                                </label>
                                <input
                                    value={displayUnit}
                                    onChange={(e) => {
                                        setDisplayUnit(e.target.value)
                                    }}
                                    className="appearance-none block w-full bg-zinc-800 text-zinc-300 border border-zinc-900 rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                                    id="display-unit" type="text"/>
                            </div>
                        </div>

                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-widest text-white text-xs font-bold mb-2"
                                       htmlFor="tax">
                                    Tax
                                </label>
                                <input
                                    value={tax}
                                    onChange={(e) => {
                                        setTax(e.target.value)
                                    }}
                                    className="appearance-none block w-full bg-zinc-800 text-zinc-300 border border-zinc-900 rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                                    id="tax" type="text"/>
                            </div>
                            <div className="w-full md:w-1/3 px-3">
                                <label className="block uppercase tracking-widest text-white text-xs font-bold mb-2"
                                       htmlFor="price">
                                    Price
                                </label>
                                <input
                                    value={price}
                                    onChange={(e) => {
                                        setPrice(e.target.value)
                                    }}
                                    className="appearance-none block w-full bg-zinc-800 text-zinc-300 border border-zinc-900 rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                                    id="price" type="text"/>
                            </div>
                            <div className="w-full md:w-1/3 px-3">
                                <label className="block uppercase tracking-widest text-white text-xs font-bold mb-2"
                                       htmlFor="product-type">
                                    Product Type
                                </label>
                                <select value={productType}
                                        onChange={(e) => {
                                            setProductType(e.target.value)
                                        }}
                                        className="appearance-none block w-full bg-zinc-800 text-zinc-300 border border-zinc-900 rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                                        name="product-type" id="product-type">
                                    <option value="chocolate">Chocolate</option>
                                    <option value="biscuit">Biscuit</option>
                                    <option value="chips">Chips</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-widest text-white text-xs font-bold mb-2"
                                       htmlFor="description">
                                    Description
                                </label>
                                <textarea value={description}
                                          onChange={(e) => {
                                              setDescription(e.target.value)
                                          }}
                                          className="appearance-none block w-full bg-zinc-800 text-zinc-300 border border-zinc-900 rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                                          name="description" id="" cols="30" rows="5"/>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-5">
                    <button onClick={addData}
                            className="bg-blue-500 text-white font-bold py-2 px-4 border-b-4 border-blue-700 rounded relative hover:top-1 hover:border-0">
                        SAVE
                    </button>

                    <Link
                        to="/"
                        className="ml-5 bg-zinc-600 text-white font-bold py-2 px-4 border-b-4 border-zinc-800 rounded relative hover:top-1 hover:border-0">
                        CANCEL
                    </Link>
                </div>
            </div>
        </div>
    )
}