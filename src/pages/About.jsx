import React, { useState } from "react";
import { Box } from "@mui/material";
import ProfileSection from "../components/About/ProfileSection";
import AboutMeSection from "../components/About/AboutMeSection";
import SkillsSection from "../components/About/SkillsSection";
import UserSwitcher from "../components/About/UserSwitcher";
import mikoPic from "../images/miko1.jpg";
import miguelPic from "../images/leonardo1.jpg";


const members = [
  {
    id: 1,
    name: "Miko Rivera",
    role: "Network Administrator",
    avatar: mikoPic,
    about:
      "I am passionate about designing, configuring, and maintaining reliable networks. My expertise includes routing, switching, network security, and troubleshooting. I enjoy solving connectivity issues, optimizing performance, and ensuring secure communication across systems.",
    skills: [
      { name: "Cisco", level: 90 },
      { name: "Firewalls", level: 85 },
      { name: "MikroTik", level: 70 },
      { name: "Subnetting", level: 80 },
      { name: "Security", level: 75 },
      { name: "Configuration", level: 65 },
    ],
    cards: [
      { title: "🎓 Education", content: "Bachelor of Computer Science\nHoly Cross College" },
      { title: "💼 Experience", content: "1 Year as Network Administrator\nCISCO" },
      { title: "🎂 Birthday", content: "July 28, 2002" },
      { title: "📍 Address", content: "San Pablo\nSanta Ana, Pamp" },
    ],
  },
  {
    id: 2,
    name: "Miguel Leonardo",
    role: "React Developer",
    avatar: miguelPic,
    about:
      "I enjoy creating efficient APIs and managing scalable databases. My passion lies in problem-solving, automation, and cloud deployment.",
    skills: [
      { name: "Node.js", level: 92 },
      { name: "Express", level: 88 },
      { name: "MongoDB", level: 80 },
      { name: "PostgreSQL", level: 70 },
      { name: "Docker", level: 75 },
      { name: "Kubernetes", level: 60 },
    ],
    cards: [
      { title: "🎓 Education", content: "Bachelor of Information Technology\nBulacan" },
      { title: "💼 Experience", content: "5+ years Backend Development\nNode.js & Databases" },
      { title: "🎂 Birthday", content: "March 10, 2000" },
      { title: "📍 Address", content: "Bulacan\nLuzon" },
    ],
  },
];

export function About() {
  const [selected, setSelected] = useState(1);
  const person = members.find((m) => m.id === selected);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        overflowY: "auto",
        scrollSnapType: "y mandatory",
      }}
    >
      <UserSwitcher
        members={members}
        selected={selected}
        setSelected={setSelected}
      />

      <ProfileSection person={person} />
      <AboutMeSection person={person} />
      <SkillsSection person={person} />
    </Box>
  );
}
