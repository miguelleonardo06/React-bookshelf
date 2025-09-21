import { Randomizer } from "../components/Randomizer";
import { Box, Typography, Button } from "@mui/material";
import { useState } from "react";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
export function RandomizerPage() {
  const [isRandomizerOn, setIsRandomizerOn] = useState(false);
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh", // 👈 allow page to expand
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
        py: 4, // add some top padding
        zIndex: 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Typography variant="h3">Random Book Discovery</Typography>
        <Typography variant="p">
          Discover new author, book, genre and etc.
        </Typography>
        <Button
          variant="contained"
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
          onClick={() => setIsRandomizerOn(!isRandomizerOn)}
        >
          <EmojiObjectsIcon color="inherit" />
          Discover Now
        </Button>
      </Box>
      <Randomizer
        isRandomizerOn={isRandomizerOn}
        setIsRandomizerOn={setIsRandomizerOn}
      />
    </Box>
  );
}
