// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

import Rails from "@rails/ujs";
import * as ActiveStorage from "@rails/activestorage";
import "channels";
import React from "react";
import ReactDOM from "react-dom";
import WalletSelectorApp from "../components/WalletSelectorApp";

Rails.start();
ActiveStorage.start();

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("wallet-app")) {
    ReactDOM.render(
      <WalletSelectorApp />,
      document.getElementById("wallet-app")
    );
  }
});
