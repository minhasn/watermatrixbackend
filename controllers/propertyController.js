const Property = require('../models/property');
const pool = require('../config/db');

const addProperty = async (req, res) => {
  const { title, city, price, type, description, address, zipcode, bedrooms, washrooms, area, furnished, kitchen, water, electricity, userId, geom } = req.body;
  const images = req.files ? req.files.map(file => file.path) : [];


  try {
    const propertyId = await Property.create({ title, city, price, type, description, address, zipcode, bedrooms, washrooms, area, furnished, kitchen, water, electricity, userId, geom });

    // Insert images into property_images table
    if (images.length > 0) {
      const insertImagePromises = images.map(Photos => {
        return new Promise((resolve, reject) => {
          pool.query(
            `INSERT INTO property_images (property_id, Photos) VALUES (?, ?)`,
            [propertyId, Photos],
            (error) => {
              if (error) {
                console.error('Error inserting image:', error);
                return reject(error);
              }
              console.log('Image inserted:', results); // Log successful insert
              resolve();
            }
          );
        });
      });
      await Promise.all(insertImagePromises);
    }

    res.status(201).json({ propertyId });
  } catch (error) {
    console.error('Database query error:', error.stack);
    res.status(500).json({ error: 'Database error', details: error.message });
  }
};

const getProperties = async (req, res) => {
  try {
    const properties = await Property.getAll();
    res.status(200).json(properties);
  } catch (error) {
    console.error('Database query error:', error);
    res.status(500).json({ error: 'Database error', details: error.message });
  }
};

module.exports = { addProperty, getProperties };
