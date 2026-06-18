const createApp = require("./src/app");

const PORT = process.env.PORT || 3000;

// create express app from app.js
const app = createApp();

// start server (ONLY here, not in app.js)
app.listen(PORT, () => {
  console.log(`Task App running on port ${PORT}`);
});