import React, { useState, useEffect } from 'react';

const PatientForm = () => {
  const [patients, setPatients] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    contact: '',
    address: '',
    symptoms: '',
    diagnosis: '',
    treatment: '',
    doctor: '',
    date: '',
  });

  useEffect(() => {
    const savedPatients = JSON.parse(localStorage.getItem('patients')) || [];
    setPatients(savedPatients);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.age) {
      const updatedPatients = [...patients, formData];
      setPatients(updatedPatients);
      localStorage.setItem('patients', JSON.stringify(updatedPatients));
      setFormData({
        name: '',
        age: '',
        gender: '',
        contact: '',
        address: '',
        symptoms: '',
        diagnosis: '',
        treatment: '',
        doctor: '',
        date: '',
      });
    }
  };

  const handleDelete = (index) => {
    const updatedPatients = patients.filter((_, i) => i !== index);
    setPatients(updatedPatients);
    localStorage.setItem('patients', JSON.stringify(updatedPatients));
  };

  const handleEdit = (index) => {
    setFormData(patients[index]);
    handleDelete(index); 
  };

  return (
    <div className="container">
      <h2>Patient Form</h2>
      <form onSubmit={handleSubmit} className="patient-form">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Full Name"
          required
        />
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          placeholder="Age"
          required
        />
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <input
          type="text"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          placeholder="Contact Number"
        />
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Address"
        />
        <textarea
          name="symptoms"
          value={formData.symptoms}
          onChange={handleChange}
          placeholder="Symptoms"
        />
        <textarea
          name="diagnosis"
          value={formData.diagnosis}
          onChange={handleChange}
          placeholder="Diagnosis"
        />
        <textarea
          name="treatment"
          value={formData.treatment}
          onChange={handleChange}
          placeholder="Treatment"
        />
        <input
          type="text"
          name="doctor"
          value={formData.doctor}
          onChange={handleChange}
          placeholder="Doctor Name"
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>

      <div className="patients-list">
        <h3>Patient Records</h3>
        {patients.length > 0 ? (
          <ul>
            {patients.map((patient, index) => (
              <li key={index}>
                <div>
                  <strong>{patient.name}</strong> (Age: {patient.age}) - {patient.contact}
                </div>
                <button onClick={() => handleEdit(index)}>Edit</button>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No patient records available.</p>
        )}
      </div>
    </div>
  );
};

export default PatientForm;

