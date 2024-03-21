import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../config/firebase";

export default function ButtonRiwayat(item) {
  const [activeButton, setActiveButton] = useState("Semua");
  const [sampah, setSampah] = useState([]);
  const [sembako, setSembako] = useState([]);
  const [token, setToken] = useState();
  const modalRef = useRef(null);

  console.log(item);
  console.log(sampah);
  const handleDetailClick = async (ids) => {
    const headers = { Authorization: `Bearer ${token}` };
    try {
      const responseSampah = await axios.get(`https://devel4-filkom.ub.ac.id/bank-sampah/user/${ids}/history`, { headers });
      setSampah(responseSampah.data.order_selesai);
      modalRef.current.open = true;

      // const responseSembako = await axios.get(`https://devel4-filkom.ub.ac.id/bank-sampah/user/${user_id}/history`);
      // setSembako(responseSembako.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setToken(user.accessToken);
      }
    });
    return () => {
      listen();
    };
  }, [sampah]);

  const handleButtonClick = (category) => {
    setActiveButton(category);
  };

  return (
    <>
      <button className="btn btn-success btn-sm mt-1 mx-2" data-toggle="modal" data-target={`#modal_riwayat_data_nasabah_${item.id}`} onClick={() => handleDetailClick(item.id)}>
        Riwayat
      </button>

      {/* MODAL RIWAYAT */}
      <div className="modal fade" ref={modalRef} id={`modal_riwayat_data_nasabah_${item.id}`} data-backdrop="static" data-keyboard="false" tabIndex="-1" aria-labelledby={`#modal_riwayat_data_nasabah_${item.id}`} aria-hidden="true">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header ">
              <h5 className="modal-title" id="staticBackdropLabel">
                Riwayat Transaksi Nasabah
              </h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body  justify-content-center">
              <div className="container-fluid">
                <div className="row">
                  {/* BUTTONS */}
                  <div className="col-xl-12 mt-5">
                    <div className="btn-group">
                      <button className={`btn ${activeButton === "Semua" ? "btn-primary mr-2" : "btn mr-2"}`} onClick={() => handleButtonClick("Semua")}>
                        Semua
                      </button>
                      <button className={`btn ${activeButton === "Sampah" ? "btn-primary mr-2" : "btn mr-2"}`} onClick={() => handleButtonClick("Sampah")}>
                        Sampah
                      </button>
                      <button className={`btn ${activeButton === "Sembako" ? "btn-primary mr-2" : "btn mr-2"}`} onClick={() => handleButtonClick("Sembako")}>
                        Sembako
                      </button>
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
                            {/* <th className="">Keterangan</th> */}
                          </tr>
                        </thead>
                        <tbody className="text-center">
                          {sampah.length != 0 ? (
                            <>
                              {activeButton === "Sampah" && sampah.filter((item) => item.slip_type === "PENUKARAN").length === 0 && (
                                <tr>
                                  <td colSpan="5">Data Riwayat Kosong</td>
                                </tr>
                              )}
                              {(activeButton === "Sampah" || activeButton === "Semua") &&
                                sampah
                                  .filter((item) => item.slip_type === "PENUKARAN")
                                  .map((item) => (
                                    <tr key={item.id_slip}>
                                      <td>{item.id_slip}</td>
                                      <td>{item.tanggal.date.year}</td>
                                      <td>{item.petugas.nama}</td>
                                      <td>
                                        <button className="btn btn-warning">{item.slip_type}</button>
                                      </td>
                                      <td>{item.total_poin}</td>
                                    </tr>
                                  ))}
                              {activeButton === "Sembako" && sampah.filter((item) => item.slip_type === "MENABUNG").length === 0 && (
                                <tr>
                                  <td colSpan="5">Data Riwayat Kosong</td>
                                </tr>
                              )}
                              {(activeButton === "Sembako" || activeButton === "Semua") &&
                                sampah
                                  .filter((item) => item.slip_type === "MENABUNG")
                                  .map((item) => (
                                    <tr key={item.id_slip}>
                                      <td>{item.id_slip}</td>
                                      <td>{item.tanggal.date.year}</td>
                                      <td>{item.petugas.nama}</td>
                                      <td>
                                        <button className="btn btn-success">{item.slip_type}</button>
                                      </td>
                                      <td>{item.total_poin}</td>
                                    </tr>
                                  ))}
                            </>
                          ) : (
                            <tr>
                              <td colSpan={5}>Data Riwayat Kosong</td>
                            </tr>
                          )}
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
