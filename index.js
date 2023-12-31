const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./routes/userRouter');
const loginRouter = require('./routes/loginRouter');
const categoryRouter = require('./routes/categoryRouter');
const postRouter = require('./routes/postRouter');

const app = express();
app.use(bodyParser());

app.use('/user', userRouter);
app.use('/login', loginRouter);
app.use('/categories', categoryRouter);
app.use('/post', postRouter);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar

app.get('/', (request, response) => {
  response.send();
});

module.exports = app;
