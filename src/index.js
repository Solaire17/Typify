import { ChakraProvider } from "@chakra-ui/react";
import { myNewTheme } from "./chakraUI/theme";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

ReactDOM.render(
  <ChakraProvider theme={myNewTheme}>
    <App />
  </ChakraProvider>,
  document.getElementById("root")
);