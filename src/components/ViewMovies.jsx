import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Tooltip,
  CircularProgress,
  IconButton,
} from "@mui/material";
import {
  ArrowBackIos,
  ArrowForwardIos,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { deleteMovie, getMovieList } from "../services/Auth";
import { useNavigate } from "react-router-dom";

function ViewMovies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  const fetchMovies = async () => {
    try {
      const response = await getMovieList();
      setMovies(response.data.list || []);
    } catch (error) {
      console.error(error);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleEdit = (movie) => {
    navigate(`/updateMovies?id=${movie.id}`);
  };

  const handleDelete = async (id) => {
    try {
      const response = await deleteMovie(id);
      if (response.data.code === "200") {
        alert("Record Deleted Successfully!!");
        setMovies((prev) => prev.filter((m) => m.id !== id));
        window.location.reload();
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Scroll helpers
  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -400, behavior: "smooth" });
  };
  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 400, behavior: "smooth" });
  };

  return (
    <Box
      sx={{
        p: 4,
        backgroundColor: "#0a3d48",
        minHeight: "100vh",
        color: "#fff",
      }}
    >
      <Typography
        variant="h4"
        sx={{ fontWeight: "bold", mb: 4, textAlign: "center" }}
      >
        🎬 Movie Gallery
      </Typography>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
          <CircularProgress color="inherit" />
        </Box>
      ) : movies.length === 0 ? (
        <Typography variant="h6" sx={{ textAlign: "center", mt: 8 }}>
          No movies found
        </Typography>
      ) : (
        <Box sx={{ position: "relative" }}>
          {/* Left Arrow */}
          <IconButton
            onClick={scrollLeft}
            sx={{
              position: "absolute",
              left: 0,
              top: "40%",
              zIndex: 2,
              color: "#fff",
            }}
          >
            <ArrowBackIos />
          </IconButton>

          {/* Right Arrow */}
          <IconButton
            onClick={scrollRight}
            sx={{
              position: "absolute",
              right: 0,
              top: "40%",
              zIndex: 2,
              color: "#fff",
            }}
          >
            <ArrowForwardIos />
          </IconButton>

          {/* Scrollable Container */}
          <Box
            ref={scrollRef}
            sx={{
              display: "flex",
              overflowX: "auto",
              scrollBehavior: "smooth",
              gap: 2,
              py: 2,
              px: 4,
            }}
          >
            {movies.map((movie, index) => {
              const poster = `https://resources.mpcz.in:8888/RCDC/api/movie/dw_f/${movie.image}`;
              return (
                <Card
                  key={movie.id || index}
                  sx={{
                    minWidth: 200,
                    flexShrink: 0,
                    backgroundColor: "#0e4955",
                    color: "#fff",
                    borderRadius: "16px",
                    overflow: "hidden",
                    boxShadow: "0 4px 15px rgba(0,0,0,0.4)",
                  }}
                >
                  <CardMedia
                    component="img"
                    height="250"
                    image={poster}
                    alt={movie.title}
                  />
                  <CardContent>
                    <Typography variant="subtitle1">
                      {movie.title || "Untitled"}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#a7b1b7" }}>
                      Year: {movie.year || "Unknown"}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Tooltip title="Edit Movie" placement="top">
                      <Button
                        size="small"
                        variant="contained"
                        color="inherit"
                        onClick={() => handleEdit(movie)}
                      >
                        <EditIcon color="secondary" />
                      </Button>
                    </Tooltip>
                    <Tooltip title="Delete Movie" placement="top">
                      <Button
                        size="small"
                        variant="contained"
                        color="inherit"
                        onClick={() => handleDelete(movie.id)}
                      >
                        <DeleteIcon color="error" />
                      </Button>
                    </Tooltip>
                  </CardActions>
                </Card>
              );
            })}
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default ViewMovies;
