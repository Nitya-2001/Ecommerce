import { Button } from "@material-ui/core";
import React from "react";
import "./Contact.css";
const Contact = () => {
  return (
    <div className="contactContainer">
      <a className="mailBtn" href="mailto:mymailforabhi@gmail.com">
        <Button>Contact: AmanSingh723@gmail.com</Button>
      </a>
    </div>
  );
};

export default Contact;
