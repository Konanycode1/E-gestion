window.addEventListener(`DOMContentLoaded`, (e)=>{
    const urlApi = 'http://localhost:3000/api/';
    const formulaire= document.getElementById('formulaire');
    formulaire.addEventListener('submit', event=>{
        event.preventDefault();
        const alerter   = document.getElementById('alerter');
        const personnel = document.getElementById('personnel').value;
        let formData    = new FormData(formulaire);
        let data        = new URLSearchParams(formData);
        
        if(personnel==='administrateur'){
            fetch(urlApi+'loginAdmin', {
                method:'POST',
                body:data
            })
            .then(res=>res.json())
            .then(succes=>{
                if(succes.msg.includes('incorrect')){
                    alerter.className='alert alert-danger text-center';
                    alerter.textContent=succes.msg;
                }else{
                    console.log('Admin',succes)
                    succes.exprire=new Date();
                    localStorage.setItem('SESSION_E_GESTION', JSON.stringify(succes));
                    
                    let count=3;
                    const intervalle=setInterval(()=>{
                        alerter.className='alert alert-info text-center';
                        alerter.textContent=`Connexion établie avec succès ! ${count} minute(s)`;
                        if(count===0){
                            clearInterval(intervalle);
                            location.href='../index.html';
                        }
                        count--;
                    }, 750);
                }
                
            })
            .catch(error=>{
                console.log('error', error)
            })
        }else{
            fetch(urlApi+'loginEmploye', {
                method:'POST',
                body:data
            })
            .then(res=>res.json())
            .then(succes=>{
                if(succes.msg.includes('incorrect')){
                    alerter.className='alert alert-danger text-center';
                    alerter.textContent=succes.msg;
                }else{
                    console.log('Admin',succes)
                    succes.exprire=new Date();
                    localStorage.setItem('SESSION_E_GESTION', JSON.stringify(succes));
                    let count=3;
                    const intervalle=setInterval(()=>{
                        alerter.className='alert alert-info text-center';
                        alerter.textContent=`Connexion établie avec succès ! ${count} minute(s)`;
                        if(count===0){
                            clearInterval(intervalle);
                            location.href='../index.html';
                        }
                        count--;
                    }, 750);
                }
                
            })
            .catch(error=>{
                console.log('error', error)
            })
        }
    })
});

    

