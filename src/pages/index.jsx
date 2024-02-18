import { apiCall } from "@/utils/apiCall";
import { useEffect, useState } from "react";
import { AUTH_TOKEN } from "@/constants/localstorage";
import Login from "@/components/account-login/Login";
import Dashboard from "@/components/dashboard/Dashboard";
export default function Home() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPw, setLoginPw] = useState("");
  const [users, setUsers] = useState([]);
  const [errorFinder, seterrorFinder] = useState(false);
  const [isClientRender, setIsClientRender] = useState(false);
  const [userToEditId, setUserToEditId] = useState(null);
  const [userToEditEmail, setUserToEditEmail] = useState("");
  // const me = useMeStore((state) => ({ id: state.id, email: state.email }));

  // const fetchUsers = async () => {
  //   try {
  //     const res = await apiCall("test");
  //     setUsers(res);
  //     // console.log(res);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // const handleSubmit = async () => {
  //   try {
  //     const res = await apiCall("test2", {
  //       method: "POST",
  //       body: JSON.stringify({
  //         email,
  //         pw,
  //       }),
  //     });
  //     setEmail("");
  //     setPw("");
  //     fetchUsers();
  //     console.log(res);
  //   } catch (error) {
  //     console.log(error);
  //     seterrorFinder(true);
  //   }
  // };
  // const handleLogin = async () => {
  //   try {
  //     const res = await apiCall("test3", {
  //       method: "POST",
  //       body: JSON.stringify({
  //         loginEmail,
  //         loginPw,
  //       }),
  //     });
  //     if (res.token) {
  //       localStorage.setItem(AUTH_TOKEN, res.token);

  //       window.location.reload();
  //     } else {
  //       console.log("error");
  //     }
  //   } catch (error) {
  //     console.log("password or email is wrong");
  //   }
  // };

  // const handleUpdate = async () => {
  //   try {
  //     const res = await apiCall("update", {
  //       method: "POST",
  //       body: JSON.stringify({
  //         userId: userToEditId,
  //         newEmail: userToEditEmail,
  //       }),
  //     });
  //     fetchUsers();
  //     setUserToEditEmail("");
  //     setUserToEditId(null);
  //     console.log(res);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // useEffect(() => {
  //   fetchUsers();
  // }, []);
  useEffect(() => {
    setIsClientRender(true);
  }, []);
  useEffect(() => {
    // document.body.classList.add("light");
  }, []);
  return (
    <>
      {!isClientRender ? null : (
        <>
          {localStorage.getItem(AUTH_TOKEN) ? (
            <>
              <Dashboard />
            </>
          ) : (
            <Login />
          )}
        </>
      )}
    </>
  );
}
