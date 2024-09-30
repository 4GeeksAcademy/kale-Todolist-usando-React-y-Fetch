//import react into the bundle
import React from "react";
import ReactDOM from "react-dom/client";

// include your styles into the webpack bundle
import "../styles/index.css";

//import your own components
import pack from "./component/pack.json";
import Home from "./component/home.jsx";

//render your react application
ReactDOM.createRoot(document.getElementById('app')).render(<Home/>);

