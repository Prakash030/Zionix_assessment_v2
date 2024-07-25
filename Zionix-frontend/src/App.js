import React, { useState } from 'react';
import Navbar from './Components/Navbar';
import ResultTable from './Components/ResultTable';
import Cart from './Components/Cart';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

  const App = () => {
    const [results, setResults] = useState([]);
    const [cart, setCart] = useState([]);
    const [showCart, setShowCart] = useState(false);
    const [partNumber, setPartNumber] = useState('');
    const [volume, setVolume] = useState('');
    const [loading, setLoading] = useState(false);
  
    const fetchResults = async () => {
      setShowCart(false);
      if (!partNumber) {
        toast.error('Please enter a part number', { position: "top-center" });
        return;
      }
      if (!volume) {
        toast.error('Please enter a volume', { position: "top-center" });
        return;
      }
      
      setLoading(true);
      try {
        const response = await fetch('http://localhost:5000/api/search', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ partNumber, volume })
        });
        if (response.ok) {
          const data = await response.json();
          setResults(data);
          toast.success('Results fetched successfully', { position: "top-center" });
        } else {
          toast.error('Failed to fetch results', { position: "top-center" });
        }
      } catch (error) {
        toast.error('Failed to fetch results', { position: "top-center" });
      } finally {
        setLoading(false);
      }
    };
  
    const addToCart = (item) => {
      setCart(prevCart => [...prevCart, { ...item }]);
      setShowCart(true);
      toast.success('Item added to cart', { position: "top-center" });
    };
  
    const updateVolume = async (index, newVolume) => {
      const optimisticCart = cart?.map((item, i) => {
        if (i === index) {
          return { 
            ...item, 
            volume: newVolume, 
            totalPrice: item?.unitPrice * newVolume
          };
        }
        return item;
      });
      setCart(optimisticCart);
    
      try {
        const response = await fetch('http://localhost:5000/api/update', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            partNumber: cart[index]?.partNumber,
            volume: newVolume,
            dataProvider: cart[index]?.dataProvider
          })
        });
    
        if (response?.ok) {
          const { unitPrice } = await response.json();
          const updatedCart = optimisticCart?.map((item, i) => {
            if (i === index) {
              return { 
                ...item, 
                unitPrice: unitPrice, 
                totalPrice: unitPrice * newVolume 
              };
            }
            return item;
          });
    
          setCart(updatedCart);
        } else {
          console.error('Failed to fetch new prices');
          toast.error('Failed to fetch new prices', { position: "top-center" });
          setCart(cart);
        }
      } catch (err) {
        console.error('Error:', err);
        toast.error('Failed to fetch new prices', { position: "top-center" });
        setCart(cart);
      }
    };
    
    
  
    const removeFromCart = (index) => {
      setCart(prevCart => prevCart.filter((_, i) => i !== index));
      toast.success('Item removed from cart', { position: "top-center" });
    };
  
    return (
      <div className="App">
        <Navbar
          showCart={() => setShowCart(!showCart)}
          partNumber={partNumber}
          setPartNumber={setPartNumber}
          volume={volume}
          setVolume={setVolume}
          fetchResults={fetchResults}
        />
        {!showCart && <ResultTable results={results} addToCart={addToCart} loading={loading} />}
        {showCart && (
          <Cart
            cart={cart}
            updateVolume={updateVolume}
            removeFromCart={removeFromCart}
            setShowCart={setShowCart}
          />
        )}
        <ToastContainer />
      </div>
    );
  };
  
  export default App;
