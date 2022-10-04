# Social Eyes - a social media backend

## Purpose

Demonstate usage and theory of the MERN stack by creating a backend and APIs that are designed for a social media website.

## Built with

- MongoDB
- Mongoose
- Express
- DayJS

## Getting Started

- Install MongoDB Community Server - [MongoDB Community Download]('https://www.mongodb.com/try/download/community2')
- Clone this repo - `git clone https://github.com/gatorhatur/social-eys.git`
- Install the dependencies with - `npm i`

### You're Ready!

From the ../social-eyes root directory - `npm start`
Use an api tool such as Insomnia or Postman to try it out

## Available APIs (CRUD operations on all)

### Users

GET /api/users - Get all Users<br>
POST /api/users - Create User<br>
GET /api/users/:userId - Get user by id<br>
PUT /api/users/:userId - Update user by id<br>
DELETE /api/users/:userId - Delete user by id<br>

### Friends

PUT /api/users/:userId/friends/:friendId - Add friend to userId<br>
DELETE /api/users/:userId/friends/:friendId - Delete friend from userId<br>

### Thoughts

GET /api/thoughts - Get all Thoughts<br>
POST /api/thoughts - Create thought and associate to User<br>
PUT /api/thoughts/:thoughtId - Update thought by id<br>
DELETE /api/thoughts/:thoughtId - Delete thought by id<br>

### Reactions

POST /api/thoughts/:thoughtId/reactions - Create reaction to thought by id<br>
DELETE /api/thoughts/:thoughtId/reactions/:reactionId - Delete reaction <br>

![Insomnia Sample](/snapshot.JPG)

## Links

[View Demo](https://drive.google.com/file/d/16lCxsoWMomarv1JJ98shtwZKekiMfOz1/view)<br>
[Checkout the Code](https://github.com/gatorhatur/social-eyes)
