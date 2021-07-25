import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
// import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
// import InputBase from "@material-ui/core/InputBase";
import { alpha, makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
// import SearchIcon from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Avatar } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function MyNav(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useStyles();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const { user, onHandleLogOut } = props;

  return (
    <div className={classes.root}>
      <AppBar style={{ background: "#4AD09A" }} position="static">
        <Toolbar>
          <Button
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MenuIcon />
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem component={Link} to={"/profile"} onClick={handleClose}>
              Profile
            </MenuItem>
            <MenuItem component={Link} to={"/activity"} onClick={handleClose}>
              Activity
            </MenuItem>
            <MenuItem
              component={Link}
              to={"/activity/create"}
              onClick={handleClose}
            >
              Create Activity
            </MenuItem>
          </Menu>
          <Typography className={classes.title} variant="h6" noWrap>
            Be Active , Stay Healthy
          </Typography>
          {/* <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
            <Button color="inherit">Sign up</Button>
            <Button color="inherit">Log in</Button>
            <Button color="inherit">Log out</Button>
          </div> */}

          {props.user ? (
            <>
              <Button onClick={onHandleLogOut} component={Link} to={"/logout"}>
                Log Out
              </Button>
              <Avatar alt="Remy Sharp" src={user.image} />
            </>
          ) : (
            <>
              <Button color="primary" component={Link} to={"/signin"}>
                Log in
              </Button>
              <Button component={Link} to={"/signup"}>
                Sign up
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

// import React from "react";

// import { makeStyles } from "@material-ui/core/styles";
// import AppBar from "@material-ui/core/AppBar";
// import Toolbar from "@material-ui/core/Toolbar";
// import Typography from "@material-ui/core/Typography";
// import IconButton from "@material-ui/core/IconButton";
// import { Link } from "react-router-dom";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//   },
//   menuButton: {
//     marginRight: theme.spacing(2),
//   },
//   title: {
//     flexGrow: 1,
//   },
// }));

// export default function MyNav() {
//   const classes = useStyles();

//   return (
//     <div>
//       <AppBar style={{ background: "#4AD09A" }} position="static">
//         <Toolbar>
//           {/* <IconButton
//             edge="start"
//             className={classes.menuButton}
//             color=""
//             aria-label="menu"
//           ></IconButton> */}
//           <Typography variant="h6" className={classes.title}>
//             <Link className={classes.menuButton} to="/">
//               Home
//             </Link>
//             <Link className={classes.menuButton} to="/activity">
//               Activity
//             </Link>
//           </Typography>

//           <Link
//             component="button"
//             color="primary"
//             className={classes.menuButton}
//             to="/signin"
//           >
//             Sign In
//           </Link>
//           <Link
//             component="button"
//             color="primary"
//             className={classes.menuButton}
//             to="/signup"
//           >
//             Sign Up
//           </Link>

//           <Link color="primary" className={classes.menuButton} to="/logout">
//             Log Out
//           </Link>
//         </Toolbar>
//       </AppBar>
//     </div>
//   );
// }
