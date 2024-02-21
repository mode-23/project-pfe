import { apiCall } from "@/utils/apiCall";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const PickeDate = () => {
  const { query } = useRouter();

  useEffect(() => {
    (async () => {
      try {
        const res = await apiCall("test", {
          method: "POST",
          body: JSON.stringify({
            email: "abc@gmail.com",
            createdAt: undefined,
          }),
        });
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [query.date, query.name]);
  return (
    <div>
      {query.date} <br />
      {query.name}
    </div>
  );
};

export default PickeDate;
