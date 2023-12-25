import React, { Component, useState } from "react";
import logo from "../../component/assets/logo/Logo.png";
import { auth } from "../../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { error } from "jquery";
import "toastr/build/toastr.css";
import toastr from "toastr";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        toastr.success("Login berhasil!", "Sukses");
        window.location = "/";
      })
      .catch((error) => {
        console.log(error);
        toastr.error("Login gagal. Periksa kembali email dan password Anda.", "Gagal");
        window.location = "/login";
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
                  <p className="mb-4 text-center">Masukkan informasi login untuk akses website.</p>
                  <form onSubmit={login} method="post">
                    <div className="form-group first">
                      <label for="username">Email</label>
                      <input type="text" className="form-control" placeholder="your-email@gmail.com" id="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="form-group last mb-3">
                      <label for="password">Password</label>
                      <input type="password" className="form-control" placeholder="Your Password" id="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="d-flex mb-5 align-items-center">
                      {/* <label className="control control--checkbox mb-0">
                        <span className="caption">Ingat saya </span>
                        <input type="checkbox" checked="checked" />
                        <div className="control__indicator"></div>
                      </label> */}
                      {/* <span>
                        <a href="/register" className="register">
                          Register
                        </a>
                      </span> */}
                      <span className="ml-auto">
                        <a href="/lupa-password" className="forgot-pass">
                          Lupa Password
                        </a>
                      </span>
                    </div>
                    <input type="submit" value="Masuk" className="btn btn-block btn-success mt-5" />
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

export default LoginPage;
