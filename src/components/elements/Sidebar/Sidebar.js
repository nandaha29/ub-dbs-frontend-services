import React, { Component } from "react";
import logo from "../../assets/logo/logo_bsd.png";
import { IoHome } from "react-icons/io5";
import { BsInfoSquare } from "react-icons/bs";
import { RiHistoryFill } from "react-icons/ri";
import { HiUsers, HiOutlineSwitchHorizontal } from "react-icons/hi";
import { BsDatabaseFillGear, BsDatabaseFill, BsDatabaseFillAdd } from "react-icons/bs";
import { MdOutlineArticle } from "react-icons/md";
import { VscVerified } from "react-icons/vsc";
import { AiOutlineSetting } from "react-icons/ai";

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
                  <a href="/" className="nav-link active">
                    <i className="nav-icon mr-2">
                      <IoHome />
                    </i>
                    <p>Dashboard</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="pages/widgets.html" className="nav-link">
                    <i className="nav-icon mr-2">
                      <RiHistoryFill />
                    </i>
                    <p>Riwayat Order</p>
                  </a>
                </li>
                <li className="nav-header ">KELOLA DATABASE</li>
                <li className="nav-item">
                  <a href="/danas" className="nav-link">
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
                      Data Sampah
                      <i className="fas fa-angle-left right" />
                      {/* <span className="badge badge-info right">6</span> */}
                    </p>
                  </a>
                  <ul className="nav nav-treeview">
                    <li className="nav-item">
                      <a href="pages/layout/top-nav.html" className="nav-link">
                        <i className="far fa-circle nav-icon" />
                        <p>Data Sampah 1</p>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="pages/layout/top-nav-sidebar.html" className="nav-link">
                        <i className="far fa-circle nav-icon" />
                        <p>Data Sampah 2</p>
                      </a>
                    </li>
                  </ul>
                </li>
                {/* END FOR EXAMPLE */}
                <li className="nav-item">
                  <a href="#" className="nav-link">
                    <i className="nav-icon mr-2">
                      <BsDatabaseFillGear />
                    </i>

                    <p>
                      Kelola Sampah
                      <i className="fas fa-angle-left right" />
                      {/* <span className="badge badge-info right">6</span> */}
                    </p>
                  </a>
                  <ul className="nav nav-treeview">
                    <li className="nav-item">
                      <a href="pages/layout/top-nav.html" className="nav-link">
                        <i className="far fa-circle nav-icon" />
                        <p>Kelola Sampah 1</p>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="pages/layout/top-nav-sidebar.html" className="nav-link">
                        <i className="far fa-circle nav-icon" />
                        <p>Kelola Sampah 2</p>
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link">
                    <i className="nav-icon mr-2">
                      <BsDatabaseFillAdd />
                    </i>

                    <p>
                      Daftar Sampah
                      <i className="fas fa-angle-left right" />
                      {/* <span className="badge badge-info right">6</span> */}
                    </p>
                  </a>
                  <ul className="nav nav-treeview">
                    <li className="nav-item">
                      <a href="pages/layout/top-nav.html" className="nav-link">
                        <i className="far fa-circle nav-icon" />
                        <p>Daftar Sampah 1</p>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="pages/layout/top-nav-sidebar.html" className="nav-link">
                        <i className="far fa-circle nav-icon" />
                        <p>Daftar Sampah 2</p>
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link">
                    <i className="nav-icon mr-2">
                      <HiOutlineSwitchHorizontal />
                    </i>

                    <p>
                      Data Tukaran
                      <i className="fas fa-angle-left right" />
                      {/* <span className="badge badge-info right">6</span> */}
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
                </li>
                <li className="nav-header ">ARTIKEL & INFORMASI</li>
                <li className="nav-item">
                  <a href="#" className="nav-link">
                    <i className="nav-icon mr-2">
                      <MdOutlineArticle />
                    </i>
                    <p>
                      Artikel
                      <i className="fas fa-angle-left right" />
                      {/* <span className="badge badge-info right">6</span> */}
                    </p>
                  </a>
                  <ul className="nav nav-treeview">
                    <li className="nav-item">
                      <a href="pages/layout/top-nav.html" className="nav-link">
                        <i className="far fa-circle nav-icon" />
                        <p>Artikel1</p>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="pages/layout/top-nav-sidebar.html" className="nav-link">
                        <i className="far fa-circle nav-icon" />
                        <p>Artikel 2</p>
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link">
                    <i className="nav-icon mr-2">
                      <BsInfoSquare />
                    </i>
                    <p>
                      Banner Informasi
                      <i className="fas fa-angle-left right" />
                      {/* <span className="badge badge-info right">6</span> */}
                    </p>
                  </a>
                  <ul className="nav nav-treeview">
                    <li className="nav-item">
                      <a href="pages/layout/top-nav.html" className="nav-link">
                        <i className="far fa-circle nav-icon" />
                        <p>Banner Informasi 1</p>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="pages/layout/top-nav-sidebar.html" className="nav-link">
                        <i className="far fa-circle nav-icon" />
                        <p>Banner Informasi 2</p>
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="nav-header ">LAINNYA</li>
                <li className="nav-item">
                  <a href="/vernas" className="nav-link">
                    <i className="nav-icon mr-2">
                      <VscVerified />
                    </i>
                    <p>Verifikasi Nasabah</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/backlist" className="nav-link">
                    <i className="nav-icon mr-2">{/* <VscVerified /> */}</i>
                    <p>Data Backlist Nasabah</p>
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
                      <a href="pages/layout/top-nav.html" className="nav-link">
                        <i className="far fa-circle nav-icon" />
                        <p>Pengaturan 1</p>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="pages/layout/top-nav-sidebar.html" className="nav-link">
                        <i className="far fa-circle nav-icon" />
                        <p>Pengaturan 2</p>
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
