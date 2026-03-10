// backend/server.js
require("dotenv").config();
const app = require("./app");
const initDb = require("./src/config/initDB");

const PORT = process.env.PORT || 3001;

(async () => {
  await initDb();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(">~~~~~~~~~~~Backend: http://localhost:3001/api/aquatic-resources ~~~~~~~~~~~<");
    console.log(">~~~~~~~~~~~Frontend: http://localhost:5173 ~~~~~~~~~~~<")
  });

})();