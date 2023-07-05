window.addEventListener(`DOMContentLoaded`, (e)=>{
    const urlApi = 'http://localhost:3000/api/';
        let alerter = document.getElementById("alerter");
        let role_id = document.getElementById(`role_id`);
        const formulaire=document.getElementById('formulaire');
        let toutAdmin=[];
        let toutRole = [];


        formulaire.addEventListener('submit', event=>{
            event.preventDefault();
            const nomPrenom = document.getElementById('nomPrenom').value;
            const email     = document.getElementById('email').value;
            const telephone = document.getElementById('telephone').value;
            const photo     = $('#photo').get(0).files[0];
            const role_id   = document.getElementById('role_id').value;
            const formData = new FormData();
            formData.append('nomPrenom', nomPrenom);
            formData.append('email', email);
            formData.append('telephone', telephone);
            if(photo){formData.append('photo', photo);}
            formData.append('role_id', role_id);
            const data = new URLSearchParams(formData);
            console.log(data)
            fetch(urlApi+'saveAdmin', {
                method: 'POST',
                body: formData,
                headers: { Authorization: `token ${JSON.parse(localStorage.SESSION_E_GESTION).token}` }
            })
            .then(res=>res.json())
            .then(succes=>{
                console.log('°°°°°°°°°°°°°°°°°°°°°°°', succes);
            })
            .catch(error=>{
                console.log('^^^^^^^^^^^^^^^^^^^^', error);
            })
        })


        $.ajax({
            url: urlApi+"allAdmin",
            type: 'GET',
            headers: { Authorization: `token ${JSON.parse(localStorage.SESSION_E_GESTION).token}` }
        })
        .done(response=>{
            const data = response.data.filter(item=>item.reference!="ADMIN100")
            $.ajax({
                url: urlApi+"getAllRole",
                type: 'GET',
                headers: { Authorization: `token ${JSON.parse(localStorage.SESSION_E_GESTION).token}` }
            })
            .done(resRole=>{
                if(resRole.length !== 0){
                    resRole.data.filter(item=>item.libelle!='SUPER ADMINISTRATEUR').forEach(item=>{
                        const option=document.createElement(`option`); option.value=item._id; option.textContent=item.libelle; role_id.append(option);
                    })
                    toutAdmin = data;
                    toutRole = resRole.data;
                    afficherAdmin(toutAdmin.slice(0, 5).sort((a, b)=>a.nomPrenom.localeCompare(b.nomPrenom)), toutRole.sort((a, b)=>a.libelle.localeCompare(b.libelle)));
                }
            })
            .fail(err=>{
                console.log("+++++++++++++++++++++++", err)
            })
        })
        .fail(error=>{
            console.log("==============================", error)
        });





        /**
         * @param {Array} total 
         * @param {Number} contenuParPage 
         */
        let count = 5;
        const pagination = (total, contenuParPage) =>{
            alert(23)
            // count =  count == null ? 0 : count + contenuParPage;
            const page = Math.ceil(total.length/contenuParPage);
            let stop = count+contenuParPage
            let content = total.slice(count, stop);
            afficherAdmin(content, toutRole)
        }













        function afficherAdmin(dataAdmin, dataRole){
            
            let tbody = document.getElementById(`tbody`);
            tbody.textContent = "";
            dataAdmin.filter(item=>item.reference!="ADMIN100").forEach((admin, indece)=>{
                const ligne                 = document.createElement('tr'); ligne.id=admin.role_id; tbody.append(ligne)
                const colonne1              = document.createElement('td'); colonne1.textContent = indece+1; ligne.append(colonne1)
                
                const colonne2              = document.createElement('td'); colonne2.textContent = admin.nomPrenom; ligne.append(colonne2)

                const colonne3              = document.createElement('td'); colonne3.textContent = admin.email; ligne.append(colonne3)

                const colonne4              = document.createElement('td'); colonne4.textContent = admin.telephone; ligne.append(colonne4)
                
                const colonne5              = document.createElement('td');  ligne.append(colonne5);
                if(admin.role_id.length === 0)colonne5.textContent = `Aucun`;
                else colonne5.textContent   = dataRole.filter(item=>item._id===admin.role_id[0])[0].libelle

                const colonne6              = document.createElement('td'); colonne6.textContent = new Date(admin.createdAt).toLocaleString('fr-FR', { timeZone: 'UTC' }); ligne.append(colonne6)

                const colonne7              = document.createElement('td'); colonne7.textContent = new Date(admin.updatedAt).toLocaleString('fr-FR', { timeZone: 'UTC' }); ligne.append(colonne7)
                const colonne8              = document.createElement('td'); ligne.append(colonne8)
                const lien1                 = document.createElement('a'); lien1.href=`#`; lien1.className=`tooltip-test`; lien1.title=admin.modifierPar.split(`@`)[0]; lien1.textContent=admin.modifierPar.split(`@`)[1]; colonne8.append(lien1);
                
                const colonne9              = document.createElement('td'); ligne.append(colonne9)
                const button_1              = document.createElement('button'); button_1.type=`button`; button_1.className=`d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm`; button_1.setAttribute(`data-toggle`,`modal`); button_1.setAttribute(`data-target`,`#edite-${admin._id}`); colonne9.append(button_1);
                const i_1                   = document.createElement('i'); i_1.className=`bi bi-pencil-square`; button_1.append(i_1);

                const comment1              = document.createComment(`Modal`); colonne9.append(comment1);
                const div1                  = document.createElement(`div`); div1.className=`modal fade`; div1.id=`edite-${admin._id}`; div1.tabIndex=`-1`; div1.role=`dialog`; div1.setAttribute(`aria-labelledby`, `exampleModalLabel`); div1.setAttribute(`aria-hidden`,`true`); colonne9.append(div1);
                const div1_1                = document.createElement(`div`); div1_1.className=`modal-dialog`, div1_1.role="document"; div1.append(div1_1);
                const div1_1_1              = document.createElement(`div`); div1_1_1.className=`modal-content`; div1_1.append(div1_1_1);
                const div1_1_1_1            = document.createElement(`div`); div1_1_1_1.className=`modal-header`; div1_1_1.append(div1_1_1_1);
                const h5_1                  = document.createElement(`h5`); h5_1.className=`modal-title`; h5_1.id=`exampleModalLabel`; h5_1.textContent=`Modifier Administrateur`; div1_1_1_1.append(h5_1);
                const button_2              = document.createElement(`button`); button_2.type=`button`; button_2.className=`close`; button_2.setAttribute(`data-dismiss`,`modal`); button_2.setAttribute(`aria-label`,`Close`); div1_1_1_1.append(button_2)
                const span_1                = document.createElement(`span`); span_1.setAttribute(`aria-hidden`,`true`); span_1.innerHTML=`&times;`; button_2.append(span_1);
                
                const div1_1_1_2            = document.createElement(`div`); div1_1_1_2.className=`modal-body`; div1_1_1.append(div1_1_1_2);
                const div1_1_1_2_1          = document.createElement(`div`); div1_1_1_2.append(div1_1_1_2_1);
                let formulaire              = document.createElement(`form`); formulaire.className=`editeForm`; formulaire.id=`formulaire-${admin.reference}`; formulaire.enctype="multipart/form-data"; div1_1_1_2_1.append(formulaire);
                

                const divNomPrenom          = document.createElement(`div`); divNomPrenom.className=`col-sm-12 mb-3 mb-sm-4`; formulaire.append(divNomPrenom);
                const labelNomPrenom        = document.createElement(`label`); labelNomPrenom.for=`nomPrenom`; labelNomPrenom.className=`form-label`; labelNomPrenom.textContent=`Nom et Prénom(s)`; divNomPrenom.append(labelNomPrenom);
                const inputNomPrenom        = document.createElement(`input`); inputNomPrenom.name=`nomPrenom`; inputNomPrenom.type=`text`; inputNomPrenom.className=`form-control`; inputNomPrenom.id=`nomPrenom`; inputNomPrenom.value=admin.nomPrenom;  divNomPrenom.append(inputNomPrenom);

                const divEmail              = document.createElement(`div`); divEmail.className=`col-sm-12 mb-3 mb-sm-4`; formulaire.append(divEmail);
                const labelEmail            = document.createElement(`label`); labelEmail.for=`email`; labelEmail.className=`form-label`; labelEmail.textContent=`Adresse email`; divEmail.append(labelEmail);
                const inputEmail            = document.createElement(`input`); inputEmail.name=`email`; inputEmail.type=`text`; inputEmail.className=`form-control`; inputEmail.id=`email`; inputEmail.value=admin.email;  divEmail.append(inputEmail);

                const divTelephone          = document.createElement(`div`); divTelephone.className=`col-sm-12 mb-3 mb-sm-4`; formulaire.append(divTelephone);
                const labelTelephone        = document.createElement(`label`); labelTelephone.for=`telephone`; labelTelephone.className=`form-label`; labelTelephone.textContent=`Adreese téléphonique`; divTelephone.append(labelTelephone);
                const inputTelephone        = document.createElement(`input`); inputTelephone.name=`telephone`; inputTelephone.type=`tel`; inputTelephone.className=`form-control`; inputTelephone.id=`telephone`; inputTelephone.value=admin.telephone;  divTelephone.append(inputTelephone);

                const divPhoto              = document.createElement(`div`); divPhoto.className=`col-sm-12 mb-3 mb-sm-4`; formulaire.append(divPhoto);
                const labelPhoto            = document.createElement(`label`); labelPhoto.for=`photo`; labelPhoto.className=`form-label`; labelPhoto.textContent=`Photo`; divPhoto.append(labelPhoto);
                const inputPhoto            = document.createElement(`input`); inputPhoto.name=`photo`; inputPhoto.type=`file`; inputPhoto.className=`form-control`; inputPhoto.id=`photo`;  divPhoto.append(inputPhoto);

                const divId                 = document.createElement(`div`); divId.className=`col-sm-12 mb-3 mb-sm-4`; formulaire.append(divId);
                const labelId               = document.createElement(`label`); labelId.for=`Id`; labelId.className=`form-label`; labelId.textContent=`Id`; divId.append(labelId);
                const inputId               = document.createElement(`input`); inputId.name=`id`; inputId.type=`text`; inputId.className=`form-control`; inputId.id=`id`; inputId.value=admin._id;  divId.append(inputId); divId.hidden = true;
                
                const divRole               = document.createElement(`div`); divRole.className=`col-sm-12 mb-3 mb-sm-4`; formulaire.append(divRole);
                const labelRole             = document.createElement(`label`); labelRole.for=`role`; labelRole.className=`form-label`; labelRole.textContent=`Rôle`; divRole.append(labelRole);
                
                const selectRole            = document.createElement(`select`); selectRole.className=`custom-select`; selectRole.name=`role_id`; selectRole.id=`role_id`; divRole.append(selectRole);
                dataRole.filter(item=>item.reference!="ROLE100").forEach(role=>{
                    const optionRole        = document.createElement(`option`); optionRole.value=role._id; optionRole.textContent=role.libelle; selectRole.append(optionRole);
                    if(role._id===ligne.id){
                        optionRole.selected = true
                    }
                })     
                
                const identifiant           = document.createElement(`input`); identifiant.name=`id`; identifiant.value=admin._id; formulaire.append(identifiant); identifiant.hidden=true;

                const divAction             = document.createElement(`div`); divAction.className=`modal-footer`; formulaire.append(divAction);
                const btnAnnuler            = document.createElement(`button`); btnAnnuler.type=`reset`; btnAnnuler.className=`btn btn-danger`; btnAnnuler.setAttribute(`data-dismiss`, `modal`) ; divAction.append(btnAnnuler);
                const iInBntAnnuler         = document.createElement(`i`); iInBntAnnuler.className=`bi bi-x-circle-fill`; btnAnnuler.append(iInBntAnnuler);  btnAnnuler.innerHTML+=` Annuler`

                const btnEnregistrer        = document.createElement(`button`); btnEnregistrer.type=`submit`; btnEnregistrer.id=`submit-${admin.reference}`; btnEnregistrer.className=`btn btn-primary`; btnEnregistrer.setAttribute(`data-dismiss`, `modal`) ; divAction.append(btnEnregistrer);
                const iInBntEnregistrer     = document.createElement(`i`); iInBntEnregistrer.id=`submit-${admin.reference}`; iInBntEnregistrer.className=`bi bi-check-circle-fill`; iInBntEnregistrer.textContent=` Enrégistrer`; btnEnregistrer.append(iInBntEnregistrer); btnEnregistrer.addEventListener(`click`, updatedAdmin)

                const colonne10             = document.createElement(`td`); ligne.append(colonne10);
                const button_3              = document.createElement(`button`); button_3.type=`button`; colonne10.append(button_3); button_3.className=`d-none d-sm-inline-block btn btn-sm btn-danger shadow-sm`; button_3.setAttribute(`data-toggle`,`modal`); button_3.setAttribute(`data-target`,`#delete-${admin._id}`); colonne10.append(button_3);
                const iInButton_3           = document.createElement(`i`); iInButton_3.className=`bi bi-trash3-fill`; button_3.append(iInButton_3);

                const comment2              = document.createComment(`Modal`); colonne10.append(comment2);
                const div2                  = document.createElement(`div`); div2.className=`modal fade`; div2.id=`delete-${admin._id}`; div2.setAttribute(`tabindex`, `-1`); div2.role=`dialog`; div2.setAttribute(`aria-labelledby`,`exampleModalLabel`); div2.setAttribute(`aria-hidden`,`true`); colonne10.append(div2);
                const div2_1                = document.createElement(`div`); div2_1.className=`modal-dialog`, div2_1.role=`document`; div2.append(div2_1);
                const div2_1_1              = document.createElement(`div`); div2_1_1.className=`modal-content`; div2_1.append(div2_1_1);
                const div2_1_1_1            = document.createElement(`div`); div2_1_1_1.className=`modal-header`; div2_1_1.append(div2_1_1_1);
                const h5_2                  = document.createElement(`h5`); h5_2.className=`modal-title`; h5_2.id=`exampleModalLabel`; h5_2.textContent=`Supprimer Administrateur`; div2_1_1_1.append(h5_2);

                const button_4              = document.createElement(`button`); button_4.type=`button`; button_4.className=`close`; button_4.setAttribute(`data-dismiss`,`modal`); button_4.setAttribute(`aria-label`,`Close`); div2_1_1_1.append(button_4)
                const span_2                = document.createElement(`span`); span_2.setAttribute(`aria-hidden`,`true`); span_2.innerHTML=`&times;`; button_4.append(span_2);

                const div2_1_1_2            = document.createElement(`div`); div2_1_1_2.className=`modal-body`; div2_1_1.append(div2_1_1_2);
                const div2_1_1_2_1          = document.createElement(`div`); div2_1_1_2.append(div2_1_1_2_1);
                const div2_1_1_2_1_1        = document.createElement(`div`); div2_1_1_2_1_1.textContent=`Voulez-vous vraiment supprimer cet article`;  div2_1_1_2_1.append(div2_1_1_2_1_1);
                const strong_1              = document.createElement(`strong`); strong_1.textContent=admin._id; div2_1_1_2_1_1.append(strong_1); div2_1_1_2_1_1.innerHTML+=` / `;
                const strong_2              = document.createElement(`strong`); strong_2.textContent=admin.nomPrenom; div2_1_1_2_1_1.append(strong_2); strong_2.innerHTML+=` ?`;
                
                const div2_1_1_3            = document.createElement(`div`); div2_1_1_3.className=`modal-footer`; div2_1_1.append(div2_1_1_3);
                const button_5              = document.createElement(`button`); button_5.type=`button`; button_5.className=`btn btn-danger`; button_5.setAttribute(`data-dismiss`,`modal`); div2_1_1_3.append(button_5);
                const iInButton_5           = document.createElement(`i`); iInButton_5.className=`bi bi-x-circle-fill`; button_5.append(iInButton_5); button_5.innerHTML+=`Annuler`;

                const button_6              = document.createElement(`button`); button_6.type=`button`; button_6.className=`btn btn-primary`; button_6.setAttribute(`data-dismiss`,`modal`); button_6.id=`Yes-${admin._id}`; div2_1_1_3.append(button_6);
                const iInButton_6           = document.createElement(`i`); iInButton_6.className=`bi bi-check-circle-fill`; button_6.append(iInButton_6); button_6.innerHTML+=`Oui, je confirme`; button_6.addEventListener('click', deleteAdmin)
            })

            // const editeForm = document.querySelectorAll('.editeForm');
            // editeForm.forEach(item=>item.addEventListener('submit', updatedAdmin));
        }

        function updatedAdmin(event){
            event.preventDefault();
            const formulaire    = event.target.closest('form');
            const nomPrenom     = formulaire.querySelector('#nomPrenom').value;
            const email         = formulaire.querySelector('#email').value;
            const telephone     = formulaire.querySelector('#telephone').value;
            const photo         = $(formulaire.querySelector('#photo')).get(0).files[0];
            const role_id       = formulaire.querySelector('#role_id').value;
            const id            = formulaire.querySelector('#id').value;
            const formData      = new FormData();
            formData.append('nomPrenom', nomPrenom);
            formData.append('email', email);
            formData.append('telephone', telephone);
            if(photo){formData.append('photo', photo);}
            formData.append('role_id', role_id);
            formData.append('id', id);
            fetch(urlApi+'updateForSuperAdmin', {
                method: 'POST',
                body: formData,
                headers: { Authorization: `token ${JSON.parse(localStorage.SESSION_E_GESTION).token}` }
            })
            .then(res=>res.json())
            .then(succes=>{
                console.log('............................', succes);
            })
            .catch(error=>{
                console.log('.............error', error);
            })
        }


        function deleteAdmin(event){
            const id=event.target.id.split('-')[1];
            fetch(urlApi+'deleteAdmin/'+event.target.id.split('-')[1], {
                method: 'DELETE',
                headers: { Authorization: `token ${JSON.parse(localStorage.SESSION_E_GESTION).token}` }
            })
            .then(res=>res.json())
            .then(succes=>{
                console.log('°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°', succes);
            })
        }

        
})
    

