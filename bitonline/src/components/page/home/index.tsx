// import axios from "axios";
// import type { NextPage } from "next";
// import Head from "next/head";
// import { useContext, useEffect, useState } from "react";
// import InfiniteScroll from "react-infinite-scroll-component";
// import { HomeContext } from "../../../context";
// import SortData from "./components/SortData";
// import HomeTable from "./components/Table";
// import CS from "./index.module.scss";

// const HomePage: NextPage = (currency) => {
//   const { result }: any = currency;
//   const { items, meta } = result;
//   const { paginateHelper, prices } = meta;
//   const { lastPage, total } = paginateHelper;
//   const [list, setList] = useState([...items]);
//   const [pages, setPages] = useState(2);
//   const [news, setNews] = useState([]);

//   const fetchData = async () => {
//     setPages(pages + 1);
//     console.log(pages);
//     const { data } = await axios.get(
//       `https://api.bitbarg.me/api/v1/currencies?page=${pages}`
//     );
//     const list = data.result.items;
//     setNews(list);

//     return list;
//   };
//   const data = useContext(HomeContext);
//   const { currencyList, search } = data;

//   useEffect(() => {
//     setList([...list, ...news]);
//   }, [news]);

//   return (
//     <div className={CS.container}>
//       <Head>
//         <title>قیمت لحظه ای | بیت برگ</title>
//       </Head>
//       <div>
//         {/* @ts-ignore */}
//         <SortData total={total} />
//         <InfiniteScroll
//           dataLength={list.length}
//           next={fetchData}
//           hasMore={pages <= lastPage}
//           loader={<h4></h4>}
//         >
//           <HomeTable
//             data={search ? currencyList?.result?.items : list}
//             meta={prices}
//           />
//         </InfiniteScroll>
//       </div>
//     </div>
//   );
// };

// export default HomePage;

import axios from "axios";
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
  const { currencyList, search, sort } = data;
  const { result }: any = currency;
  const { items, meta } = result;
  const { paginateHelper, prices } = meta;
  const { lastPage, total } = paginateHelper;
  const [pages, setPages] = useState(search ? 0 : 1);
  const [isFetch, setIsFetch] = useState(false);

  const fetchMore = () => {
    setPages((page) => page + 1);
    setIsFetch(true);
  };

  const { data: test } = useFetch(
    `https://api.bitbarg.me/api/v1/currencies`,
    isFetch ? [] : items,
    pages,
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
          hasMore={pages <= lastPage}
          loader={<h4></h4>}
        >
          <HomeTable data={test} meta={prices} />
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default HomePage;
