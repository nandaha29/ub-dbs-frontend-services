import React, { useEffect, useState, useRef } from "react";
import $ from "jquery";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";

import axios from "axios";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useForm } from "react-hook-form";

const names = [
  {
    id_nasabah: 222,
    name_nasabah: "Andi Lalapan",
    berat_nasabah: "Ditolak",
    poin_nasabah: 700,
    waktu_transaksi: "10/02/2023  |  12.00 PM",
  },
];

const TableRiwayatSembako = () => {
  const [authUser, setAuthUser] = useState(null);
  const [token, setToken] = useState([]);
  const [formData, setFormData] = useState({});
  const modalRef = useRef(null);
  const [riwayatSembako, setRiwayatSembako] = useState([]);

  const getRiwayatSembako = async () => {
    const headers = { Authorization: `Bearer ${token}` };
    try {
      const response = await axios.get("https://devel4-filkom.ub.ac.id/slip/penukaran?status=berhasil&size=50&isPagination=true", { headers });
      setRiwayatSembako(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getPermintaanID = async (ids) => {
    const headers = { Authorization: `Bearer ${token}` };
    try {
      const response = await axios.get(
        `https://devel4-filkom.ub.ac.id/slip/penukaran/${ids}`,
        {
          id: ids,
          nama: formData.nama,
          harga_tukar_poin: formData.harga_tukar_poin,
          img_url: formData.img_url,
          items_sampah: formData.list_sampah,
        },
        { headers }
      );
      setFormData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDetailClick = async (id) => {
    try {
      await getPermintaanID(id);
      modalRef.current.open = true;
    } catch (error) {
      console.error("Error handling detail click:", error);
    }
  };

  const showTable = () => {
    try {
      return riwayatSembako.map((item, index) => {
        return (
          <tr key={index}>
            <td className="mt-1 mx-2 text-center">{item.id_user}</td>
            <td className="mt-1 mx-2 text-center">{item.nama_user}</td>
            <td className="text-center justify-content-center flex">
              {/* <button
                className={`mt-1 mx-2 ${item.berat_nasabah === "Berhasil Di Proses" ? "btn btn-success btn-sm px-3 text-center" : item.berat_nasabah === "Ditolak" ? "btn btn-danger btn-sm px-5 text-center" : ""}`}
                style={{ pointerEvents: "none" }}
              >
                {item.berat_nasabah}
              </button> */}
              {item.status}
            </td>
            <td className="mt-1 mx-2 text-center">{item.total_poin}</td>
            <td className="mt-1 mx-2 text-center">
              {item.tanggal.date.year}
              {/* {formData.tanggal.date.day}/{formData.tanggal.date.month}/{formData.tanggal.date.year} */}
            </td>
            <td className="d-flex justify-content-center">
              <button className="btn btn-primary btn-sm mt-1 mx-2" data-toggle="modal" data-target="#modal_detail_sembako" onClick={() => handleDetailClick(item.id_slip)}>
                Lihat Detail
              </button>
            </td>
          </tr>
        );
      });
    } catch (e) {
      alert(e.message);
    }
  };

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
        setToken(user.accessToken);
        // console.log(tes);
        getRiwayatSembako();
      } else {
        setAuthUser(null);
      }
    });

    // Hanya inisialisasi DataTable jika belum diinisialisasi sebelumnya
    if (!$.fn.DataTable.isDataTable("#table")) {
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

    // Membersihkan listener saat komponen dibongkar
    return () => {
      listen();
    };
  }, []);

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
            <tbody>{showTable()}</tbody>
          </table>
        </div>
        <div className="modal fade" ref={modalRef} id="modal_detail_sembako" data-backdrop="static" data-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header border-0">
                <h5 className="modal-title" id="staticBackdropLabel">
                  <i className="fas fa-chart-pie mr-1" />
                  ID Riwayat Penukaran <p className="text-secondary">{formData.id}</p>
                </h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <h5 className="ml-4">Profil Penukaran</h5>
                <div className="row m-4">
                  <table className="table table-borderless">
                    <tr className="thead-light">
                      <th scope="col">Nama Nasabah</th>
                      <th scope="col">Waktu Request</th>
                      <th scope="col">Transaksi Selesai</th>
                    </tr>
                    <tr>
                      <td>{formData.nasabah}</td>
                      <td>
                        {/* {formData.tanggal.date.day}/{formData.tanggal.date.month}/{formData.tanggal.date.year} */}
                        {/* 12/09 */}?
                      </td>
                      <td>?</td>
                    </tr>
                    <tr className="thead-light">
                      <th scope="col">ID Nasabah</th>
                      <th scope="col">Petugas Pengurus</th>
                    </tr>
                    <tr>
                      <td>{formData.id_user}</td>
                      <td>
                        {formData.id_petugas != null ? formData.id_petugas.nama : null}
                        {/* {formData.id_petugas.nama} */}
                        {/* {formData.id_petugas} */}
                      </td>
                    </tr>
                  </table>
                </div>
                <div className="row m-4">
                  <table className="table table-bordered table-striped">
                    <thead>
                      <tr>
                        <th scope="col">No.</th>
                        <th scope="col">Jenis Sembako</th>
                        <th scope="col">Berat Barang</th>
                        <th scope="col">Poin</th>
                        <th scope="col">Pengurangan Poin</th>
                      </tr>
                    </thead>
                    <tbody>
                      {formData.items_penukaran &&
                        formData.items_penukaran.map((item, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.nama_barang}</td>
                            <td>{item.berat} Kg</td>
                            <td>{item.total_harga_poin}</td>
                            <td>
                              {item.total_harga_poin} - {item.debet}
                            </td>
                          </tr>
                        ))}
                      <tr>
                        <td colSpan="4">Total</td>
                        <td>?</td>
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
    </>
  );
};

export default TableRiwayatSembako;
