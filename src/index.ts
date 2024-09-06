import db from "./config/db";
import colors from 'colors';
import server from "./server";
require('dotenv').config();

const PORT = process.env.PORT;

async function connectDB(){
  try {
    await db.authenticate();
    db.sync()
    console.log(colors.bgGreen('Connection has been established successfully.'));
  } catch (error) {
    console.error(colors.bgRed('Unable to connect to the database:'), error);
  }
}

connectDB()
// Start the server and listen on the specified port
server.listen(PORT, () => {
    console.log(colors.bgWhite(`Server is running on http://localhost:${PORT}`));
  });