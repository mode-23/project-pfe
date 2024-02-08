import { AUTH_TOKEN } from "@/constants/localstorage";
import { apiCall } from "@/utils/apiCall";
import React, { useEffect, useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPw, setLoginPw] = useState("");
  const [errorFinder, seterrorFinder] = useState(false);
  const [isClientRender, setIsClientRender] = useState(false);
  const handleSubmit = async () => {
    try {
      const res = await apiCall("test2", {
        method: "POST",
        body: JSON.stringify({
          email,
          pw,
        }),
      });
      setEmail("");
      setPw("");
      console.log(res);
    } catch (error) {
      console.log(error);
      seterrorFinder(true);
    }
  };
  const handleLogin = async () => {
    try {
      const res = await apiCall("test3", {
        method: "POST",
        body: JSON.stringify({
          loginEmail,
          loginPw,
        }),
      });
      if (res.token) {
        localStorage.setItem(AUTH_TOKEN, res.token);

        //    window.location.reload();
        //    router.replace("/");
        window.location.pathname = "/";
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log("password or email is wrong");
    }
  };
  useEffect(() => {
    setIsClientRender(true);
  }, []);
  return (
    <div>
      <h2>register</h2>
      <input
        type="text"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={pw}
        onChange={(e) => setPw(e.target.value)}
      />
      <button type="button" onClick={handleSubmit}>
        submit
      </button>
      {errorFinder ? "error" : ""}
      <h2>login</h2>
      <input
        type="text"
        placeholder="login email"
        value={loginEmail}
        onChange={(e) => setLoginEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="login password"
        value={loginPw}
        onChange={(e) => setLoginPw(e.target.value)}
      />
      <button type="button" onClick={handleLogin}>
        log in
      </button>
      <button
        type="button"
        onClick={() => {
          localStorage.removeItem(AUTH_TOKEN);
          window.location.reload();
        }}
      >
        log out
      </button>
      {!isClientRender ? null : (
        <>{localStorage.getItem(AUTH_TOKEN) ? "logged in" : "logged out"}</>
      )}
    </div>
  );
};

export default Login;
