// LoanFormList.tsx
import { Button } from "@/components/ui/button";
import { LoanForm } from "../component/LoanForm";
import { LoanInfo } from "../types/LoanInfo";
import { formatNumberWithCommas } from "../util/formatNumberWithCommas";

interface LoanFormListProps {
  loanList: LoanInfo[];
  loanFormChange: (
    index: number,
    field: keyof LoanInfo,
    value: number | string
  ) => void;
  deleteLoan: (type: "loan" | "cardLoan", index: number) => void;
  handleAddLoan: () => void;
}

const LoanFormList: React.FC<LoanFormListProps> = ({
  loanList,
  loanFormChange,
  deleteLoan,
  handleAddLoan,
}) => {
  return (
    <div>
      {loanList.map((loan, index) => (
        <div
          key={index}
          className="p-3 max-w-lg mx-auto bg-gray-100 rounded shadow mt-2 mb-6"
        >
          <LoanForm
            index={index}
            loanInfo={loan}
            handleChange={loanFormChange}
          />
          {loan.repayment !== null && (
            <div className="mt-4 text-green-500 font-bold mb-4">
              <p>
                毎月返済額:{" "}
                {formatNumberWithCommas(loan.repayment.monthlyRepayment)} 円
              </p>
              <p>
                総返済利息:{" "}
                {formatNumberWithCommas(loan.repayment.totalInterest)} 円
              </p>
              <p>
                総返済額:{" "}
                {formatNumberWithCommas(loan.repayment.totalRepayment)} 円
              </p>
            </div>
          )}
          <Button
            className="bg-blue-500 hover:bg-blue-700"
            onClick={() => deleteLoan("loan", index)}
          >
            削除
          </Button>
        </div>
      ))}
      <div className="flex justify-center">
        <Button
          className="bg-blue-500 hover:bg-blue-700"
          onClick={handleAddLoan}
        >
          ローンを追加
        </Button>
      </div>
    </div>
  );
};

export default LoanFormList;
