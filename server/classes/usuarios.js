class Usuarios{

    constructor(){
        // Personas (como objetos) conectadas al chat
        this.personas = [];

    }

    agregarPersona(id, nombre, sala){

        let persona = {
            id,
            nombre,
            sala
        }

        this.personas.push(persona);

        return this.personas;

    };

    getPersona(id){
        
        // filter regresa un nuevo arreglo. 
        // Necesito la primera posicion, por eso pongo los corchetes con el index 0
        // para que let persona = a un unico registro
        let persona = this.personas.filter( alguien => {
            return alguien.id === id;
        })[0];

        // Si matchea, devuelve un objeto de persona, sino devuelve undefined o null
        return persona;

    }

    getPersonas(){
        return this.personas;
    }

    getPersonasPorSala( sala ){
        let personasEnSala = this.personas.filter(persona=>{
            return persona.sala === sala;
        });

        return personasEnSala;
    }

    borrarPersona(id){

        //Capturo la persona a borrar
        let personaBorrada = this.getPersona(id);

        // Reemplazo el array con todas las personas con id distinto al que hay que eliminar
        this.personas = this.personas.filter( persona =>{
            return persona.id != id;
        });

        return personaBorrada;

    }


}



module.exports = {
    Usuarios
}