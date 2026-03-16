import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/NavBar";
import Landing from "./pages/Landing";
import Quiz from "./pages/quiz";
import Resources from "./pages/resources";

function App() {
  return (
    <Router>

      <Navbar />

      <main>
        <Routes>

          <Route path="/" element={<Landing />} />

          <Route path="/quiz" element={<Quiz />} />

          <Route path="/resources" element={<Resources />} />

        </Routes>
      </main>

    </Router>
  );
}

export default App;