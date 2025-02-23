const app = require('./app');

app.listen(app.get('port'), () =>{
    console.log("Servidor conectado en el puerto ", app.get('port'));
});