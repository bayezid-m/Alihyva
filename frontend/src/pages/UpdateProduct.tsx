import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from "react-router-dom";
import useAppDispatch from '../hooks/useAppDispatch'
import useAppSelector from '../hooks/useAppSelecter';
import axios, { AxiosResponse } from "axios";

import { Product } from '../types/Product';
import { response } from 'msw';
import { updateSingleProduct } from '../redux/reducers/productReducer';

const UpdateProduct = () => {
    const { id } = useParams();
    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [productsInfo, setProductInfo] = useState<Product>()
    let [title, setTitle] = useState<any>('')
    let [price, setPrice] = useState<any>(0)
    let [description, setDesciption] = useState<any>('')
    console.log(id);
    const initialValue = async () => {
        await setTitle(productsInfo?.title)
        setPrice(productsInfo?.price)
        setDesciption(productsInfo?.description)
    }
    const getData = async () => {
        const response = await axios.get<Product>(`http://localhost:5296/api/v1/products/${id}`)
        setProductInfo(response.data)
       
        setTitle(response.data?.title)
        setPrice(response.data?.price)
        setDesciption(response.data?.description)
        
        return
    }
    useEffect(() => {
        getData()
        // axios
        // .get<Product>(`https://api.escuelajs.co/api/v1/products/${id}`)
        // .then((response: AxiosResponse) => setProductInfo(response.data)) 
        // setTitle(productsInfo?.title)
        // setPrice(productsInfo?.price)
        // setDesciption(productsInfo?.description)
        //initialValue()
    }, [])

    console.log(productsInfo?.title);
    useEffect(() => {
        initialValue()
    }, []);
    console.log(title);
    // const getData = async() ={
    //    const response await axios
    //         .get<Product>(`https://api.escuelajs.co/api/v1/products/${id}`)
    //         .then((response: AxiosResponse) => setProductInfo(response.data)) 
    // }


    const updateProduct = () => {
        if (title === '' || price <= 0 || description === '') {
            setErrorMessage("Please check all the input again")
        }
        else {
            console.log(title);
            dispatch(updateSingleProduct({ productData: { title: title, price: price, description: description }, productId: productsInfo?.id as string }))
            console.log('failled');
            setLoading(true)
         
        }
    }
    console.log(errorMessage);
    return (
        <div className='profile'>
            <form>
                <div>
                    <label htmlFor="title" className="title">Title: </label>
                    <input type="text" className="title" value={title} onChange={e => setTitle(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="price" className="price">Price: </label>
                    <input type="number" className="price" value={price} onChange={e => setPrice(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="description" className="description">Description: </label>
                    <input type="text" className="description" value={description} onChange={e => setDesciption(e.target.value)} />
                </div>
                <button className="setUpdate" onClick={updateProduct}> <Link to={`/info/${id}`}>Save</Link></button>
            </form>
        </div>
    )
}

export default UpdateProduct