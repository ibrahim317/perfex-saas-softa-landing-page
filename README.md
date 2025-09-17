# Landing Pages API Module

This module provides API endpoints for landing page functionality.

## Features

- **SaaS Packages API**: Provides SaaS packages data for landing pages
- **CORS Support**: Allows cross-origin requests from any domain
- **Rate Limiting**: Built-in rate limiting (100 requests per hour per IP)
- **Clean API-only structure**: No unnecessary controllers, views, or assets
- **Lightweight**: Minimal footprint with only essential API functionality

## API Endpoints

### GET /landing_pages_api/api/plans

Returns SaaS packages data for landing pages.

**CORS:** This endpoint supports CORS and can be called from any domain.

**Rate Limiting:** 100 requests per hour per IP address.

**Parameters:**
- `id` (optional): Specific package ID to retrieve

**Response:**
```json
[
  {
    "id": 1,
    "name": "Basic Plan",
    "description": "Basic package description",
    "slug": "basic",
    "price": 29.99,
    "trial_period": 14,
    "is_default": false,
    "is_private": false,
    "db_scheme": "basic",
    "status": "active",
    "modules": ["crm", "invoicing"],
    "module_names": ["CRM", "Invoicing"],
    "metadata": {
      "invoice": "invoice_template",
      "max_instance_limit": 1,
      "limitations": {},
      "enable_subdomain": true,
      "enable_custom_domain": false,
      "shared_settings": []
    }
  }
]
```

**Error Responses:**

Rate limit exceeded (HTTP 429):
```json
{
  "error": "Rate limit exceeded",
  "message": "Too many requests. Please try again later.",
  "retry_after": 3600
}
```

API key not found (HTTP 404):
```json
{
  "error": "Landing API key not found"
}
```

## CORS Configuration

The API automatically sets the following CORS headers:
- `Access-Control-Allow-Origin: *` (allows all origins)
- `Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS`
- `Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, Accept, Origin`
- `Access-Control-Allow-Credentials: true`
- `Access-Control-Max-Age: 3600` (caches preflight requests for 1 hour)

## Rate Limiting

- **Limit**: 100 requests per hour per IP address
- **Window**: 1 hour (3600 seconds)
- **Storage**: Uses both database cache and application cache
- **Response**: HTTP 429 with retry information when limit exceeded

## Installation

1. Ensure the module is in the `modules/landing_pages_api/` directory
2. Activate the module through the admin panel
3. The API endpoints will be available at `/landing_pages_api/api/`

## Requirements

- Perfex CRM with SaaS module
- API user with name "landing" configured in the SaaS module

## Version

1.0.0

## Author

Softa Software House
