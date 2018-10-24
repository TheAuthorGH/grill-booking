function handleRegisterControls() {

	$('.gb-register').submit(function(evt) {
		evt.preventDefault();

		const messageArea = $('.gb-register-message').css('color', 'inherit').text('Creating your account...');

		const email = $('#gb-register-email').val().trim();
		const password = $('#gb-register-password').val().trim();

		$.ajax({
			type: 'POST',
			url: '/users',
			dataType: 'json',
			contentType: 'application/json',
			data: JSON.stringify({
				email: email,
				password: password
			})
		})
		.done(() => {
			window.location.href = "/login";
		})
		.fail(res => {
			if(res.status === 400)
				messageArea.css('color', '#F33').text(res.responseText);
			else
				messageArea.css('color', '#F33').text('Sorry, something went wrong and we could not create your account. Please try again later.');
		});
	});
}

$(function() {
	handleRegisterControls();
});