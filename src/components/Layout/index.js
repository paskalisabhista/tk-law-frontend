import Navbar from "../Navbar";
import useLogin from "@/src/utils/useLogin";

export default function Layout({ children }) {
    return (
        <>
            {children.props.withNavbar && <Navbar />}
            {children}
        </>
    );
}
