// In-memory data storage for properties
let properties = [];
let currentId = 1;

/**
 * Get all properties with optional filtering and pagination
 */
const getAllProperties = (filters = {}) => {
  let result = [...properties];

  // Filter by status if provided
  if (filters.status) {
    result = result.filter((p) => p.status === filters.status);
  }

  // Store total before pagination
  const total = result.length;

  // Apply pagination if provided
  if (filters.limit !== undefined || filters.offset !== undefined) {
    const limit = parseInt(filters.limit) || 10;
    const offset = parseInt(filters.offset) || 0;
    result = result.slice(offset, offset + limit);

    return {
      properties: result,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total,
      },
    };
  }

  return {
    properties: result,
    pagination: {
      total,
    },
  };
};

/**
 * Get a property by ID
 */
const getPropertyById = (id) => {
  return properties.find((p) => p.id === parseInt(id));
};

/**
 * Create a new property
 */
const createProperty = (propertyData) => {
  const newProperty = {
    id: currentId++,
    ...propertyData,
    status: propertyData.status || "available",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  properties.push(newProperty);
  return newProperty;
};

/**
 * Update a property by ID
 */
const updateProperty = (id, updates) => {
  const index = properties.findIndex((p) => p.id === parseInt(id));

  if (index === -1) {
    return null;
  }

  properties[index] = {
    ...properties[index],
    ...updates,
    id: properties[index].id, // Prevent ID from being updated
    createdAt: properties[index].createdAt, // Prevent createdAt from being updated
    updatedAt: new Date().toISOString(),
  };

  return properties[index];
};

/**
 * Delete a property by ID
 */
const deleteProperty = (id) => {
  const index = properties.findIndex((p) => p.id === parseInt(id));

  if (index === -1) {
    return false;
  }

  properties.splice(index, 1);
  return true;
};

/**
 * Reset data (useful for testing)
 */
const resetProperties = () => {
  properties = [];
  currentId = 1;
};

module.exports = {
  getAllProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
  resetProperties,
};
