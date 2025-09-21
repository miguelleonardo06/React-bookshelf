import {
  Box,
  Card,
  CardContent,
  Chip,
  CardMedia,
  Typography,
  Grid,
  Modal,
  Button,
  Skeleton,
} from "@mui/material";
import MovingIcon from "@mui/icons-material/Moving";
import InfoIcon from "@mui/icons-material/Info";
import StarIcon from "@mui/icons-material/Star";
import { useEffect, useState } from "react";
import axios from "axios";

const subjects = [
  "fiction",
  "science",
  "history",
  "mystery",
  "romance",
  "fantasy",
  "biography",
  "adventure",
  "thriller",
  "comedy",
  "drama",
  "poetry",
];
export function Randomizer({ isRandomizerOn }) {
  const [isLoading, setIsLoading] = useState(false);

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const [discovered, setDiscovered] = useState([]);

  const url = "https://openlibrary.org/search.json?";

  useEffect(() => {
    if (!isRandomizerOn) return;
    setIsLoading(true);
    let index = 0;
    for (let i = 0; i < 12; i++) {
      axios.get(`${url}subject=${subjects[index]}&limit=2`).then((res) => {
        setDiscovered((prev) => [...prev, ...res.data.docs]);
      });

      index = index + 1;
    }
    setIsLoading(false);
  }, [isRandomizerOn]);

  return (
    <Box sx={{ padding: "10px 15px" }}>
      <Box sx={{ margin: "25px 0px" }}>
        <Grid
          container
          spacing={2}
          sx={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
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
            : discovered.map((data, index) => {
                const rating = Number((Math.random() * (5 - 1) + 1).toFixed(1));

                return (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                    <Card
                      sx={{
                        width: 250,
                        height: 300,
                        backgroundColor: "rgba(0,0,0,0.5)",
                        display: "flex",
                        flexDirection: "column",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setModalOpen(!isModalOpen);
                        setSelectedItem({ ...data, rating });
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
                          flexGrow: 1,
                        }}
                      >
                        <Typography sx={{ fontWeight: 800 }}>
                          {data.title}
                        </Typography>
                        <Typography
                          sx={{
                            fontWeight: 200,
                            fontSize: "13px",
                            opacity: 0.8,
                          }}
                        >
                          By {data.author_name?.join(", ")}
                        </Typography>
                        <Typography
                          sx={{
                            fontWeight: 200,
                            fontSize: "13px",
                            opacity: 0.8,
                          }}
                        >
                          Published: {data.first_publish_year}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
        </Grid>
      </Box>

      {isModalOpen && (
        <MyModal
          isModalOpen={isModalOpen}
          setModalOpen={setModalOpen}
          selectedItem={selectedItem}
        />
      )}
    </Box>
  );
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
};

export default function MyModal({ isModalOpen, setModalOpen, selectedItem }) {
  const [isSeeMoreOpen, setIsSeeMoreOpen] = useState(false);
  const [itemDetails, setItemDetails] = useState("");
  const lorem =
    "  Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim vero doloremque et dolore voluptate, error itaque ipsa vel totam nemo quibusdam eius eos quod, adipisci eaque facilis. Odio, repellendus pariatur.";

  const url = `https://openlibrary.org`;
  useEffect(() => {
    if (selectedItem.subject === "trending") {
      axios({
        url: `${url}${selectedItem.key}.json`,
        method: "GET",
      }).then((res) => setItemDetails(res.data.description));
    }
  }, [selectedItem, itemDetails]);

  console.log(selectedItem);

  if (!selectedItem) return null;
  return (
    <div>
      <Modal
        open={isModalOpen}
        onClose={() => setModalOpen(!isModalOpen)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            component="img"
            sx={{ height: "auto", width: 200, objectFit: "cover" }}
            src={`https://covers.openlibrary.org/b/id/${selectedItem.cover_i}-M.jpg`}
            alt={selectedItem.title}
          ></Box>
          <Box
            sx={{
              marginLeft: "15px",
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 700, fontSize: "18px" }}>
              {selectedItem.title}
            </Typography>
            <Typography variant="p" sx={{ fontWeight: 300, fontSize: "14px" }}>
              {selectedItem.author_name}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <StarIcon sx={{ color: "yellow", fontSize: "16px" }} />
              <Typography variant="span" sx={{ fontSize: "14px" }}>
                {selectedItem.rating}
              </Typography>
            </Box>
            <Typography variant="p" sx={{ fontWeight: 300, fontSize: "14px" }}>
              Published {selectedItem.first_publish_year}
            </Typography>
            <Typography variant="p" sx={{ fontWeight: 300, fontSize: "14px" }}>
              Duplicate{" "}
              {selectedItem.public_scan_b ? "Guaranteed" : "Not specified"}
            </Typography>
            <Typography variant="p" sx={{ fontWeight: 300, fontSize: "14px" }}>
              {selectedItem.subject === "trending"
                ? !isSeeMoreOpen && itemDetails
                  ? itemDetails.slice(0, 60)
                  : itemDetails
                : lorem}
              <Button
                variant="outlined"
                sx={{ border: "none", width: "fit-content", fontSize: "12px" }}
                onClick={() => setIsSeeMoreOpen(!isSeeMoreOpen)}
              >
                {selectedItem.subject === "trending" &&
                  (isSeeMoreOpen ? "Less" : "See More...")}
              </Button>
            </Typography>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
