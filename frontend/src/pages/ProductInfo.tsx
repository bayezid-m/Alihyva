import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import useAppDispatch from '../hooks/useAppDispatch'
import { updateUser } from '../redux/reducers/userReducer';
import { Product } from '../types/Product';
import useAppSelector from '../hooks/useAppSelecter';
import { deleteSingleProduct } from '../redux/reducers/productReducer';
import { addCartItem } from '../redux/reducers/cartReducer';

const ProductInfo = () => {
    const { id } = useParams();
    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const [productsInfo, setProductInfo] = useState<Product>()
    let [choise, setChoise] = useState<number>(0)
    const { user, checkemail, loading, error } = useAppSelector(state => state.userReducer)
    const {cart} = useAppSelector(state => state.cartReducer)
    let CartId:number = cart.length+1
    useEffect(() => {
        axios
            .get<Product>(`http://localhost:5296/api/v1/products/${id}`)
            .then((response: AxiosResponse) => setProductInfo(response.data))
    }, [])

    const handleIncChange = () => {
        if (choise === 2) {
            choise = -1
        }
        setChoise(choise = choise + 1)
    }
    const handleDecChange = () => {
        if (choise === 0) {
            choise = 3
        }
        setChoise(choise = choise - 1)
    }
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const confirmDelete =()=>{
        dispatch(deleteSingleProduct({productId:productsInfo?.id as string}));
        navigate('/')
    }
    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
    }
    const Additem = () => {
        dispatch(addCartItem(
          {
            id: CartId,
            product: {
              id: productsInfo?.id as string,
              title: productsInfo?.title as string,
              price: productsInfo?.price as number,
              inventory: productsInfo?.inventory as number,
              category: productsInfo?.category as any,
              description: productsInfo?.description as string,
              url: productsInfo?.url as string[],        
            },
            quantities: 1
          }
          )) 
        }
    return (
        <div className="pinfo">
            <Grid lg={12} spacing={-30} container>
                <Grid item lg={6} xs={12}>
                    <div style={{ minWidth: 400 }}>
                        <ArrowBackIosIcon onClick={handleDecChange} />
                        <img src={productsInfo?.url[choise]} className="poster" alt=" "></img>
                        <ArrowForwardIosIcon onClick={handleIncChange} />
                    </div>
                </Grid>
                <Grid item lg={6} xs={12}>
                    <div className='pdetails'>
                        <h1>{productsInfo?.title}</h1>
                        <h3>Price: {productsInfo?.price}</h3>
                        <p>Catergory: {productsInfo?.category}</p>
                        <p >Description: {productsInfo?.description}</p>
                        <button onClick={() => Additem()}>Add to Cart</button>
                        {user?.role === 'Admin' ?
                            <div >
                                <button>
                                    <Link to={`/updatep/${id}`}>Update</Link>
                                </button>
                                <Button onClick={handleOpen}>Delete</Button>
                                <Modal
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="parent-modal-title"
                                    aria-describedby="parent-modal-description"
                                >
                                    <Box sx={{ ...style, width: 400 }}>
                                        <h2>Delete alert</h2>
                                        <p>
                                            Are you sure you want to delete this product?
                                        </p>
                                        <button style={{ margin: 20 }} onClick={confirmDelete}>
                                            Delete
                                        </button>
                                        <button onClick={handleClose} style={{ margin: 20 }}>
                                            Cancle
                                        </button>
                                        {/* <ChildModal /> */}
                                    </Box>
                                </Modal>
                            </div> : ""
                        }
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default ProductInfo