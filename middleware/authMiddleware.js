import jwt from "jsonwebtoken";
import Veterinario from "../models/Veterinario.js";

const checkAuth = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        return res.status(403).json({ msg: "Token no válido o inexistente" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const veterinario = await Veterinario.findById(decoded.id).select("-password -token -confirmado");

        if (!veterinario) {
            return res.status(404).json({ msg: "Usuario no encontrado" });
        }

        req.veterinario = veterinario; // Asignar a req.veterinario
        next();
    } catch (error) {
        return res.status(403).json({ msg: "Token no válido" });
    }
};

export default checkAuth;
