
    $(function() {
        if(localStorage.SESSION_E_GESTION){
            location.href = `../index.html`;
        }
        let formulaire = $(`#formulaire`);
        let alerter = document.getElementById("alerter");
        $(formulaire).submit(event=>{
            alerter.className = "";
            event.preventDefault();
            const email=$('#email').val();
            const password=$('#password').val();
            let data=new FormData();
            data.append("email", email);
            data.append('password', password);
            console.log(email==data.get('email'));
            console.log(password==data.get('password'));
            fetch('http://localhost:3000/api/login1',
                {
                    method: "POST",
                    body: data
                }
            )
            .then(response=>{
                console.log('then(response)',response.ok);
                if(response.ok===true){
                    $('#formulaire input').val('');
                    alerter.className = `alert alert-info`;
                    alerter.textContent = response.msg;
                    localStorage.setItem(`SESSION_E_GESTION`, JSON.stringify(response));
                    let compteur = 3;
                    const intervalle = setInterval(() => {
                        alerter.textContent = `${response.msg} ${compteur}`;
                        if(compteur == 0){
                            location.href = `../index.html`;
                            clearInterval(intervalle);
                        }
                        compteur--;
                    }, 1000);
                }
                
            })
            .catch(data=>{
                alert(23)
                alerter.className = `alert alert-warning`;
            });
        });
    });

    

