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

    const [coupon, setCoupon] = useState(null);
    const [couponStatus, setCouponStatus] = useState(null);
    const [couponAmount, setCouponAmout] = useState(0);

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

    async function handleCheckCoupon() {
        const accessToken = localStorage.getItem("accessToken");
        const url = `${AUTH_BACKEND_URL}/coupons/${coupon}`;
        const response = await axios
            .get(url, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .catch(function name(err) {
                console.log(err);
                return null;
            });
        if (response === null) {
            setCouponStatus(false);
            setCouponAmout(0);
        } else {
            setCouponStatus(!response.data.is_redeemed);
            setCouponAmout(response.data.amount);
        }
    }

    async function handleSubmitOrder() {
        const accessToken = localStorage.getItem("accessToken");
        const url = `${AUTH_BACKEND_URL}/order`;
        let menuArr = [];
        let qtyArr = [];
        let priceArr = [];
        Object.entries(order).map(([key, values]) => {
            menuArr.push(key);
            qtyArr.push(parseInt(values));
            priceArr.push(getMenuPrice(key));
        });
        // console.log(menuArr);
        // console.log(qtyArr);
        let request = {
            name: username,
            phone: phoneNumber,
            address: address,
            menu: menuArr,
            quantity: qtyArr,
            price: priceArr,
            coupon_discount: couponAmount,
        };
        console.log("=====");
        console.log(request);
        const response = await axios
            .post(url, request, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            })
            .catch(function name(err) {
                console.log(err);
                return null;
            });
        if (response === null) {
            console.log("no items found");
        } else {
            console.log(response.data);
        }
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

    const renderCouponStatus = () => {
        if (couponStatus == null) {
            return <></>;
        }
        return couponStatus ? (
            <>
                <div className={`${regularPoppins.className} text-xs mt-3`}>
                    This Coupon Available
                </div>
                <div
                    className={`${semiBoldPoppins.className} flex flex-col text-xs mt-3 text-center`}
                >
                    Amount
                    <p className="text-green">Rp {couponAmount}</p>
                </div>
            </>
        ) : (
            <>
                <div className={`${regularPoppins.className} text-xs mt-3`}>
                    This Coupon Unavailable
                </div>
            </>
        );
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
            <div className="flex w-full h-fit p-2 space-x-10 justify-self-end ">
                <div
                    className={`${semiBoldPoppins.className} ${
                        couponStatus ? "bg-[#D0F5BE]" : "bg-white"
                    } flex flex-col w-[204px] h-full justify-center border rounded-xl`}
                >
                    <label
                        className={`${semiBoldPoppins.className} text-center`}
                    >
                        Coupon
                    </label>
                    <div className="flex flex-col items-center p-1">
                        <div>
                            <input
                                type="text"
                                className={`${regularPoppins.className} border border-[#909090] text-center rounded-md w-20 h-full`}
                                value={coupon}
                                placeholder="Code"
                                onChange={(e) => setCoupon(e.target.value)}
                            ></input>
                            <button
                                type="button"
                                className={`${semiBoldPoppins.className} bottom-2 bg-[#3A86FF] text-white rounded-xl drop-shadow-2xl ml-2 p-2 text-xs`}
                                onClick={() => handleCheckCoupon()}
                            >
                                Check
                            </button>
                        </div>
                        <div>{renderCouponStatus()}</div>
                    </div>
                </div>
                <div className="flex flex-col w-[300px] h-fit items-center">
                    <div>
                        <button
                            type="button"
                            className={`${semiBoldPoppins.className} bottom-0 bg-[#2F2F2F] w-28 h-8 rounded-xl text-[#F4ECE1] drop-shadow-2xl`}
                            onClick={() => handleSubmitOrder()}
                        >
                            Order
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
