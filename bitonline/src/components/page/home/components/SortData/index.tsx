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
import React, { FC, useContext, useState } from "react";
import CS from "./index.module.scss";
import searchIcon from "../../../../../../public/assets/search.png";
import { starImg } from "../../../../../data/icons/icon";
import { HomeContext } from "../../../../../context";

const SortData: FC = ({ total }: any) => {
  const data = useContext(HomeContext);
  const {
    search,
    setSearch,
    sort,
    setSort,
    sortList,
    type,
    setType,
    setIsFetch,
    setSortLists,
    setCurrentPage,
  } = data;

  const [delay, setDelay] = useState(0);

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    type: string | null
  ) => {
    setType(type);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setSort(event.target.value);
    setSortLists([]);
    setCurrentPage(1);
    setIsFetch(true);
  };

  const handleSearch = (e: any) => {
    setSearch(e.target.value);
    const delayDebounceFn = setTimeout(async () => {
      setCurrentPage(1);
      setIsFetch(true);
      setDelay(delay + 1);
    }, 2000);

    return () => clearTimeout(delayDebounceFn);
  };

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
            onChange={handleSearch}
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
          startIcon={<Image src={starImg} alt="*" width={20} height={20} />}
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
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              width: "100%",
            }}
          >
            <ToggleButton
              style={{
                padding: "0 20px",
                margin: "0 5px",
                borderRadius: "5px",
                backgroundColor: type === "تومان" ? "#4285F21A" : "#fff",
                borderColor: type === "تومان" ? "#4285F21A" : "#fff",
              }}
              value="تومان"
            >
              <div>تومان</div>
            </ToggleButton>
            <ToggleButton
              style={{
                padding: "0 20px",
                margin: "0 5px",
                borderRadius: "5px",
                backgroundColor: type === "تتر" ? "#4285F21A" : "#fff",
                borderColor: type === "تتر" ? "#4285F21A" : "#fff",
              }}
              value="تتر"
            >
              <div>تتر</div>
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </div>
    </div>
  );
};

export default SortData;
