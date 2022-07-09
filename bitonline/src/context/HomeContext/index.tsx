import React, { createContext, useState } from "react";

export const HomeContext = createContext<any>({});

export const HomeProvider = (props: any) => {
  const [search, setSearch] = useState<string>("");
  const [sort, setSort] = useState<number>(0);
  const [type, setType] = useState<string>("تومان");
  const [isFetch, setIsFetch] = useState<boolean>(false);

  const [sortLists, setSortLists] = useState<any[]>([]);
  const [searchList, setSearchList] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const sortList = ["حالت پیش فرض", "کمترین قیمت", "بیشترین قیمت"];

  return (
    <HomeContext.Provider
      value={{
        isFetch,
        setIsFetch,
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
        searchList,
        setSearchList,
      }}
    >
      {props.children}
    </HomeContext.Provider>
  );
};
