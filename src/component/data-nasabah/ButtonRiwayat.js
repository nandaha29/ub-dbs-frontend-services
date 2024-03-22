import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ButtonRiwayat({ user_id }) {
  const [activeButton, setActiveButton] = useState("Semua");
  const [riwayat, setRiwayat] = useState([]);

  const getData = async () => {
    try {
      const response = await axios.get(
        `https://devel4-filkom.ub.ac.id/bank-sampah/user/${user_id}/history`
      );
      setRiwayat(response.data.order_selesai);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    // getData(user_id);
  }, []);

  const handleButtonClick = (category) => {
    setActiveButton(category);
  };

  return (
    <>
      <button
        className="btn btn-success btn-sm mt-1 mx-2"
        data-toggle="modal"
        data-target="#modal_riwayat_nasabah"
      >
        Riwayat
      </button>

      {/* MODAL RIWAYAT */}
      <div
        className="modal fade"
        id="modal_riwayat_nasabah"
        data-backdrop="static"
        data-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header ">
              <h5 className="modal-title" id="staticBackdropLabel">
                Riwayat Transaksi Nasabah
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body  justify-content-center">
              <div className="container-fluid">
                <div className="row">
                  {/* BUTTONS */}
                  <div className="col-xl-12 mt-5">
                    <div className="btn-group">
                      <button
                        className={`btn ${
                          activeButton === "Semua"
                            ? "btn-primary mr-2"
                            : "btn mr-2"
                        }`}
                        onClick={() => handleButtonClick("Semua")}
                      >
                        Semua
                      </button>
                      {/* Jika ada lebih banyak kategori, tambahkan tombol di sini */}
                    </div>

                    {/* START TABLE */}
                    <div className="mt-4 text-sm">
                      <table className="table table-xl table-bordered">
                        <thead className="text-center">
                          <tr className="">
                            <th className="">ID Order</th>
                            <th className="">Waktu</th>
                            <th className="">Petugas</th>
                            <th className="">Tipe Transaksi</th>
                            <th className="">Poin</th>
                            <th className="">Status</th>
                          </tr>
                        </thead>
                        <tbody className="text-center">
                          {riwayat.map((item) => (
                            <tr key={item.id_slip}>
                              <td>{item.id_slip}</td>
                              <td>{`${item.tanggal.date.day}-${item.tanggal.date.month}-${item.tanggal.date.year} ${item.tanggal.time.hour}:${item.tanggal.time.minute}:${item.tanggal.time.second}`}</td>
                              <td>{item.petugas.nama}</td>
                              <td>
                                <button className="btn btn-warning">
                                  {item.slip_type}
                                </button>
                              </td>
                              <td>{item.total_poin}</td>
                              <td>{item.status}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    {/* END TABLE */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
