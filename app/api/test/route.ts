import { NextResponse } from "next/server";

console.log("hello world");
// export default (req, res) => {
//   const data = {
//     message: "podcast stuff",
//     timestamp: new Date().toISOString(),
//   };

//   res.status(200).json(data);
// };

export async function GET(request: Request) {
  const data = {
    message: "podcast stuff",
    timestamp: new Date().toISOString(),
  };

  return NextResponse.json(data, { status: 200 });
}
