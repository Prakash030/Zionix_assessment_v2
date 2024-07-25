import React from 'react';

const Navbar = ({
  showCart,
  partNumber,
  setPartNumber,
  volume,
  setVolume,
  fetchResults
}) => {
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
          fetchResults();
        }
      };
  return (
    <nav className="navbar">
      <h1 className='navHead'>Part Search</h1>
      <div className='side'>
      <input
        placeholder="Enter Part Number"
        value={partNumber}
        onChange={(e) => setPartNumber(e.target.value)}
        type="text"
        style={{
            padding: '10px',
            borderRadius: '8px',

        }}
        onKeyDown={handleKeyPress}
      />
      <input
        placeholder="Enter Volume"
        type="text"
        value={volume}
        onChange={(e) => setVolume(e.target.value)}
        style={{
            padding: '10px',
            borderRadius: '8px',
            
        }}
        onKeyDown={handleKeyPress}
      />
      <button onClick={fetchResults} className='search-button'>Search</button>
      <button onClick={showCart} className="cart-button">View Cart</button>
      </div>
    </nav>
  );
};

export default Navbar;
