import { Poppins } from "next/font/google";
import Link from "next/link";
import useLogin from "@/src/utils/useLogin";
import { useState, useEffect } from "react";
import { render } from "react-dom";

const boldPoppins = Poppins({ weight: "700", subsets: ["latin"] });
const semiBoldPoppins = Poppins({ weight: "600", subsets: ["latin"] });
const regularPoppins = Poppins({ weight: "400", subsets: ["latin"] });

export default function OrderCard() {
    const [username, setUsername] = useState(null);
    const [role, setRole] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState(null);
    const [address, setAddress] = useState(null);
    const [menu, setMenu] = useState(null);
    const [quantity, setQuantity] = useState(0);
    const [order, setOrder] = useState({});
    const { detail } = useLogin();

    useEffect(() => {
        try {
            const user = detail();
            setUsername(user["username"]);
            setRole(user["role"]);
        } catch (err) {
            console.log(err);
        }
    });

    function handleAddOrder() {
        if (menu === null) {
            return;
        }
        const updatedOrder = { ...order };
        updatedOrder[menu] = quantity;
        setOrder(updatedOrder);
    }

    const renderTable = () => {
        return Object.keys(order).length > 0 ? (
            <tr className="border">
                <th>Menu</th>
                <th>Qty</th>
                <th>Price</th>
            </tr>
        ) : (
            ""
        );
    };

    const renderValues = () => {
        return Object.entries(order).map(([key, values]) => (
            <tr>
                <td>{key}</td>
                <td>{values}</td>
                <td>10 000</td>
            </tr>
        ));
    };

    return (
        <div
            className={`${regularPoppins.className} flex flex-col min-h-[320px] rounded-xl bg-[#fbf8f4] p-2`}
        >
            <div
                className={`${boldPoppins.className} text-center mt-1 text-2xl text-[#FF7E00]`}
            >
                Create Order
            </div>
            <form className="flex w-full p-2 space-x-10">
                <div className="flex flex-col">
                    <label className={`${semiBoldPoppins.className}`}>
                        Name
                    </label>
                    <input
                        type="text"
                        className="border border-[#909090] text-center rounded-md"
                        value={username}
                        placeholder="Username"
                        disabled
                    ></input>
                    <label className={`${semiBoldPoppins.className}`}>
                        Phone Number
                    </label>
                    <input
                        type="text"
                        className="border border-[#909090] text-center rounded-md"
                        value={phoneNumber}
                        placeholder="Phone Number"
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    ></input>
                    <label className={`${semiBoldPoppins.className}`}>
                        Address
                    </label>
                    <input
                        type="text"
                        className="border border-[#909090] text-center rounded-md"
                        value={address}
                        placeholder="Address"
                        onChange={(e) => setAddress(e.target.value)}
                    ></input>
                </div>
                <div className="flex flex-col w-[300px]">
                    <table className="text-center">
                        <tr>
                            <th>Menu</th>
                            <th>Qty</th>
                            <th></th>
                        </tr>
                        <tr>
                            <td>
                                <select
                                    className="border border-[#909090] text-center rounded-md"
                                    onChange={(e) => setMenu(e.target.value)}
                                >
                                    <option
                                        disabled
                                        selected
                                        value
                                        className="w-full"
                                    >
                                        {" "}
                                        Choose Menu{" "}
                                    </option>
                                    <option className="w-full">
                                        Bihun Goreng
                                    </option>
                                    <option className="w-full">
                                        Kwetiau Kuah
                                    </option>
                                    <option className="w-full">
                                        Soto Kuah
                                    </option>
                                </select>
                            </td>
                            <td>
                                <input
                                    type="number"
                                    className="border w-[36px] border-[#909090] text-center rounded-md"
                                    value={quantity}
                                    onChange={(e) =>
                                        setQuantity(e.target.value)
                                    }
                                ></input>
                            </td>
                            <td>
                                <div className="flex w-[24px] h-[24px]">
                                    <button
                                        type="button"
                                        className="w-[24px] h-[24px] ml-2"
                                        onClick={() => handleAddOrder()}
                                    >
                                        <img src="add-icon.png"></img>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </table>
                    <br></br>
                    <table className="text-center bg-white border">
                        {renderTable()}
                        {renderValues()}
                    </table>
                </div>
            </form>
            <div className="grow"></div>
            <div className="flex w-full p-2 space-x-10 justify-self-end">
                <div className="flex w-[204px] h-full justify-center">
                    coupon
                </div>
                <div className="flex flex-col w-[300px] h-full items-center">
                    <button
                        type="button"
                        className={`${semiBoldPoppins.className} bottom-2 bg-[#2F2F2F] w-28 h-8 rounded-xl text-[#F4ECE1] drop-shadow-2xl`}
                        onClick={() => handleSubmitOrder()}
                    >
                        Order
                    </button>
                </div>
            </div>
        </div>
    );
}
