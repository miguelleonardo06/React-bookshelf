import { Trending } from "../components/Trending";
import { Box, Divider } from "@mui/material";
import { AuthomaticSubject } from "../components/AuthomaticSubject";
export function HomePage() {
  return (
    <Box
      sx={{
        padding: "40px",
        width: "100%",
      }}
    >
      <Trending />
      <Divider />
      <AuthomaticSubject title="Popular Fiction" subject="fiction" limit={6} />
      <Divider />
      <AuthomaticSubject
        title="Science & Technology"
        subject="science"
        limit={6}
      />
      <Divider />
      <AuthomaticSubject
        title="History & Biography"
        subject="history"
        limit={6}
      />
    </Box>
  );
}
