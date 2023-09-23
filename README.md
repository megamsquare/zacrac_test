# Title: RESTful API for managing a collection of user profiles
This project is to create APIs that involves CRUD operations for user profile.

### Setup and installation
Make sure you have your docker running, because this APIs runs on Docker for database and environment control.

To initialize this API, run

```bash
docker-compose up -d
```

it will run on http://localhost:3001

## API Endpoints

### POST /api/v1/user

Create a user

#### Request

- Method: POST
- Path: /api/v1/user
- Request Body: The first_name, last_name, email, username and phone_number is requested

Example of Request body:
{
  "first_name": "User",
  "last_name": "Test",
  "username": "user",
  "email": "user@example.com",
  "phone_number": "+2348012345678"
}

Response

Status Code: 201 (CREATED)

### GET /api/v1/user

Get all users profile

#### Request

- Method: GET
- Path: /api/v1/user
- Request Body: None

Response

Status Code: 200 (OK)
Response Body: This will return list of users that are available in the system.

### PUT /api/v1/user/:id

Update user profile

#### Request

- Method: POST
- Path: /api/v1/user/:id
- Request Body: This API need the params to be the user id before providing the request body

Example of Request body:
{
  "first_name": "User",
  "last_name": "Test",
  "username": "user2",
  "email": "user2@example.com",
  "phone_number": "+2347038089237"
}

Response

Status Code: 200 (OK)
Response Body: This will return the information of the updated user.

### GET /api/v1/user/:identifier

Get User profile by userid/username/email

#### Request

- Method: GET
- Path: /api/v1/user/:identifier
- Request Body: This gets the userid/username/email in the parameter

Example of Request body:
NONE

Response

Status Code: 200 (OK)
Response Body: This will return user profile that belong to the userid/username/email passed in the parameter.

### DELETE /api/v1/user/:identifier

Login user Updates Blog by blog id

#### Request

- Method: DELETE
- Path: /api/v1/user/:identifier
- Request Body: This get the userid/username/email in the parameter

Example of Request body:
NONE

Response

Status Code: 200 (OK)
Response Body: This will return user profile that belong to the userid/username/email passed in the parameter.

### Stop Project
To stop the project, you can run the below command in the terminal.

```bash
docker-compose down
```

### Testing
To test, you need to run the below syntax in your terminal:

```bash
npm test
```

- Note:The test only runs for register and login user,  

### Technologies Used
- Node.js
- Express.js
- MongoDB
- Mongoose
- Dotenv
- Http-status
- Typescript
- Jest
- Supertest
- Ts-node