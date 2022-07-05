import {
  Button,
  FilledInput,
  FormControl,
  Grid,
  InputAdornment,
  OutlinedInput,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { Box } from "@mui/system";
import Image from "next/image";
import React, { FC, useState } from "react";
import CS from "./index.module.scss";
import searchIcon from "../../../../../../public/assets/search.png";
import { starImg } from "../../../../../data/icons/icon";

const SortData: FC = ({ total = 0 }: any) => {
  const [type, setType] = React.useState<string | null>("تومان");
  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    type: string | null
  ) => {
    setType(type);
  };
  // console.log(total);
  return (
    <div>
      <div className={CS.sortHeader}>
        <span className={CS.title}>قیمت لحظه ای</span>
        <div className={CS.totalCount}>
          <span className={CS.total}></span>
          <span>{total} ارز دیجیتال</span>
        </div>
      </div>
      <Grid container columns={{ xs: 4, md: 12 }}>
        <Grid item xs={4}>
          <div>
            <OutlinedInput
              placeholder="جستجو"
              // value={values.amount}
              // onChange={handleChange("amount")}
              startAdornment={
                <InputAdornment position="start">
                  <Image src={searchIcon} alt="kde" />
                </InputAdornment>
              }
            />
          </div>
        </Grid>
        <Grid item xs={2}>
          <Button
            variant="outlined"
            startIcon={<Image src={starImg} alt="*" />}
          >
            <span style={{ padding: "0 10px" }}>نشان شده ها</span>
          </Button>
        </Grid>
      </Grid>

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
