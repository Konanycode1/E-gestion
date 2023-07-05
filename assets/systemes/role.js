$(function() {
	const urlApi = 'http://localhost:3000/api/';
	let formulaire = $(`#formulaire`);
	let alerter = document.getElementById("alerter");
	$(formulaire).submit(function(event) {
		event.preventDefault();
		const form=document.getElementById('formulaire')
		alerter.className = "";
		alerter.textContent="";
		const formData = new FormData(form);
		const data = new URLSearchParams(formData);
		fetch(urlApi+"createRole", {
			method: 'POST',
			body: data,
			headers: { Authorization: `token ${JSON.parse(localStorage.SESSION_E_GESTION).token}`}
		})
		.then(res=>res.json())
		.then(succes=>{
			alerter.className = `alert alert-info text-center`;
			alerter.textContent = succes.msg;
		})
		.catch(error=>{
			alerter.className = `alert alert-danger text-center`;
			alerter.textContent = "Ce rôle existe déjà !";
		})
	});


	fetch(urlApi+'getAllRole', {
		method:'GET',
		headers: { Authorization: `token ${JSON.parse(localStorage.SESSION_E_GESTION).token}`}
	})
	.then(res=>res.json())
	.then(succes=>{
		console.log(succes)
		affichage(succes.data.filter(item=>item.reference != "ROLE100").sort((a,b)=>a.libelle.localeCompare(b.libelle)))
	})

	function affichage(table){
		if(table.length==0) return;
		const tbody = document.getElementById('tbody');
		table.forEach((element, index) => {
			fetch(urlApi+'allAdmin', {
				method: 'GET',
				headers: { Authorization: `token ${JSON.parse(localStorage.SESSION_E_GESTION).token}`}
			})
			.then(res=>res.json())
			.then(succes=>{
				const admin = succes.data.filter(item=>item._id===element.admins[0])[0];
				console.log('??????????????????????????????????',admin)

				tbody.innerHTML+= 
				`<tr id="LIGNE-${index+1}">
					<td>${index+1}</td>
					<td>${element.reference}</td>
					<td>${element.libelle}</td>
					<td>${new Date(element.createdAt).toLocaleString('fr-FR', { timeZone: 'UTC' })}</td>
					<td>${new Date(element.updatedAt).toLocaleString('fr-FR', { timeZone: 'UTC' })}</td>
					<td><a href="#" class="tooltip-test" title="${admin._id}">${admin.nomPrenom}</a></td>
					<th>
						<button type="button" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm" data-toggle="modal" data-target="#edite-${element.reference}">
							<i class="bi bi-pencil-square"></i>
						</button>

						<div class="modal fade" id="edite-${element.reference}" tabindex="-1" role="dialog" aria-labelledby="${element._id}" aria-hidden="true">
							<div class="modal-dialog" role="document">
								<div class="modal-content">
									<div class="modal-header">
										<h5 class="modal-title" id="${element._id}">Modifier la catégorie</h5>
										<button type="button" class="close" data-dismiss="modal" aria-label="Close">
											<span aria-hidden="true">&times;</span>
										</button>
									</div>
									<div class="modal-body">
										<div>
											<form class="users">
												<div class="col-sm-12 mb-3 mb-sm-4">
													<label for="libelle" class="form-label">Entrer le libelle du rôle</label>
													<input type="text" class="form-control" name="libelle" id="libelle" value="${element.libelle}"/>
												</div>
											</form>
											<form class="users" hidden>
												<div class="col-sm-12 mb-3 mb-sm-4" hidden>
													<label for="id" class="form-label" hidden>id rôle</label>
													<input type="text" class="form-control" name="id" id="id" value="${element._id}"/>
												</div>
											</form>
										</div>
									</div>
									<div class="modal-footer">
										<button type="button" class="btn btn-danger" data-dismiss="modal">
											<i class="bi bi-x-circle-fill"></i> Annuler
										</button>
										<button type="button" class="btn btn-primary">
											<i class="bi bi-send-check-fill"></i> Enrégistrer
										</button>
									</div>
								</div>
							</div>
						</div>
					</th>
					<th>
						<button type="button" class="d-none d-sm-inline-block btn btn-sm btn-danger shadow-sm" data-toggle="modal" data-target="#delete-${element._id}">
							<i class="bi bi-trash3-fill"></i>
						</button>
						
						<div class="modal fade" id="delete-${element._id}" tabindex="-1" role="dialog" aria-labelledby="${element._id}" aria-hidden="true">
							<div class="modal-dialog" role="document">
								<div class="modal-content">
									<div class="modal-header">
										<h5 class="modal-title" id="${element._id}">Supprimer le rôle</h5>
										<button type="button" class="close" data-dismiss="modal" aria-label="Close">
											<span aria-hidden="true">&times;</span>
										</button>
									</div>
									<div class="modal-body">
										<div>
											<div>
												Voulez-vous vraiment supprimer ce rôle ?
												<strong>${element.reference}</strong> /
												<strong>${element.libelle}</strong> ?
											</div>
										</div>
									</div>
									<div class="modal-footer">
										<button type="button" class="btn btn-danger" data-dismiss="modal">
											<i class="bi bi-x-circle-fill"></i> Annuler
										</button>
										<button type="button" class="btn btn-primary" id="Yes-${element._id}">
											<i class="bi bi-check-circle-fill"></i> Oui, je confirme
										</button>
									</div>
								</div>
							</div>
						</div>
					</th>
				</tr>`











			})
			
		});
	}
});
