import { prisma } from "@/prisma_setup";
import { useMeStore } from "@/store/useMeStore";
import { apiCall } from "@/utils/apiCall";
import { useEffect } from "react";
import "./page.css";
import SidebarLeft from "@/components/sidebar-left/SidebarLeft";
import SidebarRight from "@/components/sidebar-right/SidebarRight";
import Head from "next/head";

const App = ({ Component, pageProps }) => {
  const setMe = useMeStore((state) => state.setMe);
  const me = useMeStore((state) => ({
    id: state.id,
    email: state.email,
    createdAt: state.createdAt,
    deletedAt: state.deletedAt,
  }));
  const finishLoading = useMeStore((state) => state.finishLoading);
  useEffect(() => {
    (async () => {
      try {
        const res = await apiCall("me");
        if (res) {
          setMe(res);
        }
      } catch (error) {
        console.log(error);
      }

      finishLoading();
    })();

    return () => {
      prisma.$disconnect();
    };
  }, []);

  return (
    <div className={me.id ? "app_wrapper loggedin" : "app_wrapper"}>
      <Head>
        <title>Stage PFE</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {me.id && <SidebarLeft />}
      <Component {...pageProps} />
      {me.id && <SidebarRight />}
    </div>
  );
};

export default App;
