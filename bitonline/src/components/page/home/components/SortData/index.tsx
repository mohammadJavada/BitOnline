import {
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { Box } from "@mui/system";
import Image from "next/image";
import React, { FC, useContext, useEffect } from "react";
import CS from "./index.module.scss";
import searchIcon from "../../../../../../public/assets/search.png";
import { starImg } from "../../../../../data/icons/icon";
import { HomeContext } from "../../../../../context";
import axios from "axios";

const SortData: FC = ({ total }: any) => {
  // const [type, setType] = React.useState<string | null>("تومان");
  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    type: string | null
  ) => {
    setType(type);
  };

  const data = useContext(HomeContext);
  const {
    setCurrencyList,
    search,
    setSearch,
    sort,
    setSort,
    sortList,
    type,
    setType,
  } = data;
  const handleChange = (event: SelectChangeEvent) => {
    setSort(event.target.value);
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      const { data } = await axios.get(
        search
          ? `https://api.bitbarg.me/api/v1/currencies?page=${1}/&q=${search}`
          : ""
      );
      data ? setCurrencyList(data) : setCurrencyList([]);
    }, 1500);

    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  return (
    <div>
      <div className={CS.sortHeader}>
        <span className={CS.title}>قیمت لحظه ای</span>
        <div className={CS.totalCount}>
          <span className={CS.total}></span>
          <span>{total} ارز دیجیتال</span>
        </div>
      </div>
      <div className={CS.sortContainer}>
        <div>
          <OutlinedInput
            style={{ width: "100%" }}
            placeholder="جستجو"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            startAdornment={
              <InputAdornment position="start">
                <Image src={searchIcon} alt="kde" />
              </InputAdornment>
            }
          />
        </div>
        <Button
          style={{ border: "1px solid #e0e0e0" }}
          variant="outlined"
          startIcon={<Image src={starImg} alt="*" />}
        >
          <span style={{ padding: "0 10px", color: "rgba(0, 0, 0, 0.87)" }}>
            نشان شده ها
          </span>
        </Button>
        <FormControl size="medium" sx={{ width: 200 }}>
          <InputLabel id="demo-multiple-checkbox-label">
            ترتیب بر اساس
          </InputLabel>
          <Select
            labelId="demo-select-small"
            id="demo-select-small"
            value={sort}
            onChange={handleChange}
            label="ترتیب بر اساس"
          >
            {sortList?.map((item: any, i: number) => (
              <MenuItem key={i} value={i}>
                <em>{item}</em>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box
          style={{
            border: "1px solid #e0e0e0",
            padding: "4px",
            maxWidth: "max-content",
            borderRadius: "5px",
            display: "flex",
            width: "100%",
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
                borderRadius: "5px",
                backgroundColor: type === "تومان" ? "#4285F21A" : "#fff",
              }}
              value="تومان"
            >
              تومان
            </ToggleButton>
            <ToggleButton
              style={{
                padding: "0 20px",
                margin: "0 5px",
                borderRadius: "5px",
                backgroundColor: type === "تتر" ? "#4285F21A" : "#fff",
              }}
              value="تتر"
            >
              تتر
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </div>
    </div>
  );
};

export default SortData;
