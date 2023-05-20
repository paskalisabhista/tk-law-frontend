import SignUpForm from "@/src/components/SignUpForm";

export async function getStaticProps() {
    return { props: { title: "Register" , withNavbar: false} };
}

export default function Register() {
    return (
        <>
            <div className="mt-80 flex justify-center item-center">
                <SignUpForm />
            </div>
        </>
    );
}