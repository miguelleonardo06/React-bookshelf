import { Box, Button, TextField, Typography } from "@mui/material";
import { Search, TextAlignCenter } from "lucide-react";
import { useState } from "react";
import { AutomaticSubject } from "../components/AutomaticSubject";

export function BrowsePage() {
  const [bookSearch, setBookSearch] = useState("");
  const [submittedSearch, setSubmittedSearch] = useState("");

  function handleBrowse() {
    setSubmittedSearch(encodeURIComponent(bookSearch));
  }

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
        py: 4,
        zIndex: 1,
      }}
    >
      {/* Search Section */}
      <Box
        sx={{
          width: "100%",
          maxWidth: 600,
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <Typography variant="h3" align="center">
          Browse Books
        </Typography>

        <Box sx={{ display: "flex" }}>
          <TextField
            placeholder="Search for Books, authors, or subjects..."
            variant="outlined"
            fullWidth
            value={bookSearch}
            onChange={(e) => setBookSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleBrowse();
            }}
            sx={{
              "& .MuiInputBase-input": { padding: "10px" },
            }}
          />
          <Button
            variant="outlined"
            sx={{ color: "white", whiteSpace: "nowrap", marginLeft: "10px" }}
            onClick={handleBrowse}
          >
            Search
          </Button>
        </Box>
      </Box>

      {/* Results show BELOW search box */}
      {submittedSearch && (
        <Box sx={{ width: "100%" }}>
          <AutomaticSubject bookSearch={submittedSearch} limit={24} />
        </Box>
      )}
    </Box>
  );
}
