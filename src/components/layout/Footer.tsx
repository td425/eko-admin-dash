import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

// logoSrc is accepted for backwards compatibility with existing call sites
// (e.g. auth-callback-error) but is no longer rendered.
const Footer = (_props: { logoSrc?: string } = {}) => {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        position: "fixed",
        zIndex: { xs: 1, sm: 100 },
        bottom: 0,
        left: 0,
        width: "100%",
        bgcolor: theme.palette.mode === "dark" ? "#080D12" : "#334258",
        color: theme.palette.mode === "dark" ? "#E0E0E0" : "#FFFFFF",
        boxShadow: theme.palette.mode === "dark" ? "0 -1px 3px rgba(0,0,0,0.3)" : "0 -1px 3px rgba(0,0,0,0.08)",
        fontSize: "0.85rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        p: { xs: "6px 8px", sm: 1 },
      }}
    >
      <Box component="span">
        This infra designed and developed by{" "}
        <Box component="span" sx={{ color: "#FF7A1A", fontWeight: 600 }}>
          Tamimah
        </Box>
        .
      </Box>
    </Box>
  );
};

export default Footer;
