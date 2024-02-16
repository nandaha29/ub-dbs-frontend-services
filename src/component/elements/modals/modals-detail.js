import React from "react";

const LihatDataNasabahModal = ({ modalRef, formData }) => {
  return (
    <div className="modal fade" ref={modalRef} id="modal_liat_data_nasabah" data-backdrop="static" data-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
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
            <div className="modal-image d-flex justify-content-center">
              <img src={formData.avatar} width="50" height="50" alt="Avatar" />
            </div>
            <form className="m-5">
              <>
                <div className="form-group row">
                  <label className="col-sm-5 col-form-label">ID Nasabah</label>
                  <div className="col-sm-7">
                    <div type="text" className="mt-2  font-weight-bold">
                      : {formData.user_id}
                    </div>
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-sm-5">Nama</label>
                  <div className="col-sm-7">
                    <div className=" font-weight-bold">: {formData.nama}</div>
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="inputPassword" className="col-sm-5 col-form-label">
                    No HP / WA
                  </label>
                  <div className="col-sm-7">
                    <div className="mt-2 font-weight-bold">: {formData.nomor_handphone}</div>
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="inputPassword" className="col-sm-5 col-form-label">
                    Alamat Nasabah
                  </label>
                  <div className="col-sm-7">
                    <div className="font-weight-bold mt-2">: {formData.alamat}</div>
                  </div>
                </div>
              </>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LihatDataNasabahModal;
