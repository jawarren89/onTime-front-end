import "../styles/404Page.css";
import React from "react";
import PropTypes from "prop-types";

import NavMenu from "../components/NavMenu";

const PageNotFound = (props) => {
  return (
    <>
      <header className="navbar">
        <NavMenu
          pageTitle={props.pageTitle}
          viewNavbar={props.viewNavbar}
          toggleNavbar={props.toggleNavbar}
        ></NavMenu>
      </header>
      <main className="page404-container">
        <h1 className="page404-title">404: Page Not Found</h1>
        <p>load interesting image here</p>
      </main>
    </>
  );
};

PageNotFound.propTypes = {
  pageTitle: PropTypes.string,
  viewNavbar: PropTypes.bool,
  toggleNavbar: PropTypes.func,
};

export default PageNotFound;
