import React, { useEffect } from "react";
import Navbar from "./component/Navbar";

function App() {
  
  useEffect(() => {
    // Set the data-theme attribute to "dark" on the html element
    document.documentElement.setAttribute('data-theme', 'light');
  }, []);
    return (
    <Navbar />
  );
  
}
export default App;

