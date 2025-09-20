import React from "react";
import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { motion } from "framer-motion";

export default function UserSwitcher({ members, selected, setSelected }) {
  const handleChange = (_, newValue) => {
    if (newValue !== null) setSelected(newValue);
  };

  return (
    <Box
      component={motion.div}
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      sx={{
        position: "fixed",
        bottom: 24,
        right: 24,
        zIndex: 1300,
      }}
    >
      <ToggleButtonGroup
        value={selected}
        exclusive
        onChange={handleChange}
        sx={{ bgcolor: "background.paper", borderRadius: 2, boxShadow: 2 }}
      >
        {members.map((m) => (
          <ToggleButton
            key={m.id}
            value={m.id}
            sx={{
              textTransform: "none",
              fontWeight: "bold",
              px: 3,
              "&.Mui-selected": {
                bgcolor: "primary.main",
                color: "white",
              },
            }}
          >
            {m.name.split(" ")[0]}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Box>
  );
}
