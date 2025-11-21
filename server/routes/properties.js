const express = require("express");
const PropertyController = require("../controllers/PropertyController");
const {
  validate,
  validateQuery,
  propertySchema,
  propertyUpdateSchema,
  propertyQuerySchema,
} = require("../middlewares/validation");

const router = express.Router();

/**
 * @route   POST /api/properties
 * @desc    Create a new property
 * @access  Public
 */
router.post("/", validate(propertySchema), PropertyController.createProperty);

/**
 * @route   GET /api/properties
 * @desc    Get all properties with optional filtering and pagination
 * @access  Public
 * @query   status - Filter by status (available, sold, pending)
 * @query   limit - Number of results per page
 * @query   offset - Number of results to skip
 */
router.get(
  "/",
  validateQuery(propertyQuerySchema),
  PropertyController.getAllProperties
);

/**
 * @route   GET /api/properties/:id
 * @desc    Get a single property by ID
 * @access  Public
 */
router.get("/:id", PropertyController.getPropertyById);

/**
 * @route   PUT /api/properties/:id
 * @desc    Update a property by ID
 * @access  Public
 */
router.put(
  "/:id",
  validate(propertyUpdateSchema),
  PropertyController.updateProperty
);

/**
 * @route   DELETE /api/properties/:id
 * @desc    Delete a property by ID
 * @access  Public
 */
router.delete("/:id", PropertyController.deleteProperty);

module.exports = router;
