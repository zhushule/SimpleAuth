import React, { useEffect, useState } from 'react';
import { getAllUsers, adminSendResetEmail, updateUser } from '../services/api';
import { useHistory } from 'react-router-dom';
import '../App.css';

function AdminPage() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [message, setMessage] = useState('');
  const history = useHistory();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUsers();
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
        setMessage('An error occurred while fetching users.');
      }
    };

    fetchUsers();
  }, []);

  const handleSendResetEmail = async (email) => {
    try {
      await adminSendResetEmail(email);
      setMessage(`Reset email sent to ${email}`);
    } catch (error) {
      console.error('Error sending reset email:', error);
      setMessage(`Failed to send reset email to ${email}`);
    }
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setFirstName(user.firstName);
    setLastName(user.lastName);
  };

  const handleSaveClick = async () => {
    try {
      await updateUser(selectedUser.email, firstName, lastName);
      setMessage(`User ${selectedUser.email} updated successfully.`);
      setSelectedUser(null); // Close modal
      setUsers(users.map(user =>
        user.email === selectedUser.email
          ? { ...user, firstName, lastName }
          : user
      ));
    } catch (error) {
      console.error('Error updating user:', error);
      setMessage(`Failed to update user ${selectedUser.email}.`);
    }
  };

  const handleLogout = () => {
    history.push('/login');
  };

  return (
    <div className="admin-container">  
      <div className="user-list">  
        <h2>Admin Page</h2>
        <button onClick={handleLogout}>Logout</button>
        {message && <p>{message}</p>}
        <ul>
          {users.map((user) => (
            <li key={user.email}>
              {user.email} - {user.firstName} {user.lastName}
              <div>
                <button onClick={() => handleSendResetEmail(user.email)}>Send Reset Email</button>
                <button onClick={() => handleEditClick(user)}>Edit</button>
              </div>
            </li>
          ))}
        </ul>
      </div>

  {selectedUser && (
  <div className="edit-form"> 
    <h3>Edit User</h3>
    <p><label>Email:</label> {selectedUser.email}</p>  
    <p><label>Gender:</label> {selectedUser.gender}</p>  
    <p><label>Birthday:</label> {new Date(selectedUser.birthday).toLocaleDateString()}</p> 

    <label htmlFor="firstName">First Name</label>
    <input
      id="firstName"
      type="text"
      value={firstName}
      onChange={(e) => setFirstName(e.target.value)}
      placeholder="First Name"
    />

    <label htmlFor="lastName" style={{ marginTop: '10px' }}>Last Name</label>
    <input
      id="lastName"
      type="text"
      value={lastName}
      onChange={(e) => setLastName(e.target.value)}
      placeholder="Last Name"
    />
    
    <button onClick={handleSaveClick} style={{ marginTop: '20px' }}>Save</button>
  </div>
      )}
    </div>
  );
}

export default AdminPage;
