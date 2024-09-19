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

const JadwalBukaTutup = () => {
  const [dataState, setDataState] = useState([]);
  const [token, setToken] = useState([]);
  const [lokasiData, setLokasiData] = useState({
    nama: "",
    alamat: "",
    url_map: "",
    no_handphone: "",
  });

  let Jadwal = [];
  const [dataJadwal, setDataJadwal] = useState();

  const getDataJadwal = async () => {
    const headers = { Authorization: `Bearer ${token}` };

    try {
      const response = await axios.get("https://cat-tif.ub.ac.id/bank-sampah/lokasi-penukaran/6", { headers });

      const { nama, alamat, url_map, no_handphone } = response.data;
      setLokasiData({ nama, alamat, url_map: url_map, no_handphone });
      setDataJadwal(response.data.jadwal);

      // console.log("URL Map from state:", lokasiData.url_map);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    // <<<<<<< Dymi
  };

  const setnewDataJadwal = async (formattedData) => {
    const headers = { Authorization: `Bearer ${token}` };
    const mergedData = { ...lokasiData, jadwal: formattedData };
    console.log(lokasiData.nama, lokasiData.alamat, lokasiData.url_map, formattedData);
    try {
      const response = await axios.put("https://cat-tif.ub.ac.id/bank-sampah/lokasi-penukaran/6?jadwal", mergedData, { headers });
      console.log("Data jadwal berhasil diset:", response.data);
      toastr.success("Data jadwal berhasil disimpan!", "Sukses");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error("Error saat menyimpan data jadwal:", error);
      console.log(formattedData);
      toastr.error("Terjadi kesalahan saat menyimpan data jadwal", "Error");
    }
  };

  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = dataJadwal;
  const paragraphs = tempDiv.querySelectorAll("p");
  const parsedData = [];

  // Loop melalui setiap elemen paragraf dan lakukan parsing
  paragraphs.forEach((paragraph) => {
    // Ambil teks dari paragraf
    const text = paragraph.textContent;

    // Ekstrak hari dan jadwal menggunakan regex
    const [, hari, jadwal] = text.match(/(\w+)\s(.+)/);

    // Tambahkan data yang sudah diparsing ke dalam array
    parsedData.push({ hari, jamBuka: jadwal });
  });
  // console.log("PPP", parsedData);

  const handleSave = () => {
    const isConfirmed = window.confirm("Apakah anda yakin ingin merubah data ini?");
    if (isConfirmed) {
      const newData = parsedData.map((item, index) => {
        const inputElement = document.getElementById(`jamBuka-${index}`);
        const inputValue = inputElement.value.trim();
        const jamBuka = inputValue ? inputValue : item.jamBuka;
        inputElement.value = jamBuka;
        return { ...item, jamBuka };
      });

      const formattedData = newData.map(({ hari, jamBuka }) => `<p>${hari} ${jamBuka}</p>`).join(""); // Menggunakan newline sebagai pemisah

      console.log(formattedData);
      setnewDataJadwal(formattedData);

      newData.forEach((item, index) => {
        document.getElementById(`jamBuka-${index}`).value = "";
      });
    }
  };

  const handleInputChange = (index, field, value) => {
    setDataState((prevState) => {
      const newData = [...prevState];
      newData[index][field] = value;
      return newData;
    });
  };

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setToken(user.accessToken);
        getDataJadwal();
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
  });

  return (
    <div className="col-12">
      <table className="table table-striped border-0">
        <thead>
          <tr>
            <th scope="col">Hari</th>
            <th scope="col">Jam Buka | Jam Tutup Baru</th>
            {/* <th scope="col">Jam Buka | Jam Tutup Lama</th> */}
          </tr>
        </thead>
        <tbody>
          {parsedData.map((item, index) => (
            <tr key={index}>
              <td>{item.hari}</td>
              {/* <td>
                <input
                  id={`jamBuka-${index}`} // Add id attribute
                  className="border-1"
                  type="text"
                  placeholder="hh:mm-hh.mm"
                />
              </td> */}
              <td>
                <input
                  id={`jamBuka-${index}`} // Add id attribute
                  className="border-1"
                  type="text"
                  placeholder={`${item.jamBuka}`}
                />
              </td>
              {/* <td>
                <div className="border-0" type="text">{`${item.jamBuka}`}</div>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn btn-primary float-right" onClick={handleSave}>
        Simpan
      </button>
    </div>
  );
};

export default JadwalBukaTutup;
