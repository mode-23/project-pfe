import { prisma } from "@/prisma_setup";
import { useMeStore } from "@/store/useMeStore";
import { apiCall } from "@/utils/apiCall";
import { useEffect } from "react";

const App = ({ Component, pageProps }) => {
  const setMe = useMeStore((state) => state.setMe);
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
  return <Component {...pageProps} />;
};

export default App;
