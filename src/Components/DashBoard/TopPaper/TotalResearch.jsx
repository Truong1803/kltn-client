// material
import { alpha, styled } from "@mui/material/styles";
import { Card, Typography } from "@mui/material";
import { addCommas } from "../../../Common/FormatDate/FormatDate";

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function TotalResearch({
  data,
  title,
  color,
  icon,
  colorIcon,
  styles,
}) {
  const RootStyle = styled(Card)(({ theme }) => ({
    boxShadow: "none",
    textAlign: "center",
    padding: theme.spacing(5, 0),
    borderRadius: 10,
    backgroundColor: color,
  }));
  const IconWrapperStyle = styled("div")(({ theme }) => ({
    margin: "auto",
    display: "flex",
    borderRadius: "50%",
    alignItems: "center",
    width: theme.spacing(8),
    height: theme.spacing(8),
    justifyContent: "center",
    marginBottom: theme.spacing(3),
    color: colorIcon,
    backgroundImage: `linear-gradient(135deg, ${alpha(
      theme.palette.primary.dark,
      0
    )} 0%, ${alpha(theme.palette.primary.dark, 0.24)} 100%)`,
  }));
  return (
    <RootStyle style={styles}>
      <IconWrapperStyle>{icon}</IconWrapperStyle>
      <Typography variant='h3'>{data}</Typography>
      <Typography variant='subtitle2' sx={{ opacity: 0.72 }}>
        {title}
      </Typography>
    </RootStyle>
  );
}
