const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static('public'));

// Helper to format bytes to human readable format (Common developer snippet)
const formatBytes = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// API Endpoint to scan files
app.get('/api/files', async (req, res) => {
    try {
        const directoryPath = __dirname;
        const files = await fs.readdir(directoryPath);
        
        const fileData = await Promise.all(files.map(async (file) => {
            const stats = await fs.stat(path.join(directoryPath, file));
            return {
                name: file,
                size: formatBytes(stats.size),
                isDir: stats.isDirectory(),
                created: stats.birthtime.toLocaleDateString()
            };
        }));

        res.json(fileData);
    } catch (err) {
        res.status(500).json({ error: 'Unable to scan directory' });
    }
});

// Minimalist UI
app.get('/', (req, res) => {
    res.send(`
        <body style="font-family: monospace; background: #1a1a1a; color: #0f0; padding: 20px;">
            <h2>📂 Project File Explorer</h2>
            <hr border="1" color="#333">
            <ul id="file-list" style="list-style: none; padding: 0;"></ul>
            <script>
                fetch('/api/files')
                    .then(res => res.json())
                    .then(data => {
                        const list = document.getElementById('file-list');
                        data.forEach(f => {
                            const item = document.createElement('li');
                            item.innerHTML = \`[\${f.isDir ? 'DIR' : 'FILE'}] \${f.name.padEnd(20)} | \${f.size} | \${f.created}\`;
                            list.appendChild(item);
                        });
                    });
            </script>
        </body>
    `);
});

app.listen(PORT, () => console.log(`/Explorer running on http://localhost:\${PORT}\`));

    