import React from "react";

const RiwayatTransaksiModalSatu = () => {
  return (
    <div className="modal fade" id="modal_detail_nasabah" data-backdrop="static" data-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="staticBackdropLabel">
              Riwayat Transaksi Nasabah
            </h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body justify-content-center">
            <div className="container-fluid">
              <div className="row">
                {/* PROFILE */}
                <div className="mt-5 col-md-3">
                  <div className="text-center">
                    <img src="dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" />
                  </div>
                  <form className="m-5">
                    <div className="form-group row ">
                      <label className="col-sm-5 col-form-label">ID Nasabah</label>
                      <div className="col-sm-7 ">
                        <div type="text" className="mt-2  font-weight-bold">
                          : 100104
                        </div>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-sm-5">Nama</label>
                      <div className="col-sm-7">
                        <div className=" font-weight-bold">: Harry Styles</div>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label htmlFor="inputPassword" className="col-sm-5 col-form-label">
                        No HP / WA
                      </label>
                      <div className="col-sm-7">
                        <div className="mt-2 font-weight-bold">: 085155280972</div>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label htmlFor="inputPassword" className="col-sm-5 col-form-label">
                        Verifikator
                      </label>
                      <div className="col-sm-7">
                        <div className="mt-2 font-weight-bold">: Mimi Kapaldi</div>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label htmlFor="inputPassword" className="col-sm-5 col-form-label">
                        Alamat Nasabah
                      </label>
                      <div className="col-sm-7">
                        <div className=" font-weight-bold mt-2">: Di kota Malang dekat UB</div>
                      </div>
                    </div>
                  </form>
                </div>
                {/* BUTTONS */}
                <div className="col-md-9 mt-5">
                  <div className="btn-group ml-3">
                    <button
                      className="btn-primary"
                      // onClick={() => this.handleButtonClick("Semua")}
                    >
                      Semua
                    </button>
                    <button
                      className="btn-primary"
                      // onClick={() => this.handleButtonClick("Sampah")}
                    >
                      Sampah
                    </button>
                    <button
                      className="btn-primary"
                      // onClick={() => this.handleButtonClick("Sembako")}
                    >
                      Sembako
                    </button>
                  </div>
                  {/* TABLE */}
                  <div className="mt-4 text-sm">
                    <table className=" table table-xl table-bordered">
                      <thead className="text-center">
                        <tr className="">
                          <th className="">ID Order</th>
                          <th className="">Waktu</th>
                          <th className="">Petugas</th>
                          <th className="">Tipe Transaksi</th>
                          <th className="">Poin</th>
                          <th className="">Keterangan</th>
                        </tr>
                      </thead>
                      <tbody className="text-center">
                        <tr>
                          <td>id</td>
                          <td>tgl sembako</td>
                          <td>petugas</td>
                          <td>
                            <button className="btn btn-warning">transaksi</button>
                          </td>
                          <td>poin</td>
                          <td>
                            <button className="btn btn-primary" data-toggle="modal" data-target="#modal_detail_nasabah">
                              Detail
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table className="table table-xl table-bordered ">
                      <thead className="text-center">
                        <tr className="">
                          <th className="">ID Order</th>
                          <th className="">Waktu</th>
                          <th className="">Petugas</th>
                          <th className="">Tipe Transaksi</th>
                          <th className="">Poin</th>
                          <th className="">Keterangan</th>
                        </tr>
                      </thead>
                      <tbody className="text-center">
                        <tr>
                          <td>id_sembako</td>
                          <td>tanggal_sembako</td>
                          <td>petugas</td>
                          <td>
                            <button className="btn btn-warning">transaksi</button>
                          </td>
                          <td>poin</td>
                          <td>
                            <button className="btn btn-primary" data-toggle="modal" data-target="#modal_detail_nasabah">
                              Detail
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table className="table table-xl table-bordered">
                      <thead className="text-center">
                        <tr className="">
                          <th className="">ID Order</th>
                          <th className="">Waktu</th>
                          <th className="">Petugas</th>
                          <th className="">Tipe Transaksi</th>
                          <th className="">Poin</th>
                          <th className="">Keterangan</th>
                        </tr>
                      </thead>
                      <tbody className="text-center">
                        <tr>
                          <td>id_sembako</td>
                          <td>tanggal_sembako</td>
                          <td>petugas</td>
                          <td>
                            <button className="btn btn-success">transaksi</button>
                          </td>
                          <td>poin</td>
                          <td>
                            <button className="btn btn-primary" data-toggle="modal" data-target="#modal_detail_nasabah">
                              Detail
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
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

export default RiwayatTransaksiModalSatu;
