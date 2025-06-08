import React from 'react';

const EditProfileModal = ({ onClose }) => {
  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h3>Edit Profile</h3>
        <input type="text" placeholder="Enter name" />
        <input type="email" placeholder="Enter email" />
        <button>Save Changes</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default EditProfileModal;