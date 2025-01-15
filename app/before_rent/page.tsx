import NavigatorBar from "../component/NavigatorBar";
import Title from "../component/Title";

export default function BeforeRent() {
  return (
    <div>
      <Title />
      <NavigatorBar />
      <div className="flex justify-center">
        aaa
        {/* ここに中身を突っ込んでいく */}
      </div>
    </div>
  );
}
