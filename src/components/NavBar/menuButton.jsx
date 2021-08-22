import React, { useState } from "react";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import { ArrowDropDownCircle, ExitToApp, Info } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { logoutUserAction } from "../../app/slices/userSlice";
import { Link } from "react-router-dom";

export default function MenuButton() {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleMenuOpen = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = (e) => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logoutUserAction());
    handleClose();
  };

  return (
    <div>
      <IconButton
        edge="end"
        aria-label="account of current user"
        aria-controls="account-menu"
        aria-haspopup="true"
        onClick={handleMenuOpen}
        color="primary"
        disabled={user.status !== "success"}
      >
        <ArrowDropDownCircle />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem component={Link} to="/about" onClick={handleClose}>
          <Info />
          &nbsp; About
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ExitToApp />
          &nbsp; Logout
        </MenuItem>
      </Menu>
    </div>
  );
}
