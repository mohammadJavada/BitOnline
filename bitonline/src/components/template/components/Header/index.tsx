import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import React, { FC } from "react";
import CS from "./index.module.scss";
import logo from "../../../../../public/assets/header-logo.svg";
import Image from "next/image";
import { Box } from "@mui/system";

const Header: FC = () => {
  return (
    <div className={CS.container}>
      <AppBar position="static" className={CS.header}>
        <Box className={CS.container}>
          <Toolbar className={CS.toolbar}>
            <Button color="inherit">منو</Button>
            <Button color="inherit">خانه</Button>
            <Button color="inherit">قیمت لحظه ای</Button>
            <Button color="inherit">کارمزدها</Button>
            <Button color="inherit">پورتفوی</Button>
          </Toolbar>

          <Toolbar className={CS.loginField}>
            <Button className={CS.loginBtn} variant="contained">
              ورود / ثبت نام
            </Button>
            <span className={CS.spaceContent}>|</span>
            <Image
              src={logo}
              alt="Picture of the author"
              width="119px"
              height="48px"
            />
          </Toolbar>
        </Box>
      </AppBar>
    </div>
  );
};

export default Header;
