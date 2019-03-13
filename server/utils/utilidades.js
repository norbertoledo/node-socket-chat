const crearMensaje = ( nombre, mensaje )=>{

    return {
        nombre: nombre,
        mensaje: mensaje,
        fecha: new Date().getTime()
    }


}

module.exports = {
    crearMensaje
};