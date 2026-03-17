import dotenv from "dotenv";
dotenv.config();
import app from "./app.js";
import initDb from "./src/config/initDB.js"; 

const PORT = process.env.PORT || 3001;

(async () => {
  await initDb();

  app.listen(PORT, () => {
  setTimeout(() => {
    console.log(">~~~~~~~~~~~Backend: http://localhost:3001/api/aquatic-resources ~~~~~~~~~~~<");
    console.log(">~~~~~~~~~~~Frontend: http://localhost:5173 ~~~~~~~~~~~<");
  }, 3000);
});

})();