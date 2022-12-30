import React, { useRef } from "react";
import { Link } from "react-router-dom";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
export default function ListItemLink(props) {
  const { icon, primary, to } = props;
  const linkRef = useRef();
  const CustomLink = React.forwardRef((props, ref) => (
    <Link to={to} {...props} ref={linkRef} />
  ));

  return (
    <ListItem button component={CustomLink}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={primary} />
    </ListItem>
  );
}
