const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Op } = require('sequelize');
const Customer = require('./models/customer');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Pagination function
const paginateResults = (pageNumber, pageSize, results) => {
  const start = (pageNumber - 1) * pageSize;
  const end = pageNumber * pageSize;
  return results.slice(start, end);
};

// Route to fetch customers with pagination, search, and sorting
app.get('/customers', async (req, res) => {
  try {
    const { page = 1, search = '', sortBy = 'created_at', sortOrder = 'DESC' } = req.query;
    const pageSize = 20;
    const pageNumber = parseInt(page);

    let whereCondition = {};
    if (search) {
      whereCondition = {
        [Op.or]: [
          { customer_name: { [Op.iLike]: `%${search}%` } },
          { location: { [Op.iLike]: `%${search}%` } }
        ]
      };
    }

    const customers = await Customer.findAndCountAll({
        attributes: ['sno', 'customer_name', 'age', 'phone', 'location', 'created_at'], // Specify the columns you want to fetch
        where: whereCondition,
        order: [[sortBy, sortOrder]],
      });
      

    const paginatedCustomers = paginateResults(pageNumber, pageSize, customers.rows);
    res.json({
      data: paginatedCustomers,
      totalPages: Math.ceil(customers.count / pageSize),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
