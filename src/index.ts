import server from "./server";
require('dotenv').config();

const PORT = process.env.PORT;

// Start the server and listen on the specified port
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });