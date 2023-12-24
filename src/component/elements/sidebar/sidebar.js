import React, { Component } from "react";
import logo from "../../assets/logo/logo_bsd.png";
import { IoHome } from "react-icons/io5";
import { BsInfoSquare } from "react-icons/bs";
// import { RiHistoryFill } from "react-icons/ri";
import { HiUsers } from "react-icons/hi";
import { BsDatabaseFill } from "react-icons/bs";
// import { MdOutlineArticle } from "react-icons/md";
import { VscVerified } from "react-icons/vsc";
import { AiOutlineSetting, AiOutlineFieldTime } from "react-icons/ai";

class Sidebar extends Component {
  state = {};
  render() {
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
            <div className="user-panel mt-3 pb-3 mb-3 d-flex">
              <div className="image">
                <img src="dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" />
              </div>
              <div className="info">
                <a href="#" className="d-block">
                  Agung
                </a>
              </div>
            </div>
            {/* SidebarSearch Form */}
            {/* <div className="form-inline">
              <div className="input-group" data-widget="sidebar-search">
                <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" />
                <div className="input-group-append">
                  <button className="btn btn-sidebar">
                    <i className="fas fa-search fa-fw" />
                  </button>
                </div>
              </div>
            </div> */}
            {/* Sidebar Menu */}
            <nav className="mt-2">
              <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                {/* Add icons to the links using the .nav-icon class
         with font-awesome or any other icon font library */}

                <li className="nav-item">
                  <a href="/" className="nav-link">
                    <i className="nav-icon mr-2">
                      <IoHome />
                    </i>
                    <p>Dashboard</p>
                  </a>
                </li>

                <li className="nav-header ">KELOLA DATABASE</li>
                <li className="nav-item">
                  <a href="/data-nasabah" className="nav-link">
                    <i className="nav-icon mr-2">
                      <HiUsers />
                    </i>
                    <p>Data Nasabah</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link">
                    <i className="nav-icon mr-2">
                      <BsDatabaseFill />
                    </i>
                    <p>
                      Data Sembako
                      <i className="fas fa-angle-left right" />
                      {/* <span className="badge badge-info right">6</span> */}
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
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link">
                    <i className="nav-icon mr-2">
                      <BsDatabaseFill />
                    </i>

                    <p>
                      Data Sampah
                      <i className="fas fa-angle-left right" />
                      {/* <span className="badge badge-info right">6</span> */}
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
                </li>
                {/* END FOR EXAMPLE */}

                {/* <li className="nav-item">
                  <a href="#" className="nav-link">
                    <i className="nav-icon mr-2">
                      <HiOutlineSwitchHorizontal />
                    </i>

                    <p>
                      Data Tukaran
                      <i className="fas fa-angle-left right" />
                 
                    </p>
                  </a>
                  <ul className="nav nav-treeview">
                    <li className="nav-item">
                      <a href="pages/layout/top-nav.html" className="nav-link">
                        <i className="far fa-circle nav-icon" />
                        <p>Data Tukaran 1</p>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="pages/layout/top-nav-sidebar.html" className="nav-link">
                        <i className="far fa-circle nav-icon" />
                        <p>Data Tukaran 2</p>
                      </a>
                    </li>
                  </ul>
                </li> */}
                <li className="nav-item">
                  <a href="/data-penjualan-sampah" className="nav-link">
                    <i className="nav-icon mr-2">
                      <BsDatabaseFill />
                    </i>
                    <p>Data Penjualan Sampah</p>
                  </a>
                </li>
                <li className="nav-header ">ARTIKEL & INFORMASI</li>

                <li className="nav-item">
                  <a href="/artikel-banner" className="nav-link">
                    <i className="nav-icon mr-2">
                      <BsInfoSquare />
                    </i>
                    <p>Artikel & Banner</p>
                  </a>
                </li>

                <li className="nav-header ">LAINNYA</li>
                <li className="nav-item">
                  <a href="/verifikasi-nasabah" className="nav-link">
                    <i className="nav-icon mr-2">
                      <VscVerified />
                    </i>
                    <p>Verifikasi Nasabah</p>
                  </a>
                </li>

                <li className="nav-item">
                  <a href="#" className="nav-link">
                    <i className="nav-icon mr-2">
                      <AiOutlineSetting />
                    </i>
                    <p>
                      Pengaturan
                      <i className="fas fa-angle-left right" />
                      {/* <span className="badge badge-info right">6</span> */}
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
                </li>
              </ul>
            </nav>
            {/* /.sidebar-menu */}
          </div>
          {/* /.sidebar */}
        </aside>
      </div>
    );
  }
}

export default Sidebar;
