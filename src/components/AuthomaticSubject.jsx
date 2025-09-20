import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Grid,
  Skeleton,
} from "@mui/material";
import MovingIcon from "@mui/icons-material/Moving";
import StarIcon from "@mui/icons-material/Star";
import { useEffect, useState } from "react";
import axios from "axios";
export function AuthomaticSubject({ subject, limit, title }) {
  const [datas, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    setIsLoading(true);
    axios({
      url: `https://openlibrary.org/search.json?subject=${subject}&limit=${limit}`,
      method: "GET",
    })
      .then((res) => setData(res.data.docs))
      .then(() => setIsLoading(false))
      .catch((err) => {
        setIsLoading(false);
        setError(err.message);
      });
  }, []);
  return (
    <Box sx={{ padding: "10px 15px" }}>
      <Typography variant="h3" sx={{ fontWeight: 500, fontSize: "24px" }}>
        {title}
      </Typography>
      <Typography
        variant="h5"
        sx={{ fontWeight: 300, fontSize: "20px", color: "red" }}
      >
        {error}
      </Typography>
      <Box sx={{ margin: "25px 0px" }}>
        <Grid container spacing={2}>
          {isLoading
            ? Array.from(new Array(6)).map((_, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  <Skeleton
                    variant="rectangular"
                    width={250}
                    height={350}
                    sx={{
                      borderRadius: 2,
                      backgroundColor: "rgba(255,255,255,0.1)",
                    }}
                  />
                </Grid>
              ))
            : datas.map((data, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  <Card
                    sx={{
                      width: 250,
                      height: 350,
                      backgroundColor: "rgba(0,0,0,0.5)",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <CardMedia
                      sx={{ height: 140 }}
                      image={`https://covers.openlibrary.org/b/id/${data.cover_i}-M.jpg`}
                    />
                    <CardContent
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                        flexGrow: 1, // take available space
                      }}
                    >
                      <Typography sx={{ fontWeight: 800 }}>
                        {data.title}
                      </Typography>
                      <Typography
                        sx={{ fontWeight: 200, fontSize: "13px", opacity: 0.8 }}
                      >
                        By {data.author_name}
                      </Typography>
                      <Typography
                        sx={{ fontWeight: 200, fontSize: "13px", opacity: 0.8 }}
                      >
                        Published: {data.first_publish_year}
                      </Typography>

                      {/* Footer pinned at bottom */}
                      <Box
                        sx={{
                          marginTop: "auto", // pushes this section to bottom
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Chip
                          icon={<MovingIcon />}
                          label={`#${index + 1} Trending`}
                          sx={{ fontWeight: 700, fontSize: "13px" }}
                        />
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <StarIcon
                            sx={{ color: "yellow", fontSize: "14px" }}
                          />
                          <Typography
                            sx={{
                              fontWeight: 200,
                              fontSize: "13px",
                              opacity: 0.8,
                            }}
                          >
                            {Number((Math.random() * (5 - 1) + 1).toFixed(1))}
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
        </Grid>
      </Box>
    </Box>
  );
}
