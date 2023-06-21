window.addEventListener(`DOMContentLoaded`, ()=>{
    document.getElementById("deconnexion").addEventListener(`click`, (event)=>{
        localStorage.removeItem('SESSION_E_GESTION');
        if(document.location.pathname.includes(`admin/index.html`)){
            location.href = `./doc/connexion.html`;
        }else{
            location.href = `./connexion.html`;
        }
    });
    if(!localStorage.SESSION_E_GESTION){
        if(document.location.pathname.includes(`admin/index.html`)){
            location.href = `./doc/connexion.html`;
        }else{
            location.href = `./connexion.html`;
        }
    }
})