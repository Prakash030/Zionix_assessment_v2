import React from 'react';
import './styles.css';

const Cart = ({ cart, updateVolume, removeFromCart, setShowCart }) => {
    const handleVolumeChange = (index, event) => {
        const newVolume = event.target.value;
        updateVolume(index, newVolume); // Only updates the cart
    };

    const formatNumber = (number) => {
        return number?.toFixed(4);
    };

    return (
        <>
        <div style={{marginTop: "1%"}}>
            <div className='card-head'>
                <h2>My Cart</h2>
                <button onClick={() => setShowCart(false)}>X</button>
            </div>
            {cart?.length === 0 ? (
                <p style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>No items in the cart.</p>
            ) : (
                <table className="results-table">
                    <thead>
                        <tr>
                            <th>Part Number</th>
                            <th>Manufacturer</th>
                            <th>Data Provider</th>
                            <th>Volume</th>
                            <th>Unit Price</th>
                            <th>Total Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart?.map((item, index) => (
                            <tr key={index}>
                                <td>{item?.partNumber}</td>
                                <td>{item?.manufacturer}</td>
                                <td>{item?.dataProvider}</td>
                                <td>
                                    <input
                                        style={{ width: '150px', padding: "5%" }}
                                        type="number"
                                        value={item?.volume}
                                        onChange={(e) => handleVolumeChange(index, e)}
                                    />
                                </td>
                                <td>{formatNumber(item.unitPrice)}</td>
                                <td>{formatNumber(item.totalPrice)}</td>
                                <td>
                                    <button className='search-button' style={{ background: 'red', color: "white", border: "none" }} onClick={() => removeFromCart(index)}>Remove</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
        </>
    );
};

export default Cart;
