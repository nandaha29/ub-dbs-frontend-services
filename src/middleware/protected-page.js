import { Redirect } from "react-router-dom";

// Fungsi middleware untuk memeriksa apakah pengguna memiliki izin
const checkAuth = () => {
  // Contoh pengecekan sederhana, Anda dapat menyesuaikan dengan kebutuhan aplikasi Anda
  const isAuthenticated = true; // Misalnya, status otentikasi pengguna
  const userRole = "admin"; // Misalnya, peran pengguna

  // Lakukan pengecekan izin
  if (!isAuthenticated || userRole !== "admin") {
    // Jika pengguna tidak memiliki izin, arahkan ke halaman lain
    return <Redirect to="/unauthorized" />;
  }

  // Jika pengguna memiliki izin, lanjutkan tampilan komponen
  return null;
};

// Komponen yang dilindungi menggunakan middleware
const ProtectedPage = () => {
  // Memanggil middleware dalam useEffect
  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <div>
      <h1>Halaman Dilindungi</h1>
      <p>Hanya pengguna yang memiliki izin yang dapat mengakses halaman ini.</p>
    </div>
  );
};

export default ProtectedPage;
