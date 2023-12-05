import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
const path = require('../components/Path.js');

const DoVerificationPage = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const login = queryParams.get("login");
    const password = queryParams.get("password");
    const [message, setMessage] = useState('');
    const [countdown, setCountdown] = useState(3);

    useEffect(() => {
        const DoVerify = async () => {
            var obj = { login: login, password: password };
            var js = JSON.stringify(obj);
            try {
                const response = await fetch(path.buildPath('/api/users/verify'), { method: 'post', body: js, headers: { 'Content-Type': 'application/json' } });
                var res = JSON.parse(await response.text());
                console.log(res);
                if (res.error !== "") {
                    setMessage("Unable to verify.");
                }
                else {
                    const countdownInterval = setInterval(() => {
                        setCountdown((prevCountdown) => {
                            if (prevCountdown > 0) {
                                setMessage("Email successfully verified. Redirecting in " + prevCountdown + " seconds...");
                                return prevCountdown - 1;
                            } else {
                                clearInterval(countdownInterval);
                                window.location.href = '/login';
                                return 0;
                            }
                        });
                    }, 1000);
                }
            }
            catch (e) {
                alert(e.toString());
                return;
            }
        };
        DoVerify();
    }, [login, password]);

    return (
        <div className="d-flex flex-column align-items-center justify-content-center" style={{ height: "100vh", backgroundColor: "#340e57", color: "white" }}>
            <p>{message}</p>
        </div>
    );
};

export default DoVerificationPage;


