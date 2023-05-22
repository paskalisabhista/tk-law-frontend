import OrderForm from "@/src/components/OrderForm";
import { Poppins } from "next/font/google";
import { useState, useEffect } from "react";
import { AUTH_BACKEND_URL } from "@/src/utils/api";
import axios from "axios";
import OrderCard from "@/src/components/OrderCard";

const boldPoppins = Poppins({ weight: "700", subsets: ["latin"] });
const semiBoldPoppins = Poppins({ weight: "600", subsets: ["latin"] });
const regularPoppins = Poppins({ weight: "400", subsets: ["latin"] });

export default function OrderContainer() {
    const [orderList, setOrderList] = useState([]);
    const [role, setRole] = useState("");
    const [domLoaded, setDomLoaded] = useState(false);

    useEffect(() => {
        getDetail();
        fetchData();
    }, []);

    useEffect(() => {
        setDomLoaded(true);
    }, [orderList]);

    const getDetail = async () => {
        try {
            await detail().then((res) => {
                setRole(res["role"]);
            });
        } catch (err) {
            console.log(err);
        }
    };

    const fetchData = async () => {
        const accessToken = localStorage.getItem("accessToken");
        const url = `${AUTH_BACKEND_URL}/order`;
        const response = await axios
            .get(url, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .catch(function name(err) {
                console.log(err);
            });
        setOrderList(response.data);
    };

    return (
        <div className="px-10">
            <div className="flex flex-col h-full items-center pt-20">
                <OrderForm />
            </div>
            <h1
                className={`${boldPoppins.className} pt-10 text-4xl text-[#FF7E00]`}
            >
                Your Orders
            </h1>
            <div className="flex flex-wrap">
                {orderList.map((item) => (
                    <OrderCard data={item} />
                ))}
            </div>
        </div>
    );
}
