import React from "react";
import "./App.css";
import Index from "./components/index"
import {AveragesProvider} from "./context/averages"


function App() {
  return (
    <AveragesProvider>
    <Index />
    </AveragesProvider>
  );
}

export default App;
