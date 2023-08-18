import React from 'react'
import { Box, Button, Card, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import useAppDispatch from '../hooks/useAppDispatch';
import useAppSelector from '../hooks/useAppSelecter';
import { addCartItem } from '../redux/reducers/cartReducer';
import { Product } from '../types/Product';

interface Props {
  products: Product;
}

const CardView = (props: Props) => {
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector(state => state.cartReducer);
  let CartId: number = cart.length + 1;
  const Additem = () => {
    dispatch(addCartItem(
      {
        id: CartId,
        product: {
          id: props.products.id,
          title: props.products.title,
          price: props.products.price,
          category: props.products.category,
          inventory: props.products.inventory,
          description: props.products.description,
          url: props.products.url,
        },
        quantities: 1
      }
    ))
  }
  return (
    <Card className='card' sx={{ backgroundColor: 'success.main' }}>
      <Link to={`info/${props.products.id}`} ><img src={props.products.url[0]} className="poster" alt=" "></img></Link>
      <h4>{props.products.title}</h4>
      Price: {props.products.price}
      <Box >
        <Button className='card_button'
          variant="contained"
          sx={{ backgroundColor: 'success.contrastText', color: 'white' }}
          onClick={() => Additem()}>Add to cart</Button>
      </Box>
    </Card>
  )
}

export default CardView