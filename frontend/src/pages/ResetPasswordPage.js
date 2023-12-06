import React, { useState } from "react";
import { useLocation } from "react-router-dom";
const path = require('../components/Path.js');

const ResetPasswordPage = () => {

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const login = queryParams.get("login");
  const [message, setMessage] = useState('')
  const [NEWPASS1, setNEWPASS1] = useState('');
  const [NEWPASS2, setNEWPASS2] = useState('');

  const doRecovery = async event => {
    console.log(NEWPASS1);
    console.log(NEWPASS2);
    console.group(login);
    if (NEWPASS1 !== NEWPASS2) {
      setMessage("Entered passwords do not match.");
      return;
    }
    else {
      var obj = { login: login, newPassword: NEWPASS1 };
      var js = JSON.stringify(obj);
      try {
        const response = await fetch(path.buildPath('/api/users/recovery'), { method: 'post', body: js, headers: { 'Content-Type': 'application/json' } });
        var res = JSON.parse(await response.text());
        console.log(res);
        if (res.error !== "") {
          setMessage("Unable to update password.");
        }
        else {
          window.location.href = '/login';
          return 0;
        }
      }
      catch (e) {
        alert(e.toString());
        return;
      }
    }
  }

  return (
    <div className="d-flex flex-column align-items-center justify-content-center" style={{ height: "100vh", backgroundColor: "#340e57", color: "white" }}>
      <p style={{ textAlign: "center" }}>Enter the new password.</p>
      <input type="text" id="loginName" class="login-user-input-field" placeholder="..." style={{ height: '50px', width: '400px' }} onChange={(e) => setNEWPASS1(e.target.value)} /><br />
      <p style={{ textAlign: "center" }}>Renter the new password.</p>
      <input type="text" id="loginName" class="login-user-input-field" placeholder="..." style={{ height: '50px', width: '400px' }} onChange={(e) => setNEWPASS2(e.target.value)} /><br />
      <button style={{ marginTop: "0px", backgroundColor: "#693c72", color: "white", padding: "10px 20px", border: "none", cursor: "pointer", fontSize: "12px" }}
        onClick={event => doRecovery()}>
        Submit
      </button>
      <div style={{ height: "20px" }}>
        <br></br>
        <p style={{ color: "red" }}>{message}</p>
      </div>
    </div>
  );
};

export default ResetPasswordPage;