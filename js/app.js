import { auth, db } from './firebase-init.js';
import { signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

// Đăng nhập mẫu
async function login(email, password) {
  await signInWithEmailAndPassword(auth, email, password);
}

// Lưu dữ liệu mẫu
async function saveData(data) {
  await addDoc(collection(db, "kinderlink_data"), data);
}

// Đọc dữ liệu mẫu
async function loadData() {
  const querySnapshot = await getDocs(collection(db, "kinderlink_data"));
  return querySnapshot.docs.map(doc => doc.data());
}

// Theo dõi trạng thái đăng nhập
onAuthStateChanged(auth, user => {
  if (user) {
    // Đã đăng nhập
  } else {
    // Chưa đăng nhập
  }
});