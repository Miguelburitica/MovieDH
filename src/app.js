const express = require('express');
const path = require('path');

const indexRouter = require('./routes');

const app = express();
const methodOverride = require('method-override');

// view engine setup
app.set('views', path.resolve(__dirname, './views'));
app.set('view engine', 'ejs');

app.use(express.static(path.resolve(__dirname, '../public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'))

app.use('/', indexRouter);

app.listen('3001', () => console.log('Servidor corriendo en el puerto 3001'));
