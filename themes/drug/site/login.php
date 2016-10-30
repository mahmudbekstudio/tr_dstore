<?php

/* @var $this yii\web\View */
/* @var $form yii\bootstrap\ActiveForm */
/* @var $model app\models\LoginForm */

use yii\helpers\Html;
use yii\bootstrap\ActiveForm;

$this->title = 'Login';
//$this->params['breadcrumbs'][] = $this->title;
$this->params['bodyClass'] = 'gray-bg';

if(!isset($this->params['cssFiles'])) {
    $this->params['cssFiles'] = array();
}
$this->params['cssFiles'][] = 'css/view/login.css';

if(!isset($this->params['jsFiles'])) {
    $this->params['jsFiles'] = array();
}
$this->params['jsFiles'][] = 'js/view/login.js';
?>
    <div class="middle-box text-center loginscreen container">
        <div>
            <?php $form = ActiveForm::begin([
                'id' => 'login-form',
                'fieldConfig' => [
                    'template' => "{input}",
                ],
            ]); ?>
            <div class="row keyboard-inp">
                <?= $form->field($model, 'password')->hiddenInput(); ?>
                <div class="col-md-3"><div class="keybaord-inp-item"><i class="fa fa-circle-o" aria-hidden="true"></i></div></div>
                <div class="col-md-3"><div class="keybaord-inp-item"><i class="fa fa-circle-o" aria-hidden="true"></i></div></div>
                <div class="col-md-3"><div class="keybaord-inp-item"><i class="fa fa-circle-o" aria-hidden="true"></i></div></div>
                <div class="col-md-3"><div class="keybaord-inp-item"><i class="fa fa-circle-o" aria-hidden="true"></i></div></div>
            </div>
            <div class="row keyboard-btn">
                <div class="col-md-4"><button type="button" class="keybaord-btn-item btn btn-info  dim btn-large-dim btn-outline" data-val="1">1</button></div>
                <div class="col-md-4"><button type="button" class="keybaord-btn-item btn btn-info  dim btn-large-dim btn-outline" data-val="2">2</button></div>
                <div class="col-md-4"><button type="button" class="keybaord-btn-item btn btn-info  dim btn-large-dim btn-outline" data-val="3">3</button></div>
                <div class="col-md-4"><button type="button" class="keybaord-btn-item btn btn-info  dim btn-large-dim btn-outline" data-val="4">4</button></div>
                <div class="col-md-4"><button type="button" class="keybaord-btn-item btn btn-info  dim btn-large-dim btn-outline" data-val="5">5</button></div>
                <div class="col-md-4"><button type="button" class="keybaord-btn-item btn btn-info  dim btn-large-dim btn-outline" data-val="6">6</button></div>
                <div class="col-md-4"><button type="button" class="keybaord-btn-item btn btn-info  dim btn-large-dim btn-outline" data-val="7">7</button></div>
                <div class="col-md-4"><button type="button" class="keybaord-btn-item btn btn-info  dim btn-large-dim btn-outline" data-val="8">8</button></div>
                <div class="col-md-4"><button type="button" class="keybaord-btn-item btn btn-info  dim btn-large-dim btn-outline" data-val="9">9</button></div>
                <div class="col-md-4"><button type="button" class="keybaord-btn-item btn btn-info  dim btn-large-dim btn-outline" data-val="0">0</button></div>
                <div class="col-md-4"><button disabled="disabled" type="button" class="keybaord-btn-item btn btn-danger  dim btn-large-dim" data-val="del"><i class="fa fa-long-arrow-left" aria-hidden="true"></i></button></div>
                <div class="col-md-4"><?= Html::submitButton('<i class="fa fa-sign-in" aria-hidden="true"></i>', ['disabled' => 'disabled', 'class' => 'keybaord-btn-item btn btn-primary  dim btn-large-dim', 'data-val' => 'login', 'name' => 'login-button']) ?></div>
            </div>
            <?php ActiveForm::end(); ?>
            <p class="text-center"><a href="#" class="exit-system">Exit</a></p>
        </div>
    </div>