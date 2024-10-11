import { jwtDecode } from 'jwt-decode';


export const checkTokenExpiration = () => {
  const token = localStorage.getItem('token');
  
  // ตรวจสอบว่า token มีค่าและไม่ใช่ string ว่าง
  if (!token || token.trim() === '') {
    // alert('Invalid token. Please log in.');
    return false;
  }

  try {
    const decodedToken: any = jwtDecode(token);
    const currentTime = Date.now() / 1000; // เวลาในรูปแบบ Unix timestamp (วินาที)

    // ตรวจสอบวันหมดอายุของ token
    if (decodedToken.exp < currentTime) {
      localStorage.removeItem('token');
      alert('Session expired. Please log in again.');
      return false;
    }
    
    return true;
  } catch (error) {
    // ถ้าเกิดข้อผิดพลาดในการถอดรหัส token ให้ลบ token และแจ้งให้ผู้ใช้ log in ใหม่
    localStorage.removeItem('token');
    // alert('Invalid token. Please log in again.');
    return false;
  }
};