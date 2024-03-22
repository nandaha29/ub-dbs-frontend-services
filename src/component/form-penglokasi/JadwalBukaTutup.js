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
  const [token, setToken] = useState([]);
  const [formData, setFormData] = useState({});

  let Jadwal = [];
  const [dataJadwal, setDataJadwal] = useState();

  const getDataJadwal = async () => {
    const headers = { Authorization: `Bearer ${token}` };
    try {
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

  // const handleInputChange = (index, value) => {
  //   setDataState((prevState) => {
  //     const newData = [...prevState];
  //     newData[index].jamBuka = value;
  //     return newData;
  //   });
  // };
  const handleSave = () => {
    const isConfirmed = window.confirm(
      "Apakah anda yakin ingin merubah data ini?"
    );
    if (isConfirmed) {
      const formattedData = parsedData
        .map(({ hari, jamBuka }) => `<p>${hari} ${jamBuka}</p>`)
        .join("");
      console.log("Saved data:", formattedData);
      toastr.success("Data telah dirubah", "Berhasil!");
    }
  };

  // const parseData = (htmlData) => {
  //   const regex = /<p>(.*?)<\/p>/g;
  //   const matches = htmlData.matchAll(regex);
  //   const newData = Array.from(matches, (match) => {
  //     const [hari, jadwal] = match[1].split(" ");
  //     const [jamBuka, jamTutup] = jadwal
  //       .split(" | ")
  //       .map((time) => time.trim());
  //     return { hari, jamBuka, jamTutup };
  //   });
  //   setDataState(newData);
  // };

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
                  $(win.document.body).css("font-size", "10pt");
                  $(win.document.body)
                    .find("table")
                    .addClass("compact")
                    .css("font-size", "inherit");
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
            <th scope="col">Jam Buka | Jam Tutup</th>
          </tr>
        </thead>
        <tbody>
          {parsedData.map((item, index) => (
            <tr key={index}>
              <td>{item.hari}</td>
              <td>
                <input
                  className="border-0"
                  type="text"
                  value={`${item.jamBuka}`}
                  // onChange={(e) => handleInputChange(index, e.target.value)}
                />
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
