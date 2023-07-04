window.addEventListener(`DOMContentLoaded`, (e)=>{
    const formulaire= document.getElementById('formulaire');
    formulaire.addEventListener('submit', event=>{
        event.preventDefault();
        const personnel=document.getElementById('personnel').value;
        let formData=new FormData(formulaire);
        let data=new URLSearchParams(formData);
        if(personnel==='administrateur'){
            fetch('http://localhost:3000/api/loginAdmin', {
                method:'POST',
                body:data
            })
            .then(res=>res.json())
            .then(succes=>{
                succes.exprire=new Date();
                localStorage.setItem('SESSION_E_GESTION', JSON.stringify(succes));
                const alerter=document.getElementById('alerter');
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
            })
            .catch(error=>{
                console.log('error', error)
            })
        }else{
            fetch('http://localhost:3000/api/loginEmploye', {
                method:'POST',
                body:data
            })
            .then(res=>res.json())
            .then(succes=>{
                succes.exprire=new Date();
                localStorage.setItem('SESSION_E_GESTION', JSON.stringify(succes));
                const alerter=document.getElementById('alerter');
                let count=3;
                const intervalle=setInterval(()=>{
                    alerter.className='alert alert-info text-center';
                    alerter.textContent=`Connexion établie avec succès ! ${count} minute(s)`;
                    if(count===0){
                        clearInterval(intervalle);
                        location.href='../../index.html';
                    }
                    count--;
                }, 750);
            })
            .catch(error=>{
                console.log('error', error)
            })
        }
    })
});

    

