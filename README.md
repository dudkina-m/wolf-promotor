<h1>HTML/CSS Development</h1>

Шаблонизатор и html-препроцессор: pug<br>
Препроцессор CSS: scss

Описание структуры папки src:<br>
-css (reset.css - сброс всех стилей)<br>
-font (хранятся внешние и иконочные шрифты)<br>
-img (картинки, в папке icons - иконки для шрифтов)<br>
-js(global.js - интерактив и )

<h4>Установка gulp-cli</h4>
`npm install gulp-cli -g`<br>
_Устанавливается только один раз глобально!_

<h4>Подключение зависимостей и сборка</h4>
Установка node-модулей<br>
`npm install`<br>
Сборка билда<br>
`npm build` или `gulp build`<br>
Запуск сборщика<br>
`npm start` или `gulp build & gulp watch`<br>

<h4>Подключение плагинов в gulpfile</h4>
Шаг 1. Находим нужный плагин и устанавливаем его с помощью npm<br>
`npm install {plugin-name} --save`<br>
Шаг 2. Переходим в gulpfile.js<br>
Шаг 3. Находим таски build-css и build-js<br>
Если для плагина отсутствует необходимость подключения css - таск build-css пропускаем!<br>
В таске build-css и/или build-js добавляем строку вида<br> 
   `${nodeModulesDirectory}{plugin-name}/{plugin-name}.min.js/css`<br>
   где ${nodeModulesDirectory} - папка node-modules/<br>
       {plugin-name} - папка с необходимым плагином в node-modules<br>
       {plugin-name}.min.js/css - путь к сss/js файлам плагина<br>
Пример строки закомментирован в тасках.

<h4>Подключение плагинов через cdn</h4>
    В файле src/pug/root/layout.pug закомментировать или удалить строчку script(src='js/components.js')<br>
    СSS подключается в head, JS - перед script(src='js/script.js')     

<h4>Использование собственных иконочных шрифтов</h4>
    Иконки для иконочных шрифтов забрасывать в папку src/img/icons <br>
    Генератор автоматически создаст шрифт, который подключен в файле src/scss/fonts.scss<br>
    Используется как и любой иконочный шрифт (на нужный тег навешивается класс с иконкой).<br>
    Классы можно посмотреть в файле src/scss/icons/icon-codes.scss

<h4>Рекомендации по разработке</h4>
   <ol>
        <li>После первой сборки необходимо в папке dist создать папки img и font</li>
        <li>Иконки для шрифтов лучше искать на flaticon в формате svg, а не брать из макетов (дизайнер тоже их не сам рисует в большинстве случаев :D)</li>
        <li>Все относительные пути к картинкам строятся относительно файла dist/index.html</li>
        <li>Стараться не навешивать стили на html-теги, создавать классы по необходимости</li>
   </ol>

