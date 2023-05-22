import { Poppins } from "next/font/google";
import useLogin from "@/src/utils/useLogin";
import { useState, useEffect } from "react";
import { AUTH_BACKEND_URL } from "@/src/utils/api";
import axios from "axios";
import { useRouter } from "next/router";

const boldPoppins = Poppins({ weight: "700", subsets: ["latin"] });
const semiBoldPoppins = Poppins({ weight: "600", subsets: ["latin"] });
const regularPoppins = Poppins({ weight: "400", subsets: ["latin"] });

export default function OrderForm() {
    const router = useRouter();
    const [domLoaded, setDomLoaded] = useState(false);

    const [username, setUsername] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState(null);
    const [address, setAddress] = useState(null);
    const [menu, setMenu] = useState(null);
    const [quantity, setQuantity] = useState(1);

    const [coupon, setCoupon] = useState("");
    const [couponStatus, setCouponStatus] = useState(null);
    const [couponAmount, setCouponAmount] = useState(0);

    const [order, setOrder] = useState({});
    const [menuList, setMenuList] = useState([]);
    const { detail } = useLogin();

    useEffect(() => {
        getDetail();
        fetchData();
        return () => {};
    }, []);

    useEffect(() => {
        if (username && menuList) {
            setDomLoaded(true);
        }
    }, [username, menuList]);

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
            setCouponAmount(0);
        } else {
            setCouponStatus(!response.data.is_redeemed);
            if (response.data.is_redeemed === true) {
                setCouponAmount(0);
            } else {
                setCouponAmount(response.data.amount);
            }
        }
    }

    async function handleSubmitOrder() {
        if (coupon !== null) {
            handleCheckCoupon();
            if (!couponStatus) {
                // redeem failed
                setCouponAmount(0);
            } else {
                redeemCoupon();
            }
        }
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
        let request = {
            name: username,
            phone: phoneNumber,
            address: address,
            menu: menuArr,
            quantity: qtyArr,
            price: priceArr,
            coupon_discount: couponAmount,
        };
        const response = await axios
            .post(url, request, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .catch(function name(err) {
                console.log(err);
                return null;
            });
        if (response === null) {
            alert("Submit failed!");
            router.reload();
        } else {
            setCouponAmount(0);
            setCouponStatus(false);
            alert("Success!");
        }
    }

    async function redeemCoupon() {
        const accessToken = localStorage.getItem("accessToken");
        const url = `${AUTH_BACKEND_URL}/coupons/redeem/${coupon}`;
        const response = await axios
            .put(
                url,
                {
                    code: coupon,
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            )
            .catch(function name(err) {
                console.log(err);
                return null;
            });
        if (response === null) {
            // redeem failed
            return false;
        } else {
            return true;
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
                        <thead>
                            <tr>
                                <th>Menu</th>
                                <th>Qty</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <select
                                        className="border border-[#909090] text-center rounded-md"
                                        onChange={(e) =>
                                            setMenu(e.target.value)
                                        }
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
                                        {domLoaded &&
                                            menuList.map((item) => (
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
                        </tbody>
                    </table>
                    <br></br>
                    <table className="text-center bg-white border">
                        {domLoaded ? (
                            <>
                                <thead>
                                    {Object.keys(order).length > 0 ? (
                                        <tr>
                                            <th>Menu</th>
                                            <th>Qty</th>
                                            <th>Price</th>
                                        </tr>
                                    ) : (
                                        ""
                                    )}
                                </thead>
                                <tbody>
                                    {Object.keys(order).length > 0
                                        ? Object.entries(order).map(
                                              ([key, values]) => (
                                                  <tr>
                                                      <td>{key}</td>
                                                      <td>{values}</td>
                                                      <td>
                                                          {getMenuPrice(key) *
                                                              values}
                                                      </td>
                                                  </tr>
                                              )
                                          )
                                        : ""}
                                </tbody>
                            </>
                        ) : (
                            ""
                        )}
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
                        <div>{domLoaded && renderCouponStatus()}</div>
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
