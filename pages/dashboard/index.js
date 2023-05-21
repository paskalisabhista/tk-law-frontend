import DashboardAdminContainer from "@/src/containers/DashboardAdmin";

export async function getStaticProps() {
    return { props: { title: "Menu" , withNavbar: true} };
}

export default function Menu() {
    return (
        <>
            <DashboardAdminContainer/>
        </>
    );
}
