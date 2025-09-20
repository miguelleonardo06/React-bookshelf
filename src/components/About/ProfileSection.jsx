import React from "react";
import { Box, Grid, Avatar, Typography } from "@mui/material";
import { motion } from "framer-motion";

export default function ProfileSection({ person }) {
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      sx={{
        scrollSnapAlign: "start",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 8,
      }}
    >
      <Grid container spacing={6} alignItems="center" sx={{ height: "100%" }}>
        <Grid
          item
          xs={12}
          md={6}
          sx={{ display: "flex", justifyContent: "flex-end", pr: { md: 6 } }}
        >
          <Avatar
            src={person.avatar}
            alt={person.name}
            sx={{
              width: 380,
              height: 380,
              border: "10px solid",
              borderColor: "primary.main",
            }}
          />
        </Grid>

        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "left",
          }}
        >
          <Typography variant="h1" fontWeight={800} gutterBottom>
            {person.name}
          </Typography>
          <Typography variant="h3" color="text.secondary" fontWeight={600}>
            {person.role}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
