import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
  const { user, token, logout } = useContext(AuthContext);
  const [profile, setProfile] = useState(user);
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:5000/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfile(response.data);
      } catch (error) {
        console.error('Failed to fetch profile:', error.response?.data?.message || error.message);
      }
    };

    if (token) {
      fetchProfile();
    }
  }, [token]);

  const handleProfileUpdate = async () => {
    try {
      const response = await axios.put('http://localhost:5000/profile', profile, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProfile(response.data);
    } catch (error) {
      console.error('Failed to update profile:', error.response?.data?.message || error.message);
    }
  };

  const handleChangePassword = async () => {
    try {
      await axios.put('http://localhost:5000/profile/password', { newPassword }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Password changed successfully');
    } catch (error) {
      console.error('Failed to change password:', error.response?.data?.message || error.message);
    }
  };

  return (
    <div>
      <h1>Profile</h1>
      {profile && (
        <div>
          <p>Username: {profile.username}</p>
          <p>Email: {profile.email}</p>
          {/* Add more profile fields as needed */}
          <button onClick={handleProfileUpdate}>Update Profile</button>
        </div>
      )}
      <div>
        <h2>Change Password</h2>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button onClick={handleChangePassword}>Change Password</button>
      </div>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Profile;
