import React, { useState, useEffect } from "react";
import "jquery/dist/jquery.min.js";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "datatables.net-buttons/js/dataTables.buttons.js";
import "datatables.net-buttons/js/buttons.colVis.js";
import "datatables.net-buttons/js/buttons.flash.js";
import "datatables.net-buttons/js/buttons.html5.js";
import "datatables.net-buttons/js/buttons.print.js";
import $ from "jquery";
// import DataTable from "react-datatables";

import axios from "axios";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useForm } from "react-hook-form";

const Sampah = [
  {
    id_nasabah: 222,
    name_nasabah: "Andi Lalapan",
    berat_nasabah: "Ditolak",
    poin_nasabah: 700,
    waktu_transaksi: "10/02/2023  |  12.00 PM",
  },
];

const TableRiwayatSampah = () => {
  const [authUser, setAuthUser] = useState(null);
  const [token, setToken] = useState([]);
  const [riwayatSampah, setRiwayatSampah] = useState([]);
  const [formData, setFormData] = useState({});
  // const modalRef = useRef(null);

  // const getRiwayatSampah = async () => {
  //   const headers = { Authorization: `Bearer ${token}` };
  //   try {
  //     const response = await axios.get("https://devel4-filkom.ub.ac.id/slip/menabung?status=berhasil&size=50&isPagination=true", { headers });
  //     setRiwayatSampah(response.data);
  //     // console.log(response.data);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  const getRiwayatSampah = async () => {
    const headers = { Authorization: `Bearer ${token}` };
    try {
      const response = await axios.get("https://devel4-filkom.ub.ac.id/slip/menabung?status=berhasil&size=50&isPagination=true", { headers });

      if (Array.isArray(response.data.data)) {
        setRiwayatSampah(response.data.data);
      } else {
        console.error("Data is not an array:", response.data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // const showTable = () => {
  //   try {
  //     return riwayatSampah.map((item, index) => (
  //       <tr key={index}>
  //         <td className="mt-1 mx-2 text-center">{item.id_nasabah}</td>
  //         <td className="mt-1 mx-2 text-center">{item.name_nasabah}</td>
  //         <td className="text-center justify-content-center flex">
  //           <button
  //             className={`mt-1 mx-2 ${item.berat_nasabah === "Berhasil Di Proses" ? "btn btn-success btn-sm px-3 text-center" : item.berat_nasabah === "Ditolak" ? "btn btn-danger btn-sm px-5 text-center" : ""}`}
  //             style={{ pointerEvents: "none" }}
  //           >
  //             {item.berat_nasabah}
  //           </button>
  //         </td>
  //         <td className="mt-1 mx-2 text-center">+ {item.poin_nasabah}</td>
  //         <td className="mt-1 mx-2 text-center">{item.waktu_transaksi}</td>
  //         <td className="d-flex justify-content-center">
  //           <button className="btn btn-primary btn-sm mt-1 mx-2" data-toggle="modal" data-target="#modal_detail_sampah">
  //             Lihat Detail
  //           </button>
  //         </td>
  //       </tr>
  //     ));
  //   } catch (e) {
  //     alert(e.message);
  //   }
  // };

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
        setToken(user.accessToken);
        // console.log(tes);
        getRiwayatSampah();
      } else {
        setAuthUser(null);
      }
    });

    if (!$.fn.DataTable.isDataTable("#myTable")) {
      $(document).ready(function () {
        setTimeout(function () {
          $("#table").DataTable({
            pagingType: "full_numbers",
            pageLength: 20,
            processing: true,
            dom: "Bfrtip",
            select: {
              style: "single",
            },
            buttons: [
              {
                extend: "pageLength",
                className: "btn btn-dark bg-dark",
              },
              {
                extend: "csv",
                className: "btn btn-dark bg-dark",
              },
              {
                extend: "print",
                customize: function (win) {
                  $(win.document.body).css("font-size", "10pt");
                  $(win.document.body).find("table").addClass("compact").css("font-size", "inherit");
                },
                className: "btn btn-secondary bg-secondary",
              },
            ],
            fnRowCallback: function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
              var index = iDisplayIndexFull + 1;
              $("td:first", nRow).html(index);
              return nRow;
            },
            lengthMenu: [
              [10, 20, 30, 50, -1],
              [10, 20, 30, 50, "All"],
            ],
            columnDefs: [
              {
                targets: 0,
                render: function (data, type, row, meta) {
                  return type === "export" ? meta.row + 1 : data;
                },
              },
            ],
          });
        }, 1000);
      });
    }

    return () => {
      listen();
    };
  }, [formData]);

  return (
    <>
      <div className="container-fluid">
        <div className="table-responsive p-0 pb-2">
          <table id="table" className="table align-items-center justify-content-center mb-0 table-striped">
            <thead>
              <tr>
                <th className="text-uppercase  text-sm text-center">ID Transaksi</th>
                <th className="text-uppercase  text-sm text-center">Nama Nasabah</th>
                <th className="text-uppercase  text-sm text-center ">Status</th>
                <th className="text-uppercase  text-sm text-center">Poin</th>
                <th className="text-uppercase  text-sm text-center">Waktu Transaksi</th>
                <th className="text-uppercase  text-sm text-center ">Action</th>
              </tr>
            </thead>
            <tbody>
              {/* {showTable()} */}
              {riwayatSampah.map((item, index) => (
                <tr key={index}>
                  <td className="mt-1 mx-2 text-center">{item.id_nasabah}</td>
                  <td className="mt-1 mx-2 text-center">{item.name_nasabah}</td>
                  <td className="text-center justify-content-center flex">
                    <button
                      className={`mt-1 mx-2 ${item.berat_nasabah === "Berhasil Di Proses" ? "btn btn-success btn-sm px-3 text-center" : item.berat_nasabah === "Ditolak" ? "btn btn-danger btn-sm px-5 text-center" : ""}`}
                      style={{ pointerEvents: "none" }}
                    >
                      {item.berat_nasabah}
                    </button>
                  </td>
                  <td className="mt-1 mx-2 text-center">+ {item.poin_nasabah}</td>
                  <td className="mt-1 mx-2 text-center">{item.waktu_transaksi}</td>
                  <td className="d-flex justify-content-center">
                    <button className="btn btn-primary btn-sm mt-1 mx-2" data-toggle="modal" data-target="#modal_detail_sampah">
                      Lihat Detail
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* modal detail  */}
        <div className="modal fade" id="modal_detail_sampah" data-backdrop="static" data-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header border-0">
                <h5 className="modal-title" id="staticBackdropLabel">
                  <i className="fas fa-chart-pie mr-1" />
                  ID Riwayat Penukaran XXXXXXXXX
                </h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <h5 className="m-4">Profil Penukaran</h5>
                <div className="row m-4">
                  <table className="table table-borderless">
                    <tr className="thead-light">
                      <th scope="col">Nama Nasabah</th>
                      <th scope="col">Waktu Request</th>
                      <th scope="col">Transaksi Selesai</th>
                    </tr>
                    <tr>
                      <td>Andi Budions</td>
                      <td>100104</td>
                      <td>2023-01-19 13:14</td>
                    </tr>
                    <tr className="thead-light">
                      <th scope="col">ID Nasabah</th>
                      <th scope="col">Petugas Pengurus</th>
                    </tr>
                    <tr>
                      <td>100104</td>
                      <td>Agung</td>
                    </tr>
                  </table>
                </div>
                <div className="row m-4">
                  <table className="table table-bordered table-striped">
                    <thead>
                      <tr>
                        <th scope="col">No.</th>
                        <th scope="col">Jenis Sampah</th>
                        <th scope="col">Berat Barang</th>
                        <th scope="col">Poin</th>
                        <th scope="col">Pengurangan Poin</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>Beras</td>
                        <td>1 Kg</td>
                        <td>700/0,5 kg</td>
                        <td>+900</td>
                      </tr>
                      <tr>
                        <td>1</td>
                        <td>Beras</td>
                        <td>1 Kg</td>
                        <td>700/0,5 kg</td>
                        <td>+100</td>
                      </tr>
                      <tr>
                        <td colSpan="4">Total</td>
                        <td>+1400</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="modal-footer">
                <div className="float-sm-left">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">
                    Tutup
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* MODAL APALAGI */}
    </>
  );
};

export default TableRiwayatSampah;
