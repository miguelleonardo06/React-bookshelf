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

export function AutomaticSubject({ subject, limit, title, bookSearch }) {
  const [datas, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const url = "https://openlibrary.org/search.json?";

  useEffect(() => {
    setIsLoading(true);
    if (subject === "trending") {
      axios({
        url: "https://openlibrary.org/trending/daily.json",
        method: "GET",
      })
        .then((res) => setData(res.data.works.slice(0, 12)))
        .then(() => setIsLoading(false))
        .catch((err) => {
          setIsLoading(false);
          setError(err.message);
        });
    } else if (subject && limit) {
      axios({
        url: `${url}subject=${subject}&limit=${limit}`,
        method: "GET",
      })
        .then((res) => setData(res.data.docs))
        .then(() => setIsLoading(false))
        .catch((err) => {
          setIsLoading(false);
          setError(err.message);
        });
    } else if (bookSearch) {
      axios({
        url: `${url}q=${bookSearch}`,
        method: "GET",
      })
        .then((res) => {
          setData(res.data.docs.slice(0, limit));
        })
        .then(() => {
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
          setError("No books found.");
        });
    }
  }, [bookSearch]);

  return (
    <Box sx={{ padding: "10px 15px", width: "100%" }}>
      <Typography variant="h3" sx={{ fontWeight: 500, fontSize: "24px" }}>
        {title}
      </Typography>

      {!isLoading && datas.length === 0 ? (
        <Typography
          variant="h5"
          sx={{
            fontWeight: 300,
            fontSize: "20px",
            textAlign: "center",
            color: "white",
            backgroundColor: "rgba(255, 0, 0, 0.5)",
            padding: "5px",
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
            gap: 1,
          }}
        >
          <InfoIcon />
          {"No books found."}
        </Typography>
      ) : (
        <Typography
          variant="h5"
          sx={{ fontWeight: 300, fontSize: "20px", color: "red" }}
        >
          {error}
        </Typography>
      )}

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
            ? Array.from(new Array(12)).map((_, index) => (
                <Grid item xs={12} sm={6} md={5} lg={3} key={index}>
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
            : datas.map((data, index) => {
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
                        setSelectedItem({ ...data, rating, subject });
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
                          sx={{
                            fontWeight: 200,
                            fontSize: "13px",
                            opacity: 0.8,
                          }}
                        >
                          By {data.author_name}
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

                        {subject === "trending" ? (
                          <Box
                            sx={{
                              marginTop: "auto",
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
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                              }}
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
                                {rating}
                              </Typography>
                            </Box>
                          </Box>
                        ) : (
                          <Box
                            sx={{
                              marginTop: "auto",
                              display: "flex",
                              justifyContent: "end",
                              alignItems: "center",
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "end",
                                gap: 1,
                              }}
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
                                {rating}
                              </Typography>
                            </Box>
                          </Box>
                        )}
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
