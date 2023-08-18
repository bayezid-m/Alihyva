import { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"

import useAppSelector from '../hooks/useAppSelecter'
import useAppDispatch from '../hooks/useAppDispatch'
import { updateQuantity, deleteItem, emptyCartReducer } from "../redux/reducers/cartReducer"

import Cart from '../types/CartItem'
import { Box, Button, Grid } from '@mui/material'


const CartPage = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { user } = useAppSelector(state => state.userReducer)
    const { cart } = useAppSelector(state => state.cartReducer)
    const [totalPrice, setTotalPrice] = useState(0)

    useEffect(() => {
        let countItem = 0;
        if (cart.length === 0) {
            setTotalPrice(0);
        }
        else {
            for (let i = 0; i < cart.length; i++) {
                countItem = countItem + (cart[i].quantities * cart[i].product.price);
                setTotalPrice(countItem);

            }
        }
    }, [cart])
    const deleteitem = (id: number) => {
        let c: Cart | undefined = cart.find(c => c.id === id)
        if (c !== undefined) {
            dispatch(deleteItem(c));
        }
    }
    const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>, id: number) => {
        dispatch(updateQuantity({ id: id, quantities: parseInt(e.target.value) }))
    }
    return (
        <div className='profile'>
            {cart.length === 0 ?
                <div>
                    <h1>You have nothing in cart</h1>
                    <Link to={'/'}><Button variant="contained"
                        sx={{ backgroundColor: 'success.contrastText', color: 'white' }}>Start Shopping</Button></Link>
                </div> :
                <div>{cart.map((item) => (
                    <Grid item lg={12} container spacing={0} key={item.id}>
                        <Grid item lg={6} xs={12} >
                            <Box sx={{ marginLeft: 20 }}>
                                <img className="poster" src={item.product.url[0]} alt=" " />
                            </Box>
                        </Grid>
                        <Grid item lg={6} xs={12}>
                            <Box sx={{ display: 'flex', gap: 10 }}>
                                <div>
                                    <h4>{item.product.title}</h4>
                                    <nav style={{ display: 'flex' }}>
                                        <p>Quantity: </p>
                                        <div style={{ margin: 15 }}>
                                            <select id="quantity" value={item.quantities} name="quantity" onChange={(e) => handleQuantityChange(e, item.id)}>
                                                <option value='1'>1</option>
                                                <option value='2'>2</option>
                                                <option value='3'>3</option>
                                                <option value='4'>4</option>
                                                <option value='5'>5</option>
                                                <option value='6'>6</option>
                                                <option value='7'>7</option>
                                                <option value='8'>8</option>
                                                <option value='9'>9</option>
                                                <option value='10'>10</option>
                                            </select>
                                        </div>
                                    </nav>
                                    <button onClick={() => deleteitem(item.id)}>Delete</button>
                                </div>
                                <div>
                                    <h4>&euro;{item.product.price}</h4>
                                </div>
                            </Box>
                        </Grid>
                    </Grid>))}</div>
            }

            <p style={{ textAlign: 'center', marginRight: '-40%' }}>Total item:  {cart.length} <br />
                Total price: <strong>&euro;{totalPrice}</strong></p>
            {cart.length === 0 ? <div>
                <Button variant="contained"
                    sx={{ backgroundColor: 'success.contrastText', color: 'white', marginLeft: '65%' }}>Place order</Button>
            </div> :
                <div>
                    {user.firstName ? <div>
                        <Link to={'/success'}> <Button variant="contained"
                            sx={{ backgroundColor: 'success.contrastText', color: 'white', marginLeft: '65%' }}>Place order</Button>
                        </Link>
                    </div> : <div>
                    <Link to={'/request'}> <Button variant="contained"
                            sx={{ backgroundColor: 'success.contrastText', color: 'white', marginLeft: '65%' }}>Place order</Button>
                        </Link>
                    </div>}

                </div>}

        </div>
    )
}

export default CartPage