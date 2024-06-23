# Song Repository

This project is a Node.js application that interacts with a PostgreSQL database to manage song records. It includes functionalities to add, retrieve, update, and delete song records using asynchronous functions and connection pooling.

## Prerequisites

- Node.js installed on your machine
- PostgreSQL installed and running
- A PostgreSQL database and table created for storing song data

## Installation

1. Clone the repository to your local machine

2. Install the required dependencies:

    ```bash
    npm install
    ```

3. Set up your environment variables. Create a `.env` file in the src/ directory of your project and add the following variables from `.env.example`:

    ```plaintext
    USER_DB=your_db_user
    HOST_DB=your_db_host
    DB_NAME=your_db_name
    PASSWORD_DB=your_db_password
    DB_PORT=your_db_port
    ```

4. Create the PostgreSQL database and table. You can use the following SQL script to create the table:

    ```sql
    CREATE DATABASE song_repository;

    \c song_repository

    CREATE TABLE canciones (
        id SERIAL PRIMARY KEY,
        titulo VARCHAR(255) NOT NULL,
        artista VARCHAR(255) NOT NULL,
        tono VARCHAR(50) NOT NULL
    );
    ```

## Usage

1. Navigate to the src/ directory and run the application:

    ```bash
    node server.js
    ```

2. Open your browser and navigate to `http://localhost:3000` to interact with the web interface.

## API Endpoints

### Add a new song

- **URL:** `/cancion`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "title": "Song Title",
    "artist": "Artist Name",
    "tune": "Tune"
  }
  ```
  
### Retrieve all songs

- **URL:** `/canciones`
- **Method:** `GET`
- **Success Response:**
  - **Code:** 200
  - **Content:** 
    ```json
    [
      {
        "id": 1,
        "titulo": "song title",
        "artista": "artist name",
        "tono": "tune"
      }
    ]
    ```

### Update a song

- **URL:** `/cancion/:id`
- **Method:** `PUT`
- **Body:**
  ```json
  {
    "title": "Updated Song Title",
    "artist": "Updated Artist Name",
    "tune": "Updated Tune"
  }
  ```

### Delete a song

- **URL:** `/cancion/:id`
- **Method:** `DELETE`
- **Success Response:**
  - **Code:** 200
  - **Content:** 
    ```json
    {
      "message": "Song with id 1 deleted successfully"
    }
    ```

## Functions

- `addSong(title, artist, tune)`: Adds a new song to the database.
- `getSongs()`: Retrieves all songs from the database.
- `editSong(id, title, artist, tune)`: Updates the details of a song identified by its `id`.
  - It can handle parcial updates
- `deleteSong(id)`: Deletes a song from the database identified by its `id`.

## Error Handling

The application uses prepared statements to prevent SQL injection and includes error handling to manage database query errors.
