import React, { useState, useEffect } from "react";
import "./index.css";
import { toast, ToastContainer } from "react-toastify";
import Navbar from "../../components/Navbar";

function Home() {
  // Mengambil data Provinsi
  const [listProvinsi, setListProvinsi] = useState([]);
  useEffect(() => {
    const getProvinsi = async () => {
      const resProvinsi = await fetch(
        "http://www.emsifa.com/api-wilayah-indonesia/api/provinces.json"
      );
      const resPro = await resProvinsi.json();
      setListProvinsi(await resPro);
    };
    getProvinsi();
  }, []);
  // Memasukan Form
  const [form, setForm] = useState({
    nama: "",
    nik: "",
    nkk: "",
    ktp: "",
    kk: "",
    kelamin: "",
    umur: "",
    provinsi: "",
    kecamatan: "",
    kelurahan: "",
    alamat: "",
    rt: "",
    rw: "",
    gajiSebelumPandemi: "",
    gajiSetelahPandemi: "",
    alasan: "",
  });
  const [checkbox, setCheckbox] = useState(false);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // validasi jika form salah satu tidak terisi
    for (const i in form) {
      if (form[i] === "" && checkbox === false) {
        alert("Isikan Data Dengan Benar");
        return;
      }
    }
    console.log(form);
    toast.success("Success Input", {
      theme: "colored",
    });
    setTimeout(() => {
      localStorage.setItem("formCovid", JSON.stringify(form));
    }, 1500);
  };

  // Menampilakn data
  const [data, setData] = useState([]);
  const getData = () => {
    const allData = JSON.parse(localStorage.getItem("formCovid"));
    allData ? setData(allData) : setData([]);
  };
  useEffect(() => {
    getData();
  }, []);
  console.log(data);
  console.log(checkbox);

  return (
    <>
      <Navbar></Navbar>
      <main>
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-10">
            <h3>Form Data Covid-19</h3>
            <div className="form-data">
              <div className="content">
                <ToastContainer />
                <form className="row g-3" onSubmit={handleSubmit}>
                  <div className="col-md-6">
                    <label for="nama-lengkap" className="form-label">
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="nama"
                      placeholder="Masukan Nama Lengkap"
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <div className="col-md-6">
                    <label for="NIK" className="form-label">
                      NIK
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      name="nik"
                      placeholder="Masukan NIK"
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <div className="col-md-6">
                    <label for="inputEmail4" className="form-label">
                      Nomor Kartu Keluarga
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      name="nkk"
                      placeholder="Masukan Nomor Kartu Keluarga"
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <div className="col-md-6">
                    <label for="foto-ktp" className="form-label">
                      Foto KTP
                    </label>
                    <input
                      type="file"
                      name="ktp"
                      className="form-control"
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <div className="col-md-6">
                    <label for="kartu-keluarga" className="form-label">
                      Foto Kartu Keluarga
                    </label>
                    <input
                      type="file"
                      name="kk"
                      className="form-control"
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <div className="col-md-6">
                    <label for="inputPassword4" className="form-label">
                      Jenis Kelamin
                    </label>
                    <select
                      class="form-select"
                      aria-label="Default select example"
                      name="kelamin"
                      onChange={(e) => handleChange(e)}
                      value={form.kelamin}
                    >
                      <option selected>Pilih Salah Satu</option>
                      <option value="laki">Laki-Laki</option>
                      <option value="perempuan">Perempuan</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label for="umur" className="form-label">
                      Umur
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      name="umur"
                      placeholder="Masukan Umur"
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <div className="col-md-6">
                    <label for="provinsi" className="form-label">
                      Provinsi
                    </label>
                    <select
                      class="form-select"
                      aria-label="Default select example"
                      name="provinsi"
                      onChange={(e) => handleChange(e)}
                      value={form.provinsi}
                    >
                      <option selected>Pilih Provinsi</option>
                      {listProvinsi.map((getPro, index) => (
                        <option key={index} value={getPro.name}>
                          {getPro.name}{" "}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label for="Kecamatan" className="form-label">
                      Kecamatan
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="kecamatan"
                      placeholder="Masukan Kecamatan Daerah"
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <div className="col-md-6">
                    <label for="Kelurahan" className="form-label">
                      Kelurahan/Desa
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="kelurahan"
                      placeholder="Masukan Kelurahan Daerah"
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <div className="col-md-6">
                    <label for="alamat" className="form-label">
                      Alamat
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="alamat"
                      placeholder="Masukan Alamat Daerah"
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <div className="col-md-6">
                    <label for="provinsi" className="form-label">
                      RT
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      name="rt"
                      placeholder="Masukan Nomor RT"
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <div className="col-md-6">
                    <label for="provinsi" className="form-label">
                      RW
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      name="rw"
                      placeholder="Masukan Nomor RW"
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <div className="col-md-6">
                    <label for="Kelurahan" className="form-label">
                      Gaji Sebelum Pandemi
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      name="gajiSebelumPandemi"
                      placeholder="Masukan Gaji"
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <div className="col-md-6">
                    <label for="Kelurahan" className="form-label">
                      Gaji Setelah Pandemi
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      name="gajiSetelahPandemi"
                      placeholder="Masukan Gaji"
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <div className="col-md-6">
                    <label for="Kelurahan" className="form-label">
                      Alasan membutuhkan bantuan
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="alasan"
                      placeholder="Masukan Alasan"
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <div className="col-md-12">
                    <input
                      type="checkbox"
                      id="agree"
                      onChange={(e) => setCheckbox(!checkbox)}
                    />
                    <label htmlFor="agree">
                      {" "}
                      I agree to <b>terms and conditions</b>
                    </label>
                  </div>
                  <div className="col-md-12">
                    <button
                      type="submit"
                      className="submit-button btn btn-primary"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <br></br>
            <div className="view-data">
              <h3>Tampilan Data Covid-19</h3>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Nama Lengkap</th>
                    <th scope="col">NIK</th>
                    <th scope="col">Nomor Kartu Keluarga</th>
                    <th scope="col">Foto KTP</th>
                    <th scope="col">Foto Kartu Keluarga</th>
                    <th scope="col">Jenis Kelamin</th>
                    <th scope="col">Umur</th>
                    <th scope="col">Provinsi</th>
                    <th scope="col">Kecamatan</th>
                    <th scope="col">Kelurahan</th>
                    <th scope="col">Alamat</th>
                    <th scope="col">RT</th>
                    <th scope="col">RW</th>
                    <th scope="col">Gaji Sebelum Pandemi</th>
                    <th scope="col">Gaji Setelah Pandemi</th>
                    <th scope="col">Alasan</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {/* Seharusnya menggunakan Map tapi karena localStorage hanya menyimpan 1 data jadinya tidak memakai map */}
                    <td>{data.nama}</td>
                    <td>{data.nik}</td>
                    <td>{data.nkk}</td>
                    <td>{data.ktp}</td>
                    <td>{data.kk}</td>
                    <td>{data.kelamin}</td>
                    <td>{data.umur}</td>
                    <td>{data.provinsi}</td>
                    <td>{data.kecamatan}</td>
                    <td>{data.kelurahan}</td>
                    <td>{data.alamat}</td>
                    <td>{data.rt}</td>
                    <td>{data.rw}</td>
                    <td>{data.gajiSebelumPandemi}</td>
                    <td>{data.gajiSetelahPandemi}</td>
                    <td>{data.alasan}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-md-1"></div>
        </div>
      </main>
    </>
  );
}

export default Home;
