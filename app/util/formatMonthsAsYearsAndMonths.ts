// XXヶ月の形からX年Yヶ月の形に変換する関数
// 0年の場合はXヶ月のみ表示、ちょうどX年0ヶ月のときはX年のみ表示する
export const formatRepaymentPeriod = (months: number): string => {
    const years = Math.floor(months / 12); // 年数
    const remainingMonths = months % 12; // 残りの月数

    if (years > 0 && remainingMonths > 0) {
      return `${years}年${remainingMonths}ヶ月`;
    } else if (years > 0) {
      return `${years}年`;
    } else {
      return `${remainingMonths}ヶ月`;
    }
  };