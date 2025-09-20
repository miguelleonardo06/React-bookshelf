import React from "react";
import { Container, Typography, Grid, Box } from "@mui/material";
import { motion } from "framer-motion";

export default function AboutMeSection({ person }) {

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25, 
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const descVariants = {
    hidden: { opacity: 0, y: -20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut", delay: 0.2 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <Container
      component={motion.div}
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      sx={{ scrollSnapAlign: "start", py: 12, textAlign: "center" }}
    >

      <motion.div variants={titleVariants}>
        <Typography
          variant="h4"
          fontWeight={700}
          color="primary.main"
          gutterBottom
        >
          About Me
        </Typography>
      </motion.div>


      <motion.div variants={descVariants}>
        <Typography
          variant="body1"
          color="text.secondary"
          maxWidth="md"
          mx="auto"
          mb={6}
        >
          {person.about}
        </Typography>
      </motion.div>


      <Grid
        container
        spacing={4}
        justifyContent="center"
        component={motion.div}
        variants={containerVariants}
      >
        {person.cards?.map((card, idx) => (
          <Grid item xs={12} sm={6} md={3} key={idx}>
            <motion.div
              variants={cardVariants}
              whileHover={{ scale: 1.08 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              style={{ height: "100%" }}
            >
              <Box
                sx={{
                  p: 5,
                  borderRadius: 3,
                  boxShadow: 4,
                  bgcolor: "white",
                  color: "black",
                  height: "100%",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    bgcolor: "#f0f0f0",
                    color: "black",
                    boxShadow: 6,
                  },
                }}
              >
                <Typography variant="h6" gutterBottom>
                  {card.title}
                </Typography>
                <Typography variant="body2" sx={{ whiteSpace: "pre-line" }}>
                  {card.content}
                </Typography>
              </Box>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
