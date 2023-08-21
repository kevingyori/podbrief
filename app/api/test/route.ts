const { NextResponse } = require("next/server");
const axios = require('axios');

console.log("hello world");

// export async function GET(request) {
//   const data = {
//     message: "podcast stuff",
//     timestamp: new Date().toISOString(),
//   };

//   return NextResponse.json(data, { status: 200 });
// }

module.exports.GET = async (request) => {
  const data = {
        message: "podcast stuff",
        timestamp: new Date().toISOString(),
      };
    
      return NextResponse.json(data, { status: 200 });
}

// axios.get('https://dummyjson.com/products/1')
//   .then(res => console.log(res.data))
//   .catch(error => console.error('Error:', error.message));


