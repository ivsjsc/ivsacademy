// yourApp.js
const admin = require('firebase-admin');
const path = require('path');

// chỉ dùng require khi file JSON nằm trong máy dev/server và bạn chấp nhận đưa vào repo (không khuyến nghị)
const serviceAccount = require(path.resolve(__dirname, './path/to/serviceAccountKey.json'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://arctic-outpost-472823-r2-default-rtdb.asia-southeast1.firebasedatabase.app",
  // nếu bạn dùng Storage, thêm storageBucket:
  storageBucket: "arctic-outpost-472823-r2.appspot.com" // thay bằng bucket của bạn
});