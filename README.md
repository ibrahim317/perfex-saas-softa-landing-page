# Landing Pages Module

A simple landing pages module for Perfex CRM that provides basic static pages for your website.

## Features

- **Landing Page**: Simple home page with login/register buttons
- **Terms & Conditions**: Basic terms and conditions page
- **Privacy Policy**: Basic privacy policy page
- **About Us**: Company information page
- **Contact Page**: Contact information and form
- **Simple Routing**: Clean URLs with automatic redirects

## Installation

1. Upload the `landing_pages` folder to your `modules/` directory
2. Go to Admin → Modules and activate the "Landing Pages" module
3. That's it! Your pages are ready to use.

## URLs

After installation, the following URLs will be available:

- `/` or `/home` - Landing page (redirects to `/landing_pages/home`)
- `/terms` - Terms and conditions (redirects to `/landing_pages/terms`)
- `/privacy` - Privacy policy (redirects to `/landing_pages/privacy`)
- `/about` - About us page (redirects to `/landing_pages/about`)
- `/contact` - Contact page (redirects to `/landing_pages/contact`)

**Direct Module URLs:**
- `/landing_pages/home` - Landing page
- `/landing_pages/terms` - Terms and conditions
- `/landing_pages/privacy` - Privacy policy
- `/landing_pages/about` - About us page
- `/landing_pages/contact` - Contact page

## Customization

### Content
Edit the view files in `modules/landing_pages/views/` to customize the content:

- `home.php` - Landing page content
- `terms.php` - Terms and conditions content
- `privacy.php` - Privacy policy content
- `about.php` - About us content
- `contact.php` - Contact page content

### Styling
The pages use Bootstrap classes and can be styled by adding custom CSS to your theme.

## File Structure

```
modules/landing_pages/
├── controllers/
│   ├── Home.php
│   ├── Terms.php
│   ├── Privacy.php
│   ├── About.php
│   └── Contact.php
├── views/
│   ├── home.php
│   ├── terms.php
│   ├── privacy.php
│   ├── about.php
│   └── contact.php
├── language/
│   └── english/
│       └── landing_pages_lang.php
├── landing_pages.php
└── README.md
```

## Requirements

- Perfex CRM 2.3.0+
- PHP 7.4+
- CodeIgniter 3.1.11

## How It Works

1. The module uses hooks to intercept requests to clean URLs
2. When someone visits `/`, `/terms`, etc., they are redirected to the module URLs
3. The module controllers display simple static content
4. All content is hardcoded in the view files for easy customization

## Support

This is a simple module designed for basic landing pages. For customization, edit the view files directly.

## License

This module is provided as-is for use with Perfex CRM.