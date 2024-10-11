import { exec } from 'child_process';
import path from 'path';

// กำหนดเส้นทางไปยังโฟลเดอร์ myBackend
const backendPath = path.join(process.cwd(), './myBackend');

// รันคำสั่ง node server.js ในโฟลเดอร์ myBackend
exec('npx nodemon server.js', { cwd: backendPath }, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`Stderr: ${stderr}`);
    return;
  }
  console.log(`Output:\n${stdout}`);
});

// รันคำสั่ง 'npm run dev'
exec('npm run dev', (error, stdout, stderr) => {
  if (error) {
    console.error(`Error executing command: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`Error: ${stderr}`);
    return;
  }
  console.log(`Output:\n${stdout}`);
});