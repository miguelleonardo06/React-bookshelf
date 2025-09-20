import { Header } from "./components/Header";
import Box from "@mui/material/Box";
import { Routes, Route, NavLink } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
export function App() {
  return (
    <Box>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Box>
  );
}
