import React, { useEffect, useState } from "react";
import { MetaTags } from "react-meta-tags";
import { Link, useNavigate } from "react-router-dom";
import { Header } from "../home/Header";
import "./login.scss";

export default function Login() {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const currentUser = JSON.parse(localStorage.getItem("current-user"));
    // useEffect(() => {
    //     if (token) navigate("/account");
    // }, []);
    useEffect(() => {
        if (token){
        if(currentUser.roles[0].roleName==="ROLE_ADMIN"){ navigate("/account");}
        else if(currentUser.roles[0].roleName==="ROLE_MANAGER_LOGISTIC"){
            navigate("/manager/furniture");
        }
        else if(currentUser.roles[0].roleName==="ROLE_MANAGER_HR")
        {navigate("/employee");
        }
        else if(currentUser.roles[0].roleName==="ROLE_MANAGER_CHILDREN"){
            navigate("/children");
        }
        else if(currentUser.roles[0].roleName==="ROLE_EMPLOYEE"){
            navigate("/employee/furniture/request");
        }}

    }, []);
    
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = React.useState("");

    async function login() {
        console.warn(email, password);
        let raw = {
            email: email,
            password: password,
        };
        let result = await fetch(
            "https://orphanmanagement.herokuapp.com/api/v1/auth/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(raw),
            }
        );
        result = await result.json();
        console.log(result);
        if (result.code === 200) {
            localStorage.setItem("token", JSON.stringify(result.data.token));
            const token = JSON.parse(localStorage.getItem("token"));
            let requestOptions = {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json",
                },
                redirect: "follow",
            };
            let _result = await fetch(
                "https://orphanmanagement.herokuapp.com/api/v1/profile/account",
                requestOptions
            );
            _result = await _result.json();
            const currentUser = _result.data;
            localStorage.setItem("current-user", JSON.stringify(currentUser));
            currentUser.roles.forEach((role) => {
                switch (role.roleName) {
                    case "ROLE_ADMIN":
                        navigate("/account");
                        break;
                    case "ROLE_MANAGER_LOGISTIC":
                        navigate("/manager/furniture");
                        break;
                    case "ROLE_MANAGER_HR":
                        navigate("/employee");
                        break;
                    case "ROLE_MANAGER_CHILDREN":
                        navigate("/children");
                        break;
                    case "ROLE_EMPLOYEE":
                        navigate("/employee/furniture/request");
                        break;
                    default:
                        break;
                }
            });
        } else {
            if (result.message === "Unauthorized") {
                setErrorMessage("B???n ???? nh???p sai m???t kh???u!");
            } else {
                setErrorMessage("T??i kho???n gmail b???n nh???p ch??a c?? t??i kho???n!");
            }
        }
    }

    return (
        <div className="login">
            <MetaTags>
                <title>CYF Center | ????ng nh???p</title>
            </MetaTags>
            <Header/>
            <form className="form form__login">
                <div className="form__top">
                    <Link to="/" style={{ color: "#fff" }}>
                        <span className="logo">
                            <span className="logo__name">CYF</span>
                            Center
                        </span>
                    </Link>
                </div>
                <div className="form__body">
                    <p className="form__desc">
                        Ch??o m???ng b???n ?????n v???i Trung t??m B???o tr??? tr??? em CYF
                    </p>
                    <div className="form__group">
                        <i className="bi bi-envelope icon icon__email"></i>
                        <input
                            type="email"
                            name=""
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                            onKeyPress={(e) => {
                                if (e.key === "Enter") {
                                    login();
                                }
                            }}
                            required
                        />
                    </div>
                    <div className="form__group">
                        <i className="bi bi-lock icon icon__password"></i>
                        <input
                            type="password"
                            name=""
                            placeholder="M???t kh???u"
                            onChange={(event) => {
                                setPassword(event.target.value);
                            }}
                            onKeyPress={(e) => {
                                if (e.key === "Enter") {
                                    login();
                                }
                            }}
                            required
                        />
                    </div>
                    <div className="login__field"></div>
                    <p style={{ color: "#CD1818" }}>
                        {errorMessage && (
                            <div className="error"> {errorMessage} </div>
                        )}
                    </p>
                </div>
                <div className="form__bottom">
                    <button
                        onClick={login}
                        className="btn btn__signin btn--primary"
                        type="button"
                    >
                        ????ng nh???p
                    </button>
                    <div className="no-account">
                        <Link className="btn-sign" to="/resetpassword">
                            Qu??n m???t kh???u?
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    );
}
