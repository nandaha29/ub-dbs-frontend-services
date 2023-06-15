import React from "react";
import Layout from "../../components/Layout";
import Table_Data_Nasabah from "../../components/elements/Table_Data_Nasabah";
// import Table_Try from "../../components/elements/Table_Data_Nasabah/Table_Try";

export default function Data_Nasabah() {
  return (
    <div>
      <Layout>
        <div className="content-wrapper">
          {/* Content Header (Page header) */}
          <div className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1 className="m-0">Data_Nasabah</h1>
                </div>
                {/* /.col */}
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item">
                      <a href="#">Home</a>
                    </li>
                    <li className="breadcrumb-item active">Database Nasabah</li>
                  </ol>
                </div>
                {/* /.col */}
              </div>
              {/* /.row */}
            </div>
            {/* /.container-fluid */}
          </div>
          {/* /.content-header */}
          <section className="content">
            <Table_Data_Nasabah />
            {/* <Table_Try /> */}
          </section>
        </div>
      </Layout>
    </div>
  );
}
