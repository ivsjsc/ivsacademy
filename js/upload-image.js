// upload-image.js
import { storage } from 'firebase-admin';

const bucket = storage().bucket(); // dùng bucket từ initializeApp

// upload local file lên bucket
async function uploadImage(localFilePath, destFileName) {
  await bucket.upload(localFilePath, {
    destination: destFileName,
    metadata: {
      cacheControl: 'public, max-age=31536000',
      contentType: 'image/jpeg' // hoặc lấy tự động
    }
  });
  const file = bucket.file(destFileName);
  // tạo signed URL public đọc (hoặc cấu hình ACL publicRead)
  const [url] = await file.getSignedUrl({
    action: 'read',
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000 // 7 ngày
  });
  return url;
}

// ví dụ gọi
uploadImage('C:\\temp\\mypic.jpg', 'uploads/mypic.jpg')
  .then(url => console.log('Image url:', url))
  .catch(err => console.error(err));