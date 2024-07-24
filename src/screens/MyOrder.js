import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';

export default function MyOrder() {
    const [orderData, setOrderData] = useState(null);

    const fetchMyOrder = async () => {
        const email = localStorage.getItem('useremail');
        console.log(email);

        const response = await fetch("http://localhost:3005/api/myorderdata", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email }),
            credentials: 'include'
        });

        const data = await response.json();
        setOrderData(data);
    };

    useEffect(() => {
        fetchMyOrder();
    }, []);

    return (
        <div>
            <div className='container'>
                <div className='row'>
                    {orderData && orderData.order_data ? orderData.order_data.slice(0).reverse().map((item, index) => (
                        item.map((arrayData, subIndex) => (
                            <div key={subIndex}>
                                {arrayData.Order_date ? (
                                    <div className='m-auto mt-5'>
                                        <hr />
                                        {arrayData.Order_date}
                                    </div>
                                ) : (
                                    <div className='col-12 col-md-6 col-lg-3'>
                                        <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                            
                                            <div className="card-body">
                                                <h5 className="card-title">{arrayData.name}</h5>
                                                <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                    <span className='m-1'>{arrayData.qty}</span>
                                                    <span className='m-1'>{arrayData.size}</span>
                                                    <span className='m-1'>{arrayData.Order_date}</span>
                                                    <div className='d-inline ms-2 h-100 w-20 fs-5'>
                                                        ₹{arrayData.price}/-
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))
                    )) : "Loading..."}
                </div>
            </div>
            <Footer />
        </div>
    );
}
