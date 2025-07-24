import React, { useState } from 'react';
import './Profile.css';

const defaultProfile = {
  name: 'John Doe',
  email: 'john.doe@email.com',
  gender: 'Laki-laki',
  age: 25,
  avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=4D47C3&color=fff&size=128'
};

const Profile = () => {
  const [profile, setProfile] = useState(defaultProfile);
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState(profile);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setProfile(form);
    setEdit(false);
  };

  return (
    <div className="container">
      <div className="profileContent">
        <div className="avatarCol">
          <img
            src={profile.avatar}
            alt="Avatar"
            className="avatar"
          />
        </div>
        <div className="dataCol">
          {edit ? (
            <>
              <input name="name" value={form.name} onChange={handleChange} type="text" placeholder="Nama" />
              <input name="email" value={form.email} onChange={handleChange} type="email" placeholder="Email" />
              <input name="gender" value={form.gender} onChange={handleChange} type="text" placeholder="Gender" />
              <input name="age" value={form.age} onChange={handleChange} type="number" placeholder="Usia" />
              <div className="buttonRow">
                <button onClick={handleSave}>Simpan</button>
                <button onClick={() => setEdit(false)} style={{ background: '#eee', color: '#444' }}>Batal</button>
              </div>
            </>
          ) : (
            <>
              <h2 className="name">{profile.name}</h2>
              <p className="email">{profile.email}</p>
              <p className="info">Gender: {profile.gender}</p>
              <p className="info">Usia: {profile.age} tahun</p>
              <div className="buttonRow">
                <button onClick={() => setEdit(true)} style={{ background: '#ec4899' }}>Edit Profil</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile; 