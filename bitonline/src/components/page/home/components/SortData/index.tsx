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

import React, { ChangeEvent, FC, useContext, useEffect, useState } from "react";

import { Box } from "@mui/system";
import Image from "next/image";
import { starImg, searchIcon } from "@data";
import { HomeContext } from "@context/index";

import CS from "./index.module.scss";
import { useDebounce } from "@hooks";

interface PostProps {
  total: number;
}

const SortData: FC<PostProps> = ({ total }) => {
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
    setSearchList,
  } = data;
  const handleChange = (event: SelectChangeEvent) => {
    setSort(event.target.value);
    setSortLists([]);
    setSearchList([]);
    setCurrentPage(1);
    setIsFetch(true);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const debounce = useDebounce(search, 2000);

  useEffect(() => {
    if (search.length >= 1 && debounce === search) {
      setCurrentPage(1);
      setIsFetch(true);
    } else {
      setSearchList([]);
      setCurrentPage(1);
    }
  }, [debounce, search, setCurrentPage, setIsFetch, setSearchList]);

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
            className={CS.searchInput}
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
          className={CS.hightlightedBtn}
          variant="outlined"
          startIcon={<Image src={starImg} alt="*" width={20} height={20} />}
        >
          <span className={CS.hightlightedBtnTitle}>نشان شده ها</span>
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
        <Box className={CS.box}>
          <ToggleButtonGroup
            exclusive
            aria-label="text alignment"
            className={CS.toggleButtonGroup}
          >
            <ToggleButton
              onClick={() => setType("تومان")}
              className={`${CS.toggleButton} ${
                type === "تومان" && CS.toggleButtonSeleced
              }`}
              value="تومان"
            >
              <div>تومان</div>
            </ToggleButton>
            <ToggleButton
              onClick={() => setType("تتر")}
              className={`${CS.toggleButton} ${
                type === "تتر" && CS.toggleButtonSeleced
              }`}
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
