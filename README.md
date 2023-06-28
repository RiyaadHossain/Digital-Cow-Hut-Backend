# Digital Cow Hut 🐮

Welcome to the `Digital Cow Hut` API Documentation! This guide will provide you with all the necessary information to understand and utilize our API effectively. We have followed industry best practices to ensure a clear, consistent, and user-friendly documentation.

## Table of Contents

1. [Introduction](#introduction)
2. [Endpoints](#endpoints)
3. [Request Format](#request-format)
4. [Response Format](#response-format)
5. [Error Handling](#error-handling)
6. [Conclusion](#conclusion)

## Introduction

The `Digital Cow Hut` API provides access to various resources and functionalities. It allows client-side developers to interact with our system programmatically and retrieve, create, update, and delete data. This documentation will guide you on how to make requests, handle responses, and understand the available endpoints.

## Endpoints

The `Digital Cow Hut` API provides the following endpoints:

### Admin 👮🏻

- `POST /admins/create-admin`: Create a new admin.

### User 👤

- `GET /users`: Retrieve a list of users.
- `GET /users/{id}`: Retrieve details of a specific user.
- `POST /users`: Create a new user.
- `PUT /users/{id}`: Update an existing user.
- `DELETE /users/{id}`: Delete a user.

### Cow 🐮

- `GET /cows`: Retrieve a list of cows.
- `GET /cows/{id}`: Retrieve details of a specific cow.
- `POST /cows`: Create a new cow.
- `PUT /cows/{id}`: Update an existing cow.
- `DELETE /cows/{id}`: Delete a cow.

### Order 🛍️

- `GET /orders`: Retrieve a list of orders.
- `GET /orders/{id}`: Retrieve details of a specific order.
- `POST /orders`: Create a new order.

### Profile 👨🏻‍🏫

- `GET /users/my-profile`: Get Profile.
- `PATCH /users/my-profile`: Update Profile.

## Request Format

### Request Headers

Include the following headers in your API requests:

- `Content-Type: application/json` - The format of the request body.

### Request Body

Most endpoints require a request body in JSON format. Refer to the specific endpoint documentation for the required fields and their formats.

## Response Format

### Response Codes

The API returns the following status codes:

- `200 OK` - The request was successful.
- `201 Created` - The requested resource was successfully created.
- `400 Bad Request` - The request was invalid or missing required parameters.
- `401 Unauthorized` - The request lacks valid authentication credentials.
- `404 Not Found` - The requested resource does not exist.
- `500 Internal Server Error` - An unexpected error occurred on the server.

### Response Body

The response body is returned in JSON format. Refer to the specific endpoint documentation for the structure of the response body.

Example error response:

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Orders retrieved successfully",
  "data": {}
}
```

## Error Handling

In case of an error, the API will return a JSON response with an error message and an appropriate status code. The response body will contain an `error` field indicating the error type or message.

Example error response:

```json
{
  "success": false,
  "message": "E11000 duplicate key error collection: univerity-management.students index: email_1 dup key: { email: \"user2@gmail.com\" }",
  "errorMessages": [
    {
      "path": "",
      "message": "E11000 duplicate key error collection: univerity-management.students index: email_1 dup key: { email: \"user2@gmail.com\" }"
    }
  ],
  "stack": "MongoServerError: E11000 duplicate key error collection: univerity-management.students index: email_1 dup key: { email: \"user2@gmail.com\" }\n    at H:\\next-level-development\\university-management-auth-service\\node_modules\\mongodb\\src\\operations\\insert.ts:85:25\n    at H:\\next-level-development\\university-management-auth-service\\node_modules\\mongodb\\src\\cmap\\connection_pool.ts:574:11\n    at H:\\next-level-development\\university-writeOrBuffer (node:internal/streams/writable:391:12)"
}
```

## Conclusion

Congratulations! You have reached the end of the `Digital Cow Hut` API Documentation. You should now have a good understanding of how to authenticate, make requests, handle responses, and work with the available endpoints. If you have any further questions or need assistance, please contact our support team.

Happy coding!
