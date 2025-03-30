import React, { useState } from "react";
import axios from "axios";
import "./User.css";

const User = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    if (!query) {
      setError("Please enter a search query");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const API_URL =
        process.env.REACT_APP_API_URL || "http://localhost/php/api/user.php";
      const response = await axios.get(`${API_URL}?q=${query}`);
      setResults(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching data");
    }
    setLoading(false);
  };

  return (
    <>
      <div className="searchInp">
        <h4>Search Data</h4>
      </div>
      <div className="inpPlaceholder">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search query"
        />
      </div>
      <div className="searchBtn">
        <button onClick={fetchData} disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {results.length === 0 && !loading && !error && <p>No results found</p>}
      <div>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">SL No</th>
              <th scope="col">User Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Gender</th>
            </tr>
          </thead>
          <tbody>
            {results.map((uData) => (
              <tr key={uData.id}>
                <td>{uData.id}</td>
                <td>{uData.username}</td>
                <td>{uData.useremail}</td>
                <td>{uData.phoneno}</td>
                <td>{uData.gender}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default User;
