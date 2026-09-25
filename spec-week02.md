# Books API Week 02 Specification

## Overview

The goal of Week 02 is to update the Books API from Week 01 by adding complete CRUD operations, creating an Authors collection, creating a relationship between books and authors, and documenting all API routes with Swagger.

The API must be testable locally and in the deployed Render environment through Swagger UI at `/api-docs`.

---

# Feature 1: Books API

## Version 1

### Goal

Update the existing Books API so that each book references an author and the API supports complete CRUD operations.

### Data Model

The `books` collection will contain the following fields:

| Field             | Type   | Required | Description                          |
| ----------------- | ------ | -------- | ------------------------------------ |
| `id`              | string | Yes      | Custom book identifier, such as `b1` |
| `authorId`        | string | Yes      | References an existing author        |
| `title`           | string | Yes      | Title of the book                    |
| `publicationDate` | string | Yes      | Publication date in ISO 8601 format  |

### Relationship

Each book must contain an `authorId`.

The `authorId` must match the `id` of an existing author in the `authors` collection.

If a client creates or updates a book with an `authorId` that does not exist, the API will return `400 Bad Request`.

---

## Book Routes

### GET /books

Returns all books.

#### Success

**Status:** `200 OK`

Returns an array of books.

#### Error

**Status:** `500 Internal Server Error`

Returns a safe general error message.

---

### GET /books/:id

Returns one book using its ID.

#### Success

**Status:** `200 OK`

Returns the matching book.

#### Not Found

**Status:** `404 Not Found`

Returned when the requested book does not exist.

#### Error

**Status:** `500 Internal Server Error`

Returns a safe general error message.

---

### POST /books

Creates a new book.

#### Request Body

```json
{
  "id": "b4",
  "authorId": "a1",
  "title": "Example Book Title",
  "publicationDate": "2026-01-15"
}
```

#### Success

**Status:** `201 Created`

Returns the newly created book.

#### Missing Required Field

**Status:** `400 Bad Request`

Returned when a required field is missing.

#### Duplicate ID

**Status:** `400 Bad Request`

Returned when the supplied book ID already exists.

#### Invalid Author

**Status:** `400 Bad Request`

Returned when `authorId` does not reference an existing author.

#### Error

**Status:** `500 Internal Server Error`

Returns a safe general error message.

---

### PUT /books/:id

Updates an existing book.

#### Request Body

```json
{
  "authorId": "a2",
  "title": "Updated Book Title",
  "publicationDate": "2026-02-20"
}
```

#### Success

**Status:** `200 OK`

Returns the updated book.

#### Missing Required Field

**Status:** `400 Bad Request`

Returned when a required field is missing.

#### Invalid Author

**Status:** `400 Bad Request`

Returned when `authorId` does not reference an existing author.

#### Book Not Found

**Status:** `404 Not Found`

Returned when the requested book does not exist.

#### Error

**Status:** `500 Internal Server Error`

Returns a safe general error message.

---

### DELETE /books/:id

Deletes a book.

#### Success

**Status:** `204 No Content`

The book is deleted successfully and no response body is returned.

#### Book Not Found

**Status:** `404 Not Found`

Returned when the requested book does not exist.

#### Error

**Status:** `500 Internal Server Error`

Returns a safe general error message.

---

## Swagger

Every Books route must be documented with OpenAPI/Swagger.

Swagger UI must allow the user to view and test:

* `GET /books`
* `GET /books/:id`
* `POST /books`
* `PUT /books/:id`
* `DELETE /books/:id`

Swagger UI will be available at:

```text
/api-docs
```

---

# Feature 2: Authors API

## Version 1

### Goal

Create an Authors collection and API that allows clients to create, read, update, and delete authors.

### Data Model

The `authors` collection will contain the following fields:

| Field       | Type   | Required | Description                            |
| ----------- | ------ | -------- | -------------------------------------- |
| `id`        | string | Yes      | Custom author identifier, such as `a1` |
| `name`      | string | Yes      | Author's name                          |
| `birthYear` | number | Yes      | Author's year of birth                 |

---

## Author Routes

### GET /authors

Returns all authors.

#### Success

**Status:** `200 OK`

Returns an array of authors.

#### Error

**Status:** `500 Internal Server Error`

Returns a safe general error message.

---

### GET /authors/:id

Returns one author using the author ID.

#### Success

**Status:** `200 OK`

Returns the matching author.

#### Not Found

**Status:** `404 Not Found`

Returned when the author does not exist.

#### Error

**Status:** `500 Internal Server Error`

Returns a safe general error message.

---

### POST /authors

Creates a new author.

#### Request Body

```json
{
  "id": "a1",
  "name": "Example Author",
  "birthYear": 1980
}
```

#### Success

**Status:** `201 Created`

Returns the newly created author.

#### Missing Required Field

**Status:** `400 Bad Request`

Returned when a required field is missing.

#### Duplicate ID

**Status:** `400 Bad Request`

Returned when the supplied author ID already exists.

#### Error

**Status:** `500 Internal Server Error`

Returns a safe general error message.

---

### PUT /authors/:id

Updates an existing author.

#### Request Body

```json
{
  "name": "Updated Author Name",
  "birthYear": 1985
}
```

#### Success

**Status:** `200 OK`

Returns the updated author.

#### Missing Required Field

**Status:** `400 Bad Request`

Returned when a required field is missing.

#### Author Not Found

**Status:** `404 Not Found`

Returned when the author does not exist.

#### Error

**Status:** `500 Internal Server Error`

Returns a safe general error message.

---

### DELETE /authors/:id

Deletes an author.

If the author is still referenced by one or more books, the API will not delete the author.

#### Author Has Books

**Status:** `400 Bad Request`

Returns a safe message explaining that the author cannot be deleted while books still reference the author.

#### Success

**Status:** `204 No Content`

The author is deleted successfully when no books reference the author.

#### Author Not Found

**Status:** `404 Not Found`

Returned when the author does not exist.

#### Error

**Status:** `500 Internal Server Error`

Returns a safe general error message.

---

# Version 1 Evaluation

## 1. Possible Bugs or Short-Sighted Decisions

One possible issue is allowing `birthYear` to contain unreasonable values. The implementation should validate that the value is a number and represents a valid year.

Another concern is that book creation and updates depend on an author existing first. The API must check the Authors collection before creating or updating a book.

The author deletion rule must also be handled carefully. Deleting an author that is still referenced by books would leave invalid references.

---

## 2. Security Considerations

The API should not return raw database errors to clients because those errors may expose internal implementation details.

Input data should be validated before it is stored in MongoDB.

Unexpected server or database errors should return a safe general message with status `500`.

---

## 3. Efficiency Concerns

The API should query only the necessary collection and document when possible.

When checking whether an author exists, the API should search for the specific author ID rather than retrieving all authors.

When checking whether an author can be deleted, the API should check whether books reference that author before deleting the author.

---

## 4. Response and Error Clarity

The API should consistently use appropriate status codes.

Successful creation should use `201`.

Successful updates should use `200`.

Successful deletion should use `204`.

Missing resources should use `404`.

Invalid client input should use `400`.

Unexpected server errors should use `500`.

Error responses should contain safe and understandable messages.

---

# Version 2 — Final Implementation Specification

## Feature 1: Books

### Data Model

The `books` collection must contain:

```text
id
authorId
title
publicationDate
```

All four fields are required.

`id` and `authorId` are strings.

`title` is a string.

`publicationDate` is a string using ISO 8601 date format.

`authorId` must reference an existing author.

---

### Books CRUD Checklist

#### GET /books

* Return all books.
* Return `200` with an array.
* Return `500` with a safe general message if an unexpected error occurs.

#### GET /books/:id

* Search for the book by ID.
* Return `200` with the book when found.
* Return `404` when the book does not exist.
* Return `500` for unexpected errors.

#### POST /books

* Validate all required fields.
* Validate the publication date format.
* Check that the `id` is not already used.
* Check that `authorId` exists in the authors collection.
* Insert the book.
* Return `201` with the created book.
* Return `400` for invalid input.
* Return `500` for unexpected errors.

#### PUT /books/:id

* Check that the book exists.
* Validate all required fields.
* Validate the publication date format.
* Check that `authorId` exists.
* Update the book.
* Return `200` with the updated book.
* Return `404` if the book does not exist.
* Return `400` for invalid input.
* Return `500` for unexpected errors.

#### DELETE /books/:id

* Check that the book exists.
* Delete the book.
* Return `204` with no response body.
* Return `404` if the book does not exist.
* Return `500` for unexpected errors.

---

# Feature 2: Authors

### Data Model

The `authors` collection must contain:

```text
id
name
birthYear
```

All three fields are required.

`id` is a string.

`name` is a string.

`birthYear` is a number representing the author's year of birth.

---

### Authors CRUD Checklist

#### GET /authors

* Return all authors.
* Return `200` with an array.
* Return `500` for unexpected errors.

#### GET /authors/:id

* Search for the author by ID.
* Return `200` when found.
* Return `404` when the author does not exist.
* Return `500` for unexpected errors.

#### POST /authors

* Validate all required fields.
* Validate that `birthYear` is a number.
* Check that the author ID is not already used.
* Insert the author.
* Return `201` with the created author.
* Return `400` for invalid input.
* Return `500` for unexpected errors.

#### PUT /authors/:id

* Check that the author exists.
* Validate all required fields.
* Validate that `birthYear` is a number.
* Update the author.
* Return `200` with the updated author.
* Return `404` if the author does not exist.
* Return `400` for invalid input.
* Return `500` for unexpected errors.

#### DELETE /authors/:id

* Check that the author exists.
* Check whether any books reference the author.
* If books reference the author, do not delete the author.
* Return `400` with a safe message when deletion is blocked because books reference the author.
* If no books reference the author, delete the author.
* Return `204` after successful deletion.
* Return `404` if the author does not exist.
* Return `500` for unexpected errors.

---

# Relationship Rules

The relationship between books and authors is implemented using `authorId`.

Example author:

```json
{
  "id": "a1",
  "name": "Example Author",
  "birthYear": 1980
}
```

Example book:

```json
{
  "id": "b1",
  "authorId": "a1",
  "title": "Example Book",
  "publicationDate": "2026-01-15"
}
```

A book cannot be created or updated with an `authorId` that does not exist.

An author cannot be deleted while books still reference that author.

---

# Swagger Requirements

Swagger/OpenAPI documentation must be provided for every route.

The documentation must include:

* HTTP method
* Route path
* Description
* Parameters where applicable
* Request body for POST and PUT routes
* Expected response status codes
* Response descriptions
* Appropriate JSON schemas/examples where useful

Swagger UI must be available at:

```text
/api-docs
```

Every route must be testable through Swagger UI.

---

# Deployment Requirements

The completed API must work in both environments:

## Local

Test all routes through:

```text
http://localhost:<PORT>/api-docs
```

## Render

Test all routes through the deployed:

```text
https://<your-render-service>/api-docs
```

The deployed Swagger page must allow testing of both Books and Authors routes.

---

# Final Implementation Checklist

Before considering the assignment complete:

* [ ] Books collection includes `authorId`.
* [ ] Authors collection exists.
* [ ] Books CRUD is complete.
* [ ] Authors CRUD is complete.
* [ ] Required fields are validated.
* [ ] Duplicate IDs are handled.
* [ ] Invalid `authorId` values are rejected.
* [ ] Author deletion checks for referenced books.
* [ ] Appropriate HTTP status codes are returned.
* [ ] Unexpected errors return safe messages.
* [ ] All Books routes are documented in Swagger.
* [ ] All Authors routes are documented in Swagger.
* [ ] Swagger works locally.
* [ ] Swagger works on Render.
* [ ] Every route has been tested.
* [ ] GitHub Issues correspond to the implementation.
* [ ] Separate Books and Authors branches/PRs are used.
* [ ] Both PRs are merged.
* [ ] Reflection includes all required links and answers.
* [ ] Walk-through video demonstrates the required features.
