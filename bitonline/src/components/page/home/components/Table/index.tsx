import React, { useContext } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import Image from "next/image";

import { emptyImg, starImg, tetherImg } from "@data";
import { Price } from "@utils";
import { HomeContext } from "@context/index";
import { HistoryLineChart } from "./components";
import CS from "./index.module.scss";

export default function HomeTable({ data = [], meta, isLoading }: any) {
  const datas = useContext(HomeContext);
  const { type } = datas;
  const { buy, sell } = meta;
  if (!data) return <></>;

  const checkPrice = (data: number, t: string) => {
    if (type === "تومان" && t === "sell") {
      return Math.floor(data * sell);
    } else if (type === "تومان" && t === "buy") {
      return Math.floor(data * buy);
    }
    return Math.floor(data);
  };

  return (
    <TableContainer component={Paper} className={CS.tableContainer}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow className={CS.tableRow}>
            <TableCell
              align="right"
              width="15%"
              className={`${CS.tableHeader}`}
            >
              <div className={CS.select}>نشان کردن</div>
            </TableCell>
            <TableCell align="right" width="15%" className={CS.tableHeader}>
              <div>تغییرات</div>
            </TableCell>
            <TableCell align="center" width="15%" className={CS.tableHeader}>
              <div>نمودار</div>
            </TableCell>
            <TableCell align="left" width="15%" className={CS.tableHeader}>
              <div>{type === "تومان" ? " قیمت فروش" : "ارزش بازار"}</div>
            </TableCell>
            <TableCell align="left" width="15%" className={CS.tableHeader}>
              <div>{type === "تومان" ? " قیمت خرید" : "قیمت جهانی"}</div>
            </TableCell>
            <TableCell align="left" width="15%" className={CS.tableHeader}>
              <div>ارز دیجیتال</div>
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {data.length ? (
            data.map((row: any, i: any) => (
              <TableRow
                key={i}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="right">
                  {
                    <Button variant="text">
                      <Image src={starImg} alt="*" width={20} height={20} />
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
                  <div className={CS.percentdir}>{row.percent}%</div>
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
                  <div className={CS.price}>
                    <span className={CS.tableHeader}>
                      {Price.seperate(checkPrice(row?.price, "sell"))}
                    </span>
                    <span>
                      {type === "تومان" ? (
                        " تومان"
                      ) : (
                        <Image src={tetherImg} alt="*" width={20} height={20} />
                      )}
                    </span>
                  </div>
                </TableCell>
                <TableCell align="left" width="15%">
                  <div className={CS.price}>
                    <span className={CS.tableHeader}>
                      {Price.seperate(checkPrice(row?.price, "buy"))}
                    </span>
                    <span>
                      {type === "تومان" ? (
                        " تومان"
                      ) : (
                        <Image src={tetherImg} alt="*" width={20} height={20} />
                      )}
                    </span>
                  </div>
                </TableCell>
                <TableCell align="left" width="15%">
                  <div className={CS.imageField}>
                    <div className={CS.currencyName}>
                      <div className={CS.currencyEnName}>{row?.enName}</div>
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
                        width={36}
                        height={36}
                        alt={"*"}
                      />
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell component="th" scope="row"></TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {!data?.length && isLoading !== true ? (
        <div className={CS.emptyImage}>
          <Image src={emptyImg} alt="*" width="100" />
        </div>
      ) : (
        ""
      )}
    </TableContainer>
  );
}
