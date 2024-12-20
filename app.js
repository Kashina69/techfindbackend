import express from "express";

// Import routes
import recommend_router from './src/routes/recommend.routes.js';
import chat_router from './src/routes/chat.routes.js';
// import add_components from './src/routes/add_components.routes.js';

// Constants and app initialization
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Route middleware
app.use('/api/recommend', recommend_router);
app.use('/api/chat', chat_router);

// Start server
app.listen(PORT, () =>
  console.log(`Server running on port http://localhost:${PORT}/`)
);