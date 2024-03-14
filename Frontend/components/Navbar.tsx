import Logo from "../assets/logo.png";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const path = useLocation().pathname;
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "5em",
      }}
    >
      <div style={{ width: "15%", minWidth: "250px", alignItems: "center" }}>
        <img
          style={{ width: "100%", minWidth: "250px" }}
          height={"auto"}
          src={Logo}
          className="logo"
          alt="Logo"
        />
      </div>
      <ul
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          width: "25%",
          minWidth: "400px",
        }}
      >
        <li
          style={{
            marginLeft: "1em",
            marginRight: "1em",
            color: path === "/about" ? "#006eff" : undefined,
          }}
        >
          <Link to="/about">Om siden</Link>
        </li>
        <li
          style={{
            marginLeft: "1em",
            marginRight: "1em",
            color: path === "/" ? "#006eff" : undefined,
          }}
        >
          <Link to="/">Uddannelser</Link>
        </li>
        <li
          style={{
            marginLeft: "1em",
            marginRight: "1em",
            color: path === "/methods" ? "#006eff" : undefined,
          }}
        >
          <Link to="/methods">Metoder</Link>
        </li>
      </ul>
      <div style={{ width: "20%", minWidth: "160px", textAlign: "right" }}>
        <button className="primary-button" style={{ minWidth: "118px" }}>
          Læs mere
        </button>
      </div>
    </div>
  );
};

export default Navbar;
