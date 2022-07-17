import app from './src/app.js';
import dotenv from 'dotenv';
dotenv.config()
const port = process.env.PORT || 7000;



app.listen(port, () => {
    console.log(`Server is listening in http://localhost:${port}`);
});

