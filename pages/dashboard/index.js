import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import useLogin from "@/src/utils/useLogin";
import DashboardAdminContainer from "@/src/containers/DashboardAdmin";

export async function getStaticProps() {
  return { props: { title: "Menu", withNavbar: true } };
}

export default function Menu() {
  const { replace } = useRouter();
  const { detail } = useLogin();

  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const user = await detail();
        if (user.role !== "admin") replace("/");
        setRole(user.role);
      } catch (err) {
        process.env.NODE_ENV === "development" && console.log(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [detail, replace]);

  if (loading || role !== "admin") return null;
  return <DashboardAdminContainer />;
}
