import React, { useState, useEffect } from "react";
import { Box, Typography, TextField, Button, Paper } from "@mui/material";
import { useSearchParams, useNavigate } from "react-router-dom";
import { updateMovieList } from "../services/Auth";

const UpdateMovies = () => {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({ title: "", year: "", image: "" });
  const [searchParams] = useSearchParams();
  const movieId = searchParams.get("id");
  const navigate = useNavigate();

  useEffect(() => {
    if (!movieId) {
      navigate("/viewMovies");
    }
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setErrors((prev) => ({ ...prev, image: "" }));
    }
  };

  const validate = () => {
    const newErrors = { title: "", year: "", image: "" };
    let isValid = true;
    if (!title.trim()) {
      newErrors.title = "Title is required";
      isValid = false;
    }
    if (!year.trim()) {
      newErrors.year = "Publishing year is required";
      isValid = false;
    } else if (!/^\d{4}$/.test(year)) {
      newErrors.year = "Enter a valid 4-digit year";
      isValid = false;
    }
    if (!image) {
      newErrors.image = "Please upload an image";
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  const handleUpdate = async () => {
    if (!validate()) return;

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("year", year);
      formData.append("updatedBy", 12345);
      formData.append("image", image);
      formData.append("id", movieId);

      const response = await updateMovieList(formData);
      if (response.data.code == "200") {
        alert("Movie Updated Successfully !!");
        navigate("/viewMovies");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  const handleCancel = () => {
    setTitle("");
    setYear("");
    setImage(null);
    setPreview(null);
    setErrors({ title: "", year: "", image: "" });
  };

  return (
    <Box className="edit-movie-container">
      <Typography variant="h3" className="edit-movie-title">
        Update Movie
      </Typography>

      <Box className="edit-movie-box">
        <Box className="edit-image-section">
          <Paper
            elevation={0}
            className="edit-image-dropzone"
            onClick={() => document.getElementById("editFileInput").click()}
          >
            {preview ? (
              <img src={preview} alt="Preview" className="edit-image-preview" />
            ) : (
              <Typography variant="body1" className="edit-drop-text">
                Drop other image here
              </Typography>
            )}
            <input
              id="editFileInput"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              hidden
            />
          </Paper>
          {errors.image && (
            <Typography variant="body2" className="edit-error-text">
              {errors.image}
            </Typography>
          )}
        </Box>

        {/* Form */}
        <Box className="edit-form-section">
          <Box>
            <TextField
              placeholder="Title"
              variant="outlined"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setErrors((prev) => ({ ...prev, title: "" }));
              }}
              fullWidth
              className="edit-input-field"
            />
            {errors.title && (
              <Typography variant="body2" className="edit-error-text">
                {errors.title}
              </Typography>
            )}
          </Box>

          <Box>
            <TextField
              placeholder="Publishing year"
              variant="outlined"
              type="number"
              value={year}
              onChange={(e) => {
                setYear(e.target.value);
                setErrors((prev) => ({ ...prev, year: "" }));
              }}
              fullWidth
              className="edit-input-field"
            />
            {errors.year && (
              <Typography variant="body2" className="edit-error-text">
                {errors.year}
              </Typography>
            )}
          </Box>

          <Box className="edit-button-row">
            <Button
              variant="outlined"
              onClick={handleCancel}
              className="edit-cancel-btn"
            >
              Reset
            </Button>
            <Button
              variant="contained"
              onClick={handleUpdate}
              className="edit-update-btn"
            >
              Update
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default UpdateMovies;
