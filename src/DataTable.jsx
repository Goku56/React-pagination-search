import { useEffect, useRef, useState } from "react";

const DataTable = () => {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    age: "",
  });
  const [data, setData] = useState([]);
  const [editId, setEditId] = useState(false);
  const outSideClick = useRef(false);
  const [search, setSearch] = useState("");
  const [curPage, setCurPage] = useState(1);

  const itemsPerPage = 5;
  const LastItem = curPage * 5;
  const indexOfFirstItem = LastItem - itemsPerPage;

  let filteredItems = data.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );
  const filterData = filteredItems.slice(indexOfFirstItem, LastItem);

  useEffect(() => {
    if (!editId) return;
    let selectItem = document.querySelectorAll(`[id='${editId}']`);
    selectItem[0].focus();
  }, [editId]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (outSideClick.current && !outSideClick.current.contains(e.target)) {
        setEditId(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setCurPage(1);
  }, [search]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEdit = (id, updatedData) => {
    if (!editId || editId !== id) {
      return;
    }
    const updateList = data.map((item) =>
      item.id === id ? { ...item, updatedData } : item
    );
    setData(updateList);
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
    if (filterData.length === 1 && curPage !== 1) {
      setCurPage((prev) => prev - 1);
    }
    const updateList = data.filter((item) => item.id !== id);
    setData(updateList);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
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
          value={search}
          onChange={handleSearch}
          className="search-input"
        />

        <table ref={outSideClick}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Gender</th>
              <th>Age</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filterData.map((item) => (
              <tr key={item.id}>
                <td
                  id={item.id}
                  contentEditable={editId === item.id}
                  onBlur={(e) => {
                    handleEdit(item.id, { name: e.target.innerText });
                  }}
                >
                  {item.name}
                </td>
                <td
                  id={item.id}
                  contentEditable={editId === item.id}
                  onBlur={(e) => {
                    handleEdit(item.id, { name: e.target.innerText });
                  }}
                >
                  {item.gender}
                </td>
                <td
                  id={item.id}
                  contentEditable={editId === item.id}
                  onBlur={(e) => {
                    handleEdit(item.id, { name: e.target.innerText });
                  }}
                >
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

        <div className="pagination">
          {Array.from(
            { length: Math.ceil(filteredItems.length / itemsPerPage) },
            (_, index) => (
              <button
                key={index + 1}
                onClick={() => {
                  setCurPage(index + 1);
                }}
                style={{
                  backgroundColor: curPage === index + 1 && "lightgreen",
                }}
              >
                {index + 1}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default DataTable;
