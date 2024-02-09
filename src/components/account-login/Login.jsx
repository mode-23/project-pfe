import React, { useEffect, useState } from "react";
import { AUTH_TOKEN } from "@/constants/localstorage";
import { apiCall } from "@/utils/apiCall";
import styles from "./login.module.css";
import Image from "next/image";
import { FiUser, FiLock } from "react-icons/fi";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPw, setLoginPw] = useState("");
  const [errorFinder, seterrorFinder] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [loginState, setLoginState] = useState("login");
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
      console.log(res);
      if (res.message === "wrong email") setLoginError("email");
      if (res.message === "wrong password") setLoginError("password");

      if (res.token) {
        localStorage.setItem(AUTH_TOKEN, res.token);

        window.location.reload();
        //    router.replace("/");
        // window.location.pathname = "/";
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log("password or email is wrong");
      if (error) {
        setLoginError(true);
      } else {
        setLoginError(false);
      }
    }
  };
  useEffect(() => {
    setIsClientRender(true);
  }, []);

  return (
    <div className={styles.login}>
      <div className={styles.loginHolder}>
        <div className={styles.loginLeft}>
          <div
            className={styles.registerBtn}
            onClick={() => {
              if (loginState === "login") {
                setLoginState("register");
              } else {
                setLoginState("login");
              }
            }}
          >
            {loginState === "login" ? "create an account" : "sign in"}
          </div>
          <div className={styles.logoHolder}>
            <Image
              src="/orange-logo.png"
              alt="Picture of Orange logo"
              fill={true}
            />
          </div>
          {loginState === "login" ? (
            <>
              <div className={styles.inputWrapper}>
                <h2 className={styles.inputTitle}>
                  please enter your account details
                </h2>
                <div className={styles.inputContent}>
                  <h3>email</h3>
                  <div className={styles.inputHolder}>
                    <FiUser />
                    <input
                      type="email"
                      placeholder="Example@gmail.com"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      className={`${styles.input} ${
                        loginError === "email" ? styles.error : null
                      }`}
                    />
                  </div>
                  {!isClientRender ? null : (
                    <>
                      {loginError === "email" ? (
                        <p className={styles.wrong}>wrong email</p>
                      ) : null}
                    </>
                  )}
                </div>
                <div className={styles.inputContent}>
                  <h3>password</h3>
                  <div className={styles.inputHolder}>
                    <FiLock />
                    <input
                      type="password"
                      placeholder="Your password"
                      value={loginPw}
                      onChange={(e) => setLoginPw(e.target.value)}
                      className={`${styles.input} ${
                        loginError === "password" ? styles.error : null
                      }`}
                    />
                  </div>
                  {!isClientRender ? null : (
                    <>
                      {loginError === "password" ? (
                        <p className={styles.wrong}>wrong password</p>
                      ) : null}
                    </>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleLogin}
                  className={styles.submitBtn}
                >
                  sign in
                </button>
              </div>
            </>
          ) : (
            <>
              <div className={styles.inputWrapper}>
                <h2 className={styles.inputTitle}>create your account</h2>
                <div className={styles.inputContent}>
                  <h3>email</h3>
                  <div className={styles.inputHolder}>
                    <FiUser />
                    <input
                      type="email"
                      placeholder="example@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={styles.input}
                    />
                  </div>
                  {/* error */}
                </div>
                <div className={styles.inputContent}>
                  <h3>password</h3>
                  <div className={styles.inputHolder}>
                    <FiLock />
                    <input
                      type="password"
                      placeholder="Your password"
                      value={pw}
                      onChange={(e) => setPw(e.target.value)}
                      className={styles.input}
                    />
                  </div>
                  {/* error */}
                </div>
                <div className={styles.inputContent}>
                  <h3>password</h3>
                  <div className={styles.inputHolder}>
                    <FiLock />
                    <input
                      type="password"
                      placeholder="Confirm your password"
                      className={styles.input}
                    />
                  </div>
                  {/* error */}
                </div>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className={styles.submitBtn}
                >
                  submit
                </button>
              </div>
            </>
          )}
          {/* {errorFinder ? "error" : ""} */}
        </div>
        <div className={styles.loginRight}>
          <Image
            src="/orange-logo.png"
            alt="Picture of Orange logo"
            className={styles.logo}
            fill={true}
          />
          <p className={styles.copyright}>
            billcom consulting &copy; {new Date().getFullYear()}
          </p>
          <div className={styles.logintopright}>
            <div className={styles.hiderLeft}></div>
            <div className={styles.hiderRight}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
