$(function() {
	// Get the form.
	let form = $(`#formulaire`);
	// Get the messages div.
	let formMessages = $(`.form-messege`);
	// Set up an event listener for the contact form.
	$(form).submit(function(e) {
		// Stop the browser from submitting the form.
		e.preventDefault();
		// Serialize the form data.
		let formData = $(form).serialize();
		// formData.append('file',files);
		// Submit the form using AJAX.
		$.ajax({
			type: 'POST',
			url: $(form).attr('action'),
			data: formData
		})
		.done(function(response) {
			// Make sure that the formMessages div has the 'success' class.
			$(formMessages).removeClass('error');
			$(formMessages).addClass('success');
			// Set the message text.
			if(response.admin){document.getElementById("form-messege").innerHTML = `<table class="table"><thead><tr><th class="views">CODE</th><th class="views">Nom & Prénom</th><th class="views">Email</th><th class="views">Telephone</th><th class="views">Mot de passe</th><th class="views">Photo</th></tr></thead><tbody><tr class='odd'><th>${response.admin._id}</th><td>${response.admin.nomPrenom}</td><td>${response.admin.email}</td><td>${response.admin.telephone}</td><td>${document.getElementById('password').value}</td><td><img src="${response.admin.photo}" style="width:30px;height:30px"></td><td><a href='connexion.html'><button type="button" class="btn btn-primary">Connexion</button></a></td></tr></tbody></table>`;}
			// Clear the form.
			$('#contact-form input,#contact-form textarea').val('');
		})
		.fail(function(data) {
			// Make sure that the formMessages div has the 'error' class.
			$(formMessages).removeClass('success');
			$(formMessages).addClass('error');
			// Set the message text.
			if (data.responseText !== '') document.getElementById("form-messege").innerHTML = `<div class="alert alert-danger" role="alert">${data.responseText}</div>`;
			else $(formMessages).text('Oops! An error occured and your message could not be sent.');
		});
	});
});
