import React from "react";
import {
  OverlayTrigger,
  Tooltip as ReactBootstrapTooltip,
} from "react-bootstrap";

const Tooltip = ({
  component: Component,
  icon: ReactIcon,
  variant = null,
  message = null,
}) => {
  return (
    <OverlayTrigger
      overlay={
        <ReactBootstrapTooltip id="tooltip-disabled">
          {message}
        </ReactBootstrapTooltip>
      }
    >
      <span className="d-inline-block">
        <Component disabled style={{ pointerEvents: "none" }} variant={variant}>
          <ReactIcon />
        </Component>
      </span>
    </OverlayTrigger>
  );
};

export default Tooltip;
