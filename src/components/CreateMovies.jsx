import React, { useState } from "react";
import { Box, Typography, TextField, Button, Paper } from "@mui/material";
import { createMovieList } from "../services/Auth";

const CreateMovies = () => {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({ title: "", year: "", image: "" });

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

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      // Create a FormData object
      const formData = new FormData();
      formData.append("title", title);
      formData.append("year", year);
      formData.append("updatedBy", 12345);
      formData.append("image", image);

      const response = await createMovieList(formData);
      if (response.data.code == "200") {
        alert("Movie Added Successfully !!");
        // window.location.reload();
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.log("Error", error);
      alert(
        "Internal Server Issue. or Please refresh and try Again with diffrent Enteries !!"
      );
    }
  };

  const handleReset = () => {
    setTitle("");
    setYear("");
    setImage(null);
    setPreview(null);
    setErrors({ title: "", year: "", image: "" });
  };

  return (
    <Box className="create-movie-container">
      <Typography variant="h3" className="create-movie-title">
        Create a new movie
      </Typography>

      <Box className="create-movie-box">
        {/* Image Upload */}
        <Box className="image-upload-section">
          <Paper
            elevation={0}
            className="image-drop-zone"
            onClick={() => document.getElementById("fileInput").click()}
          >
            {preview ? (
              <img src={preview} alt="Preview" className="image-preview" />
            ) : (
              <Typography variant="body1" className="drop-text">
                Drop an image here
              </Typography>
            )}
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              hidden
            />
          </Paper>
          {errors.image && (
            <Typography variant="body2" className="error-text">
              {errors.image}
            </Typography>
          )}
        </Box>

        {/* Form Section */}
        <Box className="form-section">
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
              className="input-field"
            />
            {errors.title && (
              <Typography variant="body2" className="error-text">
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
              className="input-field"
            />
            {errors.year && (
              <Typography variant="body2" className="error-text">
                {errors.year}
              </Typography>
            )}
          </Box>

          <Box className="button-row">
            <Button
              variant="outlined"
              onClick={handleReset}
              className="cancel-btn"
            >
              Reset
            </Button>
            <Button
              variant="contained"
              onClick={handleSubmit}
              className="submit-btn"
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CreateMovies;
