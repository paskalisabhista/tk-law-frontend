import MenuContainer from "@/src/containers/MenuPage";

export async function getStaticProps() {
    return { props: { title: "Menu" , withNavbar: true} };
}

export default function Menu() {
    return (
        <>
            <MenuContainer/>
        </>
    );
}
