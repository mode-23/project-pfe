import { prisma } from "@/prisma_setup";
import { useMeStore } from "@/store/useMeStore";
import { apiCall } from "@/utils/apiCall";
import { useEffect, useState } from "react";

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
  const me = useMeStore((state) => ({ id: state.id, email: state.email }));

  const fetchUsers = async () => {
    try {
      const res = await apiCall("test");
      setUsers(res);
      // console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
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
      fetchUsers();
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
        localStorage.setItem("@PFE_PROJECT/AUTH_TOKEN", res.token);

        window.location.reload();
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log("password or email is wrong");
    }
  };

  const handleUpdate = async () => {
    try {
      const res = await apiCall("update", {
        method: "POST",
        body: JSON.stringify({
          userId: userToEditId,
          newEmail: userToEditEmail,
        }),
      });
      fetchUsers();
      setUserToEditEmail("");
      setUserToEditId(null);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  useEffect(() => {
    setIsClientRender(true);
  }, []);
  return (
    <div>
      {me?.email}
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
        login
      </button>
      <button
        type="button"
        onClick={() => {
          localStorage.removeItem("@PFE_PROJECT/AUTH_TOKEN");
          window.location.reload();
        }}
      >
        log out
      </button>
      {!isClientRender ? null : (
        <>
          {localStorage.getItem("@PFE_PROJECT/AUTH_TOKEN")
            ? "logged in"
            : "logged out"}
        </>
      )}

      {users?.map((item) => (
        <div key={item.id}>
          <h4>{item.email}</h4>
          <h4>{item.password}</h4>
          <h4>{item.id}</h4>
          {item.id === userToEditId && (
            <>
              <input
                type="text"
                value={userToEditEmail}
                onChange={(e) => setUserToEditEmail(e.target.value)}
              />
              <button onClick={handleUpdate}>confirm</button>
            </>
          )}
          <button
            onClick={() => {
              setUserToEditEmail("");
              setUserToEditId(item.id);
            }}
          >
            edit
          </button>
          <button>delete</button>
          <hr />
        </div>
      ))}
    </div>
  );
}
