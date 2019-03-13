const { io } = require('../server');
const {Usuarios} = require('../classes/usuarios');
const {crearMensaje} = require('../utils/utilidades');

const usuarios = new Usuarios();

io.on('connection', (client) => {

    //console.log(client);
    console.log('Usuario conectado');

    // Recibo los datos del usuario que se conectó
    client.on('entrarChat', (usuario, callback) => {
        console.log(usuario);
        
        if(!usuario.nombre || !usuario.sala){
            return callback({
                ok: false,
                message: 'El nombre o la sala es necesario'
            })
        }

        // Propiedades del usuario
        let usuarioId = client.id;
        let usuarioNombre = usuario.nombre;
        let usuarioSala = usuario.sala;

        // Primordial para conectar un usuario a una sala
        client.join(usuario.sala);
    
        // agregarPersona() retorna un array de todas las personas conectadas al servidor
        usuarios.agregarPersona( usuarioId, usuarioNombre, usuarioSala);

        // Emito a todos los usuarios DE LA MISMA SALA cada vez que un usuario entra al chat
        client.broadcast.to(usuarioSala).emit('listaPersonas', usuarios.getPersonasPorSala(usuarioSala));

        // Veo cuantos usuarios conectados hay en mi sala a la hora de conectarme
        callback(usuarios.getPersonasPorSala(usuarioSala));

    });

    client.on('disconnect', ()=>{


        let idUsuario = client.id;

        let personaBorrada = usuarios.borrarPersona(idUsuario);

        // Notifico a todos los usuarios quien abandonó el chat
        client.broadcast.to(personaBorrada.sala).emit('crearMensaje', crearMensaje('Administrador', `${personaBorrada.nombre} abandonó el chat...`));
        
        // Notifico a todos los usuarios cuales son los usuarios que quedaron conectados
        client.broadcast.to(personaBorrada.sala).emit('listaPersonas', usuarios.getPersonasPorSala(personaBorrada.sala));

    });

    client.on('crearMensaje', (data)=>{

        let persona = usuarios.getPersona(client.id);

        let mensaje = crearMensaje(persona.nombre, data.mensaje);

        client.broadcast.to(persona.sala).emit('crearMensaje', mensaje);


    })

    // Escucho el mensaje privado que envie algun cliente
    client.on('mensajePrivado', data=>{

        let persona = usuarios.getPersona(client.id);

        // to(persona.id) Mensaje privado a esa persona
        client.broadcast.to(data.para).emit('mensajePrivado', crearMensaje(persona.nombre, data.mensaje));





    })

});