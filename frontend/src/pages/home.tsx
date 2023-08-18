import React, { useEffect, useState } from 'react'
import { fetchAllProducts, fetchFromCategory, sortByPrice } from '../redux/reducers/productReducer'

import useAppDispatch from '../hooks/useAppDispatch'
import useAppSelecter from '../hooks/useAppSelecter'
import Card from '../components/CardView'
import { Container, Grid } from '@mui/material'
import { Product } from '../types/Product'
import useAppSelector from '../hooks/useAppSelecter'
import PaginationDo from '../components/Pagination'


const getFilteredList = (products: Product[], search: string) => {
    return products.filter(product => product.title.toLowerCase().includes(search.toLocaleLowerCase()))
}

const Home = () => {
    const dispatch = useAppDispatch()
    const [search, setSearch] = useState('')
    const { products, error, loading } = useAppSelecter(state => state.productsReducer)
    const filteredProducts = getFilteredList(products, search)
    const [category, setCategory] = useState(100)
    const [priceSort, setPriceSort] = useState<"Low" | "High">("Low")
    const [currentpage, setCurrentpage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(12);
    const [priceRange, setPriceRange] = useState('');
    const lastPostIndex = currentpage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;

    // useEffect(() => {
    //     if (category === 100) {
    //         dispatch(fetchAllProducts())
    //         setPriceSort("Low")
    //     }
    //     // else if (category < 10 && priceRange !== '') {
    //     //     let mainRange = returnPrice(priceRange);
    //     //     dispatch(fetchRangeProduct({ min: mainRange.min, max: mainRange.max, categoryId: category }));
    //     // }
    //     else {
    //         dispatch(fetchFromCategory({ categoryId: category }))
    //         setPriceSort("Low")
    //     }
    // }, [category])
    useEffect(()=>{
       
        dispatch(fetchAllProducts());
    },[])
    // console.log(priceRange);
    // const mainResultProduct = filteredProducts.slice(firstPostIndex, lastPostIndex);
    // const handleSort = () => {
    //     dispatch(sortByPrice(priceSort))
    //     setPriceSort(priceSort === "Low" ? "High" : "Low")
    // }
    // const handleRange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    //     setPriceRange(e.target.value);
    // };
    const returnPrice = (option: string) => {
        let priceRangeChoose = { min: 0, max: 0 };
        switch (option) {
            case '1':
                priceRangeChoose.min = 0;
                priceRangeChoose.max = 100;
                break;
            case '2':
                priceRangeChoose.min = 100;
                priceRangeChoose.max = 300;
                break;
            case '3':
                priceRangeChoose.min = 300;
                priceRangeChoose.max = 500;
                break;
            case '4':
                priceRangeChoose.min = 500;
                priceRangeChoose.max = 800;
                break;
            case '5':
                priceRangeChoose.min = 800;
                priceRangeChoose.max = 1000;
                break;
            case '6':
                priceRangeChoose.min = 1000;
                priceRangeChoose.max = 100000000;
                break;
        }
        return priceRangeChoose;
    }
   
    return (
        <div >
            <Container>
                <Grid item lg={12} spacing={2} container sx={{ marginTop: 8 }}>
                    {/* <Grid item lg={3} xs={6}>
                        <h4>Price range</h4>
                        <select className='select' id="category" name="category" onChange={handleRange}>
                            <option value="1">0 to 100</option>
                            <option value="2">100 to 300</option>
                            <option value="3">300 to 500</option>
                            <option value="4">500 to 800</option>
                            <option value="5">800 to 1000</option>
                            <option value="6">Above 1000</option>
                        </select>
                    </Grid>
                    <Grid item lg={3} xs={6}>
                        <h4>Price order</h4>
                        <select className='select' id="category" name="category" onChange={e => handleSort()}>
                            <option value="">Low to High</option>
                            <option value="">Hight to Low</option>
                        </select>
                    </Grid> */}
                    <Grid item lg={3} xs={6} >
                        <h4>Search product</h4>
                        <form >
                            <input className='select' placeholder='search by name' type="search" name="search" id="" value={search} onChange={e => setSearch(e.target.value)} />
                        </form>
                    </Grid>
                </Grid>
            </Container>
            <Container >
                <Grid container spacing={1.5}>
                    {filteredProducts.map((product) => (
                        <Grid item xs={6} md={3} sm={6} lg={3} key={product.id} >
                            <Card products={product} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
            <div className='div2'>
                <PaginationDo totalPosts={filteredProducts.length}
                    postsPerPage={postsPerPage}
                    setCurrentPage={setCurrentpage}
                    currentPage={currentpage}
                    setPostsPerPage={setPostsPerPage}
                />
            </div>

        </div>
    )
}

export default Home


