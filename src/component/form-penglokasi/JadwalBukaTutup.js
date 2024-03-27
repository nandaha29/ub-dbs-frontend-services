import React, { useState, useEffect } from "react";
import "jquery/dist/jquery.min.js";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "toastr/build/toastr.css";
import toastr from "toastr";
import axios from "axios";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import $ from "jquery";

const JadwalBukaTutup = () => {
  const [dataNasabah, setDataNasabah] = useState([]);
  const [dataState, setDataState] = useState([]);
  const [token, setToken] = useState([]);
  const [formData, setFormData] = useState({});

  let Jadwal = [];
  const [dataJadwal, setDataJadwal] = useState();

  const getDataJadwal = async () => {
    const headers = { Authorization: `Bearer ${token}` };
    try {
      // <<<<<<< Dymi
      const response = await axios.get(
        "https://devel4-filkom.ub.ac.id/bank-sampah/lokasi-penukaran/6",
        { headers }
      );
      setDataNasabah(response.data);
      setDataJadwal(response.data.jadwal);
      dataJadwal(response.data.jadwal);

      console.log(response.data);
      console.log(response.data.jadwal);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    // <<<<<<< Dymi
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
  console.log(parsedData);

  const handleSave = () => {
    const isConfirmed = window.confirm(
      "Apakah anda yakin ingin merubah data ini?"
    );
    if (isConfirmed) {
      const newData = parsedData.map((item, index) => {
        // const inputValue = document.getElementById(`jamBuka-${index}`).value;
        const inputElement = document.getElementById(`jamBuka-${index}`);
        const inputValue = inputElement.value.trim(); // Trim whitespace

        // Jika input kosong, gunakan nilai lama
        const jamBuka = inputValue ? inputValue : item.jamBuka;

        // Update input value with the processed value (useful for consistency)
        inputElement.value = jamBuka;

        return { ...item, jamBuka };
      });

      const formattedData = newData
        .map(({ hari, jamBuka }) => `<p>${hari} ${jamBuka}</p>`)
        .join("");

      console.log("Saved data:", formattedData);
      toastr.success("Data berhasil disimpan!", "Sukses");

      parsedData.forEach((item, index) => {
        document.getElementById(`jamBuka-${index}`).value = "";
      });
    }
  };

  // const handleSave = () => {
  //   const isConfirmed = window.confirm(
  //     "Apakah anda yakin ingin merubah data ini?"
  //   );
  //   if (isConfirmed) {
  //     const formattedData = parsedData
  //       .map(({ hari, jamBuka }) => `<p>${hari} ${jamBuka}</p>`)
  //       .join("");
  //     console.log("Saved data:", formattedData);
  //     // =======
  //   }
  // };

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
                  $(win.document.body)
                    .find("table")
                    .addClass("compact")
                    .css("font-size", "inherit");
                  // =======
                  //                   $(win.document.body).find("table").addClass("compact").css("font-size", "inherit");
                  // >>>>>>> master
                },
                className: "btn btn-secondary bg-secondary",
              },
            ],

            fnRowCallback: function (
              nRow,
              aData,
              iDisplayIndex,
              iDisplayIndexFull
            ) {
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
    <div className="col-12">
      <table className="table table-striped border-0">
        <thead>
          <tr>
            <th scope="col">Hari</th>
            <th scope="col">Jam Buka | Jam Tutup Baru</th>
            <th scope="col">Jam Buka | Jam Tutup Lama</th>
          </tr>
        </thead>
        <tbody>
          {parsedData.map((item, index) => (
            <tr key={index}>
              <td>{item.hari}</td>
              <td>
                <input
                  id={`jamBuka-${index}`} // Add id attribute
                  className="border-1"
                  type="text"
                  placeholder="hh:mm-hh.mm"
                />
              </td>
              {/* <td>
                <input
                  id={`jamBuka-${index}`} // Add id attribute
                  className="border-1"
                  type="text"
                  placeholder={`${item.jamBuka}`}
                />
              </td> */}
              <td>
                <div className="border-0" type="text">{`${item.jamBuka}`}</div>
              </td>
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
