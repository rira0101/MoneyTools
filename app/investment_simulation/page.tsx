"use client";
import React from "react";
import HeaderArea from "../component/HeaderArea";
import ChartContainer from "./ChartContainer";

// メインコンポーネント
const AboutIncreaseMoney: React.FC = () => {
  return (
    <div>
      <HeaderArea />
      <div className="flex justify-center ">
        <ChartContainer />
      </div>
    </div>
  );
};

export default AboutIncreaseMoney;
