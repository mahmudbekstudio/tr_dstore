Core.extend('indexBasket', function($, Core) {
	var _self = this;

	var _basketList;
	var _basketItem;
	var _basketItemsList;//all added items

	_self.init = function() {
		_setVars();
		_initClickableCallbacks();
		_initCallbacks();
		_initBasket();
	};

	_self.add = function(id) {
		var basketItem = _self.getBasketItem(id);

		if(basketItem) {
			_updateBasketObject(id);
		} else {
			_addBasketObject(id);
		}
	};

	_self.getBasketList = function() {
		return _getBasket();
	};

	_self.getBasketItem = function(id) {
		return _getBasket(id);
	};

	_self.setBasketItem = function(id, goods_count, goods_unit_type) {
		var basket = _getBasket();

		basket[id] = {count: goods_count, unit_type: goods_unit_type};

		_setBasket(basket);
	};

	var _initBasket = function() {
		var basket = _getBasket();
		var goodsList = [];

		for(var id in basket) {
			var goodsItem = Core.callCallback('goodsItem', id);
			goodsItem['unit_type_list'][0]['sellCount'] = basket[id]['count'];
			goodsItem['unit_type_list'][0]['type'] = basket[id]['unit_type'];
			goodsList.push(_getBasketObject(goodsItem));
		}

		_basketList.append(goodsList);
	};

	var _getBasket = function(id) {
		var basket = Core.getCookie('basket');

		if(!basket) {
			basket = {};
			_setBasket(basket);
		}

		if(id) {
			basket = basket[id];
		}

		return basket;
	};

	var _setBasket = function(basket) {
		Core.setCookie('basket', basket);
	};

	var _getBasketObject = function(goodsItem) {
		var newBasketItem = _basketItem.clone(true);
		var params = {
			'id': goodsItem['id'],
			'name': goodsItem['name'],
			'unit': goodsItem['unit'],
			'unit_type': goodsItem['unit_type_list'][0]['type'],
			'weight': goodsItem['meta']['weight'],
			'measurement': goodsItem['meta']['measurement'],
			'code': goodsItem['code'],
			'category': goodsItem['category'],
			'country': goodsItem['meta']['country'],
			'manufacture': goodsItem['meta']['manufacture'],
			'sell_count': goodsItem['unit_type_list'][0]['sellCount'],
			'price_unit_type': goodsItem['unit_type_list'][0]['type'],
			'price': goodsItem['price'],
			'total_price': goodsItem['unit_type_list'][0]['sellCount'] * goodsItem['price']
		};

		return _updateBasketObjectItem(newBasketItem, params);
	};

	var _updateBasketObjectItem = function(item, params) {

		params['id']			&& item.attr('data-id', params['id']);
		params['name']			&& item.find('.basket-column-name-title-name').text(params['name']);
		params['unit']			&& item.find('.basket-column-name-title-unit').text(params['unit']);
		params['unit_type']		&& item.find('.basket-column-name-title-unit-type').text(Core.callCallback('goodsUnitType', params['unit_type']));
		params['weight']	 	&& item.find('.basket-column-name-title-weight').text(params['weight']);
		params['measurement']	&& item.find('.basket-column-name-title-weight-type').text(params['measurement']);
		params['code']			&& item.find('.basket-column-name-title-code').text(params['code']);
		params['category']		&& item.find('.basket-column-name-title-category').text(Core.callCallback('goodsCategory', params['category']));
		params['country']		&& item.find('.basket-column-name-title-country').text(params['country'].join(', '));
		params['manufacture']	&& item.find('.basket-column-name-title-manufacture').text(params['manufacture'].join(', '));

		if(params['sell_count'] || params['price_unit_type']) {
			var basketColumnCount = item.find('.basket-column-count');
			params['sell_count'] 		&& basketColumnCount.find('.value').text(params['sell_count']);
			params['price_unit_type']	&& basketColumnCount.find('.unit-type').text(Core.callCallback('goodsUnitType', params['price_unit_type']));
		}

		params['price']			&& item.find('.basket-column-price').find('.value').text(Core.getMoney(params['price']));
		params['total_price']	&& item.find('.basket-column-total-price').find('.value').text(Core.getMoney(params['total_price']));

		return item;
	};

	var _addBasketObject = function(id) {
		var goodsItem = Core.callCallback('goodsItem', id);

		_self.setBasketItem(id, goodsItem['unit_type_list'][0]['sellCount'], goodsItem['unit_type_list'][0]['type']);
		_basketList.append(_getBasketObject(goodsItem));
	};

	var _updateBasketObject = function(id) {
		//
	};

	var _setVars = function() {
		_basketList = $('.basket-list');
		var example = _basketList.find('.basket-row-item-example');
		_basketItem = example.clone(true).removeClass('basket-row-item-example').addClass('basket-row-item');
		example.remove();
	};

	var _initClickableCallbacks = function() {
		Core.addClickable('showAlert', _clickableShowAlert);
		Core.addClickable('deleteBasketItem', _clickableDeleteBasketItem);
	};

	var _initCallbacks = function() {
		Core.addCallback('goodsItem', function(id) {
			var goodsList = Core.var('goodsList', undefined, true);
			return goodsList[id];
		});
		Core.addCallback('goodsCategory', function(categorIds) {
			var categoryList = Core.var('categoryList');
			var result = '';

			var categorIdsLength = categorIds.length;
			for(var i = 0; i < categorIdsLength; i++) {
				if(result != '') {
					result += ', ';
				}

				result += categoryList[categorIds[i]]['name'];
			}

			return result;
		});

		Core.addCallback('goodsUnitType', function(unitType, isLong) {
			var unitTypes = Core.var('unitTypes');

			return isLong ? unitTypes[unitType]['long'] : unitTypes[unitType]['short'];
		});
	};

	var _clickableShowAlert = function(dataReturn, dataValue) {
		var goodsList = Core.var('goodsList');
		alert(Core.getMoney(goodsList[dataReturn]['price']) + " so'm")
	};

	var _clickableDeleteBasketItem = function(_this) {
		console.log(_this);
	};
});