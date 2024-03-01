import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('created_at');
  const [sortOrder, setSortOrder] = useState('ASC');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchData();
  }, [search, sortBy, sortOrder, currentPage]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/customers`, {
        params: { page: currentPage, search, sortBy, sortOrder }
      });
      setCustomers(response.data.data);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSortByChange = (e) => {
    const selectedSortBy = e.target.value;
    setSortBy(selectedSortBy);
  };

  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search by name or location"
        value={search}
        onChange={handleSearchChange}
      />
      <select value={sortBy} onChange={handleSortByChange}>
        <option value="created_at">Date</option>
        <option value="time">Time</option>
        <option value="age">Age</option>
      </select>
      <select value={sortOrder} onChange={handleSortOrderChange}>
        <option value="ASC">Ascending</option>
        <option value="DESC">Descending</option>
      </select>
      <table>
        <thead>
          <tr>
            <th>Sno</th>
            <th>Customer Name</th>
            <th>Age</th>
            <th>Phone</th>
            <th>Location</th>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(customer => (
            <tr key={customer.sno}>
              <td>{customer.sno}</td>
              <td>{customer.customer_name}</td>
              <td>{customer.age}</td>
              <td>{customer.phone}</td>
              <td>{customer.location}</td>
              <td>{new Date(customer.created_at).toLocaleDateString()}</td>
              <td>{new Date(customer.created_at).toLocaleTimeString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
        <span>{`Page ${currentPage} of ${totalPages}`}</span>
        <button disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>Next</button>
      </div>
    </div>
  );
};

export default CustomerList;
