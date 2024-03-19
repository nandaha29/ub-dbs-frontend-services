import React, { useEffect, useState, useRef } from "react";
import "jquery/dist/jquery.min.js";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "datatables.net-buttons/js/dataTables.buttons.js";
import "datatables.net-buttons/js/buttons.colVis.js";
import "datatables.net-buttons/js/buttons.flash.js";
import "datatables.net-buttons/js/buttons.html5.js";
import "datatables.net-buttons/js/buttons.print.js";
import $ from "jquery";
import "toastr/build/toastr.css";
import toastr from "toastr";

import axios from "axios";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useForm } from "react-hook-form";

const names = [
  {
    waktu_mendaftar: "10/11/2004",
    name_nasabah: "Harry Bobo",
    no_telp: "08123334902",
    address_nasabah: "Perumahan A",
  },
  {
    waktu_mendaftar: "07/10/2007",
    name_nasabah: "Harry Styles",
    no_telp: "082133442920",
    address_nasabah: "Perumahan B",
  },
  {
    waktu_mendaftar: "05/07/2009",
    name_nasabah: "Harry Harra",
    no_telp: "085155280972",
    address_nasabah: "Perumahan C",
  },
];

const TableBacklist = () => {
  const [dataNasabah, setDataNasabah] = useState([]);
  const [authUser, setAuthUser] = useState(null);
  const [token, setToken] = useState([]);
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
      const response = await axios.get("https://devel4-filkom.ub.ac.id/bank-sampah/user?status=2&isPagination=false", { headers });
      setDataNasabah(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getPermintaanID = async (ids) => {
    console.log(ids.id); //cek isi ids
    console.log(ids); //cek isi ids

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
    const headers = { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" };
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

  const handleDelete = (index) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this item?");
    if (isConfirmed) {
      const updatedDataNasabah = [...dataNasabah];
      updatedDataNasabah.splice(index, 1);
      setDataNasabah(updatedDataNasabah);
      toastr.success("Data berhasil dihapus!", "");
    }
  };

  // Function to format the date
  const formatDate = (dateObj) => {
    const { day, month, year } = dateObj;
    return `${day}/${month}/${year}`;
  };

  const showTable = () => {
    try {
      return dataNasabah.map((item, index) => {
        return (
          <tr key={index}>
            <td className="mt-1 text-center">{index + 1}</td>
            <td className="mt-1 text-center">{/* {item.waktu_mendaftar} */}?</td>
            <td className="mt-1 text-center">{item.nama}</td>
            <td className="mt-1 text-center">{item.nomor_handphone}</td>
            <td className="mt-1 text-center">{item.alamat}</td>
            <td className="d-flex justify-content-center">
              <button className="btn btn-success btn-sm mt-1 mx-2" data-toggle="modal" data-target="#modal_return_whitelist">
                Kembalikan Ke Whitelist
              </button>
              <button className="btn btn-danger btn-sm mt-1 mx-2" data-toggle="modal" data-target="#modal_hapus_akun" onClick={() => handleDelete(index)}>
                Hapus akun
              </button>
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
        setAuthUser(null);
      }
    });

    // setDataNasabah(names);
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

  return (
    <>
      <div className="container-fluid">
        <div className="table-responsive p-0 pb-2">
          <table id="table" className="table align-items-center justify-content-center mb-0 table-striped">
            <thead>
              <tr>
                <th className="text-uppercase  text-sm text-center">#</th>
                <th className="text-uppercase  text-sm text-center">Waktu Mendaftar</th>
                <th className="text-uppercase  text-sm text-center">Nama Nasabah</th>
                <th className="text-uppercase  text-sm text-center">No. Telepon</th>
                <th className="text-uppercase  text-sm text-center">Alamat</th>
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

export default TableBacklist;
