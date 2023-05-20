import OrderContainer from "@/src/containers/OrderPage";

export async function getStaticProps() {
    return { props: { title: "Order" , withNavbar: true} };
}

export default function Order() {
    return (
        <>
            <OrderContainer/>
        </>
    );
}
