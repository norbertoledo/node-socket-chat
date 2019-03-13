var socket = io();

var params = new URLSearchParams( window.location.search);


// Verifico que en los params venga el nombre o la sala
// Sino redirecciona al index
if(!params.has('nombre') || !params.has('sala')){
    window.location = 'index.html';
    throw new Error('El nombre o sala es necesario');
}

var usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
}


socket.on('connect', function() {
    console.log('Conectado al servidor');

    // Emitir quien soy yo al servidor desde los params del get
    // emit('referencia', {nombre_get}, callback( respuesta del servidor))
    socket.emit('entrarChat', usuario, function( res ){

        // En res recibo el callback del servidor
        console.log('Usuarios conectados:',res);
    });

});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');
    /*
    socket.emit('salirChat', usuario, function(res){

        console.log(res.nombre+' Se desconectó del Chat');
    })
    */

});




// Enviar información al servidor
/*
socket.emit('crearMensaje', {
    mensaje: 'Hola Mundo'
}, function(resp) {
    console.log('respuesta server: ', resp);
});
*/

// Escuchar información del servidor
socket.on('crearMensaje', function(mensaje) {

    console.log('Servidor:', mensaje);

});

// Escuchar cuando un usuario entra o sale del chat
socket.on('listaPersonas', function(personas) {

    console.log(personas);

});


// Mensajes privados
socket.on('mensajePrivado', function( mensaje ){

    console.log('Mensaje privado:', mensaje);

});