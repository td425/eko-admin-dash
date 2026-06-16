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

// HUD scene behind the card: a rotating wireframe cyber-globe, corner
// brackets and a scan line sweeping down the viewport.
const globeSpin = keyframes`
  0% { transform: rotateX(-16deg) rotateY(0deg); }
  100% { transform: rotateX(-16deg) rotateY(360deg); }
`;

const scanMove = keyframes`
  0% { transform: translateY(-10vh); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { transform: translateY(100vh); opacity: 0; }
`;

// Floating "encrypted" decoration icons scattered across the free space.
const floatIcon = keyframes`
  0%, 100% { transform: translateY(0); opacity: 0.4; }
  50% { transform: translateY(-12px); opacity: 0.7; }
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

    // Desktop: dock the login card to the right, leaving the left free for
    // the cyber-globe and encrypted decoration (mirrors the sci-fi reference).
    [theme.breakpoints.up("sm")]: {
      justifyContent: "center",
      alignItems: "flex-end",
    },
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

    // Matrix-style digital rain (canvas), behind the rest of the scene.
    "& .matrix-rain": {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      zIndex: 0,
      pointerEvents: "none",
      opacity: 0.5,
      mixBlendMode: "screen",
    },

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
    // Rotating wireframe cyber-globe — docked to the left, partly off-screen.
    "& .cyber-globe": {
      position: "absolute",
      top: "50%",
      left: 0,
      width: "680px",
      height: "680px",
      transform: "translate(-22%, -50%) scale(1.2)",
      transformOrigin: "center",
      perspective: "1200px",
      opacity: 0.92,
      zIndex: 0,
      pointerEvents: "none",
      // On small screens, recede behind the full-width card.
      [theme.breakpoints.down("sm")]: {
        left: "50%",
        transform: "translate(-50%, -45%) scale(0.55)",
        opacity: 0.4,
      },
    },
    "& .globe-glow": {
      position: "absolute",
      inset: "8%",
      borderRadius: "50%",
      background: `radial-gradient(circle at 38% 32%, ${EKO_ORANGE}40 0%, ${EKO_ORANGE}1a 45%, transparent 70%)`,
      filter: "blur(2px)",
    },
    "& .globe-sphere": {
      position: "absolute",
      inset: 0,
      transformStyle: "preserve-3d",
      animation: `${globeSpin} 28s linear infinite`,
    },
    // Longitude lines: full circles rotated around the vertical axis
    "& .globe-meridian": {
      position: "absolute",
      inset: 0,
      borderRadius: "50%",
      border: `1px solid ${EKO_ORANGE}80`,
      boxShadow: `inset 0 0 14px ${EKO_ORANGE}33`,
    },
    "& .globe-meridian:nth-of-type(1)": { transform: "rotateY(0deg)" },
    "& .globe-meridian:nth-of-type(2)": { transform: "rotateY(30deg)" },
    "& .globe-meridian:nth-of-type(3)": { transform: "rotateY(60deg)" },
    "& .globe-meridian:nth-of-type(4)": { transform: "rotateY(90deg)" },
    "& .globe-meridian:nth-of-type(5)": { transform: "rotateY(120deg)" },
    "& .globe-meridian:nth-of-type(6)": { transform: "rotateY(150deg)" },
    // Latitude rings: horizontal circles stacked along the vertical axis
    "& .globe-latitude": {
      position: "absolute",
      top: "50%",
      left: "50%",
      borderRadius: "50%",
      border: `1px solid ${EKO_ORANGE}59`,
    },
    "& .globe-latitude:nth-of-type(1)": {
      width: "680px",
      height: "680px",
      marginLeft: "-340px",
      marginTop: "-340px",
      borderColor: `${EKO_ORANGE}b3`,
      transform: "rotateX(90deg) translateZ(0)",
    },
    "& .globe-latitude:nth-of-type(2)": {
      width: "588px",
      height: "588px",
      marginLeft: "-294px",
      marginTop: "-294px",
      transform: "rotateX(90deg) translateZ(170px)",
    },
    "& .globe-latitude:nth-of-type(3)": {
      width: "588px",
      height: "588px",
      marginLeft: "-294px",
      marginTop: "-294px",
      transform: "rotateX(90deg) translateZ(-170px)",
    },
    "& .globe-latitude:nth-of-type(4)": {
      width: "340px",
      height: "340px",
      marginLeft: "-170px",
      marginTop: "-170px",
      transform: "rotateX(90deg) translateZ(294px)",
    },
    "& .globe-latitude:nth-of-type(5)": {
      width: "340px",
      height: "340px",
      marginLeft: "-170px",
      marginTop: "-170px",
      transform: "rotateX(90deg) translateZ(-294px)",
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

    // Scattered "encrypted" icons floating in the free space (left/top/bottom).
    "& .login-decor": {
      position: "absolute",
      inset: 0,
      zIndex: 0,
      pointerEvents: "none",
      // Hidden on phones where the card spans the full width.
      [theme.breakpoints.down("sm")]: { display: "none" },
    },
    "& .decor-icon": {
      position: "absolute",
      color: EKO_ORANGE,
      opacity: 0.5,
      filter: `drop-shadow(0 0 10px ${EKO_ORANGE}99)`,
      animation: `${floatIcon} 9s ease-in-out infinite`,
    },
    "& .decor-1": { top: "13%", left: "9%", fontSize: "32px" },
    "& .decor-2": { bottom: "16%", left: "13%", fontSize: "42px", animationDelay: "1.4s" },
    "& .decor-3": { top: "48%", left: "2.5%", fontSize: "34px", animationDelay: "0.7s" },
    "& .decor-4": { top: "9%", left: "44%", fontSize: "26px", animationDelay: "2.1s" },
    "& .decor-5": { bottom: "11%", left: "40%", fontSize: "30px", animationDelay: "1s" },
    "& .decor-6": { top: "30%", left: "30%", fontSize: "24px", animationDelay: "2.7s" },

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
      // Docked to the right on desktop, vertically centred.
      [theme.breakpoints.up("sm")]: {
        marginTop: "2rem",
        marginBottom: "2rem",
        marginRight: "7vw",
      },
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
