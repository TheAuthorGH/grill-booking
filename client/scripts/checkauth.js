const GB_AUTH_BEFORESEND = function(xhr) { xhr.setRequestHeader('Authorization', 'Bearer ' + Cookies.get('gb_jwt')) };

function checkAuth() {
	if(!Cookies.get('gb_jwt')) {
		window.location.href= '/login';
		return;
	}
	return new Promise((resolve, reject) => {
		$.ajax({
			type: 'GET',
			url: '/auth/refresh',
			dataType: 'json',
			contentType: 'application/json',
			beforeSend: GB_AUTH_BEFORESEND
		})
		.done(res => {
			Cookies.set('gb_jwt', res, {expires: 1});
			Cookies.set('gb_user', jwt_decode(res).user.id, {expires: 1});
			$('nav').append(`<a href="/logout">Logout</a>`);
			resolve();
		})
		.fail(res => {
			if(res.status === 401)
				window.location.href = '/login';
			else
				window.location.href= '/error';
			reject();
		});
	});
}