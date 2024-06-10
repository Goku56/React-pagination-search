import { useEffect, useState } from "react";

const DataTable = () => {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    age: "",
  });
  const [data, setData] = useState([]);
  const [editId, setEditId] = useState(false);

  useEffect(() => {
    if (!editId) return;
    let selectItem = document.querySelectorAll(`[id='${editId}']`);
    selectItem[0].focus();
  }, [editId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddClick = () => {
    if (formData.name && formData.gender && formData.age) {
      const newItem = {
        id: Date.now(),
        name: formData.name,
        gender: formData.gender,
        age: formData.age,
      };
      setData([...data, newItem]);
      setFormData({ name: "", age: "", gender: "" });
    }
  };

  const handleDelete = (id) => {
    const updateList = data.filter((item) => item.id !== id);
    setData(updateList);
  };

  return (
    <div className="container">
      <div className="add-container">
        <div className="info-container">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Age"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />
        </div>
        <button className="add" onClick={handleAddClick}>
          Add
        </button>
      </div>
      <div className="search-table-container">
        <input
          type="text"
          placeholder="Search by name"
          value={""}
          onChange={() => {}}
          className="search-input"
        />

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Gender</th>
              <th>Age</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td id={item.id} contentEditable={editId === item.id}>
                  {item.name}
                </td>
                <td id={item.id} contentEditable={editId === item.id}>
                  {item.gender}
                </td>
                <td id={item.id} contentEditable={editId === item.id}>
                  {item.age}
                </td>
                <td className="actions">
                  <button className="edit" onClick={() => setEditId(item.id)}>
                    edit
                  </button>
                  <button
                    className="delete"
                    onClick={() => {
                      handleDelete(item.id);
                    }}
                  >
                    delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination"></div>
      </div>
    </div>
  );
};

export default DataTable;
