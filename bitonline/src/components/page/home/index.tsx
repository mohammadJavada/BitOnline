import type { NextPage } from "next";
import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { HomeContext } from "../../../context";
import useFetch from "./components/fetchData";
import SortData from "./components/SortData";
import HomeTable from "./components/Table";
import CS from "./index.module.scss";

const HomePage: NextPage = (currency) => {
  const data = useContext(HomeContext);
  const { search, sort, isFetch, setIsFetch, currentPage, setCurrentPage } =
    data;
  const { result }: any = currency;
  const { items, meta } = result;
  const { paginateHelper, prices } = meta;
  const { lastPage, total } = paginateHelper;

  const fetchMore = () => {
    setCurrentPage((page: any) => page + 1);
    setIsFetch(true);
  };

  const { data: test, loading } = useFetch(
    `https://api.bitbarg.me/api/v1/currencies`,
    isFetch ? [] : items,
    currentPage,
    search,
    sort,
    isFetch
  );
  return (
    <div className={CS.container}>
      <Head>
        <title>قیمت لحظه ای | بیت برگ</title>
      </Head>
      <div>
        {/* @ts-ignore */}
        <SortData total={total} />
        <InfiniteScroll
          dataLength={test.length}
          next={fetchMore}
          hasMore={currentPage <= lastPage}
          loader={<h4></h4>}
        >
          <HomeTable data={test} meta={prices} />
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default HomePage;
