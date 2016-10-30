$(document).ready(function () {
	$('#systemLoginForm').on('submit', function() {
		var form = $(this);
		var emailField = form.find('.system-login-email');
		var emailFieldContainer = emailField.closest('.form-group');
		var emailFieldVal = $.trim(emailField.val());
		var passwordField = form.find('.system-login-password');
		var passwordFieldContainer = passwordField.closest('.form-group');
		var passwordFieldVal = $.trim(passwordField.val());

		emailFieldContainer.removeClass('has-error');
		passwordFieldContainer.removeClass('has-error');

		if(emailFieldVal == '' || passwordFieldVal == '') {
			if(emailFieldVal == '') {
				emailFieldContainer.addClass('has-error');
			}

			if(passwordFieldVal == '') {
				passwordFieldContainer.addClass('has-error');
			}

			return false;
		}

		form.find('.system-login-form-load').removeClass('hidden');
		form.find(':input').prop('disabled', true);

		var xhr = $.ajax({
			type: 'post',
			url: form.attr('action'),
			data: 'systemLogin[email]=' + emailFieldVal + '&systemLogin[password]=' + passwordFieldVal,
			success: function(data) {
				form.find('.system-login-form-load').addClass('hidden');
				form.find(':input').prop('disabled', false);

				if(data.status) {
					Core.setCookie('systemLogin', data.access, true);
					window.location.reload(true);
				} else {
					emailFieldContainer.addClass('has-error');
					passwordFieldContainer.addClass('has-error');
				}
			},
			error: function() {
				form.find('.system-login-form-load').addClass('hidden');
				form.find(':input').prop('disabled', false);
				alert('error');
			},
			dataType: 'json',
			async: true
		});

		return false;
	});
});