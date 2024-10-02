import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import FirstImage from "../assets/images/Horror-video-game.svg";
import SecondImage from "../assets/images/coming-soon.svg";
import { blue } from "@mui/material/colors";

const images = [FirstImage, SecondImage];
const texts = [
  "Capturing Moments, Creating Memories",
  "Welcome to my Testing Project",
];

const OutletImageComponent = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [currentText, setCurrentText] = useState(0);

  // Change background image and text
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
      setCurrentText((prevText) => (prevText + 1) % texts.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        position: "relative",
        display: { xs: "none", sm: "none", md: "flex" },
        alignItems: "center",
        justifyContent: "center",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        height: "100vh",
        width: "100%",
        backgroundColor: "background.paper",
        p: 4,
      }}
    >
      <Box
        flex={1}
        sx={{
          backgroundImage: `url(${images[currentImage]})`,
          backgroundColor: blue,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          height: "60vh",
          width: "100%",
        }}
      />

      <Typography
        sx={{
          position: "absolute",
          top: "10%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          maxWidth: 200,
          animation: "fadeInOut 5s ease-in-out infinite",
          textAlign: "center",
        }}
      >
        {texts[currentText]}
      </Typography>

      {/* Fade-in and fade-out animation */}
      <style>
        {`
                @keyframes fadeInOut {
                    0% { opacity: 0; }
                    50% { opacity: 1; }
                    100% { opacity: 0; }
                }
            `}
      </style>
    </Box>
  );
};

export default OutletImageComponent;
