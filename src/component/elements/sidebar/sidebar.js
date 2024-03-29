import React, { useEffect, useState } from "react";
import logo from "../../assets/logo/logo_bsd.png";
import { IoHome } from "react-icons/io5";
import { BsInfoSquare } from "react-icons/bs";
import { HiUsers } from "react-icons/hi";
import { BsDatabaseFill } from "react-icons/bs";
import { VscVerified } from "react-icons/vsc";
import { AiOutlineSetting, AiOutlineFieldTime } from "react-icons/ai";
import { FaBox } from "react-icons/fa";
import { MdDeleteSweep } from "react-icons/md";
import { IoMdSettings, IoIosInformationCircle } from "react-icons/io";

import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../../config/firebase";
import { error } from "jquery";

const Sidebar = () => {
  // const [authUser, setAuthUser] = useState(null);
  // useEffect(() => {
  //   const listen = onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       setAuthUser(user);
  //     } else {
  //       setAuthUser(null);
  //     }
  //   });
  //   return () => {
  //     listen();
  //   };
  // }, []);

  // const userKeluarAkun = () => {
  //   signOut(auth)
  //     .then(() => {
  //       console.log("udah keluar akun berhasil");
  //     })
  //     .catch((error) => console.log(error));
  // };

  return (
    <div>
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        {/* Brand Logo  */}
        <a href="index3.html" className="brand-link">
          <img src={logo} alt="Logo" className="brand-image " />
          <span className="brand-text font-weight-light">Bank Sampah Delima</span>
        </a>
        {/* {/* Sidebar */}
        <div className="sidebar">
          {/* Sidebar user panel (optional) */}
          <div className="user-panel mt-3 mb-3 d-flex">
            <div className="image">
              <img src="dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" />
            </div>
            <div className="info">
              <p className="text-white">Admin</p>
              {/* <p>
                {authUser ? (
                  <>
                    <p className="text-white"> {authUser.email}</p>
                  </>
                ) : (
                  <p>Keluar Akun</p>
                )}
              </p> */}
            </div>
          </div>
          {/* Sidebar Menu */}
          <nav className="mt-2">
            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
              {/* Add icons to the links using the .nav-icon class
       with font-awesome or any other icon font library */}

              <li className="nav-item">
                <a href="/dashboard" className="nav-link">
                  <i className="nav-icon mr-2">
                    <IoHome />
                  </i>
                  <p>Dashboard</p>
                </a>
              </li>

              {/* <div class="dropdown-divider"></div> */}

              {/* <li className="nav-header ">KELOLA DATABASE</li> */}

              {/* <li className="nav-item">
                <a href="#" className="nav-link">
                  <i className="nav-icon mr-2">
                    <BsDatabaseFill />
                  </i>
                  <p>
                    Data Sembako
                    <i className="fas fa-angle-left right" />
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <a href="/kelola-sembako" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>Kelola Sembako</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="/riwsembako" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>Riwayat Sembako</p>
                    </a>
                  </li>
                </ul>
              </li> */}
              {/* <li className="nav-item">
                <a href="#" className="nav-link">
                  <i className="nav-icon mr-2">
                    <BsDatabaseFill />
                  </i>

                  <p>
                    Data Sampah
                    <i className="fas fa-angle-left right" />
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <a href="/kelola-sampah" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>Kelola Sampah</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="/riwayat-sampah" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>Riwayat Sampah</p>
                    </a>
                  </li>
                </ul>
              </li> */}
              {/* SEMENTARA DIKELUARIN BIAR BISA DIAKSES MA CHROME ---------------------------------------- */}
              <div class="dropdown-divider"></div>

              <li className="nav-header ">DATA SEMBAKO</li>
              <li className="nav-item">
                <a href="/kelola-sembako" className="nav-link">
                  <i className="nav-icon mr-2">
                    <FaBox />
                  </i>
                  <p>Kelola Sembako</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="/riwayat-sembako" className="nav-link">
                  <i className="nav-icon mr-2">
                    <FaBox />
                  </i>
                  <p>Riwayat Sembako</p>
                </a>
              </li>

              <div class="dropdown-divider"></div>

              <li className="nav-header ">DATA SAMPAH</li>
              <li className="nav-item">
                <a href="/kelola-sampah" className="nav-link">
                  {/* <i className="far fa-circle nav-icon" /> */}
                  <i className="nav-icon mr-2">
                    <MdDeleteSweep />
                  </i>
                  <p>Kelola Sampah</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="/riwayat-sampah" className="nav-link">
                  <i className="nav-icon mr-2">
                    <MdDeleteSweep />
                  </i>
                  <p>Riwayat Sampah</p>
                </a>
              </li>
              {/* <div class="dropdown-divider"></div>

              <li className="nav-item">
                <a href="/data-penjualan-sampah" className="nav-link">
                  <i className="nav-icon mr-2">
                    <BsDatabaseFill />
                  </i>
                  <p>Data Penjualan Sampah</p>
                </a>
              </li> */}

              <div class="dropdown-divider"></div>
              {/* 
              <li className="nav-header ">ARTIKEL & INFORMASI</li>

              <li className="nav-item">
                <a href="/artikel-banner" className="nav-link">
                  <i className="nav-icon mr-2">
                    <IoIosInformationCircle />
                  </i>
                  <p>Artikel & Banner</p>
                </a>
              </li>

              <div class="dropdown-divider"></div> */}

              {/* <li className="nav-header ">LAINNYA</li>
              <li className="nav-item">
                <a href="/verifikasi-nasabah" className="nav-link">
                  <i className="nav-icon mr-2">
                    <VscVerified />
                  </i>
                  <p>Verifikasi Nasabah</p>
                </a>
              </li> */}
              <li className="nav-header ">KELOLA NASABAH</li>
              <li className="nav-item">
                <a href="/data-nasabah" className="nav-link">
                  <i className="nav-icon mr-2">
                    <HiUsers />
                  </i>
                  <p>Data Nasabah</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="/verifikasi-nasabah" className="nav-link">
                  <i className="nav-icon mr-2">
                    <HiUsers />
                  </i>
                  <p>Verifikasi Nasabah</p>
                </a>
              </li>
              {/* <li className="nav-item">
                <a href="/data-backlist" className="nav-link">
                  <i className="nav-icon mr-2">
                    <HiUsers />
                  </i>
                  <p>Daftar Backlist</p>
                </a>
              </li> */}

              <div class="dropdown-divider"></div>

              {/* <li className="nav-item">
                <a href="#" className="nav-link">
                  <i className="nav-icon mr-2">
                    <AiOutlineSetting />
                  </i>
                  <p>
                    Pengaturan
                    <i className="fas fa-angle-left right" />
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <a href="/aturlokasi" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>Pengaturan Lokasi</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="/aturakun" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>Pengaturan Akun</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="/aktifitas-login" className="nav-link">
                      <i className="nav-icon mr-2">
                        <AiOutlineFieldTime />
                      </i>
                      <p>Aktivitas Login</p>
                    </a>
                  </li>
                </ul>
              </li> */}
              {/* SEMENTARA DIKELUARIN BIAR BISA DIAKSES MA CHROME ---------------------------------------- */}
              <li className="nav-header ">PENGATURAN</li>

              <li className="nav-item">
                <a href="/atur-lokasi" className="nav-link">
                  <i className="nav-icon mr-2">
                    <IoMdSettings />
                  </i>
                  <p>Pengaturan Lokasi</p>
                </a>
              </li>
              {/* <li className="nav-item">
                <a href="/semuaorder" className="nav-link">
                  <i className="nav-icon mr-2">
                    <IoMdSettings />
                  </i>
                  <p>Pengaturan Akun</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="/aktifitas-login" className="nav-link">
                  <i className="nav-icon mr-2">
                    <AiOutlineFieldTime />
                  </i>
                  <p>Aktivitas Login</p>
                </a>
              </li> */}
            </ul>
          </nav>
          {/* /.sidebar-menu */}
        </div>
        {/* /.sidebar */}
      </aside>
    </div>
  );
};

export default Sidebar;
