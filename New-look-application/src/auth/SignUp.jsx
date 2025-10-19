import * as yup from "yup";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Stack,
  Typography,
  Link,
  InputLabel,
  useTheme,
  useMediaQuery,
  Alert,
} from "@mui/material";
import google from "../assets/google1.png";
import apple from "../assets/apple.png";
import character2 from "../assets/character2.png";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export default function SignUpPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [error, setError] = useState("");
  const { signup } = useAuth();
  const navigate = useNavigate();
  // const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  const registerSchema = yup.object({
    email: yup
      .string()
      .email("Please enter a valid email address")
      .required("Email is required"),
    name: yup
      .string()
      .matches(/^[a-zA-Z\s]*$/, "Please enter a valid name")
      .required("Name is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const getHandleErrors = (error) => {
    switch (error.message) {
      case "Firebase: Error (auth/email-already-in-use).":
        return "Email already Exits";
      case "Firebase: Error (auth/name-already-in-use).":
        return "Name already Exits";
      default:
        return "An unknown error occurred"; // Added default case
    }
  };

  // Call getHandleErrors when setting the error message

  const onSubmit = async (data) => {
    try {
      setError("");
      await signup(data.email, data.password, data.name, {
        email: data.email,
        password: data.password,
        name: data.name,
      });

      console.log("Signup success, navigating...");
      navigate("/login"); // should work if route exists
    } catch (error) {
      setError(getHandleErrors(error) || "Failed to create account");
    }
  };
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        display: "flex",
        overflow: "hidden",
        px: isMobile && 3,
      }}
    >
      <Stack
        direction={isMobile ? "column" : "row"}
        sx={{
          width: "100%",
          height: "100%",
        }}
      >
        {/* LEFT FORM SECTION - Exactly 50% */}
        <Box
          sx={{
            width: isMobile ? "100%" : "50%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          component="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Box sx={{ width: "100%", maxWidth: 420 }}>
            <Stack mb={5}>
              <Typography fontSize={32} fontWeight={500} gutterBottom>
                Get Started Now
              </Typography>
            </Stack>
            {error && (
              <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
                {error}
              </Alert>
            )}

            {/* Form */}
            <Stack spacing={2} sx={{ mt: 3 }}>
              <Stack>
                <InputLabel
                  sx={{
                    color: "#000000",
                    fontWeight: 500,
                  }}
                >
                  Name
                </InputLabel>
                <input
                  type="text"
                  {...register("name")}
                  placeholder="Enter your name"
                  style={{
                    height: "40px",
                    border: "1px solid #D9D9D9",
                    borderRadius: "4px",
                    padding: "5px 10px",
                    outline: "none",
                  }}
                />
              </Stack>
              <Stack>
                <InputLabel
                  sx={{
                    color: "#000000",
                    fontWeight: 500,
                  }}
                >
                  Email address
                </InputLabel>
                <input
                  type="email"
                  {...register("email")}
                  placeholder="Enter your email"
                  style={{
                    height: "40px",
                    border: "1px solid #D9D9D9",
                    borderRadius: "4px",
                    padding: "5px 10px",
                    outline: "none",
                  }}
                />
              </Stack>

              <Stack>
                <Stack direction="row" justifyContent="space-between">
                  <InputLabel
                    sx={{
                      color: "#000000",
                      fontWeight: 500,
                    }}
                  >
                    Password
                  </InputLabel>
                </Stack>
                <input
                  type="password"
                  placeholder="Password"
                  {...register("password")}
                  style={{
                    height: "40px",
                    border: "1px solid #D9D9D9",
                    borderRadius: "4px",
                    padding: "5px 10px",
                    outline: "none",
                  }}
                />
              </Stack>

              <FormControlLabel
                control={<Checkbox size="small" />}
                label={
                  <Typography fontSize="12px" fontWeight={500}>
                    I agree to the{" "}
                    <Typography
                      component="span"
                      sx={{
                        textDecoration: "underline",
                        fontSize: "12px",
                      }}
                    >
                      terms & policy
                    </Typography>
                  </Typography>
                }
              />

              <Button
                variant="contained"
                fullWidth
                type="submit"
                sx={{
                  bgcolor: "black",
                  fontWeight: "bold",
                  textTransform: "none",
                  borderRadius: 0,
                  "&:hover": { bgcolor: "#333" },
                }}
              >
                {isSubmitting ? "loading..." : "Sign Up"}
              </Button>
            </Stack>

            <Divider sx={{ my: 6 }}>Or</Divider>

            {/* Social login */}
            <Stack
              spacing={2}
              direction={isMobile ? "column" : "row"}
              justifyContent="space-between"
            >
              {[
                { src: google, label: "Sign in with Google" },
                { src: apple, label: "Sign in with Apple" },
              ].map((item, idx) => (
                <Stack
                  key={idx}
                  direction="row"
                  alignItems="center"
                  justifyContent="center"
                  border="1px solid #D9D9D9"
                  gap={2}
                  p={1}
                  flex={1}
                  sx={{ cursor: "pointer" }}
                >
                  <img
                    src={item.src}
                    alt=""
                    style={{ width: 20, height: 20 }}
                  />
                  <Typography fontSize="14px">{item.label}</Typography>
                </Stack>
              ))}
            </Stack>

            <Box textAlign="center" mt={4}>
              <Typography variant="body2">
                Don't have an account?{" "}
                <Link href="/login" underline="hover">
                  Sign In
                </Link>
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* RIGHT IMAGE SECTION - Exactly 50% */}
        {!isMobile && (
          <Box
            sx={{
              width: isMobile ? "100%" : "50%",
              height: "100vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#fff",
              // overflow: "hidden",
            }}
          >
            <img
              src={character2}
              alt="Character"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "fill",
              }}
            />
          </Box>
        )}
      </Stack>
    </Box>
  );
}
