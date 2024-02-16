import React, { useState } from "react";

const EditNasabahModal = ({ modalRef, formData, selectedImage, handleGambar }) => {
  const [activeButtonEdit, setActiveButtonEdit] = useState("Info Nasabah");

  const handleButtonClickonEdit = (buttonName) => {
    setActiveButtonEdit(buttonName);
    // Tambah logika lain jika diperlukan
  };

  return (
    <div className="modal fade" ref={modalRef} id="modal_edit_nasabah" data-backdrop="static" data-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="staticBackdropLabel">
              <i className="fas fa-chart-pie mr-1" />
              Edit Data Nasabah
            </h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body justify-content-center">
            <div className="container-fluid">
              <div className="row" id="outer-container">
                {/* PROFIL */}
                <div className="col-md-5" id="">
                  <div className="text-center">
                    <div className="">{selectedImage && <img src={selectedImage} alt="Preview" style={{ width: "50%" }} />}</div>
                    <input type="file" ref={evidenceRef} className="w-full input-bordered pt-2" accept="image/*" onChange={handleGambar} />
                  </div>
                  <form className="m-5">
                    <div className="form-group row ">
                      <label className="col-sm-5 col-form-label">ID Nasabah</label>
                      <div className="col-sm-7 ">
                        <div type="text" className="mt-2  font-weight-bold">
                          : {formData.user_id}
                        </div>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-sm-5">Nama</label>
                      <div className="col-sm-7">
                        <div className=" font-weight-bold">: nama</div>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label htmlFor="inputPassword" className="col-sm-5 col-form-label">
                        No HP / WA
                      </label>
                      <div className="col-sm-7">
                        <div className="mt-2 font-weight-bold">: 09</div>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label htmlFor="inputPassword" className="col-sm-5 col-form-label">
                        Alamat Nasabah
                      </label>
                      <div className="col-sm-7">
                        <div className="font-weight-bold mt-2">: jalan</div>
                      </div>
                    </div>
                  </form>
                </div>
                {/* info dkk */}
                <div className="col-md-7 custom-border">
                  <div className="btn-group ml-3">
                    <button className="btn-primary" onClick={() => handleButtonClickonEdit("Info Nasabah")}>
                      Info Nasabah
                    </button>
                    <button className="btn-primary" onClick={() => handleButtonClickonEdit("Ubah Password")}>
                      Ubah Password
                    </button>
                    <button className="btn-primary" onClick={() => handleButtonClickonEdit("Hapus Akun")}>
                      Hapus Akun
                    </button>
                  </div>
                  <div className="col-md-12 mt-4 full-width">
                    <div className="">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="namaNasabah">Nama Nasabah</label>
                            <input type="text" className="form-control" id="namaNasabah" placeholder="Nama" />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="noHpWa">No HP/WA</label>
                            <input type="text" className="form-control" id="noHpWa" placeholder="Nomor HP" />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                            <label htmlFor="alamat">Alamat</label>
                            <input type="text" className="form-control" id="alamat" placeholder="Alamat" />
                          </div>
                        </div>
                        <div className="modal-footer float-sm-right">
                          <button type="button" className="btn btn-primary " data-dismiss="modal">
                            Simpan
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditNasabahModal;
