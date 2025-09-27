// yourApp.js


const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

const RTDB_URL = 'https://arctic-outpost-472823-r2-default-rtdb.asia-southeast1.firebasedatabase.app';
const STORAGE_BUCKET = 'arctic-outpost-472823-r2.appspot.com';

function loadServiceAccount() {
  const jsonFromEnv = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  if (jsonFromEnv) {
    try {
      return JSON.parse(jsonFromEnv);
    } catch (error) {
      throw new Error('FIREBASE_SERVICE_ACCOUNT_JSON không phải JSON hợp lệ.');
    }
  }

  const candidatePaths = [
    process.env.GOOGLE_APPLICATION_CREDENTIALS,
    path.resolve(__dirname, '../config/serviceAccountKey.json'),
    path.resolve(__dirname, './serviceAccountKey.json')
  ].filter(Boolean);

  for (const candidate of candidatePaths) {
    const resolved = path.resolve(candidate);
    if (fs.existsSync(resolved)) {
      try {
        const raw = fs.readFileSync(resolved, 'utf8');
        return JSON.parse(raw);
      } catch (error) {
        throw new Error(`Không thể đọc service account từ ${resolved}: ${error.message}`);
      }
    }
  }

  throw new Error(
    'Không tìm thấy service account. Thiết lập biến môi trường GOOGLE_APPLICATION_CREDENTIALS hoặc FIREBASE_SERVICE_ACCOUNT_JSON, ' +
    'hoặc đặt file serviceAccountKey.json trong thư mục js/ hoặc config/.'
  );
}

function ensureFirebaseApp() {
  if (admin.apps.length) {
    return admin.app();
  }

  const serviceAccount = loadServiceAccount();

  return admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: RTDB_URL,
    storageBucket: STORAGE_BUCKET
  });
}

async function main() {
  try {
    const app = ensureFirebaseApp();
    const [dbUrl, bucketName] = [app.options.databaseURL, app.options.storageBucket];

    console.log('Firebase Admin đã khởi tạo.');
    console.log('Realtime Database URL:', dbUrl);
    console.log('Storage bucket:', bucketName || '(chưa cấu hình)');

    const db = admin.database();
    const snapshot = await db.ref('.info/serverTimeOffset').once('value');
    console.log('Kết nối Realtime Database OK. Time offset (ms):', snapshot.val());

    if (bucketName) {
      const [files] = await admin.storage().bucket().getFiles({ maxResults: 1 });
      if (files.length) {
        console.log('Storage OK. Ví dụ file đầu tiên:', files[0].name);
      } else {
        console.log('Storage OK. Bucket chưa có file.');
      }
    }

    console.log('Hoàn tất kiểm tra service account.');
    process.exit(0);
  } catch (error) {
    console.error('Không thể khởi tạo Firebase Admin:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}