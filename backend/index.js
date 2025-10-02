require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const cors = require('cors');

app.use(cors({
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}))
app.use(express.json());
app.use('/user', require('./routers/userRouter'));
app.use('/contact', require('./routers/contactRouter'));
app.use('/feedback', require('./routers/feedbackRouter'));


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
