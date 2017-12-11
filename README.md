<h1>HTML/CSS Development</h1>
<ul>
    <li><a href="#gulp-cli">Установка gulp-cli</a></li>
    <li><a href="#dependencies">Подключение зависимостей и сборка</a></li>
    <li><a href="#plugins">Подключение плагинов в gulpfile</a></li>
    <li><a href="#plugins-cdn">Подключение плагинов через cdn</a></li>
    <li><a href="#icon-font">Использование собственных иконочных шрифтов</a></li>
    <li><a href="#recommend">Рекомендации по разработке</a></li>
</ul>

<h4 id="gulp-cli">Установка gulp-cli</h4>
`npm install gulp-cli -g`<br>
_Устанавливается в первый раз глобально!_

<h4 id="dependencies">Подключение зависимостей и сборка</h4>
Установка node-модулей<br>
`npm install`<br>
Сборка билда<br>
`npm build` или `gulp build`<br>
Запуск сборщика<br>
`npm start` или `gulp build & gulp watch`<br>

<h4 id="plugins">Подключение плагинов в gulpfile</h4>
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

<h4 id="plugins-cdn">Подключение плагинов через cdn</h4>
    В файле src/jade/root/layout.jade закомментировать или удалить строчку script(src='js/components.js')<br>
    СSS подключается в head, JS - перед script(src='js/script.js')     

<h4 id="icon-font">Использование собственных иконочных шрифтов</h4>
    

<h4 id="recommend">Рекомендации по разработке</h4>

