<?php

/* @var $this yii\web\View */

use yii\helpers\Url;

$this->title = 'Dashboard';
$this->params['bodyClass'] = 'dashboard';

if(!isset($this->params['cssFiles'])) {
	$this->params['cssFiles'] = array();
}
$this->params['cssFiles'][] = 'css/view/index.css';
$this->params['cssFiles'][] = 'css/custom-table.css';
$this->params['cssFiles'][] = 'js/plugin/fancybox/jquery.fancybox.css';

if(!isset($this->params['jsFiles'])) {
	$this->params['jsFiles'] = array();
}
$this->params['jsFiles'][] = 'js/view/index.js';
$this->params['jsFiles'][] = 'js/view/index-search.js';
$this->params['jsFiles'][] = 'js/view/index-basket.js';
$this->params['jsFiles'][] = 'js/plugin/fancybox/jquery.fancybox.pack.js';

$categoryArr = array();
foreach($categoryList as $key => $val) {
	$valArr = array();
	foreach($val as $subKey => $subVal) {
		$valArr[$subKey] = $subVal;
	}
	$categoryArr[$key] = $valArr;
}

if(!isset($this->params['scripts'])) {
	$this->params['scripts'] = array();
}

$this->params['scripts']['Category List'] = "Core.var('categoryList', " . json_encode($categoryArr) . ");";
$this->params['scripts']['Goods List'] = "Core.var('goodsList', " . json_encode($goodsList) . ");";
$this->params['scripts']['Goods Types'] = "Core.var('unitTypes', " . json_encode(\Yii::$app->params['unit_type_list']) . ");";

?>
<div class="container">
	<div class="row row-top">
		<div class="col-sm-3"></div>
		<div class="col-sm-3"></div>
		<div class="col-sm-3"></div>
		<div class="col-sm-3">
			<ul class="nav nav-pills navbar-left">
				<li>
                        <a href="#"><?php
	                        $user = Yii::$app->user->getIdentity();
	                        echo $user->firstname . ' ' . $user->lastname;
	                        ?> </a>
				</li>
				<li>
					<a href="<?php echo Url::to('site/logout') ?>">
						<i class="fa fa-sign-out"></i> Выйти
					</a>
				</li>
			</ul>
		</div>
	</div>
	<div class="row row-search">
		<div class="col-sm-12">
			<form class="form-inline search-form">
				<div class="form-group">
					<div class="input-group">
						<div class="input-group-addon search-ico"><i class="fa fa-search" aria-hidden="true"></i></div>
						<input type="text" class="form-control search-product-input" placeholder="Search...">
						<div class="search-products-result hidden">
							<div class="search-products-result-info text-center">
								<div class="search-products-result-info-not-found bg-danger hidden">По запросу ничего не найдено</div>
								<div class="search-products-result-info-found bg-success hidden">Найдено "<span class="search-products-result-info-found-count"></span>" продуктов</div>
							</div>
							<div class="search-products-result-list">
								<div class="search-products-result-item-example clickable" data-callback="clickSearchItem">
									<div class="search-products-result-image"><img class="img-responsive" src="<?php echo Yii::$app->urlManager->baseUrl; ?>/img/no-image.png"></div>
									<div class="search-products-result-price"><span class="search-products-result-price-value">154.00</span><span class="hidden-xs"> so'm</span></div>
									<div class="search-products-result-name">
									<span class="search-products-result-name-title">
										<strong class="search-products-result-name-title-name">Tabletka</strong>
										(<span class="search-products-result-name-title-unit">15</span>
										<span class="search-products-result-name-title-unit-type">шт.</span>,
										<span class="search-products-result-name-title-weight">25</span>
										<span class="search-products-result-name-title-weight-type">мг</span>,
										ш:<span class="search-products-result-name-title-code">987654321</span>)
									</span>
										<span class="search-products-result-name-info">
											<span class="search-products-result-name-title-category">Аэрозоль</span>,
											с. <span class="search-products-result-name-title-country">Ангола</span>,
											пр. "<span class="search-products-result-name-title-manufacture">Авиценна,ТПФ</span>"
										</span>
									</div>
								</div>
							</div>
						</div>
						<div class="input-group-addon category-list">
							<select class="form-control category-list-select">
								<option value="">By All Categories</option>
							</select>
						</div>
					</div>
				</div>
			</form>
		</div>
	</div>
	<div class="row row-info">
		<div class="col-sm-12">
			<p class="actions-info">&nbsp;</p>
		</div>
	</div>
	<div class="row row-products">
		<div class="col-sm-12 products-container">
			<ul class="nav nav-tabs products-tabs">
				<li role="presentation" class="products-tab-header active"><a class="products-tab-header-link" href="#basket">Корзина</a></li>
				<li role="presentation" class="products-tab-header"><a class="products-tab-header-link" href="#sales">Продажи (<span class="all-baskets-count">0</span> x <i class="fa fa-refresh fa-1x fa-fw"></i>)</a></li>
				<li role="presentation" class="products-tab-header"><a class="products-tab-header-link" href="#products">Продукты</a></li>
			</ul>
			<div class="products-tabs-content">
				<div class="products-tab-item" id="basket">
					<div class="basket-tab-content container-fluid">
						<div class="custom-table row">
							<div class="custom-table-header col-xm-12">
								<div class="row custom-table-row">
									<div class="col-sm-6 col-xs-4 custom-table-th">Название</div>
									<div class="col-sm-1 col-xs-2 custom-table-th">Кол.</div>
									<div class="col-sm-2 col-xs-2 custom-table-th">Цена</div>
									<div class="col-sm-2 col-xs-2 custom-table-th">Сумма</div>
									<div class="col-sm-1 col-xs-2 custom-table-th">Уд.</div>
								</div>
							</div>
							<div class="custom-table-body col-xm-12 basket-list">
								<div class="row custom-table-row basket-row-item-example" data-id="">
									<div class="col-sm-6 col-xs-4 custom-table-td basket-column-name clickable" data-callback="showInfoPopup" data-return="alert($(_this).closest('.custom-table-row').attr('data-id'));" data-value="name">
										<div class="basket-column-name-title">
											<strong class="basket-column-name-title-name"></strong>
											(<span class="basket-column-name-title-unit"></span>
											<span class="basket-column-name-title-unit-type"></span>,
											<span class="basket-column-name-title-weight"></span>
											<span class="basket-column-name-title-weight-type"></span>,
											ш:<span class="basket-column-name-title-code"></span>)
										</div>
										<div class="basket-column-name-info">
											<span class="basket-column-name-title-category"></span>,
											с. <span class="basket-column-name-title-country"></span>,
											пр. "<span class="basket-column-name-title-manufacture"></span>"
										</div>
									</div>
									<div class="col-sm-1 col-xs-2 custom-table-td basket-column-count clickable" data-callback="showChangeCountPopup" data-value="count">
										<span class="value"></span> <span class="hidden-xs unit-type"></span>
									</div>
									<div class="col-sm-2 col-xs-2 custom-table-td basket-column-price clickable" data-callback="showAlert" data-return="return $(_this).closest('.custom-table-row').attr('data-id')" data-value="price">
										<span class="value"></span> <span class="hidden-xs currency">so'm</span>
									</div>
									<div class="col-sm-2 col-xs-2 custom-table-td basket-column-total-price clickable" data-callback="alert" data-value="total_price">
										<span class="value"></span> <span class="hidden-xs currency">so'm</span>
									</div>
									<div class="col-sm-1 col-xs-2 custom-table-td">
										<button class="btn btn-sm btn-danger clickable" data-callback="deleteBasketItem"><i class="fa fa-lg fa-trash" aria-hidden="true"></i></button>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="products-buttons">
						<div class="row">
							<div class="col-xs-2">
								<button class="btn btn-lg btn-danger"><i class="fa fa-lg fa-trash" aria-hidden="true"></i><span class="hidden-sm hidden-xs"> Clear</span></button>
							</div>
							<div class="col-xs-5 text-right">
								<span class="total-price-container">
									<span class="total-price-title hidden-xs hidden-sm">Total: </span>
									<span class="total-price-value">0.00</span>
									<span class="total-price-type">so'm</span>
								</span>
							</div>
							<div class="col-xs-5 text-right text-nowrap">
								<button class="btn btn-lg btn-success check-checked"><i class="fa fa-lg fa-check-square-o" aria-hidden="true"></i><span class="hidden-sm hidden-xs"> Check</span></button>
								<button class="btn btn-lg btn-primary"><i class="fa fa-lg fa-money" aria-hidden="true"></i><span class="hidden-sm hidden-xs"> Send</span></button>
							</div>
						</div>
					</div>
				</div>
				<div class="products-tab-item hidden" id="sales">
					Tab2
				</div>
				<div class="products-tab-item hidden" id="products">
					Products
				</div>
			</div>
		</div>
	</div>
</div>