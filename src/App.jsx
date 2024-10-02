import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "./pages/auth";
import ExpenseTracker from "./pages/expense-tracker";
import { ThemeToggleProvider } from "./ThemeContext";

function App() {
  return (
    <ThemeToggleProvider> {/* Wrap Router with the ThemeToggleProvider */}
      <Router>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/expense-tracker" element={<ExpenseTracker />} />
        </Routes>
      </Router>
    </ThemeToggleProvider>
  );
}

export default App;
