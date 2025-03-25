// src/App.jsx
import React, { useState, useEffect } from 'react';
import './style.css';  // Import the new CSS file

const ToggleProject = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [users, setUsers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    setUsers(storedUsers);
  }, []);

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && age) {
      if (isEditing) {
        const updatedUsers = users.map(user =>
          user.id === editId ? { ...user, name, age } : user
        );
        setUsers(updatedUsers);
        setIsEditing(false);
        setEditId(null);
      } else {
        const newUser = { id: Date.now(), name, age, isActive: false };
        setUsers([...users, newUser]);
      }
      setName('');
      setAge('');
    }
  };

  const toggleActive = (id) => {
    const updatedUsers = users.map(user =>
      user.id === id ? { ...user, isActive: !user.isActive } : user
    );
    setUsers(updatedUsers);
  };

  const deleteUser = (id) => {
    const updatedUsers = users.filter(user => user.id !== id);
    setUsers(updatedUsers);
  };

  const editUser = (id) => {
    const userToEdit = users.find(user => user.id === id);
    setName(userToEdit.name);
    setAge(userToEdit.age);
    setIsEditing(true);
    setEditId(id);
  };

  return (
    <div className="container">
      <h1>User Form with CRUD and Toggle</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />
        <button type="submit" className="add-btn">
          {isEditing ? 'Update User' : 'Add User'}
        </button>
      </form>

      <table border="1" cellPadding="10"  className='w-full border-2'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        {users.map((user) => (
            <tr key={user.id}>
              <td className="name-cell">{user.name}</td>
              <td className="age-cell">{user.age}</td>
              <td className={`status-text ${user.isActive ? 'active' : 'inactive'}`}>
                {user.isActive ? 'Active' : 'Inactive'}
              </td>
          {/* buttons */}
              <td>
                <button onClick={() => toggleActive(user.id)}>Toggle</button>
                <button onClick={() => editUser(user.id)}>Edit</button>
                <button onClick={() => deleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default ToggleProject;
