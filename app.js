const express = require('express');
const path = require('path');
const app = express();

// 提供 Angular build 後的靜態檔案
app.use(express.static(path.join(__dirname, 'dist/ptcase')));

// 任何未處理的路由都指向 Angular 的 index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/ptcase/index.html'));
});

// 啟動 Express 伺服器
const port = 4200;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
