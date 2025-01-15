import {
  calculateTotalMonthlyRepayment,
  calculateTotalInterest,
  calculateTotalOverallRepayment,
} from "../logic/loan/calcTotal";
import { CardLoanInfo } from "../types/CardLoanInfo";
import { LoanInfo } from "../types/LoanInfo";
import { formatNumberWithCommas } from "../util/formatNumberWithCommas";

interface RefinanceResultProps {
  loanList?: LoanInfo[];
  cardLoanList?: CardLoanInfo[];
  refinanceLoanList: LoanInfo[];
}

const RefinanceResult: React.FC<RefinanceResultProps> = ({
  loanList = [],
  cardLoanList = [],
  refinanceLoanList = [],
}) => {
  const beforeMonthlyRepayment = calculateTotalMonthlyRepayment(
    loanList,
    cardLoanList
  );
  const beforeTotalInterest = calculateTotalInterest(loanList, cardLoanList);
  const beforeOverallRepayment = calculateTotalOverallRepayment(
    loanList,
    cardLoanList
  );

  const afterMonthlyRepayment =
    calculateTotalMonthlyRepayment(refinanceLoanList);
  const afterTotalInterest = calculateTotalInterest(refinanceLoanList);
  const afterOverallRepayment =
    calculateTotalOverallRepayment(refinanceLoanList);

  const monthlySavings = beforeMonthlyRepayment - afterMonthlyRepayment;
  const totalInterestSavings = beforeTotalInterest - afterTotalInterest;
  const overallSavings = beforeOverallRepayment - afterOverallRepayment;

  return (
    <div className="mt-6">
      <table className="table-auto w-full border-collapse border border-gray-400">
        <thead>
          <tr className="bg-gray-300">
            <th className="border border-gray-400 px-4 py-2">項目</th>
            <th className="border border-gray-400 px-4 py-2">借換前</th>
            <th className="border border-gray-400 px-4 py-2">借換後</th>
            <th className="border border-gray-400 px-4 py-2">
              借換後の改善金額
            </th>
          </tr>
        </thead>
        <tbody className="bg-gray-100">
          <tr>
            <td className="border border-gray-400 px-4 py-2">月々の総返済額</td>
            <td className="border border-gray-400 px-4 py-2">
              {formatNumberWithCommas(beforeMonthlyRepayment)} 円
            </td>
            <td className="border border-gray-400 px-4 py-2">
              {formatNumberWithCommas(afterMonthlyRepayment)} 円
            </td>
            <td className="border border-gray-400 px-4 py-2">
              {formatNumberWithCommas(monthlySavings)} 円
            </td>
          </tr>
          <tr>
            <td className="border border-gray-400 px-4 py-2">総利息返済額</td>
            <td className="border border-gray-400 px-4 py-2">
              {formatNumberWithCommas(beforeTotalInterest)} 円
            </td>
            <td className="border border-gray-400 px-4 py-2">
              {formatNumberWithCommas(afterTotalInterest)} 円
            </td>
            <td className="border border-gray-400 px-4 py-2">
              {formatNumberWithCommas(totalInterestSavings)} 円
            </td>
          </tr>
          <tr>
            <td className="border border-gray-400 px-4 py-2">総返済額</td>
            <td className="border border-gray-400 px-4 py-2">
              {formatNumberWithCommas(beforeOverallRepayment)} 円
            </td>
            <td className="border border-gray-400 px-4 py-2">
              {formatNumberWithCommas(afterOverallRepayment)} 円
            </td>
            <td className="border border-gray-400 px-4 py-2">
              {formatNumberWithCommas(overallSavings)} 円
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default RefinanceResult;
