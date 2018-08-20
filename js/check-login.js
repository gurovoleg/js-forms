$(document).ready(function() {

	var checkLogin = (function(){
		
		// Переменные модуля
		var _form = $('#check-login'),
			_button = $('#check-login__submit'),
			_email = $('input[type="email"]'),
			_password = $('input[type="password"]'),
			_blockMessage = "<div class='notify notify--error mt-20'>",
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
			
			// Функция добавление блока с уведомлением
			var addNotifyBlock = function(tag, attribute) {
				if (tag.attr(attribute) != undefined) {
					_errorInfo = _blockMessage + tag.attr(attribute) + "</div>";	
				} else {
					_errorInfo = _blockMessage + _textMessage + "</div>"
				}
				tag.before(_errorInfo);
				_isValid = false;
			}

			// Убираем предыдущие ошибки	
			_form.find('.notify--error').remove();	

			// Проверка полей
			if (_password.val().trim() == "") addNotifyBlock(_password,'data-empty');
			
			if (_emailValue == "") addNotifyBlock(_email,'data-empty');
			else if ( !(_emailPattern.test(_emailValue)) ) addNotifyBlock(_email,'data-error');
						
			// Убираем ошибки при новом вводе данных в поле
			_password.on('keydown', function(){
				_password.prev('.notify--error').remove();
				_form.find('#error-message').remove();	
			});
			_email.on('keydown', function(){
				_email.prev('.notify--error').remove();
				_form.find('#error-message').remove();	
			});


			return _isValid;
		}

		var _userAuth = function(isReady){
			var _startBlockWrapper = "<div id='error-message' class='notify no-paddings'>"
				_notifyTitle = "Неверный email или пароль",
				_titleBlock = "<div class='notify no-radius-bottom notify--error'>" + _notifyTitle + "</div>",
				_notifyText = "<p>Введите верные данные для входа или воспользуйтесь <a href='#!'>восстановлением пароля </a>, чтобы войти на сайт.</p>",
				_textBlock = "<div class='notify no-radius-top'>" + _notifyText + "</div>",
				_endBlockWrapper = "</div>",
				_errorMessage = _startBlockWrapper + _titleBlock + _textBlock + _endBlockWrapper;

			if (isReady) {
				if (_email.val() == 'mail@mail.com' && _password.val() == '123') {
					_form.submit();
				} else {
					_form.find('#error-message').remove();	
					_email.before(_errorMessage);
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