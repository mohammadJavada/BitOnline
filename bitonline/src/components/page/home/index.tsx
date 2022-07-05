import axios from "axios";
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useQuery } from "react-query";
import SortData from "./components/SortData";
import HomeTable from "./components/Table";
import CS from "./index.module.scss";

const HomePage: NextPage = (currency) => {
  const { result }: any = currency;
  const { items, meta } = result;
  const { paginateHelper } = meta;
  const { lastPage, total } = paginateHelper;
  const [list, setList] = useState([...items]);
  const [pages, setPages] = useState(2);
  const [news, setNews] = useState([]);

  const fetchData = async () => {
    // setPages(pages + 1);
    setPages(pages + 1);
    const { data } = await axios.get(
      `https://api.bitbarg.me/api/v1/currencies?page=${pages}`
    );
    const list = data.result.items;
    setNews(list);

    return list;
  };

  useEffect(() => {
    setList([...list, ...news]);
  }, [news]);
  console.log(list);
  return (
    <div className={CS.container}>
      <Head>
        <title>قیمت لحظه ای | بیت برگ</title>
      </Head>
      <div>
        <SortData total={total} />
        <InfiniteScroll
          dataLength={list.length}
          next={fetchData}
          hasMore={pages <= lastPage}
          loader={<h4>Loading...</h4>}
        >
          <HomeTable data={list} />
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default HomePage;
