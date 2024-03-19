import React, { useState } from "react";

import Layout from "../../component/Layout/Layout";
import logo from "../../component/assets/logo/Logo.png";
import { auth } from "../../config/firebase";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import "toastr/build/toastr.css";
import toastr from "toastr";

const LupaPasswordPage = () => {
  const [email, setEmail] = useState("");

  const forgetPassword = (e) => {
    e.preventDefault();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toastr.success(`Berhasil Mengirim Password Reset ke ${email}`, "Sukses");
        window.location = "/login";
      })
      .catch((error) => {
        console.log(error);
        toastr.error(`Mengirim Reset Password gagal ke user ${email}`, "Gagal");
      });
  };

  return (
    <div className="d-lg-flex half">
      <div className="col p-5" style={{ backgroundColor: "#F1FFF5", height: "100%" }}>
        <div className="col">
          <img src="dist/img/Tablet login-bro 1.png" alt="User Image" />
        </div>
      </div>
      <div className="col">
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-md-7">
              <div className="atas text-center p-3" style={{ marginTop: 70 }}>
                <img src={logo} alt="Logo" className="brand-image " height={50} />
                <h3>Bank Sampah Delima</h3>
              </div>
              <div className="bawah p-3" style={{ marginTop: 20 }}>
                <h3 className="text-center">Lupa Password</h3>
                <p className="mb-5 text-gray text-center">Masukkan email yang terdaftar pada akun anda, kami akan mengirimkan kode verifikasi pada email tersebut</p>
                <form onSubmit={forgetPassword} method="post">
                  <div className="form-group first">
                    <label htmlFor="username">Email</label>
                    <input type="text" className="form-control" placeholder="your-email@gmail.com" id="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  {/* <div className="d-flex mb-5 align-items-center">
                    <span>
                      {" "}
                      Kembali ke{" "}
                      <a href="/login" className="login">
                        Login Page
                      </a>
                    </span>
                  </div> */}
                  <input type="submit" value="Kirim Kode Verifikasi" className="btn btn-block btn-success mt-5" />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LupaPasswordPage;
