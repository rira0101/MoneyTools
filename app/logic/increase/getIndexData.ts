import { IndexData } from "@/app/types/assetManagement/IndexData";

export const getIndexData = async (path:string): Promise<IndexData[]> => {
  const res = await fetch(path);
  console.log(res);
  const data: IndexData[] = await res.json();
  return data;
};