import { z } from "zod";

// Repayment の型が不明な場合、適宜定義してください。
const RepaymentSchema = z.object({
  // Repayment のフィールドを適切に定義
});

export const LoanInfoSchema = z.object({
  name: z.string().nonempty("名前は必須です"),
  loanAmount: z.number().min(0, "借入金額は0以上である必要があります"),
  year: z.number().min(0, "返済年数は0以上である必要があります"),
  month: z.number().min(0, "返済月数は0以上である必要があります"),
  interestRate: z.number().min(0, "借入利率は0以上である必要があります"),
  repayment: RepaymentSchema.nullable(),
});

// 型エイリアスをエクスポート
export type LoanInfo = z.infer<typeof LoanInfoSchema>;