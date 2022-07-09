import React, { FC } from "react";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import CS from "./index.module.scss";
import Image from "next/image";
import { Box } from "@mui/system";
import { logoImg, menuImg } from "@data";

const Header: FC = () => {
  return (
    <div className={`${CS.container} dir`}>
      <AppBar position="static" className={CS.header}>
        <Box className={CS.container}>
          <Toolbar className={CS.toolbar}>
            <Button color="inherit">
              <Image src={menuImg} alt="*" width={20} height={20} />
              <span className={CS.menuTitle}>منو</span>
            </Button>
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
              src={logoImg}
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
