# Setting Up the Backend

To set up the backend and start contributing, follow these steps:


1. **Install Dependencies:**
   Ensure you have Node.js and npm installed. Then run:
   ```bash
   npm install
   ```
2. **Configure Environment Variables:**
   Create a `.env` file in the root directory and populate it with the necessary environment variables (refer to the existing `.env` file for structure).

3. **Start the Server:**
   Run the application using:
   ```bash
   npm start
   ```
   The server will be accessible at `http://localhost:3000`.


## Folder Structure 

backend/

node_modules/
src/ **have all the code of the backend**
   connections/
      db_and_redis_connection.js 
   function/
   routes/
      chat.js **have the AI chat feature route** 
      recommend.js **route to find the PC part recommendation**
   schema/
      