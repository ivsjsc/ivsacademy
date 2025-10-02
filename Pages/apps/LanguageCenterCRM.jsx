import React, { useState, useEffect } from 'react';
import { 
  Users, UserPlus, BookOpen, Calendar, DollarSign, 
  Search, Filter, Edit, Trash2, Eye, Phone, Mail,
  GraduationCap, Clock, CheckCircle, AlertCircle,
  BarChart3, TrendingUp, Award, Bell
} from 'lucide-react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, query, onSnapshot, doc, addDoc, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';

const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [showEditStudent, setShowEditStudent] = useState(false);
  const [editStudentData, setEditStudentData] = useState(null);

  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [db, setDb] = useState(null);
  const [auth, setAuth] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
    const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};

    if (Object.keys(firebaseConfig).length > 0) {
      const app = initializeApp(firebaseConfig);
      const firestore = getFirestore(app);
      const firebaseAuth = getAuth(app);
      setDb(firestore);
      setAuth(firebaseAuth);

      onAuthStateChanged(firebaseAuth, async (user) => {
        if (user) {
          setUserId(user.uid);
        } else {
          try {
            const anonymousUser = await signInAnonymously(firebaseAuth);
            setUserId(anonymousUser.user.uid);
          } catch (error) {
            console.error("Lỗi đăng nhập ẩn danh:", error);
          }
        }
      });
    } else {
      console.warn("Cấu hình Firebase không được cung cấp. Dữ liệu sẽ không được lưu trữ.");
      // Fallback for demonstration if Firebase config is not available
      setStudents([
        { id: '1', name: 'Nguyễn Văn An', email: 'nguyenvanan@email.com', phone: '0901234567', course: 'IELTS Advanced', level: 'B2', startDate: '2024-01-15', status: 'active', payment: 'paid', progress: 75, nextClass: '2024-06-12 09:00', tuition: 3500000 },
        { id: '2', name: 'Trần Thị Bình', email: 'tranthibinh@email.com', phone: '0912345678', course: 'TOEIC Preparation', level: 'B1', startDate: '2024-02-01', status: 'active', payment: 'pending', progress: 60, nextClass: '2024-06-12 14:00', tuition: 2800000 },
        { id: '3', name: 'Lê Minh Châu', email: 'leminhchau@email.com', phone: '0923456789', course: 'Business English', level: 'C1', startDate: '2024-01-08', status: 'completed', payment: 'paid', progress: 100, nextClass: null, tuition: 4200000 }
      ]);
      setCourses([
        { id: '1', name: 'IELTS Advanced', students: 15, duration: '3 tháng', fee: 3500000 },
        { id: '2', name: 'TOEIC Preparation', students: 22, duration: '2 tháng', fee: 2800000 },
        { id: '3', name: 'Business English', students: 12, duration: '4 tháng', fee: 4200000 },
        { id: '4', name: 'General English', students: 28, duration: '6 tháng', fee: 2400000 }
      ]);
    }
  }, []);

  useEffect(() => {
    if (db && userId) {
      const studentsRef = collection(db, `artifacts/${__app_id}/users/${userId}/students`);
      const qStudents = query(studentsRef);
      const unsubscribeStudents = onSnapshot(qStudents, (snapshot) => {
        const studentsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setStudents(studentsData);
      });

      const coursesRef = collection(db, `artifacts/${__app_id}/public/data/courses`);
      const qCourses = query(coursesRef);
      const unsubscribeCourses = onSnapshot(qCourses, (snapshot) => {
        const coursesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setCourses(coursesData);
      });

      return () => {
        unsubscribeStudents();
        unsubscribeCourses();
      };
    }
  }, [db, userId]);

  const [newStudent, setNewStudent] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
    level: '',
    startDate: '',
    tuition: 0
  });

  const handleAddStudent = async () => {
    if (!db || !userId) {
      console.error("Firestore hoặc User ID chưa sẵn sàng.");
      return;
    }
    if (newStudent.name && newStudent.email && newStudent.phone && newStudent.course && newStudent.level && newStudent.startDate) {
      try {
        const studentsRef = collection(db, `artifacts/${__app_id}/users/${userId}/students`);
        await addDoc(studentsRef, {
          ...newStudent,
          tuition: parseInt(newStudent.tuition) || 0,
          status: 'active',
          payment: 'pending',
          progress: 0,
          nextClass: null
        });
        setNewStudent({ name: '', email: '', phone: '', course: '', level: '', startDate: '', tuition: 0 });
        setShowAddStudent(false);
      } catch (e) {
        console.error("Lỗi khi thêm học viên: ", e);
      }
    } else {
      alert("Vui lòng điền đầy đủ thông tin học viên.");
    }
  };

  const handleDeleteStudent = async (id) => {
    if (!db || !userId) return;
    try {
      await deleteDoc(doc(db, `artifacts/${__app_id}/users/${userId}/students`, id));
      setShowConfirmDelete(false);
      setStudentToDelete(null);
    } catch (e) {
      console.error("Lỗi khi xóa học viên: ", e);
    }
  };

  const confirmDeleteStudent = (student) => {
    setStudentToDelete(student);
    setShowConfirmDelete(true);
  };

  const handleUpdatePayment = async (id, currentStatus) => {
    if (!db || !userId) return;
    const newPaymentStatus = currentStatus === 'paid' ? 'pending' : 'paid';
    try {
      await updateDoc(doc(db, `artifacts/${__app_id}/users/${userId}/students`, id), {
        payment: newPaymentStatus
      });
    } catch (e) {
      console.error("Lỗi khi cập nhật thanh toán: ", e);
    }
  };

  const handleEditStudent = (student) => {
    setEditStudentData({ ...student });
    setShowEditStudent(true);
  };

  const handleSaveEditedStudent = async () => {
    if (!db || !userId || !editStudentData) return;
    if (editStudentData.name && editStudentData.email && editStudentData.phone && editStudentData.course && editStudentData.level && editStudentData.startDate) {
      try {
        await updateDoc(doc(db, `artifacts/${__app_id}/users/${userId}/students`, editStudentData.id), {
          ...editStudentData,
          tuition: parseInt(editStudentData.tuition) || 0,
        });
        setShowEditStudent(false);
        setEditStudentData(null);
      } catch (e) {
        console.error("Lỗi khi lưu thông tin học viên đã chỉnh sửa: ", e);
      }
    } else {
      alert("Vui lòng điền đầy đủ thông tin học viên.");
    }
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.course.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentColor = (payment) => {
    switch(payment) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-red-100 text-red-800';
      case 'partial': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalStudents = students.length;
  const activeStudents = students.filter(s => s.status === 'active').length;
  const totalRevenue = students.reduce((sum, s) => s.payment === 'paid' ? sum + s.tuition : sum, 0);
  const pendingPayments = students.filter(s => s.payment === 'pending').length;

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Tổng học viên</p>
              <p className="text-3xl font-bold text-gray-900">{totalStudents}</p>
            </div>
            <Users className="h-12 w-12 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Đang học</p>
              <p className="text-3xl font-bold text-green-600">{activeStudents}</p>
            </div>
            <GraduationCap className="h-12 w-12 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Doanh thu</p>
              <p className="text-3xl font-bold text-purple-600">{totalRevenue.toLocaleString('vi-VN')}đ</p>
            </div>
            <DollarSign className="h-12 w-12 text-purple-600" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Chờ thanh toán</p>
              <p className="text-3xl font-bold text-red-600">{pendingPayments}</p>
            </div>
            <AlertCircle className="h-12 w-12 text-red-600" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Học viên mới nhất</h3>
          <div className="space-y-4">
            {students.slice(0, 3).map(student => (
              <div key={student.id} className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{student.name}</p>
                  <p className="text-sm text-gray-500">{student.course}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(student.status)}`}>
                  {student.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Khóa học phổ biến</h3>
          <div className="space-y-4">
            {courses.slice(0, 3).map(course => (
              <div key={course.id} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">{course.name}</p>
                  <p className="text-sm text-gray-500">{course.students} học viên</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">{course.fee.toLocaleString('vi-VN')}đ</p>
                  <p className="text-sm text-gray-500">{course.duration}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderStudents = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <h2 className="text-2xl font-bold text-gray-900">Quản lý học viên</h2>
        <button
          onClick={() => setShowAddStudent(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
        >
          <UserPlus className="h-5 w-5" />
          <span>Thêm học viên</span>
        </button>
      </div>

      <div className="flex space-x-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm kiếm học viên..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Học viên
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Khóa học
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trình độ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tiến độ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thanh toán
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStudents.map(student => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{student.name}</div>
                      <div className="text-sm text-gray-500">{student.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{student.course}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                      {student.level}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${student.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-900">{student.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(student.status)}`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleUpdatePayment(student.id, student.payment)}
                      className={`px-2 py-1 text-xs font-medium rounded-full ${getPaymentColor(student.payment)}`}
                    >
                      {student.payment}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setSelectedStudent(student)}
                        className="text-blue-600 hover:text-blue-800 p-1 rounded-md hover:bg-gray-100"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleEditStudent(student)}
                        className="text-green-600 hover:text-green-800 p-1 rounded-md hover:bg-gray-100"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => confirmDeleteStudent(student)}
                        className="text-red-600 hover:text-red-800 p-1 rounded-md hover:bg-gray-100"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showAddStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Thêm học viên mới</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Họ và tên"
                value={newStudent.name}
                onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <input
                type="email"
                placeholder="Email"
                value={newStudent.email}
                onChange={(e) => setNewStudent({...newStudent, email: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <input
                type="tel"
                placeholder="Số điện thoại"
                value={newStudent.phone}
                onChange={(e) => setNewStudent({...newStudent, phone: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <select
                value={newStudent.course}
                onChange={(e) => setNewStudent({...newStudent, course: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Chọn khóa học</option>
                {courses.map(course => (
                  <option key={course.id} value={course.name}>{course.name}</option>
                ))}
              </select>
              <select
                value={newStudent.level}
                onChange={(e) => setNewStudent({...newStudent, level: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Chọn trình độ</option>
                <option value="A1">A1</option>
                <option value="A2">A2</option>
                <option value="B1">B1</option>
                <option value="B2">B2</option>
                <option value="C1">C1</option>
                <option value="C2">C2</option>
              </select>
              <input
                type="date"
                value={newStudent.startDate}
                onChange={(e) => setNewStudent({...newStudent, startDate: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <input
                type="number"
                placeholder="Học phí"
                value={newStudent.tuition}
                onChange={(e) => setNewStudent({...newStudent, tuition: parseInt(e.target.value) || 0})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex space-x-4 mt-6">
              <button
                onClick={handleAddStudent}
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Thêm học viên
              </button>
              <button
                onClick={() => setShowAddStudent(false)}
                className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Chi tiết học viên</h3>
              <button
                onClick={() => setSelectedStudent(null)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-md hover:bg-gray-100"
              >
                ×
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Thông tin cơ bản</h4>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Họ tên:</span> {selectedStudent.name}</p>
                  <p><span className="font-medium">Email:</span> {selectedStudent.email}</p>
                  <p><span className="font-medium">Điện thoại:</span> {selectedStudent.phone}</p>
                  <p><span className="font-medium">Ngày bắt đầu:</span> {selectedStudent.startDate}</p>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Thông tin học tập</h4>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Khóa học:</span> {selectedStudent.course}</p>
                  <p><span className="font-medium">Trình độ:</span> {selectedStudent.level}</p>
                  <p><span className="font-medium">Tiến độ:</span> {selectedStudent.progress}%</p>
                  <p><span className="font-medium">Học phí:</span> {selectedStudent.tuition.toLocaleString('vi-VN')}đ</p>
                  <p><span className="font-medium">Trạng thái:</span> <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(selectedStudent.status)}`}>{selectedStudent.status}</span></p>
                  <p><span className="font-medium">Thanh toán:</span> <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPaymentColor(selectedStudent.payment)}`}>{selectedStudent.payment}</span></p>
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedStudent(null)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {showConfirmDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm shadow-lg text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Xác nhận xóa học viên</h3>
            <p className="text-gray-600 mb-4">Bạn có chắc chắn muốn xóa học viên **{studentToDelete?.name}** không? Thao tác này không thể hoàn tác.</p>
            <div className="flex space-x-4 mt-6">
              <button
                onClick={() => handleDeleteStudent(studentToDelete.id)}
                className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Xóa
              </button>
              <button
                onClick={() => setShowConfirmDelete(false)}
                className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}

      {showEditStudent && editStudentData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Chỉnh sửa học viên</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Họ và tên"
                value={editStudentData.name}
                onChange={(e) => setEditStudentData({...editStudentData, name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <input
                type="email"
                placeholder="Email"
                value={editStudentData.email}
                onChange={(e) => setEditStudentData({...editStudentData, email: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <input
                type="tel"
                placeholder="Số điện thoại"
                value={editStudentData.phone}
                onChange={(e) => setEditStudentData({...editStudentData, phone: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <select
                value={editStudentData.course}
                onChange={(e) => setEditStudentData({...editStudentData, course: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Chọn khóa học</option>
                {courses.map(course => (
                  <option key={course.id} value={course.name}>{course.name}</option>
                ))}
              </select>
              <select
                value={editStudentData.level}
                onChange={(e) => setEditStudentData({...editStudentData, level: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Chọn trình độ</option>
                <option value="A1">A1</option>
                <option value="A2">A2</option>
                <option value="B1">B1</option>
                <option value="B2">B2</option>
                <option value="C1">C1</option>
                <option value="C2">C2</option>
              </select>
              <input
                type="date"
                value={editStudentData.startDate}
                onChange={(e) => setEditStudentData({...editStudentData, startDate: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <input
                type="number"
                placeholder="Học phí"
                value={editStudentData.tuition}
                onChange={(e) => setEditStudentData({...editStudentData, tuition: parseInt(e.target.value) || 0})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <select
                value={editStudentData.status}
                onChange={(e) => setEditStudentData({...editStudentData, status: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="inactive">Inactive</option>
              </select>
              <select
                value={editStudentData.payment}
                onChange={(e) => setEditStudentData({...editStudentData, payment: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="partial">Partial</option>
              </select>
            </div>
            <div className="flex space-x-4 mt-6">
              <button
                onClick={handleSaveEditedStudent}
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Lưu thay đổi
              </button>
              <button
                onClick={() => setShowEditStudent(false)}
                className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderCourses = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Quản lý khóa học</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2">
          <BookOpen className="h-5 w-5" />
          <span>Thêm khóa học</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(course => (
          <div key={course.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                {course.students} học viên
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{course.name}</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>Thời gian: {course.duration}</p>
              <p>Học phí: {course.fee.toLocaleString('vi-VN')}đ</p>
            </div>
            <div className="mt-4 flex space-x-2">
              <button className="flex-1 bg-blue-50 text-blue-600 py-2 rounded-lg hover:bg-blue-100 transition-colors">
                Xem chi tiết
              </button>
              <button className="flex-1 bg-green-50 text-green-600 py-2 rounded-lg hover:bg-green-100 transition-colors">
                Chỉnh sửa
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSchedule = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Lịch học hôm nay</h2>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6">
          <div className="space-y-4">
            {students.filter(s => s.nextClass).length > 0 ? (
              students.filter(s => s.nextClass).map(student => (
                <div key={student.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <Clock className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-gray-900">{student.name}</p>
                      <p className="text-sm text-gray-500">{student.course}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">{student.nextClass}</p>
                    <p className="text-sm text-gray-500">Trình độ {student.level}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>Không có lịch học nào hôm nay</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <GraduationCap className="h-8 w-8 text-blue-600" />
              <h1 className="text-xl font-bold text-gray-900">EduCRM</h1>
            </div>
            <div className="flex items-center space-x-4">
              {userId && (
                <span className="text-gray-600 text-sm">ID Người dùng: {userId}</span>
              )}
              <Bell className="h-6 w-6 text-gray-400" />
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">A</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-64">
            <nav className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
              <div className="space-y-2">
                {[
                  { key: 'dashboard', label: 'Tổng quan', icon: BarChart3 },
                  { key: 'students', label: 'Học viên', icon: Users },
                  { key: 'courses', label: 'Khóa học', icon: BookOpen },
                  { key: 'schedule', label: 'Lịch học', icon: Calendar },
                ].map(tab => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                      activeTab === tab.key
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <tab.icon className="h-5 w-5" />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
            </nav>
          </div>

          <div className="flex-1">
            {activeTab === 'dashboard' && renderDashboard()}
            {activeTab === 'students' && renderStudents()}
            {activeTab === 'courses' && renderCourses()}
            {activeTab === 'schedule' && renderSchedule()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
