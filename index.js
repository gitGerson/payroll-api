// Local development entry point only
// Vercel uses api/index.js (exported Express app)
const app = require('./api/index');

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Endpoint: GET http://localhost:${PORT}/jpayroll/thirdparty/ext/API_View_Master_EmpInfo.php`);
});
