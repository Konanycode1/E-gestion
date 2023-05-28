// On importe le module express
const express = require('express');
// On crée une instance d'express avec le même nom
const app = express();
// On définit le port sur lequel le server va démarrer
let port = process.env.PORT || 3000;

// On définit une route en get
app.get('/', (req, res)=>{
    res.send('Bienvenue')
})

// On écoute le server sur le port 3000 grâce à la méthode listen d'express et on envoie un message. Le message est facultatif
app.listen(port, ()=>{console.log(`Le server est est bien démarré sur le port ${port}. Ouvrez le lient http://localhost:${port} pour voir le message`)});

