import { prisma } from "@/prisma_setup";
import { useMeStore } from "@/store/useMeStore";
import { apiCall } from "@/utils/apiCall";
import { useEffect, useState } from "react";
import "./page.css";
import SidebarLeft from "@/components/sidebar-left/SidebarLeft";
import SidebarRight from "@/components/sidebar-right/SidebarRight";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { IoHomeSharp, IoLockOpen } from "react-icons/io5";
import Link from "next/link";
import { AUTH_TOKEN } from "@/constants/localstorage";

const App = ({ Component, pageProps }) => {
  const [currentProject, setCurrentProjects] = useState("");

  const setMe = useMeStore((state) => state.setMe);
  const me = useMeStore((state) => ({
    id: state.id,
    email: state.email,
    createdAt: state.createdAt,
    deletedAt: state.deletedAt,
    role: state.role,
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
  const { query } = useRouter();
  console.log(me);
  return (
    <>
      <Head>
        <link rel="icon" type="image/svg+xml" href="/logo-orange.png" />
        <title>Stage PFE</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {me.id && (
        <header className="header">
          <div className="df">
            <div className="header_logo">
              <Image src={"/logo-orange.png"} fill={true} alt="orange logo" />
            </div>
            <h2>{query?.name}</h2>
          </div>
          <ul className="df header_ul">
            <li>
              <Link href={"/"} className="header_a">
                <IoHomeSharp />
                <p>Home</p>
              </Link>
            </li>
            <li
              className="header_a"
              onClick={() => {
                localStorage.removeItem(AUTH_TOKEN);
                window.location.reload();
              }}
            >
              <IoLockOpen />
              <p>Log out: {me.email}</p>
            </li>
          </ul>
        </header>
      )}
      <div className={me.id ? "app_wrapper loggedin" : "app_wrapper"}>
        {me.id && (
          <SidebarLeft
            currentProject={currentProject}
            setCurrentProjects={setCurrentProjects}
          />
        )}
        <Component {...pageProps} currentProject={currentProject} />
        {/* {me.id && <SidebarRight />} */}
      </div>
      {/* <footer className="footer">footer</footer> */}
    </>
  );
};

export default App;
