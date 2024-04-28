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
  const condenseNavbar = useMediaQuery("(min-width:1280px)");

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
        height: "7%",
        width: condenseNavbar ? "60%" : "95%",
        borderBottom: "3px solid #dee2e6",
        paddingLeft: condenseNavbar ? "20%" : "5%",
        paddingRight: condenseNavbar ? "20%" : "5%",
        backgroundColor: "white",
        position: "fixed",
        zIndex: 10,
      }}
    >
      <img
        style={{ width: "250px" }}
        height={"auto"}
        src={Logo}
        className="logo"
        alt="Logo"
      />
      {showNavbar ? (
        <ul
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            width: "30%",
            minWidth: "500px",
            alignItems: "center",
          }}
        >
          <li
            style={{
              marginLeft: "1em",
              marginRight: "1em",
              color: path === "/about" ? "white" : undefined,
              backgroundColor: path === "/about" ? "#006eff" : undefined,
              fontSize: "18px",
              height: "2em",
              display: "flex",
              alignItems: "center",
              paddingLeft: "0.5em",
              paddingRight: "0.5em",
              borderRadius: "5px",
            }}
          >
            <Link to="/about">Om siden</Link>
          </li>
          <li
            style={{
              marginLeft: "1em",
              marginRight: "1em",
              color: path === "/" ? "white" : undefined,
              backgroundColor: path === "/" ? "#006eff" : undefined,
              fontSize: "18px",
              height: "2em",
              display: "flex",
              alignItems: "center",
              paddingLeft: "0.5em",
              paddingRight: "0.5em",
              borderRadius: "5px",
            }}
          >
            <Link to="/">Uddannelser</Link>
          </li>
          <li
            style={{
              marginLeft: "1em",
              marginRight: "1em",
              color: path === "/methods" ? "white" : undefined,
              backgroundColor: path === "/methods" ? "#006eff" : undefined,
              fontSize: "20px",
              height: "2.2em",
              display: "flex",
              alignItems: "center",
              paddingLeft: "0.5em",
              paddingRight: "0.5em",
              borderRadius: "5px",
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
