import { Box, BoxProps, keyframes } from "@mui/material";
import { styled } from "@mui/material/styles";

interface LoginFormBoxProps extends BoxProps {
  backgroundUrl: string;
}

// EKO brand colour (matches the orange wordmark logo) used as the sci-fi neon accent.
const EKO_ORANGE = "#FF7A1A";

// Synthwave-style perspective grid scrolling toward the viewer.
const gridScroll = keyframes`
  0% { background-position: 0 0; }
  100% { background-position: 0 60px; }
`;

const float1 = keyframes`
  0%, 100% { transform: translate(0, 0) scale(1); }
  25% { transform: translate(60px, -40px) scale(1.1); }
  50% { transform: translate(-30px, 60px) scale(0.95); }
  75% { transform: translate(40px, 30px) scale(1.05); }
`;

const float2 = keyframes`
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(-50px, 50px) scale(1.08); }
  66% { transform: translate(70px, -20px) scale(0.92); }
`;

const float3 = keyframes`
  0%, 100% { transform: translate(0, 0) scale(1); }
  20% { transform: translate(40px, 50px) scale(1.12); }
  40% { transform: translate(-60px, 20px) scale(0.9); }
  60% { transform: translate(20px, -50px) scale(1.05); }
  80% { transform: translate(-30px, -30px) scale(0.95); }
`;

// Subtle pulsing glow for the logo wordmark.
const logoGlow = keyframes`
  0%, 100% { filter: drop-shadow(0 0 10px rgba(255, 122, 26, 0.45)); }
  50% { filter: drop-shadow(0 0 22px rgba(255, 122, 26, 0.8)); }
`;

// HUD "encryption link" scene behind the card: rotating reticle, corner
// brackets and a scan line sweeping down the viewport.
const reticleSpin = keyframes`
  0% { transform: translate(-50%, -50%) rotate(0deg); }
  100% { transform: translate(-50%, -50%) rotate(360deg); }
`;

const spinSimple = keyframes`
  to { transform: rotate(360deg); }
`;

const spinReverse = keyframes`
  to { transform: rotate(-360deg); }
`;

const scanMove = keyframes`
  0% { transform: translateY(-10vh); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { transform: translateY(100vh); opacity: 0; }
`;

const LoginFormBox = styled(Box, {
  shouldForwardProp: prop => prop !== "backgroundUrl",
})<LoginFormBoxProps>(({ theme, backgroundUrl }) => {
  const hasCustomBg = backgroundUrl !== "";

  return {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    alignItems: "center",
    justifyContent: "flex-start",
    position: "relative",
    overflow: "hidden",
    background: hasCustomBg
      ? `url(${backgroundUrl})`
      : "radial-gradient(ellipse 120% 90% at 50% -10%, #112143 0%, #0a1020 45%, #04060c 100%)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",

    // Sci-fi scene: neon perspective grid floor + scanline/vignette overlay,
    // only shown when there is no custom background image.
    ...(!hasCustomBg && {
      // Perspective grid floor (::before)
      "&::before": {
        content: '""',
        position: "absolute",
        left: "-50%",
        right: "-50%",
        bottom: 0,
        height: "65%",
        backgroundImage: `linear-gradient(${EKO_ORANGE}33 1px, transparent 1px), linear-gradient(90deg, ${EKO_ORANGE}33 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
        transform: "perspective(420px) rotateX(70deg)",
        transformOrigin: "50% 100%",
        maskImage: "linear-gradient(to top, #000 0%, transparent 75%)",
        WebkitMaskImage: "linear-gradient(to top, #000 0%, transparent 75%)",
        animation: `${gridScroll} 5s linear infinite`,
        zIndex: 0,
        pointerEvents: "none",
      },
      // Scanlines + vignette (::after)
      "&::after": {
        content: '""',
        position: "absolute",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        background:
          "repeating-linear-gradient(0deg, rgba(0,0,0,0.16) 0px, rgba(0,0,0,0.16) 1px, transparent 1px, transparent 3px)",
        boxShadow: "inset 0 0 220px rgba(0,0,0,0.85)",
      },
    }),

    // Neon glow orbs (children rendered by LoginPage)
    "& .login-orb": {
      position: "absolute",
      borderRadius: "50%",
      filter: "blur(90px)",
      zIndex: 0,
      pointerEvents: "none",
    },
    "& .login-orb-1": {
      width: "420px",
      height: "420px",
      top: "-8%",
      right: "-6%",
      background: "rgba(255, 122, 26, 0.20)",
      animation: `${float3} 22s ease-in-out infinite`,
    },
    "& .login-orb-2": {
      width: "320px",
      height: "320px",
      bottom: "6%",
      left: "-5%",
      background: "rgba(255, 122, 26, 0.14)",
      animation: `${float1} 18s ease-in-out infinite reverse`,
    },
    "& .login-orb-3": {
      width: "260px",
      height: "260px",
      top: "35%",
      right: "18%",
      background: "rgba(64, 156, 255, 0.10)",
      animation: `${float2} 30s ease-in-out infinite`,
    },

    // HUD "encryption connection" layer (behind the card)
    "& .login-hud": {
      position: "absolute",
      inset: 0,
      zIndex: 0,
      pointerEvents: "none",
      overflow: "hidden",
    },
    // Central rotating targeting reticle made of concentric rings
    "& .hud-reticle": {
      position: "absolute",
      top: "50%",
      left: "50%",
      width: "560px",
      height: "560px",
      borderRadius: "50%",
      border: `1px solid ${EKO_ORANGE}1f`,
      borderTopColor: `${EKO_ORANGE}66`,
      transform: "translate(-50%, -50%)",
      animation: `${reticleSpin} 40s linear infinite`,
      opacity: 0.5,
      [theme.breakpoints.down("sm")]: {
        width: "360px",
        height: "360px",
      },
    },
    "& .hud-reticle::before": {
      content: '""',
      position: "absolute",
      inset: "60px",
      borderRadius: "50%",
      border: `1px dashed ${EKO_ORANGE}40`,
      animation: `${spinReverse} 24s linear infinite`,
    },
    "& .hud-reticle::after": {
      content: '""',
      position: "absolute",
      inset: "130px",
      borderRadius: "50%",
      border: `1px solid ${EKO_ORANGE}26`,
      borderBottomColor: `${EKO_ORANGE}73`,
      animation: `${spinSimple} 16s linear infinite`,
    },
    // HUD corner brackets at the viewport edges
    "& .hud-corner": {
      position: "absolute",
      width: "54px",
      height: "54px",
      borderColor: EKO_ORANGE,
      borderStyle: "solid",
      borderWidth: 0,
      opacity: 0.55,
    },
    "& .hud-corner-tl": { top: "26px", left: "26px", borderTopWidth: "2px", borderLeftWidth: "2px" },
    "& .hud-corner-tr": { top: "26px", right: "26px", borderTopWidth: "2px", borderRightWidth: "2px" },
    "& .hud-corner-bl": { bottom: "26px", left: "26px", borderBottomWidth: "2px", borderLeftWidth: "2px" },
    "& .hud-corner-br": { bottom: "26px", right: "26px", borderBottomWidth: "2px", borderRightWidth: "2px" },
    // Encryption scan line sweeping down the screen
    "& .hud-scan": {
      position: "absolute",
      left: 0,
      right: 0,
      top: 0,
      height: "2px",
      background: `linear-gradient(90deg, transparent, ${EKO_ORANGE}cc, transparent)`,
      boxShadow: `0 0 16px ${EKO_ORANGE}99`,
      animation: `${scanMove} 6s ease-in-out infinite`,
    },

    // Glass HUD panel
    "& .card": {
      position: "relative",
      zIndex: 1,
      width: "30rem",
      marginTop: "6rem",
      marginBottom: "6rem",
      borderRadius: 10,
      background: "linear-gradient(160deg, rgba(14,22,38,0.88) 0%, rgba(8,12,20,0.92) 100%)",
      backdropFilter: "blur(16px) saturate(1.2)",
      border: `1px solid ${EKO_ORANGE}59`,
      boxShadow: `0 0 40px rgba(255,122,26,0.16), 0 20px 60px rgba(0,0,0,0.6), inset 0 0 32px rgba(255,122,26,0.05)`,
      overflow: "hidden",
    },
    // HUD corner brackets (top-left + bottom-right)
    "& .card::before": {
      content: '""',
      position: "absolute",
      top: -1,
      left: -1,
      width: 28,
      height: 28,
      borderTop: `2px solid ${EKO_ORANGE}`,
      borderLeft: `2px solid ${EKO_ORANGE}`,
      borderTopLeftRadius: 10,
      pointerEvents: "none",
    },
    "& .card::after": {
      content: '""',
      position: "absolute",
      bottom: -1,
      right: -1,
      width: 28,
      height: 28,
      borderBottom: `2px solid ${EKO_ORANGE}`,
      borderRight: `2px solid ${EKO_ORANGE}`,
      borderBottomRightRadius: 10,
      pointerEvents: "none",
    },

    "@media (max-width: 600px)": {
      "& .card": {
        width: "100%",
        marginTop: "0",
        marginBottom: "2rem",
        borderRadius: 0,
      },
    },

    // Logo footprint; centres the spinner that replaces it on submit.
    "& .avatar": {
      margin: "1.75rem 1rem 0.75rem",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "64px",
      [theme.breakpoints.up("sm")]: {
        minHeight: "80px",
      },
    },
    // EKO wordmark: keep aspect ratio, add a pulsing neon glow.
    "& .login-logo": {
      width: "auto",
      maxWidth: "230px",
      maxHeight: "64px",
      objectFit: "contain",
      animation: `${logoGlow} 4s ease-in-out infinite`,
      [theme.breakpoints.up("sm")]: {
        maxWidth: "260px",
        maxHeight: "80px",
      },
    },
    "& .icon": {
      backgroundColor: theme.palette.grey[500],
    },
    "& .hint": {
      marginTop: "0.25em",
      marginBottom: "1.25em",
      display: "flex",
      justifyContent: "center",
      color: "#F5F7FF",
      fontSize: "1.1rem",
      fontWeight: 600,
      letterSpacing: "0.14em",
      textTransform: "uppercase",
      textShadow: "0 0 14px rgba(255, 122, 26, 0.5)",
    },
    "& .form": {
      padding: "0 1.5rem 1.5rem 1.5rem",
    },
    "& .actions": {
      padding: 0,
      marginTop: "0.5rem",
    },
    "& .serverState": {
      fontSize: "0.85rem",
      marginLeft: "0.5rem",
      paddingTop: "0.25rem",
      paddingBottom: "0.75rem",
    },
    "& .serverVersion": {
      color: theme.palette.text.secondary,
      fontSize: "0.85rem",
      marginLeft: "0.5rem",
    },
    "& .matrixVersions": {
      color: theme.palette.text.secondary,
      fontSize: "0.8rem",
      marginBottom: "1rem",
      marginLeft: "0.5rem",
    },
  };
});

export default LoginFormBox;
