import check_square from "../assets/check-square.svg";
import star from "../assets/star.svg";
import info from "../assets/info.svg";
import settings from "../assets/settings.svg";

// NavbarData contains a list of objects for each item rendered
// in the Navbar menu.

const NavMenuData = [
  {
    title: "Routines",
    path: "/routines",
    icon: <img src={check_square} alt="checked box icon" />,
    cName: "nav-text",
  },
  {
    title: "Task Bank",
    path: "/taskbank",
    icon: <img src={star} alt="star icon" />,
    cName: "nav-text",
  },
  {
    title: "About",
    path: "/about",
    icon: <img src={info} alt="info icon" />,
    cName: "nav-text",
  },
  {
    title: "Settings",
    path: "/settings",
    icon: <img src={settings} alt="settings icon" />,
    cName: "nav-text",
  },
];

export default NavMenuData;
