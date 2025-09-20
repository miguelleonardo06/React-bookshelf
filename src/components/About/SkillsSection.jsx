import React from "react";
import { Container, Typography, Grid, Box } from "@mui/material";
import { motion } from "framer-motion";
import AnimatedCounter from "./AnimatedCounter";

export default function SkillsSection({ person }) {

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
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
      key={person.id} 
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.3 }}
      variants={containerVariants}
      sx={{ scrollSnapAlign: "start", py: 12, maxWidth: "900px" }}
    >

      <motion.div variants={titleVariants}>
        <Typography
          variant="h4"
          fontWeight={700}
          color="primary.main"
          textAlign="center"
          gutterBottom
        >
          Skills
        </Typography>
      </motion.div>


      <Grid container spacing={3} mt={2} justifyContent="center">
        {person.skills.map((skill, idx) => (
          <Grid item xs={12} sm={6} md={6} key={skill.name}>
            <motion.div variants={cardVariants}>
              <Box
                sx={{
                  position: "relative",
                  height: 64,
                  borderRadius: 3,
                  backgroundColor: "rgba(255,255,255,0.08)",
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  px: 3,
                }}
              >

                <motion.div
                  key={`${person.id}-${skill.name}`} 
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: false, amount: 0.6 }}
                  transition={{
                    duration: 1.1,
                    ease: "easeOut",
                    delay: idx * 0.06,
                  }}
                  style={{
                    height: "100%",
                    background:
                      "linear-gradient(90deg, #4caf50 0%, #2196f3 100%)",
                    position: "absolute",
                    left: 0,
                    top: 0,
                    borderRadius: 16,
                    zIndex: 0,
                  }}
                />


                <Box
                  sx={{
                    position: "relative",
                    zIndex: 1,
                    flex: 1,
                    textAlign: "center",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      color: "common.white",
                      fontWeight: 700,
                      textShadow: "0 1px 0 rgba(0,0,0,0.3)",
                    }}
                  >
                    {skill.name}
                  </Typography>
                </Box>


                <Box
                  sx={{
                    position: "relative",
                    zIndex: 1,
                    bgcolor: "background.paper",
                    borderRadius: "50%",
                    width: 44,
                    height: 44,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: 3,
                  }}
                >
                  <motion.span
                    key={`${person.id}-${skill.name}-percent`} 
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: false, amount: 0.6 }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    style={{ fontSize: "0.9rem", fontWeight: 700 }}
                  >
                    <AnimatedCounter value={skill.level} />
                  </motion.span>
                </Box>
              </Box>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
