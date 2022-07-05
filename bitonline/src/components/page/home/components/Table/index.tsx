import * as React from "react";
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

import CS from "./index.module.scss";
import { HistoryLineChart } from "./components";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import { listenerCount } from "process";

export default function HomeTable(data: any) {
  if (!data) return <></>;
  const { result } = data;
  const { items, meta } = result;
  const { paginateHelper } = meta;
  const { currentPage } = paginateHelper;
  console.log(data);

  const list: any[] = [];
  const currencyList = [...list, items];
  console.log(currencyList);

  const getMorePost = async () => {
    const { data } = await axios.get(
      `https://api.bitbarg.me/api/v1/currencies?page=${2}`
    );
    // console.log(data);
    return data;
  };

  return (
    <TableContainer component={Paper} className={CS.tableContainer}>
      <InfiniteScroll
        dataLength={items.length}
        next={getMorePost}
        // hasMore={hasMore}
        hasMore={items.length <= 20}
        loader={<h3> Loading...</h3>}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right" width="15%">
                نشان کردن
              </TableCell>
              <TableCell align="right" width="15%">
                تغییرات
              </TableCell>
              <TableCell align="right" width="15%">
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
            {currencyList
              ? items.map((row: any, i: any) => (
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
                      <HistoryLineChart
                        history={row.chart}
                        status={row.percent > 0 ? "Y" : "N"}
                        width={"145px"}
                        height={"40px"}
                      />
                    </TableCell>
                    <TableCell align="left" width="15%">
                      {row.price}
                    </TableCell>
                    <TableCell align="left" width="15%">
                      {row.price}
                    </TableCell>
                    <TableCell align="left" width="15%">
                      <div className={CS.imageField}>
                        <div className={CS.currencyName}>
                          <div>{row?.enName}</div>
                          <div className={CS.numberPrefix}>{i + 1}</div>
                        </div>
                        <div>
                          <Image
                            priority
                            src={row.icon}
                            loader={() => row.icon}
                            unoptimized={true} // <=== insert this prop
                            width={50}
                            height={50}
                            alt={"*"}
                          />
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              : ""}
          </TableBody>
        </Table>
      </InfiniteScroll>
    </TableContainer>
  );
}
