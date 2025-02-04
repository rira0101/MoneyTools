import { Separator } from "@/components/ui/separator";
const SummarySection = ({
  data,
  lastIndex,
}: {
  data: { total: number; principal: number }[];
  lastIndex: number;
}) => {
  if (!data || lastIndex < 0 || lastIndex >= data.length) {
    return null;
  }

  const total = data[lastIndex].total.toLocaleString();
  const principal = data[lastIndex].principal.toLocaleString();
  const profit = (
    data[lastIndex].total - data[lastIndex].principal
  ).toLocaleString();

  return (
    <>
      <Separator className="my-4" />
      <div className="flex justify-end h-5 items-center space-x-4 text-xl">
        <div className="">{`総額：${total}円`}</div>
        <Separator orientation="vertical" />
        <div>{`元本：${principal}円`}</div>
        <Separator orientation="vertical" />
        <div>{`利益：${profit}円`}</div>
      </div>
    </>
  );
};

export default SummarySection;
