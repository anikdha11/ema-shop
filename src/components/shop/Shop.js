import React, { useEffect, useState } from 'react';
import Cart from '../../cart/Cart';
import { addToDb, getStoredCart } from '../../utilities/fakedb';
import Product from '../product/Product';
import './Shop.css'
const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [showProducts,setShowProducts] = useState([])

    useEffect(() =>{
        // console.log('product call');
        fetch('./products.json')
        .then(res => res.json())
        .then(data => {
            setProducts(data);
            setShowProducts(data);
        // console.log('product received');
    })
    },[]);

    useEffect(()=>{
        // console.log('LocalStorage cart called ')
        if(products.length){
            const saveCart = getStoredCart();
            const storeCart = [];
        for(const key in saveCart){
            console.log(key, saveCart[key]);
            // console.log(products)
            const addedProduct = products.find(product => product.key === key);
            // console.log(key,addedProduct);
            if(addedProduct){
                const quantity = saveCart[key];
                addedProduct.quantity = quantity;
                storeCart.push(addedProduct);
            }
            

        }
        setCart(storeCart);
        }
    },[products])


    const handleAddToCart = (product) =>{
     const newCart =[...cart, product];
     setCart(newCart);
     //save to local stroage..
     addToDb(product.key)
    }
    const handleSearch = event =>{
        const searchText = event.target.value;
        const matchedProducts = products.filter(product => product.name.toLowerCase().includes(searchText.toLowerCase()));
        setShowProducts(matchedProducts);
        console.log(matchedProducts.length);

    }
    return (
        <>
        <div className="search-container">
        <input type="text" onChange={handleSearch} placeholder="Search Product" />
        </div>
        <div className="shop-container">
            <div className="product-container">
                {/* <h3>Products: {products.length}</h3> */}
                {
                    showProducts.map(product => <Product
                        key = {product.key}
                        product={product}
                        handleAddToCart={handleAddToCart}></Product> )
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}></Cart>
            </div>
        </div>
        </>
    );
};

export default Shop;