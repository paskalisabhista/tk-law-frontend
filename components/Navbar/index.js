import { Poppins } from "next/font/google";

const semiBoldPoppins = Poppins({ weight: "600", subsets: ["latin"] })
const regularPoppins = Poppins({ weight: "400", subsets: ["latin"] })

export default function Navbar(props) {
    return (
        <div className={`${regularPoppins.className} flex px-20 h-24 w-full justify-start items-center text-xl`}>
            <p className={`${semiBoldPoppins.className} text-3xl`}>Foo</p>
            <div className="grow"></div>
            <div className="flex justify-self-end space-x-5">
                <p>Home</p>
                <p>Menu</p>
                <p>Shop</p>
                <div>
                    <p>Search</p>
                </div>
            </div>
        </div>
    );
}
