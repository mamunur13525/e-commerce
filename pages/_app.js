import { createContext, useState } from 'react'
import '../styles/globals.css'

export const CartItemsContext = createContext();

function MyApp({ Component, pageProps }) {
  const [cartItems, setCartItems] = useState([]);
  
  return (
    <CartItemsContext.Provider value={[cartItems, setCartItems]}>
    
      <Component {...pageProps} />
    </CartItemsContext.Provider>
  )
}

export default MyApp
