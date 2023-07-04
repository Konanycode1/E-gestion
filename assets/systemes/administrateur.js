window.addEventListener(`DOMContentLoaded`, (e)=>{
        let alerter = document.getElementById("alerter");
        let role_id = document.getElementById(`role_id`);
        const formulaire=document.getElementById('formulaire');
        formulaire.addEventListener('submit', event=>{
            event.preventDefault();
            const personnel=document.getElementById('personnel').value;
            let formData=new FormData(formulaire);
        })





        $(formulaire).submit(async function(event) {
            event.preventDefault();
            let nomPrenom=$('#nomPrenom').val();
            let email=$('#email').val();
            let telephone=$('#telephone').val();
            let role_id=$('#role_id').val();
            let photo=$('#photo').get(0).files[0];

            let data=new FormData();
            data.append('nomPrenom', nomPrenom);
            data.append('email', email);
            data.append('telephone', telephone);
            data.append('role_id', role_id);
            if(photo){
                data.append('photo', photo);
            }

            alerter.className = "";
            alerter.textContent="";
            
            let all=await fetch("http://localhost:3000/api/saveAdmin",{
                method: "POST",
                body: data,
            })
            .then(response=>{
                console.log('aaaaaa',response);
                $('#formulaire input').val('');
                alerter.className = `alert alert-info`;
                alerter.textContent = response.msg;
            })
            .catch(error=>{
                console.log(error)
                alerter.className = `alert alert-danger`;
            })
        });




        $(`#formulaire`).on("submit", async event=>{
            event.preventDefault();
            let formData=new FormData();
            let nomPrenom=$(`#nomPrenom`).val();
            let email=$(`#email`).val();
            let telephone=$(`#telephone`).val();
            let role_id=$(`#role_id`).val();
            let photo=$(`#photo`).get(0).files[0];
            formData.append('nomPrenom', nomPrenom);
            formData.append('email', email);
            formData.append('telephone', telephone);
            formData.append('role_id', role_id);
            if(photo){formData.append('photo', photo)}
            let all= await fetch('http://localhost:3000/api/updateAdmin', {
                method: 'POST',
                body: formData,
                headers: {Authorization: `token ${JSON.parse(localStorage.SESSION_TRANSPORT).body.token}`}
            })
            .then(response=> {
                console.log('response1222',response)
                document.getElementById('alerter').hidden=false;
                document.getElementById('alert').textContent="Enrégistrement effectué avec succès.";
                document.getElementById('alert').className='alert alert-info';
                document.querySelectorAll(`#formulaireAdd input`).forEach(e=>e.value="");
            })
            .catch(error=>{
                document.getElementById('alerter').hidden=false;
                document.getElementById('alert').textContent=error;
                document.getElementById('alert').className='alert alert-danger';
            })
        })


        $.ajax({
            url: "http://localhost:3000/api/allAdmin",
            type: 'GET',
            headers: { Authorization: `token ${JSON.parse(localStorage.SESSION_E_GESTION).token}`}
        })
        .done(response=>{
            $.ajax({
                url: "http://localhost:3000/api/getAllRole",
                type: 'GET',
                headers: { Authorization: `token ${JSON.parse(localStorage.SESSION_E_GESTION).token}`}
            })
            .done(resRole=>{
                if(resRole.length !== 0){
                    resRole.data.forEach(item=>{
                        const option=document.createElement(`option`); option.value=item._id; option.textContent=item.libelle; role_id.append(option);
                    })
                    afficherAdmin(response.data, resRole.data);
                }
            })
            .fail(err=>{
                console.log("+++++++++++++++++++++++", err)
            })
        })
        .fail(error=>{
            console.log("==============================", error)
        })

        function afficherAdmin(dataAdmin, dataRole){
            
            let tbody = document.getElementById(`tbody`);
            dataAdmin.filter(item=>item.reference!="ADMIN100").forEach((admin, indece)=>{
                const ligne=document.createElement('tr'); ligne.id=admin.role_id; tbody.append(ligne)
                const colonne1 = document.createElement('td'); colonne1.textContent = indece+1; ligne.append(colonne1)
                
                const colonne2 = document.createElement('td'); colonne2.textContent = admin.nomPrenom; ligne.append(colonne2)

                const colonne3 = document.createElement('td'); colonne3.textContent = admin.email; ligne.append(colonne3)

                const colonne4 = document.createElement('td'); colonne4.textContent = admin.telephone; ligne.append(colonne4)
                
                const colonne5 = document.createElement('td');  ligne.append(colonne5);
                if(admin.role_id.length===0)colonne5.textContent = `Aucun`
                else colonne5.textContent = dataRole.filter(item=>item._id===admin.role_id[0])[0].libelle

                const colonne6 = document.createElement('td'); colonne6.textContent = new Date(admin.createdAt).toLocaleString('fr-FR', { timeZone: 'UTC' }); ligne.append(colonne6)

                const colonne7 = document.createElement('td'); colonne7.textContent = new Date(admin.updatedAt).toLocaleString('fr-FR', { timeZone: 'UTC' }); ligne.append(colonne7)
                const colonne8=document.createElement('td'); ligne.append(colonne8)
                const lien1=document.createElement('a'); lien1.href=`#`; lien1.className=`tooltip-test`; lien1.title=admin.modifierPar.split(`@`)[0]; lien1.textContent=admin.modifierPar.split(`@`)[1]; colonne8.append(lien1);
                
                const colonne9=document.createElement('td'); ligne.append(colonne9)
                const button_1=document.createElement('button'); button_1.type=`button`; button_1.className=`d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm`; button_1.setAttribute(`data-toggle`,`modal`); button_1.setAttribute(`data-target`,`#edite-${admin._id}`); colonne9.append(button_1);
                const i_1=document.createElement('i'); i_1.className=`bi bi-pencil-square`; button_1.append(i_1);

                const comment1=document.createComment(`Modal`); colonne9.append(comment1);
                const div1=document.createElement(`div`); div1.className=`modal fade`; div1.id=`edite-${admin._id}`; div1.tabIndex=`-1`; div1.role=`dialog`; div1.setAttribute(`aria-labelledby`, `exampleModalLabel`); div1.setAttribute(`aria-hidden`,`true`); colonne9.append(div1);
                const div1_1=document.createElement(`div`); div1_1.className=`modal-dialog`, div1_1.role="document"; div1.append(div1_1);
                const div1_1_1=document.createElement(`div`); div1_1_1.className=`modal-content`; div1_1.append(div1_1_1);
                const div1_1_1_1=document.createElement(`div`); div1_1_1_1.className=`modal-header`; div1_1_1.append(div1_1_1_1);
                const h5_1=document.createElement(`h5`); h5_1.className=`modal-title`; h5_1.id=`exampleModalLabel`; h5_1.textContent=`Modifier Administrateur`; div1_1_1_1.append(h5_1);
                const button_2=document.createElement(`button`); button_2.type=`button`; button_2.className=`close`; button_2.setAttribute(`data-dismiss`,`modal`); button_2.setAttribute(`aria-label`,`Close`); div1_1_1_1.append(button_2)
                const span_1=document.createElement(`span`); span_1.setAttribute(`aria-hidden`,`true`); span_1.innerHTML=`&times;`; button_2.append(span_1);
                
                const div1_1_1_2=document.createElement(`div`); div1_1_1_2.className=`modal-body`; div1_1_1.append(div1_1_1_2);
                const div1_1_1_2_1=document.createElement(`div`); div1_1_1_2.append(div1_1_1_2_1);
                let formulaire=document.createElement(`form`); formulaire.className=`editeForm`; formulaire.id=`formulaire-${admin.reference}`; /*formulaire.action=`http://localhost:3000/api/updateAdmin`*/ formulaire.method=`POST`; div1_1_1_2_1.append(formulaire);
                

                const divNomPrenom=document.createElement(`div`); divNomPrenom.className=`col-sm-12 mb-3 mb-sm-4`; formulaire.append(divNomPrenom);
                const labelNomPrenom=document.createElement(`label`); labelNomPrenom.for=`nomPrenom`; labelNomPrenom.className=`form-label`; labelNomPrenom.textContent=`Nom et Prénom(s)`; divNomPrenom.append(labelNomPrenom);
                const inputNomPrenom=document.createElement(`input`); inputNomPrenom.name=`nomPrenom`; inputNomPrenom.type=`text`; inputNomPrenom.className=`form-control`; inputNomPrenom.id=`nomPrenom`; inputNomPrenom.value=admin.nomPrenom;  divNomPrenom.append(inputNomPrenom);

                const divEmail=document.createElement(`div`); divEmail.className=`col-sm-12 mb-3 mb-sm-4`; formulaire.append(divEmail);
                const labelEmail=document.createElement(`label`); labelEmail.for=`email`; labelEmail.className=`form-label`; labelEmail.textContent=`Adresse email`; divEmail.append(labelEmail);
                const inputEmail=document.createElement(`input`); inputEmail.name=`email`; inputEmail.type=`text`; inputEmail.className=`form-control`; inputEmail.id=`email`; inputEmail.value=admin.email;  divEmail.append(inputEmail);

                const divTelephone=document.createElement(`div`); divTelephone.className=`col-sm-12 mb-3 mb-sm-4`; formulaire.append(divTelephone);
                const labelTelephone=document.createElement(`label`); labelTelephone.for=`telephone`; labelTelephone.className=`form-label`; labelTelephone.textContent=`Adreese téléphonique`; divTelephone.append(labelTelephone);
                const inputTelephone=document.createElement(`input`); inputTelephone.name=`telephone`; inputTelephone.type=`tel`; inputTelephone.className=`form-control`; inputTelephone.id=`telephone`; inputTelephone.value=admin.telephone;  divTelephone.append(inputTelephone);

                const divRole=document.createElement(`div`); divRole.className=`col-sm-12 mb-3 mb-sm-4`; formulaire.append(divRole);
                const labelRole=document.createElement(`label`); labelRole.for=`role`; labelRole.className=`form-label`; labelRole.textContent=`Rôle`; divRole.append(labelRole);
                
                const selectRole=document.createElement(`select`); selectRole.className=`custom-select`; selectRole.name=`role`; selectRole.id=`role`; divRole.append(selectRole);
                const optioVide=document.createElement(`option`); optioVide.value=""; optioVide.textContent=`Attribuer un rôle`; selectRole.append(optioVide);
                dataRole.forEach(role=>{
                    const optionRole=document.createElement(`option`); optionRole.value=role._id; optionRole.textContent=role.libelle; selectRole.append(optionRole);
                    if(role._id===ligne.id){
                        optionRole.selected = true
                    }
                })     
                
                const identifiant=document.createElement(`input`); identifiant.name=`id`; identifiant.value=admin._id; formulaire.append(identifiant); identifiant.hidden=true;

                const divAction=document.createElement(`div`); divAction.className=`col-sm-12 mb-3 mb-sm-4`; formulaire.append(divAction);
                const btnAnnuler=document.createElement(`button`); btnAnnuler.type=`reset`; btnAnnuler.className=`btn btn-danger`; btnAnnuler.setAttribute(`data-dismiss`, `modal`) ; divAction.append(btnAnnuler);
                const iInBntAnnuler=document.createElement(`i`); iInBntAnnuler.className=`bi bi-x-circle-fill`; btnAnnuler.append(iInBntAnnuler);  btnAnnuler.innerHTML+=` Annuler`

                const btnEnregistrer=document.createElement(`button`); btnEnregistrer.type=`submit`; btnEnregistrer.id=`submit-${admin.reference}`; btnEnregistrer.className=`btn btn-primary`; btnEnregistrer.setAttribute(`data-dismiss`, `modal`) ; divAction.append(btnEnregistrer);
                const iInBntEnregistrer=document.createElement(`i`); iInBntEnregistrer.id=`submit-${admin.reference}`; iInBntEnregistrer.className=`bi bi-x-circle-fill`; iInBntEnregistrer.textContent=` Enrégistrer`; btnEnregistrer.append(iInBntEnregistrer);
                btnEnregistrer.addEventListener(`click`, updatedAdmin)


                const colonne10=document.createElement(`td`); ligne.append(colonne10);
                const button_3=document.createElement(`button`); button_3.type=`button`; colonne10.append(button_3); button_3.className=`d-none d-sm-inline-block btn btn-sm btn-danger shadow-sm`; button_3.setAttribute(`data-toggle`,`modal`); button_3.setAttribute(`data-target`,`#delete-${admin._id}`); colonne10.append(button_3);
                const iInButton_3=document.createElement(`i`); iInButton_3.className=`bi bi-trash3-fill`; button_3.append(iInButton_3);

                const comment2=document.createComment(`Modal`); colonne10.append(comment2);
                const div2=document.createElement(`div`); div2.className=`modal fade`; div2.id=`delete-${admin._id}`; div2.setAttribute(`tabindex`, `-1`); div2.role=`dialog`; div2.setAttribute(`aria-labelledby`,`exampleModalLabel`); div2.setAttribute(`aria-hidden`,`true`); colonne10.append(div2);
                const div2_1=document.createElement(`div`); div2_1.className=`modal-dialog`, div2_1.role=`document`; div2.append(div2_1);
                const div2_1_1=document.createElement(`div`); div2_1_1.className=`modal-content`; div2_1.append(div2_1_1);
                const div2_1_1_1=document.createElement(`div`); div2_1_1_1.className=`modal-header`; div2_1_1.append(div2_1_1_1);
                const h5_2=document.createElement(`h5`); h5_2.className=`modal-title`; h5_2.id=`exampleModalLabel`; h5_2.textContent=`Supprimer Administrateur`; div2_1_1_1.append(h5_2);

                const button_4=document.createElement(`button`); button_4.type=`button`; button_4.className=`close`; button_4.setAttribute(`data-dismiss`,`modal`); button_4.setAttribute(`aria-label`,`Close`); div2_1_1_1.append(button_4)
                const span_2=document.createElement(`span`); span_2.setAttribute(`aria-hidden`,`true`); span_2.innerHTML=`&times;`; button_4.append(span_2);

                const div2_1_1_2=document.createElement(`div`); div2_1_1_2.className=`modal-body`; div2_1_1.append(div2_1_1_2);
                const div2_1_1_2_1=document.createElement(`div`); div2_1_1_2.append(div2_1_1_2_1);
                const div2_1_1_2_1_1=document.createElement(`div`); div2_1_1_2_1_1.textContent=`Voulez-vous vraiment supprimer cet article`;  div2_1_1_2_1.append(div2_1_1_2_1_1);
                const strong_1=document.createElement(`strong`); strong_1.textContent=admin._id; div2_1_1_2_1_1.append(strong_1); div2_1_1_2_1_1.innerHTML+=` / `;
                const strong_2=document.createElement(`strong`); strong_2.textContent=admin.nomPrenom; div2_1_1_2_1_1.append(strong_2); strong_2.innerHTML+=` ?`;
                
                const div2_1_1_3=document.createElement(`div`); div2_1_1_3.className=`modal-footer`; div2_1_1.append(div2_1_1_3);
                const button_5=document.createElement(`button`); button_5.type=`button`; button_5.className=`btn btn-danger`; button_5.setAttribute(`data-dismiss`,`modal`); div2_1_1_3.append(button_5);
                const iInButton_5=document.createElement(`i`); iInButton_5.className=`bi bi-x-circle-fill`; button_5.append(iInButton_5);
                button_5.innerHTML+=` Annuler`;

                const button_6=document.createElement(`button`); button_6.type=`button`; button_6.className=`btn btn-primary`; button_6.setAttribute(`data-dismiss`,`modal`); div2_1_1_3.append(button_6);
                const iInButton_6=document.createElement(`i`); iInButton_6.className=`bi bi-check-circle-fill`; button_6.append(iInButton_6);
                button_6.innerHTML+=` Oui, je confirme`;
            })

            
        }

        function updatedAdmin(event){
            event.preventDefault();
            let formulaire = $(document.getElementById(`formulaire${event.target.id.replace('submit', '')}`));
            let formData=$(formulaire).serialize();
            $.ajax({
                type: `POST`,
                url: "http://localhost:3000/api/updateForSuperAdmin",
                data: formData,
                headers: { Authorization: `token ${JSON.parse(localStorage.SESSION_E_GESTION).token}`}
            })
            .done(function(response) {
                console.log(response)
            })
            .fail(function(data) {
                if (data.responseText !== ''){
                    console.log(data.responseJSON.msg);
                }else{
                    console.log(data.responseJSON.msg);
                }
            });
        }
})
    

