import React from 'react'
import Navbar from '../Components/Navbar'
import '../Components/Components.css'
import { Link, useNavigate } from 'react-router-dom'
// import { IoIosArrowDown } from 'react-icons/io'
import { MdOutlineArrowBackIosNew } from 'react-icons/md'
import axios from 'axios'
import { useEffect, useState } from 'react'

const Electronics = ({ addToCart, count }) => {
    const [data, setData] = useState([]);
    const [visible, setVisible] = useState(6)

    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1)
    }

    useEffect(() => {
        axios.get("https://backend-ecommer-dq0g.onrender.com/products/electronics")
            .then((response) => setData(response.data))
            .catch((error) => console.log("Error", error))
    }, [])

    const loadMoreItems = () => {
        setVisible(prevValue => prevValue + 6)
    }

    return (
        <>
            <Navbar count={count} />
            <MdOutlineArrowBackIosNew className='back-icon' onClick={goBack} />
            {/* <div className='product-category-dropdown-container'>
                <div className="product-category-dropdown">
                    <button className="product-category-dropdown-btn">SHOP BY CATEGORY IN ELECTRONICS <IoIosArrowDown /></button>
                    <div class="product-category-dropdown-content">
                        <Link to='/electronics/cellphonesandaccessories'>Cell Phones and Accessories</Link>
                        <Link to='/electronics/computersandaccessories'>Computers and Accessories</Link>
                        <Link to='/electronics/headphones'>Headphones</Link>
                        <Link to='/electronics/televisionandvideo'>Television and Video</Link>
                        <Link to='/electronics/smarthome'>Smart Home</Link>
                    </div>
                </div>
            </div> */}
            <h4 className='headings'>ELECTRONICS</h4>
            <div className='products-data-container'>
                <div className='products-data'>
                    {
                        data.slice(0, visible).filter((item, index) => { return item.id >= 1 && item.id <= 90 }).map((element, index) => (
                            <div className='product-card' key={index}>
                                <Link to={`/detaildescription/${element.id}`} ><img src={element.productImage1} alt=""></img></Link>
                                <div className='product-card-data-description'>
                                    <Link to={`/detaildescription/${element.id}`} className='product-link'><h5>{element.productTitle}</h5></Link>
                                    <p className='product-price'>&#x20b9; {element.productPrice}</p>
                                    <button className='add-to-cart-btn' onClick={() => { addToCart(element) }}>Add to Cart</button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className='load-more-products-container'>
                <button onClick={loadMoreItems} className={visible === 90 ? 'load-more-products-button-hidden' : 'load-more-products-button-visible'}>LOAD MORE PRODUCTS »</button>
            </div>
        </>
    )
}

export default Electronics