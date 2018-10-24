function handleLoginControls() {
	$('.gb-login').submit(function(evt) {
		evt.preventDefault();

		const messageArea = $('.gb-login-message').css('color', 'inherit').text('Logging in...');

		$.ajax({
			type: 'POST',
			url: '/auth/login',
			dataType: 'json',
			contentType: 'application/json',
			data: JSON.stringify({
				email: $('#gb-login-email').val().trim(),
				password: $('#gb-login-password').val().trim()
			})
		})
		.done(res => {
			Cookies.set('gb_jwt', res, {expires: 1});
			window.location.href = '/search';
		})
		.fail(res => {
			if(res.status === 401)
				messageArea.css('color', '#F33').text('Invalid username or password.');
		});
	});
}

$(function() {
	handleLoginControls();
});