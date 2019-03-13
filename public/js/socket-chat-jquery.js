// ===================================
// Modificar y renderizar todo el html
// ===================================
var params = new URLSearchParams( window.location.search);

var nombre = params.get('nombre');
var sala = params.get('sala');


// Referencias de jQuery
var divUsuarios = $('#divUsuarios');
var formEnviar = $('#formEnviar');
var txtMensaje = $('#txtMensaje');
var divChatbox = $('#divChatbox');


// Funciones para renderizar usuarios

function renderizarUsuarios(personas){
    //[{},{},{}]
    console.log(personas);

    var html = '';

    html += '<li>';
    html += '    <a href="javascript:void(0)" class="active"> Chat de <span> '+sala+'</span></a>';
    html += '</li>';


    for(var i=0; i < personas.length; i++){

        var id = personas[i].id;
        var nombre = personas[i].nombre;
        var img = i+1//personas[i].img;

        html += '<li>';
        html += '    <a data-id="'+id+'" href="javascript:void(0)"><img src="assets/images/users/'+img+'.jpg" alt="user-img" class="img-circle"> <span>'+nombre+' <small class="text-success">online</small></span></a>';
        html += '</li>';

    }

    divUsuarios.html(html);

}

// mensaje => {fecha, mensaje, nombre}
function renderizarMensajes( mensaje, yo ){

    var fecha = new Date(mensaje.fecha);
    var hora = fecha.getHours() + ':' + fecha.getMinutes();

    var adminClass = 'info';
    if(mensaje.nombre === 'Administrador'){
        adminClass='danger';
    }

    var html = '';

    if( yo ){
        
        // MIS MENSAJES
        html += '<li class="reverse animated fadeIn">';
        html += '    <div class="chat-content">';
        html += '        <h5>'+mensaje.nombre+'</h5>';
        html += '        <div class="box bg-light-inverse">'+mensaje.mensaje+'</div>';
        html += '    </div>';
        html += '    <div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>';
        html += '    <div class="chat-time">'+hora+'</div>';
        html += '</li>';

    }else{

        // OTROS USUARIOS
        html += '<li class="animated fadeIn">';
        if(mensaje.nombre != 'Administrador'){
            html += '    <div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>';
        }
        html += '    <div class="chat-content">';
        html += '        <h5>'+mensaje.nombre+'</h5>';
        html += '        <div class="box bg-light-'+adminClass+'">'+mensaje.mensaje+'</div>';
        html += '    </div>';
        html += '    <div class="chat-time">'+hora+'</div>';
        html += '</li>';
        
    }


    divChatbox.append(html);

}




// Listeners
divUsuarios.on('click', 'a', function(){
    
    // this => Hace referencia al objeto anchorTag
    // data('id') => hace referencia al data-id=""
    var id= $(this).data('id');

    if(id){
        console.log(id);
    }

})

formEnviar.on('submit', function(event){

    // Evita la recarga del sitio en el postaeo
    event.preventDefault();

    // trim() => elimina los espacios vacios delante y detras
    if(txtMensaje.val().trim().length === 0){
        return;
    }

    socket.emit('crearMensaje', {
        nombre: nombre,
        mensaje: txtMensaje.val()
    }, function(mensaje) {
        txtMensaje.val('').focus();
        //console.log('respuesta server: ', mensaje);
        renderizarMensajes( mensaje, true );
        scrollBottom();
    });

});