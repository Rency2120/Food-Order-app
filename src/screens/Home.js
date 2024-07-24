import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import Card from '../components/Card'
import Burger from '../images/burger.jpg'
import Food1 from '../images/food1.jpeg'
import Food2 from '../images/food2.jpg'


const Home = () => {

    const [search, setSearch] = useState('')
    const [foodCat, setFoodCat] = useState([]);
    const [foodItem, setFoodItem] = useState([]);

    const loadData = async () => {
        const res = await fetch("http://localhost:3005/api/foodData", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include'
        });

        const data = await res.json();
        setFoodItem(data[0]);
        setFoodCat(data[1]);

    }

    useEffect(() => {
        loadData()
    }, [])

    return (
        <>
            <div id="carouselExampleFade" className="carousel slide carousel-fade " data-bs-ride="carousel" data-bs-interval="1000">

                <div className="carousel-inner " id='carousel'>
                    <div className=" carousel-caption  " style={{ zIndex: "9" }}>
                        <div className=" d-flex justify-content-center">
                            <input className="form-control me-2 w-75 " type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
                        </div>
                    </div>
                    <div className="carousel-item active" >
                        <img src={Burger} className="d-block w-100 " style={{ filter: "brightness(30%)", objectFit: "contain" }} alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src={Food1} className="d-block w-100" style={{ filter: "brightness(30%)", objectFit: "contain" }} alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src={Food2} className="d-block w-100" style={{ filter: "brightness(30%)", objectFit: "contain" }} alt="..." />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
                {
                    <style jsx>{`
                    .carousel-control-prev,
                    .carousel-control-next{
                    display:none;
                    }
                    `
                    }</style>
                }
            </div>
            <div className='container'>
                {
                    foodCat !== []
                        ? foodCat.map((data) => {
                            return (
                                <div className='row mb-3'>
                                    <div key={data._id} className='fs-3 m-3'>{data.CategoryName}</div>
                                    <hr />
                                    {
                                        foodItem !== []
                                            ? foodItem.filter((item) => item.CategoryName === data.CategoryName && (item.name.toLowerCase().includes(search.toLocaleLowerCase())))
                                                .map((filterItems) => {
                                                    return (
                                                        <div key={filterItems._id} className='col-lg-4 col-md-6 d-flex justify-content-center'>
                                                            <Card foodItems={filterItems} options={filterItems.options[0]} />
                                                        </div>
                                                    )

                                                }) :
                                            <div>No such data found</div>
                                    }
                                </div>

                            )
                        }) : ""
                }
            </div>
            <div><Footer /></div>

        </>

    )
}

export default Home
