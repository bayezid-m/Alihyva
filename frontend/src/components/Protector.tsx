import React from 'react'
import { Navigate } from 'react-router-dom';

import useAppDispatch from '../hooks/useAppDispatch'
import useAppSelector from '../hooks/useAppSelecter'

interface Props{
    children: any
}
const Protector = ({children}: Props) => {
    const { user, checkemail, loading, error } = useAppSelector(state => state.userReducer)
    if(!user.firstName){
        return<Navigate to ='/' />
    }
    else{
        return children
    }
 
}

export default Protector;