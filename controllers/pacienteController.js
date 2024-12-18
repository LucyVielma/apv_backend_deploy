import Paciente from "../models/paciente.js"


const agregarPaciente = async (req, res) => {
    try {
        // Crear el paciente y asignar el veterinario autenticado
        const paciente = new Paciente(req.body);
        paciente.veterinario = req.veterinario._id;  // Asegúrate de que req.veterinario._id es correcto

        const pacienteAlmacenado = await paciente.save();
        res.json(pacienteAlmacenado);  // Responder con el paciente guardado
    } catch (error) {
        console.log(error);
        //res.status(500).json({ msg: "Hubo un error al guardar el paciente" });
    }
};

const obtenerPacientes = async (req, res) => {
    const pacientes = await Paciente.find()
    .where("veterinario")
    .equals(req.veterinario._id);

    res.json(pacientes)
};


const obtenerPaciente = async (req, res) => {
    const { id } = req.params;
    const paciente = await Paciente.findById(id);

    if(!paciente) {
        return res.status(404).json({ msg: "no encontrado" });
    }

    if(paciente.veterinario.toString() !== req.veterinario._id.toString()) {
        return res.json({msg: "Accion no valida"});
        
    }

     
        res.json(paciente)
    
  };

const actualizarPaciente = async (req, res) => {
    const { id } = req.params;
    const paciente = await Paciente.findById(id);

    if(!paciente) {
        return res.status(404).json({ msg: "no encontrado" });
    }

    if(paciente.veterinario.toString() !== req.veterinario._id.toString()) {
        return res.json({msg: "Accion no valida"});
        
    }

    
    //actualizar Paciente
    paciente.nombre = req.body.nombre || paciente.nombre
    paciente.propietario = req.body.propietario || paciente.propietario
    paciente.email = req.body.email || paciente.email
    paciente.fecha = req.body.fecha || paciente.fecha
    paciente.sintomas = req.body.sintomas || paciente.sintomas

    try {
        const pacienteActualizado = await paciente.save();
        res.json(pacienteActualizado)
    } catch (error) {
        console.log(error)
    }

}
const eliminarPaciente = async (req, res) => {
    const { id } = req.params;
    const paciente = await Paciente.findById(id);

    if(!paciente) {
        return res.status(404).json({ msg: "no encontrado" });
    }

    if(paciente.veterinario.toString() !== req.veterinario._id.toString()) {
        return res.json({msg: "Accion no valida"});
        
    }

    try {
        await paciente.deleteOne();
        res.json({msg: "paciente eliminado" })
    } catch (error) {
        console.log(error) 
    }
}

export {
    agregarPaciente,
    obtenerPacientes,
    obtenerPaciente,
    actualizarPaciente,
    eliminarPaciente
}
