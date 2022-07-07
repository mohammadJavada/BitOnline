import React, { createContext, useState } from "react";

export const HomeContext = createContext<any>({});

export const HomeProvider = (props: any) => {
  const [currencyList, setCurrencyList] = useState([]);

  const [search, setSearch] = useState<string>("");
  const [sort, setSort] = useState(0);
  const [type, setType] = useState("تومان");
  const [isFetch, setIsFetch] = useState(false);

  const [sortLists, setSortLists] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const sortList = ["حالت پیش فرض", "کمترین قیمت", "بیشترین قیمت"];

  return (
    <HomeContext.Provider
      value={{
        isFetch,
        setIsFetch,
        setCurrencyList,
        currencyList,
        search,
        setSearch,
        sort,
        setSort,
        sortList,
        type,
        setType,
        sortLists,
        setSortLists,
        currentPage,
        setCurrentPage,
      }}
    >
      {props.children}
    </HomeContext.Provider>
  );
};
