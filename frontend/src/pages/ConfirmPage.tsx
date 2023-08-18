import { Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const ConfirmPage = () => {
    return (
        <div className='profile'>
            <h1>Thank for your order</h1>
            <h4>Order more</h4>
            <Link to={'/'}><Button variant="contained"
                        sx={{ backgroundColor: 'success.contrastText', color: 'white' }}>Shop</Button></Link>
        </div>
    )
}

export default ConfirmPage