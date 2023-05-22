import Navbar from "../Navbar";

export default function Layout({ children }) {
    return (
        <>
            {children.props.withNavbar && <Navbar />}
            {children}
        </>
    );
}
