import { useEffect, useState } from "react";
import axios from "axios";

export default function useFetch(
  url: string = "",
  dataList: any[] = [],
  page: number = 0,
  search: string = "",
  sort: number = 2,
  isFetch: boolean = false
) {
  console.log(search);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(dataList);
  useEffect(() => {
    (async function () {
      if (isFetch) {
        try {
          setLoading(true);
          const response = await axios.get(`${url}?page=${page}&sort=${sort}`);
          const { data }: any = response;
          console.log(data);
          const list = data?.result?.items;
          setData((post: any) => [...post, ...list]);
        } catch (err: any) {
          setError(err);
        } finally {
          setLoading(false);
        }
      }
    })();
  }, [page, sort, search, url, isFetch]);

  return { data, error, loading };
}
