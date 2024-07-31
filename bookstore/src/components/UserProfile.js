import React, { useState } from 'react';
import axios from 'axios';

const UserProfile = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const handleProfileUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('email', email);
      if (profilePicture) {
        formData.append('profilePicture', profilePicture);
      }

      const response = await axios.put('http://localhost:5000/user/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error updating profile:', error.response.data.message);
    }
  };

  const handlePasswordChange = async () => {
    if (newPassword !== confirmNewPassword) {
      return alert("Passwords don't match");
    }

    try {
      const response = await axios.put('http://localhost:5000/user/change-password', {
        oldPassword,
        newPassword,
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error changing password:', error.response.data.message);
    }
  };

  const handleProfilePictureChange = (event) => {
    setProfilePicture(event.target.files[0]);
  };

  return (
    <div>
      <h1>User Profile</h1>
      <div>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label>Profile Picture:</label>
        <input
          type="file"
          onChange={handleProfilePictureChange}
        />
      </div>
      <button onClick={handleProfileUpdate}>Update Profile</button>

      <h2>Change Password</h2>
      <div>
        <label>Old Password:</label>
        <input
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
      </div>
      <div>
        <label>New Password:</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>
      <div>
        <label>Confirm New Password:</label>
        <input
          type="password"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
        />
      </div>
      <button onClick={handlePasswordChange}>Change Password</button>
    </div>
  );
};

export default UserProfile;
