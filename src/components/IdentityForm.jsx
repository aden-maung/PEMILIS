import { useState } from 'react';
import { ekstrakurikulerOptions, kelasOptions, jabatanOptions } from '../data/candidates';

const IdentityForm = ({ onProceed }) => {
  const [fullname, setFullname] = useState('');
  const [role, setRole] = useState('');
  const [ekskul, setEkskul] = useState('');
  const [kelas, setKelas] = useState('');
  const [jabatan, setJabatan] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!fullname || !role) {
      alert('Nama lengkap dan kategori wajib diisi.');
      return;
    }

    if (role === 'ekskul' && !ekskul) {
      alert('Mohon pilih Ekstrakurikuler Anda.');
      return;
    }

    if (role === 'perwakilan_kelas' && (!kelas || !jabatan)) {
      alert('Mohon pilih Kelas dan Jabatan Kelas Anda.');
      return;
    }

    const userData = {
      fullname,
      role,
      ekskul: role === 'ekskul' ? ekskul : '',
      jabatanKelas: role === 'perwakilan_kelas' ? `${kelas} - ${jabatan}` : ''
    };

    onProceed(userData);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nama Lengkap:</label>
          <input
            type="text"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            placeholder="Masukkan nama lengkap"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Pilih Role:</label>
          <select
            value={role}
            onChange={(e) => {
              setRole(e.target.value);
              setEkskul('');
              setKelas('');
              setJabatan('');
            }}
            className="form-input"
          >
            <option value="" disabled>-- Pilih Kategori Anda --</option>
            <option value="guru">Guru</option>
            <option value="ekskul">Ketua Ekstrakurikuler</option>
            <option value="anggota_mpk">Anggota MPK</option>
            <option value="anggota_osis">Anggota OSIS</option>
            <option value="perwakilan_kelas">Perwakilan Kelas</option>
          </select>
        </div>

        {role === 'ekskul' && (
          <div className="form-group">
            <label>Pilih Ekstrakurikuler:</label>
            <select
              value={ekskul}
              onChange={(e) => setEkskul(e.target.value)}
              className="form-input"
            >
              <option value="">-- Pilih --</option>
              {ekstrakurikulerOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        )}

        {role === 'perwakilan_kelas' && (
          <>
            <div className="form-group">
              <label>Pilih Kelas:</label>
              <select
                value={kelas}
                onChange={(e) => setKelas(e.target.value)}
                className="form-input"
              >
                <option value="">-- Pilih Kelas --</option>
                {kelasOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Jabatan dalam kelas:</label>
              <select
                value={jabatan}
                onChange={(e) => setJabatan(e.target.value)}
                className="form-input"
              >
                <option value="">-- Pilih Jabatan --</option>
                {jabatanOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          </>
        )}

        <button type="submit" className="btn btn-primary">
          Lanjut
        </button>
      </form>
    </div>
  );
};

export default IdentityForm;
