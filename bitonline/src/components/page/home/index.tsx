import axios from "axios";
import type { NextPage } from "next";
import Head from "next/head";
import { useQuery } from "react-query";
import SortData from "./components/SortData";
import CS from "./index.module.scss";

type CurrencyData = {
  // currencyList
  result: {
    items: {
      chart?: string[]; // مقادیر مورد نیاز چارت
      coin?: string; // نام مختصر ارز
      percent?: number; // درصد تغییر
      enName?: string; // نام انگلیسی
      faName?: string; // نام فارسی
      icon?: string; // آدرس تصویر
      quote?: number; // ارزش بازار)(MCap)
      price?: number; //قیمت به تتر
    };
    meta: {
      paginateHelper: {
        currentPage?: number; // صفحه فعلی
        currencyCount?: number; // تعداد در صفحه فعلی
        lastPage?: number; // صفحه آخر
        pageSize?: number; // تعداد در هر صفحه
        total?: number; // تعداد کل
      };
      prices: {
        // اطلاعات قیمت دلار
        buy?: number; // قیمت خرید به تومان
        sell?: number; // قیمت فروش به تومان
        // برای محاسبه قیمت ارز به تومان باید قیمت آهن به تتر را در قیمت دلار به تومان ضرب کنیم، قیمت خرید و فروش متفاوت است
      };
    };
  };
};

const getCurrnecyList = async () => {
  const { data } = await axios.get(
    `https://api.bitbarg.me/api/v1/currencies?page=${1}`
  );

  return data;
};

const HomePage: NextPage = () => {
  const { data, isLoading, isFetching } = useQuery<CurrencyData>(
    "currencyList",
    getCurrnecyList
  );
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
