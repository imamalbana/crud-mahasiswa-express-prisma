require("dotenv").config();
const app = require("./app");

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => {
  console.log("Ur server running at port", PORT);
});
