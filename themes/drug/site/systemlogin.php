<?php
use yii\helpers\Url;

$this->title = 'Login';
$this->params['bodyClass'] = 'gray-bg';

if(!isset($this->params['cssFiles'])) {
	$this->params['cssFiles'] = array();
}
$this->params['cssFiles'][] = 'css/view/systemlogin.css';

if(!isset($this->params['jsFiles'])) {
	$this->params['jsFiles'] = array();
}
$this->params['jsFiles'][] = 'js/view/systemlogin.js';
?>
<div class="container">

	<form class="form-signin" id="systemLoginForm" role="form" action="<?php echo Url::to('site/systemlogin') ?>">
		<h2 class="form-signin-heading">Please sign in</h2>
		<div class="form-group">
			<label for="inputEmail" class="sr-only">Email address</label>
			<input id="inputEmail" type="email" class="form-control system-login-email" placeholder="E-mail" autofocus="" required="">
		</div>
		<div class="form-group">
			<label for="inputPassword" class="sr-only">Password</label>
			<input id="inputPassword" type="password" class="form-control system-login-password" placeholder="Password" required="">
		</div>
		<button class="btn btn-lg btn-primary btn-block system-login-btn" type="submit">Login <i class="fa fa-spinner fa-pulse fa-fw margin-bottom system-login-form-load hidden"></i></button>
	</form>

</div>