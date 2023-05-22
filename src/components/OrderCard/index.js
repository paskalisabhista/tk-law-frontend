import { Poppins } from "next/font/google";
import useLogin from "@/src/utils/useLogin";
import { useState, useEffect } from "react";
import { AUTH_BACKEND_URL } from "@/src/utils/api";
import axios from "axios";

const boldPoppins = Poppins({ weight: "700", subsets: ["latin"] });
const semiBoldPoppins = Poppins({ weight: "600", subsets: ["latin"] });
const regularPoppins = Poppins({ weight: "400", subsets: ["latin"] });

export default function OrderCard() {
    const [username, setUsername] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState(null);
    const [address, setAddress] = useState(null);
    const [menu, setMenu] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [menuPrice, setMenuPrice] = useState({});
    const [order, setOrder] = useState({});
    const [menuList, setMenuList] = useState([]);
    const { detail } = useLogin();

    useEffect(() => {
        getDetail();
        fetchData();
    }, []);

    const getDetail = async () => {
        try {
            await detail().then((res) => {
                setUsername(res["username"]);
            });
        } catch (err) {
            console.log(err);
        }
    };

    const fetchData = async () => {
        const accessToken = localStorage.getItem("accessToken");
        const url = `${AUTH_BACKEND_URL}/menu`;
        const response = await axios
            .get(url, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .catch(function name(err) {
                console.log(err);
            });
        setMenuList(response.data);
    };

    function handleAddOrder() {
        if (menu === null) {
            return;
        }
        const updatedOrder = { ...order };
        updatedOrder[menu] = quantity;
        setOrder(updatedOrder);
    }

    function getMenuPrice(name) {
        let price;
        menuList.map((item) => {
            if (item.name === name) {
                price = item.price;
            }
        });
        return price;
    }

    const renderTable = () => {
        return Object.keys(order).length > 0 ? (
            <>
                <th>Menu</th>
                <th>Qty</th>
                <th>Price</th>
            </>
        ) : (
            ""
        );
    };

    const renderValues = () => {
        return Object.keys(order).length > 0
            ? Object.entries(order).map(([key, values]) => (
                  <>
                      <tr>
                          <td>{key}</td>
                          <td>{values}</td>
                          <td>{getMenuPrice(key) * values}</td>
                      </tr>
                  </>
              ))
            : "";
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
                                    {menuList.map((item) => (
                                        <option
                                            className="w-full"
                                            id={item.price}
                                        >
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                            </td>
                            <td>
                                <input
                                    type="number"
                                    min="1"
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
                        <tr>{renderTable()}</tr>
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
