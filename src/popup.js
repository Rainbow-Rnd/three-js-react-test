import React from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";

function Popup({ visible, onHide }) {
  const footer = (
    <div>
      <Button label="Close" onClick={onHide} />
    </div>
  );

  return (
    <Dialog
      header="Information"
      visible={visible}
      onHide={onHide}
      footer={footer}
      position="top"
    >
      <p>Here you can get some information about your desired floor.</p>
    </Dialog>
  );
}

export default Popup;
