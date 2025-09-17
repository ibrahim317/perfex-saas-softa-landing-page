# Landing Pages API Module

This module provides API endpoints for landing page functionality.

## Features

- **SaaS Packages API**: Provides SaaS packages data for landing pages
- **Clean API-only structure**: No unnecessary controllers, views, or assets
- **Lightweight**: Minimal footprint with only essential API functionality

## API Endpoints

### GET /landing_pages_api/api/plans

Returns SaaS packages data for landing pages.

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
