import type { NextPage } from "next";
import Head from "next/head";
import SortData from "./components/SortData";
import CS from "./index.module.scss";

const HomePage: NextPage = () => {
  return (
    <div className={CS.container}>
      <Head>
        <title>قیمت لحظه ای | بیت برگ</title>
      </Head>
      <div>
        <SortData />
      </div>
    </div>
  );
};

export default HomePage;
