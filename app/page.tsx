import HeaderArea from "./component/HeaderArea";

export default function Home() {
  return (
    <div>
      <HeaderArea />
      <div className="mx-20">
        <p className="text-2xl font-bold">はじめに</p>
        <p className="mt-4">
          本サイトは主に個人を対象としたお金に関する情報・各種シミュレーションを提供する事を目的としています。
        </p>
        <p>カードローンに手を出してしまっている。</p>
        <p>近々車を買おうとしているけど、どういった買い方が良いの？</p>
        <p>住宅ローンは？</p>
        <p>といった借入の話から</p>
        <p>
          投資ってどんなものがあるの？どういった投資が多くの人におすすめなの？投資した時のシミュレーション、アンチパターン等多くの情報を掲載しています
        </p>
      </div>
    </div>
  );
}
