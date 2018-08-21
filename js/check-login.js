$(document).ready(function() {

	$('body').on('click','a#close',function(e){
		e.preventDefault();
		$('#error-message').fadeOut();	
	});

	var checkLogin = (function(){
		
		// Переменные модуля
		var _form = $('#check-login'),
			_button = $('#check-login__submit'),
			_email = $('input[type="email"]'),
			_password = $('input[type="password"]'),
			_blockMessage = "<div class='notify notify--error mt-20 absolute-position' style='display:none'>",
			_textMessage = "Заполните поле",
			_emailPattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;

		// 	Запуск модуля
		var init = function(){
			_setupListners();
		}

		// Метод прослушивания событий
		var _setupListners = function(){
			_button.on('click', function(e){
				e.preventDefault();
				_userAuth(_formButtonClick());
			});
		}

		// Приватные методы/функции
		
		var _formButtonClick = function(){
			var _isValid = true,
				_emailValue = _email.val().trim();
			
			// Функция добавление блока с уведомлением и класса
			var addNotifyBlock = function(tag, attribute) {
				if (tag.attr(attribute) != undefined) {
					_errorInfo = _blockMessage + tag.attr(attribute) + "</div>";	
				} else {
					_errorInfo = _blockMessage + _textMessage + "</div>"
				}
				tag.before(_errorInfo).prev().fadeIn().delay(1500).fadeOut();
				tag.addClass('error');
				_isValid = false;
			}

			// Проверка полей
			if (_password.val().trim() == "") addNotifyBlock(_password,'data-empty');
			
			if (_emailValue == "") addNotifyBlock(_email,'data-empty');
			else if ( !(_emailPattern.test(_emailValue)) ) addNotifyBlock(_email,'data-error');	
									
			// Убираем ошибки при новом вводе данных в поле
			_password.on('keydown', function(){
				_password.removeClass('error')
				_form.find('#error-message').remove();	
			});
			_email.on('keydown', function(){
				_email.removeClass('error')
				_form.find('#error-message').remove();	
			});

			return _isValid;
		}

		var _userAuth = function(isReady){
			var	_notifyTitle = "Неверный email или пароль",
				_notifyText = "<p>Введите верные данные для входа или воспользуйтесь <a href='#!'>восстановлением пароля </a>, чтобы войти на сайт.</p>" + 
							  "<p style='text-align:right'><a id='close' href='#!'>Закрыть</a></p>";
			
			var _errorMessage = "<div id='error-message' class='notify no-paddings absolute-position top-20' style='display:none'>" +
								"<div class='notify no-radius-bottom notify--error'>" + _notifyTitle + "</div>" +
								"<div class='notify no-radius-top'>" + _notifyText + "</div>" +
								"</div>"


			if (isReady) {
				if (_email.val() == 'mail@mail.com' && _password.val() == '123') {
					_form.submit();
				} else {
					_form.find('#error-message').remove();	
					_email.before(_errorMessage).prev().fadeIn();
				}
			}
		}
		
		// Возвращаем публичные методы наружу, т.е. методы доступные вне модуля
		return {
			init
		}

	}()); 

	checkLogin.init();
	
});