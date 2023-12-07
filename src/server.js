const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
app.use(express.json());

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static('public'));

app.use(express.static(__dirname + '/views'));

const port = process.env.PORT || 3000;

const userDate = mongoose.model('userdate', {
  user: String,
  password: String,
  email: String,
  iconSrc: String,
  iconSrcName: String,
  cash: Number,
  key: Number,
});

app.use(session({ secret: 'dasjiufbauysfg7y287yshafbyafsbsag82FBSDAHUFVAB' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/login', async (req, res) => {
  if (req.session.userOn) {
    res.render('user');
  } else {
    res.render('home', { errorLogin: '' });
  }
});

app.post('/login', async (req, res) => {
  const user = await userDate.findOne({ user: req.body.user }).lean();

  if (user && user.password === req.body.password) {
    req.session.userOn;
    req.session.userDate = user;
    res.render('user', {
      login: req.session.userDate.user,
      email: req.session.userDate.email,
      iconUser: req.session.userDate.iconSrc,
      iconUserName: req.session.userDate.iconSrcName,
      password: req.session.userDate.password,
      cash: req.session.userDate.cash,
      key: req.session.userDate.key,
    });
  } else if (!user) {
    res.render('home', { errorLogin: 'Usuário não encontrado' });
  } else {
    res.render('home', { errorLogin: 'Senha inválida' });
  }
});

app.get('/register', async (req, res) => {
  res.render('register', { errorCadastro: '' });
});

app.post('/register', async (req, res) => {
  const userExist = await userDate.findOne({ user: req.body.user });
  const emailExist = await userDate.findOne({ email: req.body.email });

  if (userExist && emailExist) {
    res.render('register', { errorCadastro: 'Nome de usuário e email já existem' });
  } else if (userExist) {
    res.render('register', { errorCadastro: 'Nome de usuário já existe' });
  } else if (emailExist) {
    res.render('register', { errorCadastro: 'Email já cadastrado' });
  } else {
    const userdate = new userDate({
      user: req.body.user,
      password: req.body.password,
      email: req.body.email,
      iconSrc: './imgs/userDefault.svg',
      iconSrcName: 'userDefault.svg',
      cash: 10000,
      key: parseInt(Math.random() * (9999 - 1000) + 1000),
    });

    await userdate.save();
    return res.redirect('/login');
  }
});

app.put('/login/userSettings', async (req, res) => {
  try {
    if (!req.session.userDate || !req.session.userDate._id) {
      return res.status(400).send({ error: 'Usuário não autenticado' });
    }

    const userdata = await userDate.findByIdAndUpdate(
      req.session.userDate._id,
      {
        user: req.body.user,
        password: req.body.password,
        email: req.body.email,
        iconSrc: req.body.iconSrc,
        iconSrcName: req.body.iconSrcName,
      },
      {
        new: true,
      },
    );

    if (!userdata) {
      return res.status(404).send({ error: 'Usuário não encontrado' });
    }

    res.send(userdata);
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    res.status(500).send({ error: 'Erro interno do servidor' });
  }
});

app.put('/login/transfer', async (req, res) => {
  if (req.body.cashSend > req.session.userDate.cash) {
    res.status(406).send({ error: 'Saldo insuficiente' });
  } else if (req.body.userSend == req.session.userDate.user) {
    res.status(409).send({ error: 'Não é possível enviar para si mesmo' });
  } else {
    try {
      const userTransfer = await userDate.findOne({ user: req.body.userSend }).lean();
      if (!userTransfer) {
        return res.status(404).send({ error: 'Usuário não encontrado' });
      }

      const userdata = await userDate.findByIdAndUpdate(
        req.session.userDate._id,
        {
          cash: req.session.userDate.cash - parseFloat(req.body.cashSend),
        },
        {
          new: true,
        },
      );
      const userdataTransfer = await userDate.findByIdAndUpdate(
        userTransfer._id,
        {
          cash: userTransfer.cash + parseFloat(req.body.cashSend),
        },
        {
          new: true,
        },
      );

      const data = {
        userdata,
        userdataTransfer,
      };

      res.json(data);
    } catch (error) {
      console.error('Erro na transferência', error);
      res.status(500).send({ error: 'Erro interno do servidor' });
    }
  }
});

app.delete('/login/deleteAccount', async (req, res) => {
  const userdata = await userDate.findByIdAndDelete(req.session.userDate._id);
  return res.send(userdata);
});

app.listen(port, () => {
  mongoose
    .connect('mongodb+srv://loginadmin:aH9m5uhj3QVYuyYN@login-api.gpdx6tm.mongodb.net/?retryWrites=true&w=majority')
    .then(() => console.log('MongoDB Connected!'));

  console.log('Server running on port: ' + port);
});
