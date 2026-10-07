import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [age, setAge] = useState("");
  const [editingId, setEditingId] = useState(null); // null = adding, id = editing

  // READ: get students from MongoDB
  const getStudents = () => {
    axios.get("http://localhost:5000/students").then((res) => {
      setStudents(res.data);
    });
  };

  // Run once when the page opens
  useEffect(() => {
    getStudents();
  }, []);

  // Clear the form and leave editing mode
  const clearForm = () => {
    setName("");
    setCourse("");
    setAge("");
    setEditingId(null);
  };

  // CREATE
  const addStudent = () => {
    axios
      .post("http://localhost:5000/students", { name, course, age })
      .then(() => {
        clearForm();
        getStudents();
      });
  };

  // UPDATE
  const updateStudent = () => {
    axios
      .put("http://localhost:5000/students/" + editingId, { name, course, age })
      .then(() => {
        clearForm();
        getStudents();
      });
  };

  // Edit button
  const startEdit = (student) => {
    setEditingId(student._id);
    setName(student.name);
    setCourse(student.course);
    setAge(student.age);
  };

  // DELETE
  const deleteStudent = (id) => {
    axios.delete("http://localhost:5000/students/" + id).then(() => {
      getStudents();
    });
  };

  return (
    <div>
      <h1>Student Management System</h1>

      <h2>{editingId ? "Edit Student" : "Add Student"}</h2>

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <input
        placeholder="Course"
        value={course}
        onChange={(e) => setCourse(e.target.value)}
      />
      <br />
      <input
        type="number"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
      <br />

      {editingId ? (
        <button onClick={updateStudent}>Update Student</button>
      ) : (
        <button onClick={addStudent}>Add Student</button>
      )}

      <h2>Students</h2>

      {students.length === 0 ? (
        <p>No students yet.</p>
      ) : (
        students.map((student) => (
          <div key={student._id}>
            <p>Name: {student.name}</p>
            <p>Course: {student.course}</p>
            <p>Age: {student.age}</p>
            <button onClick={() => startEdit(student)}>Edit</button>
            <button onClick={() => deleteStudent(student._id)}>Delete</button>
            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default App;
