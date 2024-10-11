import React, { useEffect, useState } from 'react';
import axios from 'axios';

// กำหนดประเภทข้อมูลสำหรับผู้ใช้
interface User {
  id: number;
  username: string;
  password: string; // ควรหลีกเลี่ยงการแสดงรหัสผ่านใน UI
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]); // กำหนดประเภทให้กับ state

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get<User[]>('http://localhost:5000/users'); // ระบุประเภทข้อมูลที่คาดหวัง
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error); // จัดการข้อผิดพลาด
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            Username: {user.username}
            <br />
            Password: {user.password}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
