import React, { useState } from "react";

import axios from "axios";

function LoadingModal({ show }) {
  if (!show) {
    return null;
  }

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
    >
      <div
        style={{
          padding: "20px",
          backgroundColor: "white",
          borderRadius: "10px",
        }}
      >
        로딩 중...
      </div>
    </div>
  );
}

export default function App() {
  const [id, setId] = useState("");
  const [pw, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case "id":
        setId(value);
        break;
      case "pw":
        setPassword(value);
        break;
      default:
        break;
    }
  };

  const handleClick = async (event) => {
    event.preventDefault();

    if (id === "" || pw === "") {
      alert("아이디 혹은 비밀번호가 입력되지 않았습니다.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:3000/user/login", {
        id: id,
        pw: pw,
      });

      if (response.data.result) {
        localStorage.setItem("id", id);
        localStorage.setItem("token", response.data.result.AccessToken);
        console.log("로그인 성공", response.data);
      } else {
        console.log("로그인 실패", response.data);
      }
    } catch (error) {
      console.log("로그인 요청 실패", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <input name="id" value={id} onChange={handleChange} />
      <input name="pw" value={pw} type="password" onChange={handleChange} />
      <input type="submit" value={"로그인"} onClick={handleClick} disabled={isLoading} />
      <LoadingModal show={isLoading} />
    </div>
  );
}
