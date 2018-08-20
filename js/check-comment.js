$(document).ready(function() {

	var checkComment = (function(){

		// Переменные модуля
		var _form = $('#comment-add');
		var _button = $('#comment-add__submit')
		var _textareas = _form.find('textarea');
		// console.log(_textareas);
		
		// 	Запуск модуля
		var init = function(){
			_setupListner();
		}

		// Метод прослушивания событий
		var _setupListner = function(){
			_button.on('click', function(e){
				e.preventDefault();
				_onButtonClick();
			})
		}

		// Приватные методы/функции
		var _onButtonClick = function(){
			var _isValid = true,
				_errorInfo = "<div class='notify notify--error'>Введите пожалуйста комментарий</div>";

			// Убираем ошибки, если были
			_form.find('.notify--error').remove();	
		
			// Проверяеи все поля с комментариями
			$.each(_textareas, function(index,val){
				var _textarea = $(val),
					_formGroup = _textarea.parent(),
					_value = _textarea.val().trim();
				
			    //  Проверяем есть ли атрибут data-error
				if (_textarea.attr('data-error') != undefined) _errorInfo = "<div class='notify notify--error'>" + 
					_textarea.attr('data-error') + "</div>";
				
				// Проверяем на заполнение
				if (_value.length =="") {
					_textarea.before(_errorInfo);
					_isValid = false;
				}

				// Сбрасываем оибку при вводе данных в поле
				_textarea.on('keydown', function(){
					_formGroup.find('.notify--error').remove();	
				});

			});

			// Если все заполнено,то вперед
			if (_isValid) _form.submit();
		}

		var _test = function(){
			console.log('test method');
		}
		// Возвращаем публичные методы наружу, т.е. методы доступные вне модуля
		return {
			init
		}

	}());

	checkComment.init();
	
});