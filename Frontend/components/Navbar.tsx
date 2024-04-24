import Logo from "../assets/logo.png";
import { Link, useLocation } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import { useState } from "react";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
const Navbar = () => {
  const path = useLocation().pathname;
  const [open, setOpen] = useState(false);
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const showNavbar = useMediaQuery("(min-width:850px)");

  const drawerList = (
    <div
      style={{
        width: 250,
        minWidth: "150px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <li
        style={{
          color: path === "/about" ? "#006eff" : undefined,
          fontSize: "x-large",
        }}
      >
        <Link to="/about" onClick={toggleDrawer(false)}>
          Om siden
        </Link>
      </li>
      <li
        style={{
          color: path === "/" ? "#006eff" : undefined,
          fontSize: "x-large",
        }}
      >
        <Link to="/" onClick={toggleDrawer(false)}>
          Uddannelser
        </Link>
      </li>
      <li
        style={{
          color: path === "/methods" ? "#006eff" : undefined,
          fontSize: "x-large",
        }}
      >
        <Link to="/methods" onClick={toggleDrawer(false)}>
          Metoder
        </Link>
      </li>
    </div>
  );

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "8%",
        marginLeft: "3em",
        marginTop: "1em",
      }}
    >
      <div style={{ width: "15%", minWidth: "350px", alignItems: "center" }}>
        <img
          style={{ width: "100%", minWidth: "350px" }}
          height={"auto"}
          src={Logo}
          className="logo"
          alt="Logo"
        />
      </div>
      {showNavbar ? (
        <ul
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            width: "35%",
            minWidth: "500px",
            alignItems: "end",
          }}
        >
          <li
            style={{
              marginLeft: "1em",
              marginRight: "1em",
              color: path === "/about" ? "#006eff" : undefined,
              fontSize: "22px",
            }}
          >
            <Link to="/about">Om siden</Link>
          </li>
          <li
            style={{
              marginLeft: "1em",
              marginRight: "1em",
              color: path === "/" ? "#006eff" : undefined,
              fontSize: "22px",
            }}
          >
            <Link to="/">Uddannelser</Link>
          </li>
          <li
            style={{
              marginLeft: "1em",
              marginRight: "1em",
              color: path === "/methods" ? "#006eff" : undefined,
              fontSize: "22px",
            }}
          >
            <Link to="/methods">Metoder</Link>
          </li>
        </ul>
      ) : (
        <div>
          <MenuIcon
            sx={{ minWidth: "100px" }}
            fontSize="large"
            color="primary"
            onClick={toggleDrawer(true)}
          ></MenuIcon>
          <Drawer
            sx={{ position: "absolute" }}
            anchor="right"
            open={open}
            onClose={toggleDrawer(false)}
          >
            {drawerList}
          </Drawer>
        </div>
      )}
    </div>
  );
};

export default Navbar;
