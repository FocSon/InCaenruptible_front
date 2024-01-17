import React, { useEffect } from "react";
import Navbar from "./component/Navbar";
import { Global, css } from "@emotion/react";

function App() {
  useEffect(() => {
    // Set the data-theme attribute to "dark" on the html element
    document.documentElement.setAttribute("data-theme", "light");
  }, []);
  return (
    <>
      <Global
        styles={css`
          html, body {
            margin: 0;
            padding: 0;
            height: 100%; /* Full height */
            width: 100%; /* Full width */
            display: flex;
            flex-direction: column;
            background-color:var(--main-bg-color);
          }
          #root {
            height: 100%; /* Full height */
            display: flex;
            flex-direction: column;
          }
        `}
      />
      <Navbar />
    </>
  );
}
export default App;
