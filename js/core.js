var Core = Core || {};

(function($) {
	var CoreClass = function() {
		var _self = this;
		var _vars = {};

		var _coreModules = {
			'high': [],
			'medium': [],
			'low': []
		};

		var _events = {
			'high': [],
			'medium': [],
			'low': []
		};

		var _callbacks = {};

		var _modules = {};

		_self.get = function(moduleName) {
			return _modules[moduleName];
		};

		_self.extend = function(moduleName, moduleCallback, priority) {
			if(typeof priority == 'undefined' || !_coreModules[priority]) {
				priority = 'medium';
			}

			_coreModules[priority].push({
				name: moduleName,
				callback: moduleCallback
			});
		};

		_self.init = function() {
			_handleEvents();
			_initClickable();

			for(var priority in _coreModules) {
				for(var val in _coreModules[priority]) {
					var obj = new _coreModules[priority][val]['callback']($, _self);

					if(typeof obj.init == 'function') {
						obj.init();
					}

					_modules[_coreModules[priority][val]['name']] = obj;
				}
			}
		};

		_self.addEvent = function(eventName, callback, priority/*, priorityIndex*/) {
			if(typeof priority == 'undefined' || !_events[priority]) {
				priority = 'medium';
			}

			if(!_events[priority][eventName]) {
				_events[priority][eventName] = [];
			}

			_events[priority][eventName].push(callback);
		};

		_self.triggerEvent = function(eventName, param) {
			for(var priority in _events) {
				for(var val in _events[priority]) {
					if(val == eventName && _events[priority][val] && $.isArray(_events[priority][val])) {
						for(var eventIndex in _events[priority][val]) {
							_events[priority][val][eventIndex](param);
						}
					}
				}
			}
		};

		_self.var = function(name, value, isClone) {
			if(typeof value === 'undefined') {
				if(isClone) {
					return JSON.parse(JSON.stringify(_vars[name]));
				} else {
					return _vars[name];
				}
			} else {
				_vars[name] = value;
			}
		};

		_self.setCookie = function(name, val, isNotJson) {
			if(!isNotJson) {
				val = JSON.stringify(val);
			}

			$.cookie(name, val, { expires: 7, path: '/' });
		};

		_self.getCookie = function(name) {
			var result = $.cookie(name);

			if(result) {
				result = $.parseJSON(result);
			}

			return result;
		};

		_self.getMoney = function(money) {
			money = parseFloat(money);
			return money.format(0, 3, ' ', ',');
		};

		_self.removeCookie = function(name) {
			$.removeCookie(name, { expires: 7, path: '/' });
		};

		_self.getSettingsCookie = function() {
			var settingsList = _self.getCookie('settings');

			if(!settingsList) {
				settingsList = {};
			}

			return settingsList;
		};

		_self.setSettings = function(setting, val) {
			var settingsList = _self.getSettingsCookie();

			settingsList[setting] = val;

			_self.setCookie('settings', settingsList)
		};

		_self.getSettings = function(setting) {
			var settingsList = _self.getSettingsCookie();

			return settingsList[setting];
		};

		_self.addClickable = function(name, callback, dataReturn, dataValue) {
			var clickableList = _self.getClickableCallbacks();

			if(clickableList[name]) {
				return false;
			}

			if(typeof dataReturn === 'undefined') {
				dataReturn = 'return _this';
			}

			if(typeof dataValue === 'undefined') {
				dataValue = '';
			}

			clickableList[name] = {callback: callback, dataReturn: dataReturn, dataValue: dataValue};
			_updateClickableCallbacks(clickableList);
			return true;
		};

		_self.getClickableCallbacks = function() {
			return Core.var('clickableCallbacks');
		};

		_self.addCallback = function(name, callback) {
			_callbacks[name] = callback;
		};

		_self.getCallback = function(name) {
			return _callbacks[name];
		};

		_self.callCallback = function(name) {
			if(typeof _callbacks[name] === 'undefined') {
				return false;
			}

			var callbackVars = [];

			var argumentsLength = arguments.length;
			for(var i = 1; i < argumentsLength; i++) {
				callbackVars.push(arguments[i]);
			}

			return _callbacks[name].apply(null, callbackVars);
		};

		var _updateClickableCallbacks = function(obj) {
			Core.var('clickableCallbacks', obj);
		};

		var _initClickable = function() {
			var clickableList = _self.getClickableCallbacks();

			if(!clickableList) {
				_updateClickableCallbacks({});
			}

			_self.addClickable('alert', function(dataReturn, dataValue) {
				alert(dataValue);
			}
			);
		};

		var _handleEvents = function() {
			$(document).on('click', '.clickable', _clickClickable);
		};

		var _clickClickable = function() {
			var item = $(this);
			var itemCallback = item.attr('data-callback');
			var itemValue = item.attr('data-value');
			var itemReturn = item.attr('data-return');
			var clickableList = _self.getClickableCallbacks();
			var itemReturnValue;

			itemReturn = typeof itemReturn === 'undefined' ? clickableList[itemCallback]['dataReturn'] : itemReturn;
			itemValue = typeof itemValue === 'undefined' ? clickableList[itemCallback]['dataValue'] : itemValue;
			itemReturnValue = (new Function('_this', '_value', itemReturn))(this, itemValue);

			if(clickableList[itemCallback]) {
				clickableList[itemCallback]['callback'](itemReturnValue, itemValue);
			}

			return false;
		};

	};

	window.Core = new CoreClass();

	$(document).ready(function () {
		window.Core.init();
	});
})(jQuery);