# Frontend Integration Guide - Phixels.io Backend

This guide details the API endpoints available for the Phixels.io backend.

## Base URL
`http://localhost:5000/api/v1` (Adjust port as necessary)

## Authentication
- **Login**: `POST /auth/login`
  - Body: `{ "email": "admin@example.com", "password": "password" }`
  - Response: `{ "data": { "accessToken": "..." } }`
- **Register**: `POST /users/create-user` (if public) or protected route.

## Modules

### 1. Products
**manage products/saas templates.**
- **List Products**: `GET /products`
- **Get Product**: `GET /products/:id`
- **Create Product**: `POST /products`
  - Headers: `Authorization: <token>`
  - Body:
    ```json
    {
      "name": "Product Name",
      "description": "Description",
      "features": ["Feature 1", "Feature 2"],
      "pricing": 99.99,
      "category": "SaaS",
      "images": ["url1", "url2"],
      "demoLink": "https://demo.com"
    }
    ```
- **Update Product**: `PATCH /products/:id`
- **Delete Product**: `DELETE /products/:id`

### 2. Services
**Manage agency services.**
- **List Services**: `GET /services`
- **Get Service**: `GET /services/:id`
- **Create Service**: `POST /services`
  - Body:
    ```json
    {
      "title": "Web Development",
      "description": "Full stack dev",
      "icon": "code-icon-url",
      "features": ["React", "Node"],
      "images": ["url1"]
    }
    ```
- **Update Service**: `PATCH /services/:id`
- **Delete Service**: `DELETE /services/:id`

### 3. Career
**Manage job postings.**
- **List Jobs**: `GET /careers`
- **Get Job**: `GET /careers/:id`
- **Create Job**: `POST /careers`
  - Body:
    ```json
    {
      "jobTitle": "Frontend Dev",
      "jobType": "Full-time",
      "location": "Remote",
      "description": "Job desc...",
      "requirements": ["React", "TS"],
      "responsibilities": ["Build UI"],
      "salaryRange": "$50k - $80k",
      "applicationEmail": "jobs@agency.com"
    }
    ```
- **Update Job**: `PATCH /careers/:id`
- **Delete Job**: `DELETE /careers/:id`

### 4. Portfolio
**Manage showcase projects.**
- **List Portfolios**: `GET /portfolio`
- **Get Portfolio**: `GET /portfolio/:id`
- **Create Portfolio**: `POST /portfolio`
  - Body: [TPortfolio](file:///d:/monitvi/phixels.io-backend/src/app/module/portfolio/portfolio.interface.ts#1-11) fields.
- **Update/Delete**: `PATCH` / `DELETE` `/portfolio/:id`

### 5. Blogs
**Manage blog posts.**
- **List Blogs**: `GET /blogs`
- **Get Blog**: `GET /blogs/:id`
- **Create Blog**: `POST /blogs`
  - Body: [TBlog](file:///d:/monitvi/phixels.io-backend/src/app/module/blogs/blog.interface.ts#1-10) fields.
- **Update/Delete**: `PATCH` / `DELETE` `/blogs/:id`

### 6. Case Studies
**Manage detailed case studies.**
- **List**: `GET /case-studies`
- **Get**: `GET /case-studies/:id`
- **Create**: `POST /case-studies`
  - Body: [TCaseStudy](file:///d:/monitvi/phixels.io-backend/src/app/module/caseStudy/caseStudy.interface.ts#1-11) fields.
- **Update/Delete**: `PATCH` / `DELETE` `/case-studies/:id`

## Error Handling
APIs return standard error responses:
```json
{
  "success": false,
  "message": "Error message",
  "errorSources": [...]
}
```
