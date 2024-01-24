import React, { useState, useEffect, Component } from "react";
import axios from "axios";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../config/firebase";

import "jquery/dist/jquery.min.js";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "datatables.net-buttons/js/dataTables.buttons.js";
import "datatables.net-buttons/js/buttons.colVis.js";
import "datatables.net-buttons/js/buttons.flash.js";
import "datatables.net-buttons/js/buttons.html5.js";
import "datatables.net-buttons/js/buttons.print.js";
import $, { noConflict } from "jquery";
import "toastr/build/toastr.css";
import toastr from "toastr";

const dataprofil = [
  {
    id_slip: "121405",
    thumbnail: "100456",
    nama_sembako: "Andi Budiono",
    poin_per: "10-01-2021 08:14",
    stok: "2",
    poin_per: "14",
    status: "Aktif",
  },
];

const sampah = [
  {
    jenis_sampah: "Minyak",
    points: "200 / kg",
  },
  {
    jenis_sampah: "Gula",
    points: "250 / kg",
  },
  {
    jenis_sampah: "Beras",
    points: "200 / kg",
  },
];

const TableKelolaSembako = () => {
  const [authUser, setAuthUser] = useState(null);
  const [token, setToken] = useState([]);
  const [kelolaSembako, setKelolaSembako] = useState([]);

  const [data_nasabah, setDataNasabah] = useState([]);
  const [id_sembako, setIdSembako] = useState("");
  const [name_sembako, setNameSembako] = useState("");
  const [status, setStatus] = useState("");
  const [poin_sembako, setPoinSembako] = useState(0);
  const [stok_sembako, setStokSembako] = useState(0);

  const getKelolaSembako = async () => {
    const headers = { Authorization: `Bearer ${token}` };
    try {
      const response = await axios.get("https://devel4-filkom.ub.ac.id/slip/penukaran?size=10&status=terkirim&isPagination=true", { headers });
      setKelolaSembako(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
        setToken(user.accessToken);
        // console.log(tes);
        getKelolaSembako();
      } else {
        setAuthUser(null);
      }
    });
    return () => {
      listen();
    };
  }, []);

  // const showTable = () => {
  //   return kelolaSembako.map((item, index) => {
  //     return (
  //       <tr key={index}>
  //         <td className="mt-1 mx-2">{index + 1}</td>
  //         <td className="mt-1 mx-2">{item.id_sembako}</td>
  //         <td className="mt-1 mx-2">
  //           <img src={`data:image/png;base64, ${item.foto_sembako}`} alt={`Foto ${item.foto_sembako}`} style={{ width: "50px" }} />
  //         </td>
  //         <td className="mt-1 mx-2">{item.name_sembako}</td>
  //         <td className="mt-1 mx-2">{item.poin_sembako}</td>
  //         <td className="mt-1 mx-2">{item.stok_sembako}</td>
  //         <td>
  //           <button
  //             className={`mt-1 mx-2 text-center ${item.status === "Aktif" ? "btn btn-success btn-sm pl-5 pr-5 text-center" : item.status === "Diarsipkan" ? "btn btn-secondary btn-sm pl-4 pr-4 text-center" : ""}`}
  //             style={{ pointerEvents: "none" }}
  //           >
  //             {item.status}
  //           </button>
  //         </td>
  //         <td className="d-flex justify-content-center">
  //           <button className="btn btn-primary btn-sm mt-1 mx-2" data-toggle="modal" data-target="#modal_return_whitelist" onClick={() => editItem(index)}>
  //             Edit
  //           </button>
  //           <button className="btn btn-warning btn-sm mt-1 mx-2" data-toggle="modal" data-target="#modal_hapus_akun" onClick={() => toggleStatus(index)}>
  //             {item.status === "Aktif" ? "Arsipkan" : "Aktifkan"}
  //           </button>
  //           <button className="btn btn-danger btn-sm mt-1 mx-2" data-toggle="modal" data-target="#modal_hapus_akun" onClick={() => handleDelete(index)}>
  //             Hapus
  //           </button>
  //         </td>
  //       </tr>
  //     );
  //   });
  // };

  const handleTambahSembako = () => {
    // Add new sembako to data_nasabah using setDataNasabah
  };

  const clearFields = () => {
    setIdSembako("");
    setNameSembako("");
    setStatus("");
    setPoinSembako(0);
    setStokSembako(0);
  };

  const editItem = (index) => {
    // Set editingItem using data_nasabah[index]
    // Open modal for editing
  };

  const toggleStatus = (index) => {
    // Change status of data_nasabah[index]
    // Update data_nasabah using setDataNasabah
  };

  const handleDelete = (index) => {
    // Remove data\_nasabah[index] from data\_nasabah
    // Update data\_nasabah using setDataNasabah
  };

  return (
    <>
      <div className="mr-4 float-sm-right">
        <button className="btn-primary btn" data-toggle="modal" data-target="#modal_tambah_sembako">
          + Tambah Sembako
        </button>
      </div>
      <div class="container-fluid">
        <div class="table-responsive p-0 pb-2">
          <table id="table" className="table align-items-center justify-content-center mb-0 table-striped">
            <thead>
              <tr>
                <th className="text-uppercase  text-sm text-center pl-4">ID Sembako</th>
                <th className="text-uppercase  text-sm text-center pl-4">Foto</th>
                <th className="text-uppercase  text-sm text-center pl-4">Nama Sembako</th>
                <th className="text-uppercase  text-sm text-center pl-4">Poin per 0,5 kg</th>
                <th className="text-uppercase  text-sm text-center pl-4">Stok</th>
                <th className="text-uppercase  text-sm text-center pl-4">Status</th>
                <th className="text-uppercase  text-sm text-center">Action</th>
              </tr>
            </thead>

            {/* <tbody className="text-center">{this.showTable()}</tbody> */}
            <tbody>
              {dataprofil.map((item) => (
                <tr key={item.id_slip}>
                  <td>{item.id_slip}</td>
                  <td>{item.thumbnail}</td>
                  <td>{item.nama_sembako}</td>
                  <td>{item.poin_per}</td>
                  <td>{item.stok}</td>
                  <td>{item.status}</td>
                  <td className="d-flex">
                    <button type="button" className="btn-primary border-0 mr-2" data-toggle="modal" data-target="#modal_proses_sampah">
                      Detail
                    </button>
                    <button className="btn-danger border-0">Tolak</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* MODALS EDIT */}
        </div>
      </div>

      {/* MODAL APALAGI */}
    </>
  );
};

export default TableKelolaSembako;
