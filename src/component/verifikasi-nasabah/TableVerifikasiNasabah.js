import React, { useEffect, useState } from "react";
import $ from "jquery";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "toastr/build/toastr.css";
import toastr from "toastr";
import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../config/firebase";

const TableVerifikasiNasabah = () => {
  const [dataNasabah, setDataNasabah] = useState([]);
  const [token, setToken] = useState([]);
  const [authUser, setAuthUser] = useState(null);

  const getDataPerluVerifikasiNasabah = async () => {
    const headers = { Authorization: `Bearer ${token}` };
    try {
      const response = await axios.get("https://devel4-filkom.ub.ac.id/bank-sampah/user?status=0&isPagination=false", { headers });
      setDataNasabah(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleAgree = async (index) => {
    const isConfirmed = window.confirm("Apakah anda yakin ingin memverifikasi akun ini?");
    // console.log(index);

    if (isConfirmed) {
      try {
        const headers = { Authorization: `Bearer ${token}` };
        await axios.put(
          `https://devel4-filkom.ub.ac.id/bank-sampah/user/${[index.user_id]}`,
          {
            status: 1,
            nama: index.nama,
            // nomor_handphone: index.nomor_handphone,
            alamat: index.alamat,
            saldo: index.saldo,
          },
          { headers }
        );

        // Setelah permintaan berhasil, perbarui data dengan meminta data baru dari URL yang telah diperbarui
        // const response = await axios.get("https://devel4-filkom.ub.ac.id/bank-sampah/user?status=1&isPagination=false", { headers });
        // setDataNasabah(response.data);

        toastr.success("Data telah berhasil diverifikasi", "Verifikasi Nasabah");
        window.location.reload();
      } catch (error) {
        console.error("Error handling detail click:", error);
      }
    }
  };

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
        setToken(user.accessToken);
        getDataPerluVerifikasiNasabah();
      } else {
        window.location = "/login";
        setAuthUser(null);
      }
    });

    if (!$.fn.DataTable.isDataTable("#myTable")) {
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
  }, []);

  const showTable = () => {
    try {
      return dataNasabah.map((item, index) => {
        if (item.status !== 1) {
          // Hanya menampilkan nasabah dengan status belum disetujui
          return (
            <tr key={index}>
              <td className="mt-1 text-center">{index + 1}</td>
              <td className="mt-1 text-center">{/* {item.waktu_mendaftar} */}?</td>
              <td className="mt-1 text-center">{item.nama}</td>
              <td className="mt-1 text-center">{item.nomor_handphone}</td>
              <td className="mt-1 text-center">{item.alamat}</td>
              {/* <td className="mt-1 mx-2 text-center">{item.status}</td> */}
              <td className="d-flex justify-content-center">
                <button className="btn btn-primary btn-sm mt-1 mx-2" onClick={() => handleAgree(item)}>
                  Setujui
                </button>
              </td>
            </tr>
          );
        } else {
          return null; // Jika nasabah sudah disetujui, tidak ditampilkan di tabel
        }
      });
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="table-responsive p-0 pb-2">
          <table id="table" className="table align-items-center justify-content-center mb-0 table-striped">
            <thead>
              <tr>
                +<th className="text-uppercase  text-sm text-center">#</th>
                <th className="text-uppercase  text-sm text-center">Waktu Mendaftar</th>
                <th className="text-uppercase  text-sm text-center">Nama Nasabah</th>
                <th className="text-uppercase  text-sm text-center">No. Telepon</th>
                <th className="text-uppercase  text-sm text-center">Alamat</th>
                {/* <th className="text-uppercase  text-sm text-center">TEMP; STATUS</th> */}
                <th className="text-uppercase  text-sm text-center">Action</th>
              </tr>
            </thead>

            <tbody>{showTable()}</tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default TableVerifikasiNasabah;
