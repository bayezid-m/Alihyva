import { Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const RequestPage = () => {
    return (
        <div className='profile'>
            <h1>You are not loged in</h1>
            <div>Please login first</div>
            <Link to={'/login'}><Button variant="contained"
                sx={{ backgroundColor: 'success.contrastText', color: 'white' }}>Login</Button></Link>
        </div>
    )
}

export default RequestPage