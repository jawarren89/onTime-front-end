import "../styles/Page404.css";
import React, { useEffect } from "react";

const Page404 = (props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <main className="page404-container">
        <h1 className="page404-title">404: Page Not Found</h1>
        <p>load interesting image here</p>
      </main>
    </>
  );
};

export default Page404;
