import "@/styles/globals.css";
import Header from '../components/Header';
import Footer from '../components/Footer';
import { CartProvider } from './cartContext';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Header/>
      <CartProvider>
            <Component {...pageProps} />
        </CartProvider>
      <Footer/>
    </>
    );
}
