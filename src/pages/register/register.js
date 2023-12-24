import React, { Component, useState } from "react";
import logo from "../../component/assets/logo/Logo.png";
import { auth } from "../../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { error } from "jquery";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <div className="d-lg-flex half">
        <div className="col p-5" style={{ backgroundColor: "#F1FFF5", height: "100%" }}>
          <div className="col">
            <img src="dist/img/Tablet login-bro 1.png" alt="User Image" />
          </div>
        </div>
        <div className="col ">
          <div className="container">
            <div className="row align-items-center justify-content-center">
              <div className="col-md-7">
                <div className="atas text-center p-3" style={{ marginTop: 70 }}>
                  <img src={logo} alt="Logo" className="brand-image " height={50} />
                  <h3>Bank Sampah Delima</h3>
                </div>
                <div className="bawah p-3" style={{ marginTop: 20 }}>
                  <h3 className="text-center">Selamat Datang!</h3>
                  <p className="mb-4">Ujicoba REGISTER pakai firebase aja ini</p>
                  <form onSubmit={register} method="post">
                    <div className="form-group first">
                      <label for="username">Email</label>
                      <input type="text" className="form-control" placeholder="your-email@gmail.com" id="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="form-group last mb-3">
                      <label for="password">Password</label>
                      <input type="password" className="form-control" placeholder="Your Password" id="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <input type="submit" value="Daftar" className="btn btn-block btn-success mt-5" />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
