const express = require('express');
const app = express();//retorna un objeto

// Settings
app.set('port', process.env.PORT || 3000);


// Middlewares
app.use(express.json()); //si se recibe un json sera capaz de interpretarlo y accesible en las rutas


// Routes
app.use(require('./routes/employees'));



// Starting server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});
