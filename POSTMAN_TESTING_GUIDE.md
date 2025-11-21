# Postman Testing Guide

## Overview
This guide explains how to use the Postman collection to test the Property Management API.

## Setup

### 1. Import Collection
1. Open Postman
2. Click **Import** button
3. Select `Property_API_Tests.postman_collection.json`
4. Collection will appear in your Collections sidebar

### 2. Start the Server
```bash
npm run server
```
Server will start on `http://localhost:5001`

### 3. Environment Variables
The collection includes built-in variables:
- **base_url**: `http://localhost:5001` (server address)
- **property_id**: Auto-saved from create property request

## Test Structure

### 📁 Core CRUD Operations (5 tests)
Tests all required API endpoints:
1. **Create Property** - POST request with validation
2. **Get All Properties** - GET all with pagination info
3. **Get Property by ID** - GET single property
4. **Update Property** - PUT with partial updates
5. **Delete Property** - DELETE by ID

### 📁 Validation & Error Handling (3 tests)
Tests error scenarios:
1. **Missing Required Fields** - Returns 400 with error details
2. **Negative Price Validation** - Returns 400 for invalid price
3. **Property Not Found (404)** - Returns 404 for non-existent ID

### 📁 Bonus Features (7 tests)
Tests filtering and pagination:
1. **Setup - Create Sample Properties** - Setup test data
2. **Setup - Create Sold Property** - Setup test data
3. **Filter by Status - Available** - Query param filtering
4. **Filter by Status - Sold** - Query param filtering
5. **Pagination - Page 1** - limit=2, offset=0
6. **Pagination - Page 2** - limit=2, offset=2
7. **Combined Filter + Pagination** - Both features together

## How to Run Tests

### Option 1: Run Entire Collection
1. Click on collection name "Property Management API Tests"
2. Click **Run** button
3. Click **Run Property Management API Tests**
4. View results in the runner

### Option 2: Run Individual Folders
1. Right-click on folder (e.g., "Core CRUD Operations")
2. Click **Run folder**
3. View results

### Option 3: Run Single Test
1. Click on individual request
2. Click **Send** button
3. View response and test results at bottom

## Test Assertions

Each request includes automated tests that verify:
- ✅ Correct HTTP status codes (200, 201, 400, 404)
- ✅ Response structure (success, data, error fields)
- ✅ Data integrity (IDs, timestamps, required fields)
- ✅ Validation rules (positive price, required fields)
- ✅ Filtering logic (correct status filtering)
- ✅ Pagination metadata (limit, offset, total, hasMore)

## Expected Test Results

When running the complete collection with the server running:

```
Total Tests: 15 folders with multiple assertions each
Passing: All tests should pass ✅
Failing: 0 ❌
```

## Sample Request/Response

### Create Property Request
```http
POST http://localhost:5001/api/properties
Content-Type: application/json

{
  "title": "Luxury Apartment",
  "description": "A beautiful apartment in downtown.",
  "address": "123 Main St",
  "price": 250000
}
```

### Success Response (201)
```json
{
  "success": true,
  "message": "Property created successfully",
  "data": {
    "id": 1,
    "title": "Luxury Apartment",
    "description": "A beautiful apartment in downtown.",
    "address": "123 Main St",
    "price": 250000,
    "status": "available",
    "createdAt": "2025-11-21T01:16:54.859Z",
    "updatedAt": "2025-11-21T01:16:54.859Z"
  }
}
```

### Validation Error Response (400)
```json
{
  "success": false,
  "error": "Validation failed",
  "details": [
    {
      "field": "price",
      "message": "Price must be a positive number"
    }
  ]
}
```

## Troubleshooting

### Server Not Running
**Error**: "Could not get any response"
**Solution**: Make sure the server is running on port 5001
```bash
npm run server
```

### Port Conflict
**Error**: "EADDRINUSE: address already in use"
**Solution**: Kill existing process or change port in `server/config/config.js`

### Tests Failing
1. Ensure server is running
2. Run "Setup" requests in Bonus Features folder first
3. Check that `property_id` variable is set (after creating property)
4. Clear in-memory data by restarting server

## Environment Variables

To customize the base URL:
1. Click on collection
2. Go to **Variables** tab
3. Update `base_url` value
4. Save changes

## Tips

1. **Run in Order**: For best results, run tests in order (especially setup requests)
2. **Check Console**: Use Postman Console (View → Show Postman Console) for detailed logs
3. **Environment**: The `property_id` is automatically saved after creating a property
4. **Data Reset**: Restart server to clear in-memory data and reset IDs

## Additional Testing

You can also test manually using curl commands documented in `API_TEST_RESULTS.md`

## Support

For issues or questions, refer to:
- API_TEST_RESULTS.md - Complete API documentation
- server/routes/properties.js - Route definitions
- server/controllers/PropertyController.js - Controller logic
