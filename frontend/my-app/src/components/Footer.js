import Icon1 from "../assets/Facebook.svg";
import Icon2 from "../assets/Instagram.svg";
import Icon3 from "../assets/X.svg";
import Icon4 from "../assets/Vector.svg";
import Icon5 from "../assets/Youtube.svg";
import Image from 'next/image';

const Footer = () => {
    return (
        <footer className="bg-gray-700 p-6">
            <div className="text-white flex flex-col md:flex-row justify-between items-start">
                <div className="space-y-4 mb-6 md:mb-0">
                    <h2 className="text-xl font-bold">Logo</h2>
                    <div className="space-y-1">
                        <h3 className="text-md font-semibold">Address</h3>
                        <p className="text-sm text-white font-teko">USA, California</p>
                    </div>
                    <div className="space-y-2 mt-4">
                        <h3 className="text-md font-semibold">Contact</h3>
                        <p className="text-sm text-white font-teko">1800 123 4567</p>
                        <p className="text-sm text-white font-teko">javaria.y2b@gmail.com</p>
                    </div>
                    <div className="flex space-x-4 mt-4">
                        <Image src={Icon1} alt="Facebook" className="w-6 h-6 hover:cursor-pointer" />
                        <Image src={Icon2} alt="Instagram" className="w-6 h-6 hover:cursor-pointer" />
                        <Image src={Icon3} alt="X" className="w-6 h-6 hover:cursor-pointer" />
                        <Image src={Icon4} alt="Vector" className="w-6 h-6 hover:cursor-pointer" />
                        <Image src={Icon5} alt="YouTube" className="w-6 h-6 hover:cursor-pointer" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="flex flex-col space-y-2">
                        <h2 className="text-xl font-bold">Page</h2>
                        <a href="/posts" className="text-white hover:text-gray-300">Page 1</a>
                        <a href="/posts" className="text-white hover:text-gray-300">Page 2</a>
                        <a href="/posts" className="text-white hover:text-gray-300">Page 3</a>
                        <a href="/posts" className="text-white hover:text-gray-300">Page 4</a>
                    </div>

                    <div className="flex flex-col space-y-2">
                        <h2 className="text-xl font-bold">Page</h2>
                        <a href="/posts" className="text-white hover:text-gray-300">Page 1</a>
                        <a href="/posts" className="text-white hover:text-gray-300">Page 2</a>
                        <a href="/posts" className="text-white hover:text-gray-300">Page 3</a>
                        <a href="/posts" className="text-white hover:text-gray-300">Page 4</a>
                    </div>

                    <div className="flex flex-col space-y-2">
                        <h2 className="text-xl font-bold">Page</h2>
                        <a href="/posts" className="text-white hover:text-gray-300">Page 1</a>
                        <a href="/posts" className="text-white hover:text-gray-300">Page 2</a>
                        <a href="/posts" className="text-white hover:text-gray-300">Page 3</a>
                        <a href="/posts" className="text-white hover:text-gray-300">Page 4</a>
                    </div>
                </div>
            </div>

            <hr className="border-gray-300 my-4" />
            <div className="text-center py-4">
                <p className="text-gray-500">&copy; 2024 All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
