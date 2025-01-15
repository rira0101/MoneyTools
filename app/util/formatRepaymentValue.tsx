import { formatNumberWithCommas } from "./formatNumberWithCommas";

export const formatRepaymentValue = (
  value: number | string | undefined | null
): string => {
  return value !== undefined && value !== null
    ? formatNumberWithCommas(value)
    : "-";
};
