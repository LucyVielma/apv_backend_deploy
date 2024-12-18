import mongoose from "mongoose";

const pacienteSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    propietario: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    fecha: {
        type: Date,
        required: true,
        default: Date.now
    },
    sintomas: {
        type: String,  // O un array si quieres guardar múltiples síntomas
        required: true
    },
    veterinario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Veterinario",  // Referencia al modelo Veterinario
        required: true
    }
}, {
    timestamps: true  // Corrección para que Mongoose maneje createdAt y updatedAt
});

const Paciente = mongoose.model("Paciente", pacienteSchema);

export default Paciente;

