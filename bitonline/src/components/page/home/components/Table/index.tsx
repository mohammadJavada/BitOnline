import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import Image from "next/image";
import { starImg } from "../../../../../data/icons/icon";

import { HistoryLineChart } from "./components";

import CS from "./index.module.scss";
import { Price } from "../../../../../utils";

export default function HomeTable({ data = [] }: any) {
  if (!data) return <></>;

  return (
    <TableContainer component={Paper} className={CS.tableContainer}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right" width="15%">
              نشان کردن
            </TableCell>
            <TableCell align="right" width="15%">
              تغییرات
            </TableCell>
            <TableCell align="center" width="15%">
              نمودار
            </TableCell>
            <TableCell align="left" width="15%">
              قیمت فروش
            </TableCell>
            <TableCell align="left" width="15%">
              قیمت خرید
            </TableCell>
            <TableCell align="left" width="15%">
              ارز دیجیتال
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row: any, i: any) => (
            <TableRow
              key={i}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="right">
                {
                  <Button variant="text">
                    <Image src={starImg} alt="*" />
                  </Button>
                }
              </TableCell>
              <TableCell
                align="right"
                width="15%"
                className={
                  row.percent === 0
                    ? CS.percent
                    : row.percent > 0
                    ? CS.positive
                    : CS.negative
                }
              >
                {row.percent}%
              </TableCell>
              <TableCell align="right" width="15%">
                {row?.chart?.length ? (
                  <HistoryLineChart
                    history={row.chart}
                    status={row.percent > 0 ? "Y" : "N"}
                    width={"145px"}
                    height={"40px"}
                  />
                ) : (
                  ""
                )}
              </TableCell>
              <TableCell align="left" width="15%">
                {/* {toFarsiNumber(row?.price)} */}
                {Price.seperate(row?.price)}
              </TableCell>
              <TableCell align="left" width="15%">
                {Price.seperate(row?.price)}
              </TableCell>
              <TableCell align="left" width="15%">
                <div className={CS.imageField}>
                  <div className={CS.currencyName}>
                    <div>{row?.enName}</div>
                    <div className={CS.currencySymbol}>
                      <div className={CS.numberPrefix}>{i + 1}</div>
                      <div>{row?.coin}</div>
                    </div>
                  </div>
                  <div>
                    <Image
                      priority
                      src={row.icon}
                      loader={() => row.icon}
                      unoptimized={true}
                      width={50}
                      height={50}
                      alt={"*"}
                    />
                  </div>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
