<?php

/* @var $this \yii\web\View */
/* @var $content string */

use yii\helpers\Html;
use yii\bootstrap\Nav;
use yii\bootstrap\NavBar;
use yii\widgets\Breadcrumbs;
use app\assets\AppAsset;

AppAsset::register($this);
?>
<?php $this->beginPage() ?>
<!DOCTYPE html>
<html lang="<?= Yii::$app->language ?>">
<head>
    <meta charset="<?= Yii::$app->charset ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?= Html::csrfMetaTags() ?>
    <title><?= Html::encode($this->title) ?></title>
    <meta name="apple-mobile-web-app-capable" content="yes">
    <?php $this->head() ?>
    <?php
    $css = array(
        //'css/bootstrap.min.css',
        'css/font-awesome.min.css',
        'css/style.css',
    );
    $js = array(
        //'js/jquery-2.1.1.js',
        'js/bootstrap.min.js',
        'js/jquery.cookie.js',
        'js/jquery-code-scanner.js',
        'js/extends.js',
        'js/core.js',
        'js/scripts.js',
    );
    $baseUrl = Yii::$app->urlManager->baseUrl . '/';

    if(isset($this->params['cssFiles'])) {
        foreach($this->params['cssFiles'] as $dist) {
            $css[] = $dist;
        }
    }

    if(isset($this->params['jsFiles'])) {
        foreach($this->params['jsFiles'] as $dist) {
            $js[] = $dist;
        }
    }

    $cssCount = count($css);
    for($i = 0; $i < $cssCount; $i++) {
        echo "<link href=\"" . $baseUrl . $css[$i] . "\" rel=\"stylesheet\">\n";
    }
    ?>
</head>
<body class="<?php echo (isset($this->params['bodyClass']) ? $this->params['bodyClass'] : ''); ?>">
<?php $this->beginBody() ?>
<?= $content ?>

<?php $this->endBody();
$jsCount = count($js);
for($i = 0; $i < $jsCount; $i++) {
    echo "<script src=\"" . $baseUrl . $js[$i] . "\"></script>\n";
}

if(isset($this->params['scripts'])) {
    foreach($this->params['scripts'] as $comment => $script) {
        echo "\n<script>\n";
        echo "(function($) {\n";
        echo '// ' . $comment . "\n";
        echo $script . "\n";
        echo "})(jQuery);\n";
        echo "</script>\n";
    }
}
?>
</body>
</html>
<?php $this->endPage() ?>
