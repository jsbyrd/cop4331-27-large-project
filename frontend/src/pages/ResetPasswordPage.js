import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import DefaultHeader from '../components/DefaultHeader';
import DefaultFooter from '../components/DefaultFooter.js';
const path = require('../components/Path.js');
const pc = require('../components/passwordComplexity.js');


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
    const passwordMessage = pc.passwordComplexityCheck(NEWPASS1);
        if (passwordMessage !== "password is good") {
            setMessage(passwordMessage);
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
    <div>
      <DefaultHeader />
      <div className="d-flex flex-column align-items-center justify-content-center" style={{ height: "100vh", backgroundColor: "#340e57", color: "white" }}>
        <p style={{ textAlign: "center" }}>Enter the new password.</p>
        <input type="text" id="loginName" class="login-user-input-field" placeholder="New password" style={{ height: '50px', width: '400px' }} onChange={(e) => setNEWPASS1(e.target.value)} /><br />
        <p style={{ textAlign: "center" }}>Reenter the new password.</p>
        <input type="text" id="loginName" class="login-user-input-field" placeholder="Reenter new password" style={{ height: '50px', width: '400px' }} onChange={(e) => setNEWPASS2(e.target.value)} /><br />
        <button className="btn me-3 text-light" id='default-body-left-btn' style={{ marginTop: "20px", color: "white", padding: "10px 20px", borderRadius: "10px", border: "none", cursor: "pointer", fontSize: "12px" }}
          onClick={event => doRecovery()}>
          Submit
        </button>
        <div style={{ height: "20px" }}>
          <br></br>
          <p style={{ color: "red" }}>{message}</p>
        </div>
      </div>
      <DefaultFooter />
    </div>
  );
};

export default ResetPasswordPage;