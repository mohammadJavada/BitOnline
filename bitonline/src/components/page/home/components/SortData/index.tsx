import { Button, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { Box } from "@mui/system";
import React, { FC, useState } from "react";
import CS from "./index.module.scss";

const SortData: FC = () => {
  const [type, setType] = React.useState<string | null>("تومان");
  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    type: string | null
  ) => {
    setType(type);
  };

  return (
    <div>
      <span className={CS.title}>قیمت لحظه ای</span>

      <Box
        m={1}
        style={{
          border: "1px solid #e0e0e0",
          padding: "4px",
          maxWidth: "max-content",
          borderRadius: "5px",
        }}
      >
        <ToggleButtonGroup
          value={type}
          exclusive
          onChange={handleAlignment}
          aria-label="text alignment"
        >
          <ToggleButton
            style={{
              padding: "0 20px",
              margin: "0 5px",
              border: "1px solid",
              borderRadius: "5px",
            }}
            value="تومان"
          >
            تومان
          </ToggleButton>
          <ToggleButton
            style={{
              padding: "0 20px",
              margin: "0 5px",
              border: "1px solid",
              borderRadius: "5px",
            }}
            value="تتر"
          >
            تتر
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
    </div>
  );
};

export default SortData;
