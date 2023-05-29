const mongoose = require('mongoose');
// On définit le schema de model
const adminSchema = mongoose.Schema(
    {
        reference: {
            type: String,
            required: [true, "Veuillez définir la référence de l'admin !"]
        },
        nom: {
            type: String,
            required: [true,"Veuillez définir le nom de l'admin !"]
        },
        prenom: {
            type: String,
            required: [true,"Veuillez définir le prénom de l'admin !"]
        },
        email: {
            type: Number,
            required: [true,"Veuillez définir l'adresse email de l'admin !"]
        },
        telephone: {
            type: String,
            required: [true,"Veuillez définir l'adresse téléphonique de l'admin !"]
        },
        password: {
            type: String,
            required: [true,"Veuillez définir le mot de passe de l'admin !"]
        },
        role: {
            type: String,
            required: [true,"Veuillez définir le role de l'admin !"]
        },
        statut: {
            type: Number,
            required: true,
            default: 1
        },
        etat: {
            type: String,
            required:true,
            default: 'Vide'
        }
    },
    {
        timesTamps: true
    }
)

const Admin = mongoose.model('admin', adminSchema);
module.exports = Admin;