import React, { useEffect, useState, useRef } from "react";
import $ from "jquery";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";

import axios from "axios";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useForm } from "react-hook-form";
import ButtonEdit from "./ButtonEdit";
import ButtonLihat from "./ButtonLihat";
import ButtonRiwayat from "./ButtonRiwayat";

const Sampah = [
  {
    id_nasabah: 222,
    name_nasabah: "Andi Lalapan",
    berat_nasabah: "Ditolak",
    poin_nasabah: 700,
    waktu_transaksi: "10/02/2023  |  12.00 PM",
  },
];

const TableDataNasabah = () => {
  const [authUser, setAuthUser] = useState(null);
  const [token, setToken] = useState([]);
  const [dataNasabah, setDataNasabah] = useState([]);
  const [formData, setFormData] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const modalRef = useRef(null);

  const form = useForm({
    defaultValues: {
      user_id: formData.user_id,
      nama: formData.nama,
      nomor_handphone: formData.nomor_handphone,
      avatar: formData.avatar,
      alamat: formData.alamat,
    },
  });

  const addForm = useForm({
    nama: "",
    nomor_handphone: 0,
    thumbnail: "",
    alamat: "",
    stok: 0,
  });

  const getDataNasabah = async () => {
    const headers = { Authorization: `Bearer ${token}` };
    try {
      // Ambil data nasabah dengan status 1
      const responseStatus1 = await axios.get("https://devel4-filkom.ub.ac.id/bank-sampah/user?status=1&isPagination=false", { headers });
      // Ambil data nasabah dengan status 0
      const responseStatus0 = await axios.get("https://devel4-filkom.ub.ac.id/bank-sampah/user?status=0&isPagination=false", { headers });

      // Gabungkan data dari kedua response menjadi satu array
      const combinedData = [...responseStatus1.data, ...responseStatus0.data];

      // Set data nasabah ke state
      setDataNasabah(combinedData);

      console.log(combinedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getPermintaanID = async (ids) => {
    // console.log(ids.id); //cek isi ids
    // console.log(ids); //cek isi ids

    const headers = { Authorization: `Bearer ${token}` };
    try {
      const response = await axios.get(
        `https://devel4-filkom.ub.ac.id/bank-sampah/user/${ids}/history`,
        {
          user_id: ids,
          nama: formData.nama,
          nomor_handphone: formData.nomor_handphone,
          // tgl_verifikasi: "?",
          alamat: formData.alamat,
          avatar: formData.avatar,
        },
        { headers }
      );
      setFormData(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDetailClick = async (id) => {
    try {
      await getPermintaanID(id);
      modalRef.current.open = true;
    } catch (error) {
      console.error("Error handling detail click:", error);
    }
  };

  const evidenceRef = useRef(null);
  const handleGambar = (e) => {
    const gambarmu = e.target.files?.[0];
    if (gambarmu) {
      const imageUrl = URL.createObjectURL(gambarmu);
      setSelectedImage(imageUrl);
    }
    form.setValue("thumbnail", gambarmu);
  };

  const handleUpdate = async (formData) => {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    };
    try {
      const formDataWithFile = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        if (key !== "avatar" && key !== "user_id") {
          formDataWithFile.append(key, value);
        }
      });
      if (formData.thumbnail) {
        formDataWithFile.append("avatar", formData.avatar);
      }
      for (var pair of formDataWithFile.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }
      const response = await axios.put(`https://devel4-filkom.ub.ac.id/bank-sampah/user/${formData.user_id}`, formDataWithFile, { headers });
      if (response.status === 200) {
        alert("Berhasil mengubah isi ");
      } else {
        alert("Gagal mengubah isi ");
      }
      console.log(response);
      form.reset();
      window.location.reload();
    } catch (error) {
      console.error("Error program:", error);
    }
  };

  // Function to format the date
  const formatDate = (dateObj) => {
    const { day, month, year } = dateObj;
    return `${day}/${month}/${year}`;
  };

  const showTable = () => {
    try {
      return dataNasabah.map((item) => {
        return (
          <tr key={item.user_id}>
            <td className="mt-1 mx-2 text-center">{item.user_id}</td>
            <td className="mt-1 mx-2 text-center">{item.nama}</td>
            <td className="text-center justify-content-center flex">{item.nomor_handphone}</td>
            <td className="mt-1 mx-2 text-center">{item.alamat}</td>
            {/* <td className="mt-1 mx-2 text-center">{item.status}</td> */}
            <td className="d-flex justify-content-center">
              <ButtonLihat id={item.user_id} />
              <ButtonRiwayat id={item.user_id} />
              <ButtonEdit id={item.user_id} />
            </td>
          </tr>
        );
      });
    } catch (e) {
      alert(e.message);
    }
  };

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
        setToken(user.accessToken);
        // console.log(tes);
        getDataNasabah();
      } else {
        window.location = "/login";
        setAuthUser(null);
      }
    });

    // Set nilai-nilai form berdasarkan data formData
    form.setValue("user_id", formData.user_id);
    form.setValue("nama", formData.nama);
    form.setValue("nomor_handphone", formData.nomor_handphone);
    // form.setValue("tanggal", formData.img_url);
    form.setValue("alamat", formData.alamat);
    setSelectedImage(formData.avatar);

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
              // var index = iDisplayIndexFull + 1;
              // $("td:first", nRow).html(index);
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
      <div className="container-fluid">
        <div className="table-responsive p-0 pb-2">
          <table id="table" className="table align-items-center justify-content-center mb-0 table-striped">
            <thead>
              <tr>
                <th className="text-uppercase  text-sm text-center col-sm-1">ID Nasabah</th>
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

        {/* MODAL A☺PALAGI */}
      </div>
    </>
  );
};

export default TableDataNasabah;
