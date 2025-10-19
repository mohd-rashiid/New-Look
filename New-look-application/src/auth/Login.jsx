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
import character1 from "../assets/character1.png";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export default function LoginPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const loginSchema = yup.object({
    email: yup
      .string()
      .email("Please enter a valid email address")
      .required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const getErrorMessage = (error) => {
    if (!error?.code) return "Something went wrong. Please try again.";

    switch (error.code) {
      case "auth/invalid-credential":
      case "auth/wrong-password":
        return "Invalid email or password. Please try again.";
      case "auth/user-not-found":
        return "No account found with this email.";
      case "auth/too-many-requests":
        return "Too many failed attempts. Please try again later.";
      case "auth/network-request-failed":
        return "Network error. Please check your internet connection.";
      default:
        return "Failed to login. Please try again.";
    }
  };

  const onSubmit = async (data) => {
    try {
      setError("");
      await login(data.email, data.password);
      navigate("/products");
    } catch (error) {
      console.error("Login error:", error);
      setError(getErrorMessage(error));
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        display: "flex",
        overflow: "hidden",
      }}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
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
            px: isMobile && 3,
            justifyContent: "center",
          }}
        >
          <Box sx={{ width: "100%", maxWidth: 420 }}>
            <Stack mb={5}>
              <Typography variant="h4" fontWeight={500} gutterBottom>
                Welcome back!
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Enter your credentials to access your account.
              </Typography>
            </Stack>
            {(error || errors?.email?.message || errors?.password?.message) && (
              <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
                {error || errors?.email?.message || errors?.password?.message}
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
                  Email address
                </InputLabel>
                <input
                  type="email"
                  name="email"
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
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="end"
                >
                  <InputLabel
                    sx={{
                      fontWeight: 500,

                      color: "#000000",
                    }}
                  >
                    Password
                  </InputLabel>
                  <Link
                    href="#"
                    underline="hover"
                    sx={{
                      fontSize: "10px",
                      fontWeight: 500,
                      color: "0C2A92",
                    }}
                  >
                    forgot password
                  </Link>
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
                    Remember for 30 days
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
                {isSubmitting ? "loading" : "LogIn"}
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
                <Link href="/sign-up" underline="hover">
                  Sign Up
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
              src={character1}
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
