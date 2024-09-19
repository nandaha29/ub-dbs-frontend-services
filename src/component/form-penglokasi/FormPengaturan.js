import React, { useState, useEffect } from "react";
import "jquery/dist/jquery.min.js";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "jszip/dist/jszip.min.js";

import "datatables.net-buttons/js/dataTables.buttons.min.js";
// import "datatables.net-buttons/js/buttons.flash.min.js";s
import "datatables.net-buttons/js/buttons.html5.min.js";
import "datatables.net-buttons/js/buttons.print.min.js";
import "datatables.net-buttons/js/buttons.colVis.min.js";

import "toastr/build/toastr.css";
import toastr from "toastr";
import axios from "axios";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import $ from "jquery";

const FormPengaturan = () => {
  const [dataState, setDataState] = useState([]);
  const [token, setToken] = useState([]);
  const [dataJadwal, setDataJadwal] = useState();
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [formData, setFormData] = useState({});
  const [lokasiData, setLokasiData] = useState({
    nama: "",
    alamat: "",
    url_map: "",
    jadwal: "",
    no_handphone: "",
  });

  const getLokasiPenukaran = async () => {
    const headers = { Authorization: `Bearer ${token}` };
    try {
      const response = await axios.get("https://cat-tif.ub.ac.id/bank-sampah/lokasi-penukaran/6", { headers });
      console.log(response.data);
      const { nama, alamat, url_map, jadwal, no_handphone } = response.data;
      setLokasiData({
        nama,
        alamat,
        url_map: url_map,
        jadwal: jadwal,
        no_handphone: no_handphone,
      });
      // console.log(lokasiData.jadwal);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleInputChange = (key, value) => {
    setLokasiData({ ...lokasiData, [key]: value });
  };

  const handleSimpan = async () => {
    const isConfirmed = window.confirm("Apakah anda yakin ingin merubah data ini?");
    if (isConfirmed) {
      const headers = { Authorization: `Bearer ${token}` };
      try {
        const response = await axios.put("https://cat-tif.ub.ac.id/bank-sampah/lokasi-penukaran/6", lokasiData, { headers });
        console.log("Data berhasil disimpan:", response.data);
        toastr.success("Data berhasil disimpan!", "Sukses");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } catch (error) {
        console.error("Error menyimpan data:", error);
        toastr.error("Terjadi kesalahan saat menyimpan data", "Error");
      }
    }
  };

  // const handlenumberlimit = (event) => {
  //   let inputValue = event.target.value;
  //   // Memastikan panjang input tidak melebihi 15 karakter
  //   if (inputValue.length <= 15) {
  //     setWhatsappNumber(inputValue);
  //   }
  // };

  // component didmount
  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setToken(user.accessToken);
        getLokasiPenukaran();
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
              {
                extend: "csv",
                className: "btn btn-dark bg-dark",
              },
              {
                extend: "print",
                customize: function (win) {
                  $(win.document.body).find("table").addClass("compact").css("font-size", "inherit");
                  // =======
                  //                   $(win.document.body).find("table").addClass("compact").css("font-size", "inherit");
                  // >>>>>>> master
                },
                className: "btn btn-secondary bg-secondary",
              },
            ],

            fnRowCallback: function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
              // =======
              //             fnRowCallback: function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
              // >>>>>>> master
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
  }, [formData]);

  return (
    <div class="col-12">
      <form>
        <div className="card-body">
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Nama Lokasi</label>
            <input type="text" className="form-control" id="exampleInputEmail1" placeholder="RW 5" value={lokasiData.nama} onChange={(e) => handleInputChange("nama", e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Link Google Maps</label>
            <input type="text" className="form-control" id="exampleInputPassword1" placeholder="isi Link Google Maps" value={lokasiData.url_map} onChange={(e) => handleInputChange("url_map", e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Alamat</label>
            <textarea class="form-control" rows="3" placeholder="Enter ..." value={lokasiData.alamat} onChange={(e) => handleInputChange("alamat", e.target.value)}></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">No. WhatsApp Admin</label>
            <input type="text" className="form-control" id="exampleInputPassword1" placeholder="No. WhatsApp Admin" value={lokasiData.no_handphone} onChange={(e) => handleInputChange("no_handphone", e.target.value)} />
          </div>
        </div>
        <div className="form-group">
          <button type="button" className="btn btn-primary float-right" onClick={handleSimpan}>
            Simpan
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormPengaturan;
