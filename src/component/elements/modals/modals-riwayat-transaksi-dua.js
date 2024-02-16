import React from "react";

const RiwayatModalTransaksiDua = () => {
  return (
    <div className="modal fade" id="modal_detail_nasabah" data-backdrop="static" data-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="staticBackdropLabel">
              <i className="fas fa-chart-pie mr-1" />
              ID Penukaran XXXXXXXX
            </h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body justify-content-center">
            <div className="container-fluid">
              <div className="row" id="outer-container">
                <div>
                  <div className="font-weight-semibold ml-4">Profile Penukaran</div>
                  <div className="row">
                    <div className="col-md-8">
                      <div id="ini_left" className="ml-5 bg-grey mt-2 col-md-12">
                        <div className="row">
                          <div className="col-md-6">
                            <div className="text-black font-weight-bold">Nama Nasabah</div>
                            <div>Andi Budiono</div>
                          </div>
                          <div className="col-md-6">
                            <div className="text-black font-weight-bold">Waktu Request</div>
                            <div>2023-01-10 08:14</div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="text-black font-weight-bold">ID Nasabah</div>
                            <div>100104</div>
                          </div>
                          <div className="col-md-6">
                            <div className="text-black font-weight-bold">Petugas</div>
                            <div>Agung</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-5">
                      <div id="right" className="col-md-12">
                        <div className="text-black font-weight-bold mt-2 ml-4">Transaksi Selesai</div>
                        <div className="ml-4">2023-01-19 13:14</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-12 mt-4 full-width">
                  <table className=" table table-sm table-striped">
                    <thead className="text-center">
                      <tr className="">
                        <th className="">Jenis Sembako</th>
                        <th className="">Berat</th>
                        <th className="">Poin</th>
                        <th className="">Perolehan Poin</th>
                      </tr>
                    </thead>
                    <tbody className="text-center">
                      <tr>
                        <td>Kertas</td>
                        <td>1.5 kg</td>
                        <td>200/0,5 kg</td>
                        <td>+ 600</td>
                      </tr>
                      <tr>
                        <td>Kaca</td>
                        <td>1.5 kg</td>
                        <td>150/0,5 kg</td>
                        <td>+ 450</td>
                      </tr>
                      <tr>
                        <td>Plastik</td>
                        <td>1.5 kg</td>
                        <td>300/0,5 kg</td>
                        <td>+ 900</td>
                      </tr>
                      {/* Tambahkan data lainnya di sini */}
                    </tbody>
                  </table>
                  <div className="row text-right mt-4">
                    <div className="col-md-12 d-flex justify-content-end align-items-end">
                      <div className="text-right">total</div>
                      <div className="font-weight-bold text-right ml-2">2,375 Poin</div>
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

export default RiwayatModalTransaksiDua;
