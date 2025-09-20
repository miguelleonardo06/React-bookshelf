import { Box, Divider } from "@mui/material";
import { AutomaticSubject } from "../components/AutomaticSubject";
export function HomePage() {
  return (
    <Box
      sx={{
        padding: "40px",
        width: "100%",
      }}
    >
      <AutomaticSubject
        title="Trending Books today"
        subject="trending"
        limit={12}
      />
      <Divider />
      <AutomaticSubject title="Popular Fiction" subject="fiction" limit={6} />
      <Divider />
      <AutomaticSubject
        title="Science & Technology"
        subject="science"
        limit={6}
      />
      <Divider />
      <AutomaticSubject
        title="History & Biography"
        subject="history"
        limit={6}
      />
    </Box>
  );
}
