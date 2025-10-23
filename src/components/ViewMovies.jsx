// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Typography,
//   TextField,
//   Button,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Tooltip,
// } from "@mui/material";
// import { styled, tableCellClasses } from "@mui/material";
// import VisibilityIcon from "@mui/icons-material/Visibility";

// // 🎨 Color theme
// export const headerBackground = "linear-gradient(135deg, #4F77AA, #1E3C72)";
// export const oddRowBackground = "#F0F6FF";
// export const evenRowBackground = "#E4EDFA";
// export const hoverBackground = "#D7E7FF";

// //  Styled Components
// export const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     background: headerBackground,
//     color: theme.palette.common.white,
//     fontWeight: "bold",
//     textAlign: "center",
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 14,
//     textAlign: "center",
//   },
// }));

// export const StyledTableRow = styled(TableRow)(() => ({
//   "&:nth-of-type(odd)": {
//     backgroundColor: oddRowBackground,
//   },
//   "&:nth-of-type(even)": {
//     backgroundColor: evenRowBackground,
//   },
//   "&:hover": {
//     backgroundColor: hoverBackground,
//   },
// }));
// function ViewMovies() {
//   const [movieList, setMovieList] = useState([]);

//   return (
//     <Box className="view-movie-container">
//       <Typography variant="h3" className="edit-movie-title">
//         View Movie List
//       </Typography>
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <StyledTableRow>
//               <StyledTableCell>S. No.</StyledTableCell>
//               <StyledTableCell>Title</StyledTableCell>
//               <StyledTableCell>Year </StyledTableCell>
//               <StyledTableCell>Image</StyledTableCell>
//               <StyledTableCell>Action</StyledTableCell>
//             </StyledTableRow>
//           </TableHead>
//           <TableBody>
//             {movieList.length > 0 ? (
//               movieList.map((item, index) => (
//                 <StyledTableRow key={item.empCode}>
//                   <StyledTableCell>{index + 1}</StyledTableCell>
//                   <StyledTableCell>{item.empCode}</StyledTableCell>
//                   <StyledTableCell>{item.fullName}</StyledTableCell>
//                   <StyledTableCell>{item.designation}</StyledTableCell>

//                   <StyledTableCell>
//                     <Tooltip title="View Images" arrow>
//                       <Button
//                         variant="contained"
//                         color="dark"
//                         // onClick={() => modalOpen(item)}
//                       >
//                         <VisibilityIcon fontSize="small" />
//                       </Button>
//                     </Tooltip>
//                   </StyledTableCell>
//                 </StyledTableRow>
//               ))
//             ) : (
//               <StyledTableRow>
//                 <StyledTableCell colSpan={7}>Data Not Found</StyledTableCell>
//               </StyledTableRow>
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Box>
//   );
// }

// export default ViewMovies;

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Grid,
  Paper,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { getMovieList } from "../services/Auth";

function ViewMovies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMovies = async () => {
    try {
      const response = await getMovieList();
      console.log(response);
      // setMovies(data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleEdit = (movie) => {
    console.log("Edit movie:", movie);
    // navigate(`/edit/${movie.id}`) if routing is used
  };

  const handleDelete = (id) => {
    console.log("Delete movie:", id);
    // You can call DELETE API here
  };

  return (
    <Box
      sx={{
        p: 4,
        backgroundColor: "#0a3d48",
        minHeight: "100vh",
        color: "#fff",
      }}
      className="view-movie-container"
    >
      <Paper
        elevation={6}
        sx={{
          p: 3,
          mb: 4,
          backgroundColor: "#0e4955",
          color: "#fff",
          textAlign: "center",
          borderRadius: "20px",
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          🎬 View Movie List
        </Typography>
      </Paper>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
          <CircularProgress color="inherit" />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {movies.map((movie, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Card
                sx={{
                  backgroundColor: "#0e4955",
                  color: "#fff",
                  borderRadius: "16px",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.4)",
                  transition: "0.3s",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: "0 6px 20px rgba(0,0,0,0.6)",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="250"
                  image={
                    movie.posterURL ||
                    movie.poster ||
                    "https://via.placeholder.com/300x400?text=No+Image"
                  }
                  alt={movie.title}
                  sx={{
                    borderTopLeftRadius: "16px",
                    borderTopRightRadius: "16px",
                  }}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {movie.title || "Untitled"}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#a7b1b7" }}>
                    Year: {movie.year || "Unknown"}
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{ justifyContent: "space-between", px: 2, pb: 2 }}
                >
                  <Tooltip title="Edit Movie">
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      startIcon={<EditIcon />}
                      onClick={() => handleEdit(movie)}
                      sx={{ borderRadius: "12px" }}
                    >
                      Edit
                    </Button>
                  </Tooltip>
                  <Tooltip title="Delete Movie">
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      startIcon={<DeleteIcon />}
                      onClick={() => handleDelete(movie.id)}
                      sx={{ borderRadius: "12px" }}
                    >
                      Delete
                    </Button>
                  </Tooltip>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}

export default ViewMovies;
