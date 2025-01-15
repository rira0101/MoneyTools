
// 数値を3桁ずつのカンマ区切り、かつ小数点以下を切り捨て
export const formatNumberWithCommas = (value: number): string => {
    return Math.floor(value).toLocaleString();
  };