# Post API Project

This project is a simple POST API that receives JSON data and stores it in MongoDB. It is built using TypeScript, Express, and Mongoose.

## Project Structure

```
post-api-project
├── src
│   ├── app.ts
│   ├── controllers
│   │   └── postController.ts
│   ├── models
│   │   └── postModel.ts
│   ├── routes
│   │   └── postRoutes.ts
│   └── types
│       └── index.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Setup Instructions

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd post-api-project
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Set up MongoDB:**
   Ensure you have MongoDB installed and running. You can use a local instance or a cloud service like MongoDB Atlas.

4. **Run the application:**
   ```
   npm start
   ```

## API Usage

### Create a Post

- **Endpoint:** `POST /api/posts`
- **Request Body:**
  ```json
  {
    "title": "Post Title",
    "content": "Post Content",
    "author": "Author Name"
  }
  ```

### Get Posts

- **Endpoint:** `GET /api/posts`
- **Response:**
  ```json
  [
    {
      "title": "Post Title",
      "content": "Post Content",
      "author": "Author Name"
    },
    ...
  ]
  ```

## License

This project is licensed under the MIT License.