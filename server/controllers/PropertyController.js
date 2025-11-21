const propertyData = require("../data/properties");

/**
 * @route   POST /api/properties
 * @desc    Create a new property
 * @access  Public
 */
const createProperty = (req, res) => {
  try {
    const { title, description, address, price, status } = req.body;

    const newProperty = propertyData.createProperty({
      title,
      description,
      address,
      price,
      status,
    });

    res.status(201).json({
      success: true,
      message: "Property created successfully",
      data: newProperty,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to create property",
      message: error.message,
    });
  }
};

/**
 * @route   GET /api/properties
 * @desc    Get all properties with optional filtering and pagination
 * @access  Public
 */
const getAllProperties = (req, res) => {
  try {
    const { status, limit, offset } = req.query;

    const filters = {};
    if (status) filters.status = status;
    if (limit) filters.limit = limit;
    if (offset) filters.offset = offset;

    const result = propertyData.getAllProperties(filters);

    res.status(200).json({
      success: true,
      message: "Properties retrieved successfully",
      data: result.properties,
      pagination: result.pagination,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to retrieve properties",
      message: error.message,
    });
  }
};

/**
 * @route   GET /api/properties/:id
 * @desc    Get a single property by ID
 * @access  Public
 */
const getPropertyById = (req, res) => {
  try {
    const { id } = req.params;

    const property = propertyData.getPropertyById(id);

    if (!property) {
      return res.status(404).json({
        success: false,
        error: "Property not found",
        message: `No property found with ID: ${id}`,
      });
    }

    res.status(200).json({
      success: true,
      message: "Property retrieved successfully",
      data: property,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to retrieve property",
      message: error.message,
    });
  }
};

/**
 * @route   PUT /api/properties/:id
 * @desc    Update a property by ID
 * @access  Public
 */
const updateProperty = (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedProperty = propertyData.updateProperty(id, updates);

    if (!updatedProperty) {
      return res.status(404).json({
        success: false,
        error: "Property not found",
        message: `No property found with ID: ${id}`,
      });
    }

    res.status(200).json({
      success: true,
      message: "Property updated successfully",
      data: updatedProperty,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to update property",
      message: error.message,
    });
  }
};

/**
 * @route   DELETE /api/properties/:id
 * @desc    Delete a property by ID
 * @access  Public
 */
const deleteProperty = (req, res) => {
  try {
    const { id } = req.params;

    const deleted = propertyData.deleteProperty(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        error: "Property not found",
        message: `No property found with ID: ${id}`,
      });
    }

    res.status(200).json({
      success: true,
      message: "Property deleted successfully",
      data: { id: parseInt(id) },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to delete property",
      message: error.message,
    });
  }
};

module.exports = {
  createProperty,
  getAllProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
};
