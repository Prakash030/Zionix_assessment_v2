import React from 'react';
import { FallingLines } from 'react-loader-spinner';

const ResultTable = ({ results, addToCart, loading }) => {
  if (results.length === 0 && !loading) return null;

  const handleAddToCart = (item) => {
    addToCart(item);
  };

  const formatNumber = (number) => {
    return number?.toFixed(4);
  };

  return (
    <>
      {loading ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <FallingLines
            color="#ff6f61"
            width="100"
            visible={true}
            ariaLabel="falling-circles-loading"
          />
        </div>
      ) : (
        <>
          {results?.length > 0 ?
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
              {results?.map((item, index) => (
                <tr key={index}>
                  <td>{item?.partNumber}</td>
                  <td>{item?.manufacturer}</td>
                  <td>{item?.dataProvider}</td>
                  <td>{item?.volume}</td>
                  <td>{formatNumber(item.unitPrice)}</td>
                  <td>{formatNumber(item.totalPrice)}</td>
                  <td>
                    <button className='cart-button' onClick={() => handleAddToCart(item)}>ADD TO CART</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>:
          <div>
            <h2>No results found</h2>
          </div>}
        </>
      )}
    </>
  );
};

export default ResultTable;
