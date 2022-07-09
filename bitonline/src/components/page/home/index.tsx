import type { NextPage } from "next";
import Head from "next/head";
import { useContext, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { HomeContext } from "@context/index";
import useFetch from "./components/useFetch/index";
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
    setCurrentPage((page: number) => page + 1);
    setIsFetch(true);
  };

  const { data: dataList, loading } = useFetch(
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
          dataLength={dataList.length}
          next={fetchMore}
          hasMore={currentPage <= lastPage}
          loader={<h4></h4>}
        >
          <HomeTable data={dataList} meta={prices} isloading={loading} />
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default HomePage;
