import { Header } from "./components/Header";
import Box from "@mui/material/Box";
import { Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { BrowsePage } from "./pages/BrowsePage";
import { About } from "./pages/About";
import { RandomizerPage } from "./pages/RandomizerPage";
export function App() {
  return (
    <Box>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/browse" element={<BrowsePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/random" element={<RandomizerPage />} />
      </Routes>
    </Box>
  );
}
