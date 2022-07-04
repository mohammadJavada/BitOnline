import type { NextPage } from "next";
import HomePage from "../components/page/home";
import PageLayout from "../components/template/components";
import { dehydrate, QueryClient, useQuery } from "react-query";
import axios from "axios";

const Home: NextPage = () => {
  return (
    <div>
      <PageLayout>
        <HomePage />
        <>{/* <h2>{data?.result.meta.prices.buy}</h2> */}</>
      </PageLayout>
    </div>
  );
};

export default Home;
