$(function() {
	let formulaire = $(`#formulaire`);
	let alerter = document.getElementById("alerter");
	$(formulaire).submit(function(event) {
		alerter.className = "";
		alerter.textContent="";
		event.preventDefault();
		let formData = $(formulaire).serialize();
		$.ajax({
			type: `POST`,
			url: "http://localhost:3000/api/createRole",
			data: formData,
			headers: { Authorization: `token ${JSON.parse(localStorage.SESSION_E_GESTION).token}`}
		})
		.done(function(response) {
			$('#formulaire input').val('');
			alerter.className = `alert alert-info`;
			alerter.textContent = response.msg;
		})
		.fail(function(data) {
			if (data.responseText !== ''){
				alerter.className = `alert alert-warning`;
				alerter.textContent =data.responseJSON.msg;
			}else{
				alerter.className = `alert alert-danger`;
				alerter.textContent = data.responseJSON.msg;
			}
		});
	});
});
