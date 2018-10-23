function handleRegisterControls() {
	$('.gb-register').submit(function(evt) {
		evt.preventDefault();
		$.ajax({
			type: 'POST',
			url: '/users',
			dataType: 'json',
			contentType: 'application/json',
			data: JSON.stringify({
				email: $('#gb-register-email').val(),
				password: $('#gb-register-password').val()
			})
		})
		.done(() => {
			window.location.href = "/login";
		})
		.fail(res => {
			const messageArea = $('.gb-register-message').css('color', '#F33');
			if(res.status === 400) // Not the best way to check for an invalid email!
				messageArea.text('Email is already in use!');
			else
				messageArea.text('Sorry, something went wrong and we could not create your account. Please try again later.');
		});
	});
}

$(function() {
	handleRegisterControls();
});