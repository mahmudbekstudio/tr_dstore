$(document).ready(function() {
	var keyBoardItem = $('.keyboard-inp').find('.keybaord-inp-item');
	var keyBoardItemCount = keyBoardItem.length;
	var loginInp = $('#loginform-password');

	loginInp.val('').trigger('change');

	loginInp.on('change', function() {
		var inp = $(this);
		var inpVal = inp.val();
		var delBtn = $('.keybaord-btn-item[data-val="del"]');
		var loginBtn = $('.keybaord-btn-item[data-val="login"]');

		if(inpVal.length == 1) {
			delBtn.prop('disabled', false);
		} else if(inpVal.length == 0) {
			delBtn.prop('disabled', true);
		}

		if(inpVal.length == 4) {
			loginBtn.prop('disabled', false);
		} else if(inpVal.length == 3) {
			loginBtn.prop('disabled', true);
		}

		keyBoardItem.find('.fa').removeClass('fa-circle').addClass('fa-circle-o');
		for(var i = 0; i < inpVal.length; i++) {
			keyBoardItem.find('.fa').eq(i).removeClass('fa-circle-o').addClass('fa-circle');
		}
	});

	$('#login-form').on('click', '.keybaord-btn-item', function() {
		var btn = $(this);
		var btnVal = btn.attr('data-val');
		var loginInpVal = loginInp.val();

		if(btnVal == 'login') {
			//Login
		} else if(btnVal == 'del') {
			loginInp.val(loginInpVal.substring(0, loginInpVal.length - 1)).trigger('change');
		} else {
			if(loginInpVal.length >= keyBoardItemCount) {
				//Input is full
			} else {
				loginInp.val(loginInpVal + btnVal).trigger('change');
			}
		}
	});

	$('.exit-system').on('click', function() {
		Core.removeCookie('systemLogin');
		window.location.reload(true);
		return false;
	});

	$(document).on('keydown', function(e) {
		var code = parseInt(e.keyCode);
		var loginForm = $('#login-form');
		if(loginForm.length) {
			var codeArr = {
				96: '0', 97: '1', 98: '2', 99: '3', 100: '4', 101: '5', 102: '6', 103: '7', 104: '8', 105: '9',
				48: '0', 49: '1', 50: '2', 51: '3', 52: '4', 53: '5', 54: '6', 55: '7', 56: '8', 57: '9'
			};

			if(code == 13) {
				$('.keybaord-btn-item[data-val="login"]').trigger('click');
			} else if(code == 8) {
				$('.keybaord-btn-item[data-val="del"]').trigger('click');
				return false;
			} else if((code >= 96 && code <= 105) || (code >= 48 && code <= 57)) {
				$('.keybaord-btn-item[data-val="' + codeArr[code] + '"]').trigger('click');
			}
		} else if(code == 123) {
			$('.barcode-scan-count').trigger('click');
		} else if(code == 122) {
			$('.barcode-scan').focus();
		}
	});
});