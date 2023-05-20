import SignInForm from "@/src/components/SignInForm";

export async function getStaticProps() {
    return { props: { title: "Login" , withNavbar: false} };
}

export default function Login() {
    return (
        <>
            <div className="mt-80 flex justify-center item-center">
                <SignInForm />
            </div>
        </>
    );
}
