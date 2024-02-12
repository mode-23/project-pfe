import React, { useEffect, useState } from "react";
import { AUTH_TOKEN } from "@/constants/localstorage";
import { apiCall } from "@/utils/apiCall";
import styles from "./login.module.css";
import Image from "next/image";
import { FiUser, FiLock } from "react-icons/fi";
import { useMeStore } from "@/store/useMeStore";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPw, setLoginPw] = useState("");
  const [errorFinder, seterrorFinder] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [loginState, setLoginState] = useState("login");
  const [isClientRender, setIsClientRender] = useState(false);
  const isLoading = useMeStore((state) => state.isLoading);
  const me = useMeStore((state) => ({
    id: state.id,
    email: state.email,
    createdAt: state.createdAt,
    deletedAt: state.deletedAt,
  }));
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
      setLoginState("login");
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
      <Image
        src="/blob1.png"
        alt="Picture of blob"
        width={450}
        height={450}
        className={styles.blob1}
      />
      <Image
        src="/blob2.png"
        alt="Picture of blob"
        width={450}
        height={450}
        className={styles.blob2}
      />
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
            <form onSubmit={(e) => e.preventDefault()} className={styles.form}>
              <div className={styles.inputWrapper}>
                <h2 className={styles.inputTitle}>
                  please enter your account details
                </h2>
                <div className={styles.inputContent}>
                  <h3>email</h3>
                  <div className={styles.inputHolder}>
                    <FiUser />
                    <input
                      required
                      type="email"
                      placeholder="Example@gmail.com"
                      // pattern="^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$"
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
                      required
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
                  type="submit"
                  onClick={handleLogin}
                  className={styles.submitBtn}
                >
                  sign in
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={(e) => e.preventDefault()} className={styles.form}>
              <div className={styles.inputWrapper}>
                <h2 className={styles.inputTitle}>create your account</h2>
                <div className={styles.inputContent}>
                  <h3>email</h3>
                  <div className={styles.inputHolder}>
                    <FiUser />
                    <input
                      required
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
                      required
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
                      required
                      type="password"
                      placeholder="Confirm your password"
                      className={styles.input}
                    />
                  </div>
                  {/* error */}
                </div>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className={styles.submitBtn}
                >
                  submit
                </button>
              </div>
            </form>
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
