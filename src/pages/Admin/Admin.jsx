import React, { useState } from 'react';
import './Admin.css';

const Admin = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    specialization: '',
    phone: '',
    status: 'Aktif'
  });
  const [doctors, setDoctors] = useState([
    {
      id: 1,
      name: 'dr. Doni.Sp.PD',
      specialization: 'Penyakit Dalam',
      phone: '0812332211',
      status: 'Aktif',
      joinedDate: '2023-01-15'
    },
    {
      id: 2,
      name: 'dr. Shinta.Sp.PD',
      specialization: 'Penyakit Dalam',
      phone: '0812332212',
      status: 'Aktif',
      joinedDate: '2023-02-20'
    },
    {
      id: 3,
      name: 'dr. Jhon.Sp.PD',
      specialization: 'Penyakit Dalam',
      phone: '0812332213',
      status: 'Pending',
      joinedDate: '2024-07-10'
    },
    {
      id: 4,
      name: 'dr. Sarah.Sp.OG',
      specialization: 'Kebidanan & Kandungan',
      phone: '0812332214',
      status: 'Aktif',
      joinedDate: '2023-03-15'
    },
    {
      id: 5,
      name: 'dr. Ahmad.Sp.JP',
      specialization: 'Jantung & Pembuluh Darah',
      phone: '0812332215',
      status: 'Aktif',
      joinedDate: '2023-04-10'
    },
    {
      id: 6,
      name: 'dr. Maya.Sp.A',
      specialization: 'Anak',
      phone: '0812332216',
      status: 'Pending',
      joinedDate: '2024-08-05'
    }
  ]);

  const specializations = [
    'Penyakit Dalam',
    'Kebidanan & Kandungan',
    'Jantung & Pembuluh Darah',
    'Anak',
    'Bedah Umum',
    'Ortopedi',
    'Neurologi',
    'Psikiatri',
    'Dermatologi',
    'Mata',
    'THT',
    'Radiologi'
  ];

  const statusOptions = ['Aktif', 'Pending', 'Nonaktif'];

  const filteredDoctors = doctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.phone.includes(searchTerm)
  );

  const handleEdit = (doctor) => {
    setEditingDoctor(doctor);
    setFormData({
      name: doctor.name,
      specialization: doctor.specialization,
      phone: doctor.phone,
      status: doctor.status
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus dokter ini?')) {
      setDoctors(doctors.filter(doctor => doctor.id !== id));
    }
  };

  const handleAddDoctor = () => {
    setEditingDoctor(null);
    setFormData({
      name: '',
      specialization: '',
      phone: '',
      status: 'Aktif'
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingDoctor(null);
    setFormData({
      name: '',
      specialization: '',
      phone: '',
      status: 'Aktif'
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validasi form
    if (!formData.name.trim() || !formData.specialization.trim() || !formData.phone.trim()) {
      alert('Mohon lengkapi semua field yang diperlukan!');
      return;
    }

    if (editingDoctor) {
      // Update existing doctor
      setDoctors(doctors.map(doctor => 
        doctor.id === editingDoctor.id 
          ? { ...doctor, ...formData }
          : doctor
      ));
    } else {
      // Add new doctor
      const newDoctor = {
        id: Date.now(), // Simple ID generation
        ...formData,
        joinedDate: new Date().toISOString().split('T')[0]
      };
      setDoctors([...doctors, newDoctor]);
    }
    
    closeModal();
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'aktif':
        return '#28a745';
      case 'pending':
        return '#ffc107';
      case 'nonaktif':
        return '#dc3545';
      default:
        return '#6c757d';
    }
  };

  const getStatusCount = (status) => {
    return doctors.filter(doctor => doctor.status.toLowerCase() === status.toLowerCase()).length;
  };

  return (
    <div className="admin-container">
      <div className="admin-content">
        <div className="content-header">
          <h2 className="content-title">Manajemen Dokter</h2>
          <div className="stats-container">
            <div className="stat-card">
              <span className="stat-number">{doctors.length}</span>
              <span className="stat-label">Total Dokter</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">{getStatusCount('aktif')}</span>
              <span className="stat-label">Aktif</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">{getStatusCount('pending')}</span>
              <span className="stat-label">Pending</span>
            </div>
          </div>
        </div>

        <div className="search-add-section">
          <div className="search-container">
            <input
              type="text"
              placeholder="Cari dokter berdasarkan nama, spesialisasi, atau nomor telepon..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <button onClick={handleAddDoctor} className="add-doctor-btn">
            <span className="plus-icon">+</span>
            Tambah Dokter Baru
          </button>
        </div>

        <div className="table-container">
          {filteredDoctors.length === 0 ? (
            <div className="no-data">
              <span className="no-data-icon">👨‍⚕️</span>
              <p>Tidak ada dokter yang ditemukan</p>
            </div>
          ) : (
            <table className="doctors-table">
              <thead>
                <tr>
                  <th>Nama</th>
                  <th>Spesialisasi</th>
                  <th>No. Telepon</th>
                  <th>Status</th>
                  <th>Bergabung</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredDoctors.map((doctor) => (
                  <tr key={doctor.id}>
                    <td className="doctor-name">{doctor.name}</td>
                    <td>{doctor.specialization}</td>
                    <td>{doctor.phone}</td>
                    <td>
                      <span 
                        className={`status-badge ${doctor.status.toLowerCase()}`}
                        style={{ backgroundColor: getStatusColor(doctor.status) + '20', color: getStatusColor(doctor.status) }}
                      >
                        {doctor.status}
                      </span>
                    </td>
                    <td>{doctor.joinedDate}</td>
                    <td className="action-buttons">
                      <button
                        onClick={() => handleEdit(doctor)}
                        className="edit-btn"
                        title="Edit dokter"
                      >
                        <span className="edit-icon">✏️</span>
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(doctor.id)}
                        className="delete-btn"
                        title="Hapus dokter"
                      >
                        <span className="delete-icon">🗑️</span>
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Modal for Add/Edit Doctor */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingDoctor ? 'Edit Dokter' : 'Tambah Dokter Baru'}</h3>
              <button className="close-btn" onClick={closeModal}>×</button>
            </div>
            <form onSubmit={handleSubmit} className="modal-body">
              <div className="form-group">
                <label htmlFor="name">Nama Dokter *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Contoh: dr. Ahmad.Sp.PD"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="specialization">Spesialisasi *</label>
                <select
                  id="specialization"
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Pilih spesialisasi</option>
                  {specializations.map(spec => (
                    <option key={spec} value={spec}>{spec}</option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="phone">Nomor Telepon *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Contoh: 0812332211"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="status">Status *</label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  required
                >
                  {statusOptions.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
            </form>
            <div className="modal-footer">
              <button className="cancel-btn" onClick={closeModal}>Batal</button>
              <button className="save-btn" onClick={handleSubmit}>
                {editingDoctor ? 'Update' : 'Simpan'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin; 