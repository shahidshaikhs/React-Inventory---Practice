import {Link} from "react-router-dom";
import {INVENTORY_STORAGE_KEY} from "../helper/constant";
import {useEffect, useState} from "react";
import log from "tailwindcss/lib/util/log";

export default function Products() {

    const [searchName, setSearchName] = useState('');
    const [searchPrice, setSearchPrice] = useState('');

    const [productData, setProductData] = useState(() => {
        return JSON.parse(localStorage.getItem(INVENTORY_STORAGE_KEY)) || [];
    });

    useEffect(() => {
        localStorage.setItem(INVENTORY_STORAGE_KEY, JSON.stringify(productData));
    }, [productData]);

    const deleteProduct = (productID) => {
        setProductData(() => {
            return productData.filter(product => {
                return product.id !== productID;
            });
        });
    }

    return (
        <div className="bg-zinc-800 text-white max-w-6xl mx-auto mt-20 rounded">
            <div className="px-5 py-5 h-24 font-semibold flex justify-between items-center">
                <p>
                    Products List
                </p>
                <Link
                    to="/add-product"
                    className="ml-5 bg-blue-600 text-white font-bold py-2 px-4 border-b-4 border-blue-800 rounded relative hover:top-1 hover:border-0">
                    Add Product
                </Link>
            </div>
            <div className="bg-zinc-700 px-5 py-5">
                <div className="border-2 border-zinc-800 px-5 py-5">
                    <div className="flex flex-wrap -mx-3">
                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-widest text-white text-xs font-bold mb-2"
                                   htmlFor="name">
                                Name
                            </label>
                            <input autoComplete="new-password"
                                   value={searchName}
                                   onChange={(e) => {
                                       setSearchName(e.target.value)
                                   }}
                                   className="appearance-none block w-full bg-zinc-800 text-zinc-300 border border-zinc-900 rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                                   id="name" type="text"/>
                        </div>
                        <div className="w-full md:w-1/3 px-3">
                            <label className="block uppercase tracking-widest text-white text-xs font-bold mb-2"
                                   htmlFor="price">
                                Price
                            </label>
                            <input
                                value={searchPrice}
                                onChange={(e) => {
                                    setSearchPrice(e.target.value)
                                }}
                                className="appearance-none block w-full bg-zinc-800 text-zinc-300 border border-zinc-900 rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                                id="price" type="text"/>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="shadow overflow-hidden">
                            <table className="min-w-full divide-y divide-zinc-800">
                                <thead className="bg-zinc-800">
                                <tr>
                                    <th scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                                        #
                                    </th>
                                    <th scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                                        Display Name
                                    </th>
                                    <th scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                                        Code
                                    </th>
                                    <th scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                                        Product Price
                                    </th>
                                    <th scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                                        Display Unit
                                    </th>
                                    <th scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                                        Tax
                                    </th>
                                    <th scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="bg-zinc-700 divide-y divide-zinc-800">
                                {
                                    productData.length > 0 && productData.filter((product) => {
                                        if (searchName === "") {
                                            return product
                                        } else if (product.name.toLowerCase().includes(searchName.toLowerCase())) {
                                            return product
                                        }
                                    }).filter((product) => {
                                        if (searchPrice === "") {
                                            return product
                                        } else if (product.price.toLowerCase().includes(searchPrice.toLowerCase())) {
                                            return product
                                        }
                                    }).map((product, index) => {
                                        return (
                                            <tr key={product.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-zinc-200">{index + 1}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-zinc-200">{product.name}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-400">
                                                    {product.code}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-400">
                                                    {product.price}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-400">
                                                    {product.displayUnit}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-400">
                                                    {product.tax}
                                                </td>
                                                <td className="pl-6 py-4 whitespace-nowrap text-right text-sm font-medium flex">
                                                    <Link
                                                        to={`/add-product/${product.id}`}
                                                        className="bg-green-600 text-white font-bold py-1 px-4 border-b-4 border-green-800 rounded relative hover:top-1 hover:border-0">Edit
                                                    </Link>
                                                    <button onClick={() => deleteProduct(product.id)}
                                                            className="ml-3 bg-red-600 text-white font-bold py-1 px-4 border-b-4 border-red-800 rounded relative hover:top-1 hover:border-0">Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}