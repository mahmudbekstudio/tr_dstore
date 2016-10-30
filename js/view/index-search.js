Core.extend('indexSearch', function($, Core) {
	var _self = this;

	var _searchItem;

	var _searchProductsResult;

	var _searchProductInput;

	var _unitTypes;

	_self.init = function() {
		_setVars();
		_initCategoryList();
		_initSearchItem();
		_handleEvents();
		_callbacks();
	};

	var _setVars = function() {
		_searchProductsResult = $('.search-products-result');
		_searchProductInput = $('.search-product-input');
		_unitTypes = Core.var('unitTypes');
	};

	var _handleEvents = function() {
		/*$('#barcode-scan').codeScanner({
			minEntryChars: 8,
			maxEntryTime: 500,
			onScan: function ($element, code) {
				if(code != '0') {
					$element.val(code).trigger('change');
				}
			}
		});*/
		$(document).on('keyup', _keyupDocument);
		$('.search-form')
			.on('submit', function() {return false;})
			.on('keyup', '.search-product-input', _keyupSearchProductInput)
			.on('change', '.category-list-select', _changeCategoryListSelect);
			//.on('click', '.search-products-result-item', _clickSearchProductsResultItem);

		$('.category-list-select').trigger('change');
	};

	var _initCategoryList = function() {
		var categorySortedList = Core.var('categorySortedList');

		if(typeof categorySortedList === 'undefined') {
			var categoryList = Core.var('categoryList', undefined, true);
			categorySortedList = _sortCategory(categoryList);
			Core.var('categorySortedList', categorySortedList);
		}

		$('.category-list-select').append(_getCategoryOptions(categorySortedList));
	};

	var _getCategoryOptions = function(list, prefix) {
		prefix = prefix || '';
		var result = '';

		for(var val in list) {
			result += '<option value="' + list[val]['id'] + '">' + prefix + list[val]['name'] + '</option>';

			if(list[val]['children'].length) {
				result += _getCategoryOptions(list[val]['children'], prefix + ':: ');
			}
		}

		return result;
	};

	var _sortCategory = function(list, parent_id) {
		parent_id = parent_id || 0;
		var result = [];

		for(var val in list) {
			if(list[val]['parent_id'] == parent_id) {
				list[val]['children'] = _sortCategory(list, list[val]['id']);
				result.push(list[val]);
			}
		}

		return result;
	};

	var _search = function(test) {
		var result = [];
		var goodsList = Core.var('goodsList');
		test = $.trim(test.toLowerCase());

		var selectedCategoryId = Core.var('selectedCategoryId');
		var lastSearchParams = Core.var('lastSearchParams');
		if(lastSearchParams && lastSearchParams.text == test && lastSearchParams.catId == selectedCategoryId) {
			return false;
		}

		Core.var('lastSearchParams', {text: test, catId: selectedCategoryId});

		if(_showSearchResultList(test) && goodsList) {
			for(var id in goodsList) {
				if(!selectedCategoryId || $.inArray(selectedCategoryId, goodsList[id]['category']) > -1) {
					var searchPos = goodsList[id]['name'].toLowerCase().indexOf(test);
					if(searchPos > -1) {
						goodsList[id]['searchPos'] = searchPos;
					} else {
						searchPos = goodsList[id]['code'].indexOf(test);
						if(searchPos > -1) {
							goodsList[id]['searchPos'] = 1000 + searchPos;
						}
					}

					if(searchPos > -1) {
						result.push(goodsList[id]);
					}
				}
			}

			_searchInfo(result.length);
		}

		return result;
	};

	var _showSearchResultList = function(text) {
		return text.length >= 3;
	};

	var _searchInfo = function(resultCount) {
		var notFound = $('.search-products-result-info-not-found');
		var found = $('.search-products-result-info-found');
		if(!resultCount) {
			notFound.removeClass('hidden');
			found.addClass('hidden');
		} else {
			notFound.addClass('hidden');
			found.removeClass('hidden').find('.search-products-result-info-found-count').text(resultCount);
		}
	};

	var _sortSearch = function(test) {
		if(typeof test == 'string') {
			test = _search(test);
		}

		if(test === false) {
			return false;
		}

		return test.sort(function (a, b) {
			if (a.searchPos > b.searchPos) {
				return 1;
			}
			if (a.searchPos < b.searchPos) {
				return -1;
			}
			// a must be equal to b
			return 0;
		});
	};

	var _keyupSearchProductInput = function() {
		var inp = $(this);
		var inpVal = inp.val();
		var searchResult = _sortSearch(inpVal);

		if(searchResult !== false) {
			_renderSearchList(searchResult, inpVal);
		}
	};

	var _renderSearchList = function(list, searchText) {
		var listLength = list.length;
		var searchProductsResultList = $('.search-products-result-list').html('');

		if(listLength) {
			var resultList = $('<div>');
			for(var i = 0; i < listLength; i++) {
				resultList.append(_getSearchItem(list[i], (i == 0)));
			}
			searchProductsResultList.append(resultList);
			_searchProductsResult.removeClass('hidden');
		} else {
			searchProductsResultList.html('');
			if(!_showSearchResultList(searchText)) {
				_searchProductsResult.addClass('hidden');
			} else {
				_searchProductsResult.removeClass('hidden');
			}
		}
	};

	var _getSearchItem = function(item, isFirst) {
		var newItem = _searchItem.clone(true);
		newItem.attr('data-id', item['id']);
		if(item['pic']) {
			newItem.find('.search-products-result-image').find('.img-responsive').attr('src', item['pic']);
		}
		newItem.find('.search-products-result-price-value').text(Core.getMoney(item['price']));
		newItem.find('.search-products-result-name-title-name').text(item['name']);
		newItem.find('.search-products-result-name-title-unit').text(item['unit']);
		newItem.find('.search-products-result-name-title-weight').text(item['meta']['weight'][0]);
		newItem.find('.search-products-result-name-title-weight-type').text(item['meta']['measurement'][0]);
		newItem.find('.search-products-result-name-title-code').text(item['code']);

		newItem.find('.search-products-result-name-title-unit-type').text(_unitTypes[item['unit_type_list'][0]['type']]['short']);

		var categoryList = [];
		var categoryListAll = Core.var('categoryList');
		for(var ind in item['category']) {
			categoryList.push(categoryListAll[item['category'][ind]]['name']);
		}

		newItem.find('.search-products-result-name-title-category').text(categoryList.join(', '));
		newItem.find('.search-products-result-name-title-country').text(item['meta']['country'].join(', '));
		newItem.find('.search-products-result-name-title-manufacture').text(item['meta']['manufacture'].join(', '));

		if(isFirst) {
			newItem.addClass('active');
		}

		return newItem;
	};

	var _changeCategoryListSelect = function() {
		var inp = $(this);
		var inpVal = inp.val();

		Core.var('selectedCategoryId', inpVal);
		_searchProductInput.trigger('keyup');
	};

	var _initSearchItem = function() {
		var example = $('.search-products-result-item-example');
		_searchItem = example.clone(true).removeClass('search-products-result-item-example').addClass('search-products-result-item');
		example.remove();
	};

	var _keyupDocument = function(e) {
		if(!_searchProductsResult.hasClass('hidden') && (e.keyCode == 38 || e.keyCode == 40 || e.keyCode == 13)) {
			var activeItem = _searchProductsResult.find('.search-products-result-item.active');

			if(e.keyCode == 13) {
				activeItem.trigger('click');
			} else {
				var nextItem;

				if(e.keyCode == 38) {//up
					nextItem = activeItem.prev();
				} else {
					nextItem = activeItem.next();
				}

				if(nextItem.length) {
					activeItem.removeClass('active');
					nextItem.addClass('active');
				}
			}
		}
	};

	/*var _clickSearchProductsResultItem = function() {
		var item = $(this);
		var itemId = item.attr('data-id');


		alert(itemId);

		return false;
	};*/

	var _callbacks = function() {
		Core.addEvent('clickSearchItem', _clickSearchItem);
	};

	var _clickSearchItem = function() {
		_searchProductInput.val('').trigger('keyup');
	};
});