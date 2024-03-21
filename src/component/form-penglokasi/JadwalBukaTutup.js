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

const data = [
  { hari: "Senin", jamBuka: "08:00", jamTutup: "17:00" },
  { hari: "Selasa", jamBuka: "08:00", jamTutup: "17:00" },
  { hari: "Rabu", jamBuka: "08:00", jamTutup: "17:00" },
  { hari: "Kamis", jamBuka: "08:00", jamTutup: "17:00" },
  { hari: "Jumat", jamBuka: "08:00", jamTutup: "17:00" },
  { hari: "Sabtu", jamBuka: "08:00", jamTutup: "17:00" },
  { hari: "Minggu", jamBuka: "08:00", jamTutup: "17:00" },
];

const JadwalBukaTutup = () => {
  const [dataState, setDataState] = useState([...data]);
  const [dataNasabah, setDataNasabah] = useState([]);
  const [token, setToken] = useState([]);
  const [formData, setFormData] = useState({});

  let Jadwal = [];
  const [dataJadwal, setDataJadwal] = useState();

  const getDataJadwal = async () => {
    const headers = { Authorization: `Bearer ${token}` };
    try {
      const response = await axios.get("https://devel4-filkom.ub.ac.id/bank-sampah/lokasi-penukaran/6", { headers });
      setDataNasabah(response.data);
      setDataJadwal(response.data.jadwal);
      console.log(response.data);
      console.log(response.data.jadwal);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleInputChange = (index, field, value) => {
    setDataState((prevState) => {
      const newData = [...prevState];
      newData[index][field] = value;
      return newData;
    });
  };

  const handleSave = () => {
    const isConfirmed = window.confirm("Apakah anda yakin ingin merubah data ini?");
    if (isConfirmed) {
      console.log("Saved data:", dataState);
      toastr.success("Data telah dirubah", "Berhasil!");
    }
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
                  $(win.document.body).css("font-size", "10pt");
                  $(win.document.body).find("table").addClass("compact").css("font-size", "inherit");
                },
                className: "btn btn-secondary bg-secondary",
              },
            ],
            fnRowCallback: function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
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
    <>
      <div className="col-12">
        <table className="table table-striped border-0">
          <thead>
            <tr>
              <th scope="col">Hari</th>
              <th scope="col">Jam Buka</th>
              <th scope="col">Jam Tutup</th>
            </tr>
          </thead>
          <tbody>
            {dataState.map((item, index) => (
              <>
                {/* {const fulljadwal = item.jadwal} */}

                {(Jadwal = dataJadwal.split("</p>"))}
                {/* INI MASIH ERROR DI SPLIT = CARI SLICING TIAP TAG P */}

                {console.log(Jadwal)}
                <tr key={index}>
                  <td>{item.hari}</td>
                  <td>
                    <input className="border-0" type="text" value={item.jamBuka} onChange={(e) => handleInputChange(index, "jamBuka", e.target.value)} />
                  </td>
                  <td>
                    <input className="border-0" type="text" value={item.jamTutup} onChange={(e) => handleInputChange(index, "jamTutup", e.target.value)} />
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
        <button className="btn btn-primary float-right" onClick={handleSave}>
          Simpan
        </button>
      </div>
    </>
  );
};

export default JadwalBukaTutup;
