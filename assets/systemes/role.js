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



		// $.ajax({
		// 	type: `POST`,
		// 	url: "http://localhost:3000/api/createRole",
		// 	data: formData,
		// 	headers: { Authorization: `token ${JSON.parse(localStorage.SESSION_E_GESTION).token}`}
		// })
		// .done(function(response) {
		// 	$('#formulaire input').val('');
		// 	alerter.className = `alert alert-info`;
		// 	alerter.textContent = response.msg;
		// })
		// .fail(function(data) {
		// 	if (data.responseText !== ''){
		// 		alerter.className = `alert alert-warning`;
		// 		alerter.textContent =data.responseJSON.msg;
		// 	}else{
		// 		alerter.className = `alert alert-danger`;
		// 		alerter.textContent = data.responseJSON.msg;
		// 	}
		// });
	});
});
