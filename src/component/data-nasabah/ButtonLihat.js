import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../config/firebase";

export default function ButtonLihat(item) {
  console.log(item)
  const [token, setToken] = useState();
  const [formData, setFormData] = useState({});
  const modalRef = useRef(null);

  const handleDetailClick = async (id) => {
    try {
      const headers = { Authorization: `Bearer ${token}` };
      const response = await axios.get(
        `https://devel4-filkom.ub.ac.id/bank-sampah/user/${id}/history`,
        { headers }
      );
      setFormData(response.data.user);
      console.log(response.data.user);
      modalRef.current.open = true;
    } catch (error) {
      console.error("Error handling detail click:", error);
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
  }, [formData]);

  return (
    <>
      <button className="btn btn-primary btn-sm mt-1 mx-2" data-toggle="modal" data-target={`#modal_liat_data_nasabah_${item.id}`} onClick={() => handleDetailClick(item.id)}>
        Lihat
      </button>

      {/* MODAL LIHAT */}
      <div className="modal fade" ref={modalRef} id={`modal_liat_data_nasabah_${item.id}`} data-backdrop="static" data-keyboard="false" tabIndex="-1" aria-labelledby={`staticBackdropLabel_${item.id}`} aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header ">
              <h5 className="modal-title" id="staticBackdropLabel">
                <i className="fas fa-chart-pie mr-1" />
                Detail Nasabah
              </h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body justify-content-center">
              {/* Conditionally render the content when formData is populated */}
              {formData && Object.keys(formData).length > 0 && (
                <>
                  <div className="modal-image d-flex justify-content-center">
                    {console.log(formData)}
                    <img src={formData.avatar} width="50" height="50" alt="Avatar" />
                  </div>
                  <form className="m-5">
                    <div className="form-group row">
                      <label className="col-sm-5 col-form-label">ID Nasabah</label>
                      <div className="col-sm-7">
                        <div type="text" className="mt-2  font-weight-bold">
                          {console.log(formData.user_id)}
                          : {formData.user_id}
                        </div>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-sm-5">Nama</label>
                      <div className="col-sm-7">
                        <div className=" font-weight-bold">{console.log(formData.nama)}: {formData.nama}</div>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label htmlFor="inputPassword" className="col-sm-5 col-form-label">
                        No HP / WA
                      </label>
                      <div className="col-sm-7">
                        <div className="mt-2 font-weight-bold">{console.log(formData.nomor_handphone)}: {formData.nomor_handphone}</div>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label htmlFor="inputPassword" className="col-sm-5 col-form-label">
                        Alamat Nasabah
                      </label>
                      <div className="col-sm-7">
                        <div className="font-weight-bold mt-2">{console.log(formData.alamat)}: {formData.alamat}</div>
                      </div>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
