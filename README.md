# Node.js Directory Stat Explorer

A backend utility that performs asynchronous file system scanning to provide metadata for all files within the project root. 

## 🛠 Advanced Features
- **Async/Await Pattern**: Uses `fs.promises` for non-blocking I/O operations.
- **Promise.all Serialization**: Handles multiple file `stat` requests concurrently for better performance.
- **Dynamic Byte Formatting**: Includes a recursive-math helper function to convert file sizes into human-readable strings (KB, MB, GB).
- **RESTful API**: Exposes a `/api/files` endpoint returning structured JSON data.

## 🚀 Deployment & Usage
1. **Clone & Install**:
   ```bash
   git clone <repo-url>
   npm install express
