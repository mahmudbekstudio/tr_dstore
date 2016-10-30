Core.extend('index', function($, Core) {
	var _self = this;

	var _customTable;
	var _customTableHeader;

	_self.init = function() {
		_checkCheckedStatusChange($('.check-checked'));
		$('.products-tab-header.active').find('.products-tab-header-link').trigger('click');

		_setVars();
		_resizeProductsContainerInit();
		_buttonsResize(true);
		_handleEvents();
		_resizeSearchResult();
		_callbacks();
	};

	var _setVars = function() {
		_customTable = $('.custom-table');
		_customTableHeader = $('.custom-table-header');
	};

	var _handleEvents = function() {
		$(window).on('resize', _resizeWindow);

		$('.products-container')
			.on('click', '.products-tab-header-link', _clickProductsTabHeaderLink)
			.on('click', '.check-checked', _clickCheckChecked);
		_customTable.on('scroll', _scrollCustomTable);
	};

	var _resizeWindow = function() {
		_buttonsResize();
		_resizeProductsContainer();
		_resizeSearchResult();
	};

	var _clickProductsTabHeaderLink = function() {
		var link = $(this);
		var tabContent = $(link.attr('href'));

		link.closest('.products-tabs').find('.products-tab-header.active').removeClass('active');
		link.closest('.products-tab-header').addClass('active');
		tabContent.siblings('.products-tab-item').addClass('hidden');
		tabContent.removeClass('hidden');

		Core.setSettings('activeTab', tabContent.attr('id'));

		return false;
	};

	var _clickCheckChecked = function() {
		var btn = $(this);
		var checkChecked = Core.getSettings('checkChecked') || 0;

		if(checkChecked) {
			checkChecked = 0;
		} else {
			checkChecked = 1;
		}

		_checkCheckedStatusChange(btn, checkChecked);
		Core.setSettings('checkChecked', checkChecked);

		return false;
	};

	var _resizeProductsContainerInit = function() {
		var rowTop = $('.row-top');
		var rowSearch = $('.row-search');
		var rowInfo = $('.row-info');
		var tabs = $('.products-tabs');

		rowTop.attr('data-height', rowTop.height());
		rowSearch.attr('data-height', rowSearch.height());
		rowInfo.attr('data-height', rowInfo.height());
		tabs.attr('data-height', tabs.height());

		_resizeProductsContainer();
	};

	var _resizeProductsContainer = function() {
		var documentHeight = parseInt($(window).height());
		var productsTabContentHeight = 300;
		var paddingContainer = 50;
		var totalHeight = 0;

		$('.row[data-height]').each(function() {
			totalHeight += parseInt($(this).attr('data-height'));
		});

		if(documentHeight > (productsTabContentHeight + totalHeight + paddingContainer)) {
			productsTabContentHeight = documentHeight - totalHeight - paddingContainer;
		}

		$('.products-tabs-content').css('height', productsTabContentHeight);
	};

	var _buttonsResize = function(init) {
		var buttonsResized = init ? '' : Core.getSettings('buttonsResized') || '';
		var windowWidth = $(window).width();
		if(windowWidth <= 525 && (buttonsResized == 'large' || buttonsResized == '')) {
			Core.setSettings('buttonsResized', 'small');
			_buttonsResizeClasses('small');
		} else if(windowWidth > 525 && (buttonsResized == 'small' || buttonsResized == '')) {
			Core.setSettings('buttonsResized', 'large');
			_buttonsResizeClasses('large');
		}

		var totalPriceType = $('.total-price-type');
		if(windowWidth <= 530 && !totalPriceType.hasClass('hidden')) {
			totalPriceType.addClass('hidden');
		} else if(windowWidth > 530 && totalPriceType.hasClass('hidden')) {
			totalPriceType.removeClass('hidden');
		}
	};

	var _resizeSearchResult = function() {
		$('.search-products-result').width($('.search-product-input').width() + 24);
	};

	var _buttonsResizeClasses = function(size) {
		var productsButtons = $('.products-buttons');

		productsButtons.find('.btn').each(function() {
			var btn = $(this);

			if(size == 'small') {
				btn.removeClass('btn-lg');
			} else if(size == 'large') {
				btn.addClass('btn-lg');
			}
		});

		productsButtons.find('.fa').each(function() {
			var ico = $(this);

			if(size == 'small') {
				ico.removeClass('fa-lg');
			} else if(size == 'large') {
				ico.addClass('fa-lg');
			}
		});
	};

	var _checkCheckedStatusChange = function(btn, checkChecked) {
		if(typeof checkChecked == 'undefined') {
			checkChecked = Core.getSettings('checkChecked') || 0;
		}

		if(!checkChecked) {
			btn
				.removeClass('btn-success')
				.addClass('btn-default')
				.find('.fa')
				.removeClass('fa-check-square-o')
				.addClass('fa-square-o');
		} else {
			btn
				.removeClass('btn-default')
				.addClass('btn-success')
				.find('.fa')
				.removeClass('fa-square-o')
				.addClass('fa-check-square-o');
		}
	};

	var _scrollCustomTable = function() {
		_customTableHeader.css('top', _customTable.scrollTop() + 'px');
	};

	var _callbacks = function() {
		Core.addClickable('clickSearchItem', _clickSearchItem, "return $(_this).attr('data-id')")
	};

	var _clickSearchItem = function(itemId) {
		Core.triggerEvent('clickSearchItem');
		var basket = Core.get('indexBasket');
		basket.add(itemId);
	};
}, 'high');