import Link from "next/link";
import { FaCartShopping } from "react-icons/fa6";

const Navbar = () => {
  return (
    <header className="flex items-center px-4 md:px-12 py-2 justify-between fixed top-0 w-full z-50 shadow bg-white">
      <Link href={"/"}>
        <div className="flex items-center justify-start gap-2">
          <FaCartShopping className="text-[50px] text-orange-600" />
          <span className="text-2xl font-bold text-orange-600">Shopping</span>
        </div>
      </Link>
      <div className="flex items-center space-x-2.5 text-sm">
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <Link href={"/"} className="mr-5 hover:text-gray-900">
            Home Page
          </Link>
          <Link href={"/products"} className="mr-5 hover:text-gray-900">
            All Products
          </Link>
          <Link href={"/contacts"} className="mr-5 hover:text-gray-900">
            Contact
          </Link>
        </nav>
        <Link href={"/shopping-cart"}>
          <button className="button bg-blue-600 text-white border-transparent hover:border-blue-600 hover:bg-transparent hover:text-black">
            My bag
          </button>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
