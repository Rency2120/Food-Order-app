import React, { useEffect, useRef, useState } from 'react';
import { useCart, useDispatchCart } from './ContexReducer';

const Card = (props) => {

    const [qty, setQty] = useState(1);
    const [size, setSize] = useState('');

    const priceRef = useRef()

    let dispatch = useDispatchCart();

    let data = useCart();

    let options = props.options;
    let priceOptions = Object.keys(options);

    const handleAddToCart = async () => {

        let food = [];

        for (const item of data) {
            if (item.id === props.foodItems._id) {
                food = item;
                break;
            }
        }

        if (food !== []) {
            if (food.size === size) {
                await dispatch({ type: "UPDATE", id: props.foodItems._id, price: finalPrice, qty: qty, size: size });
                return
            }
            else if (food.size !== size) {
                await dispatch({ type: "ADD", id: props.foodItems._id, name: props.foodItems.name, price: finalPrice, qty: qty, size: size });
                // console.log(data);
                return
            }
            return
        }
        await dispatch({ type: "ADD", id: props.foodItems._id, name: props.foodItems.name, price: finalPrice, qty: qty, size: size });

    }

    useEffect(() => {
        setSize(priceRef.current.value)
    }, [])

    let finalPrice = qty * parseInt(options[size])
    return (

        <div className="card mt-3" style={{ "width": "18rem", "maxWidth": "360px" }}>
            <img src={props.foodItems.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
            <div className="card-body">
                <h5 className="card-title">{props.foodItems.name}</h5>
                <div className="container w-100">
                    <select className='m-2 h-100 bg-info rounded' onChange={(e) => setQty(e.target.value)}>
                        {Array.from(Array(6), (e, i) => {
                            return (
                                <option key={i + 1} value={i + 1}>{i + 1}</option>
                            )
                        })}
                    </select>
                    <select className='m-2 h-100 bg-info rounded' ref={priceRef} onChange={(e) => setSize(e.target.value)}>
                        {
                            priceOptions.map((data) => {
                                return (
                                    <option key={data} value={data}>{data}</option>
                                )
                            })
                        }

                    </select>
                    <div className="d-inline h-100 fs-5">₹{finalPrice}/-</div>
                </div>
                <hr />
                <button className={`btn btn-info justify-center ms-2`} onClick={handleAddToCart}>Add to Cart</button>
            </div>
        </div>
    )
}

export default Card
