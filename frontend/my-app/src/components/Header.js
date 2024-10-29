import Link from 'next/link';
import Image from 'next/image';
import logo from '../assets/logo.svg';
import cart from '../assets/Cart.svg';
import heart from '../assets/Heart.svg';
import user from '../assets/User.svg';

const Header = () => {

    const handleCategoryRedirect = (categoryName) => {
        window.location.href = `/categoryTest?category=${categoryName}`;
    };

    const handleHomepageRedirect = () => {
        window.location.href = `/homePage`;
    };

    return (
        <header>
            <nav className="bg-white p-4 flex flex-col md:flex-row items-center mb-2 mx-5">
                <div className="flex items-center mb-4 md:mb-0">
                    <Image src={logo} alt="Site Logo" width={25} height={25} className="mr-4" />
                    <div className="flex space-x-4">
                        <span onClick={handleHomepageRedirect} className="text-black p-2 rounded hover:text-white hover:bg-black cursor-pointer">
                            Home
                        </span>
                        <span onClick={() => handleCategoryRedirect('Women')} className="text-black p-2 rounded hover:text-white hover:bg-black cursor-pointer">
                            Women
                        </span>
                        <span onClick={() => handleCategoryRedirect('Men')} className="text-black p-2 rounded hover:text-white hover:bg-black cursor-pointer">
                            Men
                        </span>
                        <span onClick={() => handleCategoryRedirect('Kids')} className="text-black p-2 rounded hover:text-white hover:bg-black cursor-pointer">
                            Kids
                        </span>
                    </div>
                </div>
                <div className="flex items-center space-x-4 ml-auto">
                    <Link href="/cart">
                        <Image src={cart} alt="Cart" width={20} height={20} />
                    </Link>
                    <Link href="/wishlist">
                        <Image src={heart} alt="Wishlist" width={20} height={20} />
                    </Link>
                    <Link href="/login">
                        <Image src={user} alt="User Profile" width={20} height={20} />
                    </Link>
                </div>
            </nav>
        </header>
    );
}

export default Header;
