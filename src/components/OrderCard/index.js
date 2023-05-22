import { Poppins } from "next/font/google";

const boldPoppins = Poppins({ weight: "700", subsets: ["latin"] });
const semiBoldPoppins = Poppins({ weight: "600", subsets: ["latin"] });
const regularPoppins = Poppins({ weight: "400", subsets: ["latin"] });

export default function OrderCard(props) {
    return (
        <div
            className={`${regularPoppins.className} flex flex-col ${
                props.data.status === "Delivered" ? "bg-[#D0F5BE]" : ""
            } ${
                props.data.status === "Delivering your order"
                    ? "bg-[#fff3b0]"
                    : ""
            } ${
                props.data.status === "Preparing your order"
                    ? "bg-[#fbf8f4]"
                    : ""
            } min-h-[300px] w-[325px] m-4 border border-black rounded-xl p-3 drop-shadow-2xl`}
        >
            <div>
                <label className={`${semiBoldPoppins.className}`}>
                    Phone number:
                </label>
                <div>{props.data.phone}</div>
            </div>
            <div>
                <label className={`${semiBoldPoppins.className}`}>
                    Address:
                </label>
                <div>{props.data.address}</div>
            </div>

            <div className="mt-2 bg-white border">
                <div
                    className={`${semiBoldPoppins.className} flex flex-row space-x-2 mt-2`}
                >
                    <div className="w-1/2">Menu</div>
                    <div className="w-1/4">Qty</div>
                    <div className="w-1/4 text-center">Price/q</div>
                </div>
                <div className="flex flex-row space-x-2">
                    <div className="w-1/2">
                        {props.data.menu.map((item) => (
                            <div>{item}</div>
                        ))}
                    </div>
                    <div className="w-1/4">
                        {props.data.quantity.map((item) => (
                            <div>{item}</div>
                        ))}
                    </div>
                    <div className="w-1/4 text-center">
                        {props.data.price.map((item) => (
                            <div>{item}</div>
                        ))}
                    </div>
                </div>
                <div
                    className={`${semiBoldPoppins.className} flex flex-row space-x-2 mt-2`}
                >
                    <div className="w-1/2">Discount</div>
                    <div className="w-1/4"></div>
                    <div className="w-1/4">-{props.data.coupon_discount}</div>
                </div>
            </div>
            <div className="grow"></div>
            <div className="justify-self-end">
                <div className="mt-10">
                    <div className={`${semiBoldPoppins.className} text-center`}>
                        Total
                    </div>
                    <div className="text-center">
                        Rp {props.data.total_price - props.data.coupon_discount}
                    </div>
                </div>
                <div>
                    <div
                        className={`${boldPoppins.className} text-center text-[#FF7E00]`}
                    >
                        Status
                    </div>
                    <div
                        className={`${semiBoldPoppins.className} text-center text-[#909090]`}
                    >
                        {props.data.status}
                    </div>
                </div>
            </div>
        </div>
    );
}
