import {
  calculateTotalMonthlyRepayment,
  calculateTotalInterest,
  calculateTotalOverallRepayment,
} from "../logic/loan/calcTotal";
import { CardLoanInfo } from "../types/CardLoanInfo";
import { LoanInfo } from "../types/LoanInfo";
import { formatNumberWithCommas } from "../util/formatNumberWithCommas";

interface TotalRepaymentInfoProps {
  loanList?: LoanInfo[];
  cardLoanList?: CardLoanInfo[];
}

const TotalRepaymentInfo: React.FC<TotalRepaymentInfoProps> = ({
  loanList = [],
  cardLoanList = [],
}) => {
  return (
    <div className="text-base font-bold text-blue-700 mt-2">
      <p>
        月々の総返済額:{" "}
        {formatNumberWithCommas(
          calculateTotalMonthlyRepayment(loanList, cardLoanList)
        )}{" "}
        円
      </p>
      <p>
        総利息返済額:{" "}
        {formatNumberWithCommas(calculateTotalInterest(loanList, cardLoanList))}{" "}
        円
      </p>
      <p>
        総返済額:{" "}
        {formatNumberWithCommas(
          calculateTotalOverallRepayment(loanList, cardLoanList)
        )}{" "}
        円
      </p>
    </div>
  );
};

export default TotalRepaymentInfo;
