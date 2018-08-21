$(document).ready(function() {

	(function(){
		var _button = $('#registration-form__submit'),
			_form = $('#registration-form'),
		    _email = $('input[type="email"]'),
			_password = $('input[type="password"]'),
			_blockMessage = "<div class='notify notify--error mt-20' style='display:none'>",
			_textMessage = "Заполните поле",
			_emailPattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
		

		var regFormValidation = {

			isValid:true,

			init: function(){
				this._setupListners();	
			},

			_setupListners: function(){
				_button.on('click', regFormValidation._validateForm).on('click', regFormValidation._sendForm);
			},

			_validateForm: function(e){
				e.preventDefault();	
			
				var _isValid = true,
					_emailValue = _email.val().trim();
				
				// Функция добавление блока с уведомлением
				var addNotifyBlock = function(tag, attribute) {
					if (tag.attr(attribute) != undefined) {
						_errorInfo = _blockMessage + tag.attr(attribute) + "</div>";	
					} else {
						_errorInfo = _blockMessage + _textMessage + "</div>"
					}
					tag.before(_errorInfo).prev().fadeIn();
					_isValid = false;
				}

				// Убираем предыдущие ошибки	
				_form.find('.notify--error').remove();	

				// Проверка полей
				if (_password.val().trim() == "") addNotifyBlock(_password,'data-empty');
				
				if (_emailValue == "") addNotifyBlock(_email,'data-empty');
				else if ( !(_emailPattern.test(_emailValue)) ) addNotifyBlock(_email,'data-error');
							
				// Проверяем если уже такой email
				if (_isValid) {
					if (_email.val() == 'mail@mail.com') {
						addNotifyBlock(_email,'data-exist');
					}
				}

				// Убираем ошибки при новом вводе данных в поле
				_password.on('keydown', function(){
					_password.prev('.notify--error').remove();
					_form.find('#error-message').remove();	
				});
				_email.on('keydown', function(){
					_email.prev('.notify--error').remove();
					_form.find('#error-message').remove();	
				});

				regFormValidation.isValid = _isValid;
			},

			// Отправка формы
			_sendForm: function(e){
				e.preventDefault();
				if (regFormValidation.isValid) _form.submit();
			}

		}

		regFormValidation.init();

	}());

});