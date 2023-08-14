import React, { Component } from "react";
import { HiUsers } from "react-icons/hi";

export default class Box extends Component {
  render() {
    return (
      <div>
        {" "}
        <div className="row">
          <div className="col-lg-3 col-6">
            {/* small box */}
            <div className="small-box bg-info">
              <div className="inner">
                <h3>852</h3>
                <p>Nasabah Aktif</p>
              </div>
              <div className="icon">
                {/* <i className="ion ion-bag" /> */}
                <HiUsers />
              </div>
              <a href="#" className="small-box-footer">
                Selengkapnya <i className="fas fa-arrow-circle-right" />
              </a>
            </div>
          </div>
          {/* ./col */}
          <div className="col-lg-3 col-6">
            {/* small box */}
            <div className="small-box bg-warning">
              <div className="inner">
                <h3>852 kg</h3>
                <p>Total Sampah Bulan ini</p>
              </div>
              <div className="icon">
                <i className="ion ion-stats-bars" />
              </div>
              <a href="#" className="small-box-footer">
                Selengkapnya
                <i className="fas fa-arrow-circle-right" />
              </a>
            </div>
          </div>
          {/* ./col */}
          <div className="col-lg-3 col-6">
            {/* small box */}
            <div className="small-box bg-danger">
              <div className="inner">
                <h3>852</h3>
                <p>Pending Registrations</p>
              </div>
              <div className="icon">
                <i className="ion ion-person-add" />
              </div>
              <a href="#" className="small-box-footer">
                Selengkapnya <i className="fas fa-arrow-circle-right" />
              </a>
            </div>
          </div>
          {/* ./col */}
          <div className="col-lg-3 col-6">
            {/* small box */}
            <div className="small-box bg-success">
              <div className="inner">
                <h3>+29%</h3>
                <p>Transaksi Sembako</p>
              </div>
              <div className="icon">
                <i className="ion ion-pie-graph" />
              </div>
              <a href="#" className="small-box-footer">
                Selengkapnya <i className="fas fa-arrow-circle-right" />
              </a>
            </div>
          </div>
          {/* ./col */}
        </div>
      </div>
    );
  }
}
