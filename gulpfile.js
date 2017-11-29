const gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    browserSync = require('browser-sync').create(),

    cssConfig = require('./config/csscomb.json'),
    htmlConfig = require('./config/htmlhint.json'),
    beautifierConfigPath = './config/beautifier.json',
    plugins = require('./config/plugins.json'),

    csscomb = require('csscomb')(cssConfig),

    sourceDirectory = 'src/',
    buildDirectory = 'dist/',
    nodeModulesDirectory = 'node_modules/';


const getPluginsPaths = (type) => {
    const pluginNames = Object.keys(plugins[type]);
    if (!pluginNames.length) return [];
    return pluginNames.map(key => nodeModulesDirectory + plugins[type][key]);
};


gulp.task('build-jade', () => {
    return gulp.src(`${sourceDirectory}jade/*.jade`)
        .pipe($.plumber())
        .pipe($.jade({ pretty: true }))
        .pipe(gulp.dest(buildDirectory));
});

gulp.task('build-css', () => {
    gulp.src([
        `${sourceDirectory}css/reset.css`,
        // `${nodeModulesDirectory}bootstrap/dist/css/bootstrap.min.css`,
    ]
    .concat(getPluginsPaths('css')))
    .pipe($.plumber())
    .pipe($.concat('components.css'))
    .pipe($.cssnano())
    .pipe(gulp.dest(`${buildDirectory}css`));

    return gulp.src([`${sourceDirectory}scss/*.scss`,
        `${sourceDirectory}scss/icons/*.scss`,
        `${sourceDirectory}scss/components/**/*.scss`])
        .pipe($.plumber())
        .pipe($.sass())
        .pipe($.autoprefixer({
            browsers: ['last 3 versions', '> 1%'],
            cascade: false
        }))
        .pipe($.concat('style.css'))
        .pipe(gulp.dest(`${buildDirectory}css`));
});

gulp.task('build-js', () => {
    return gulp.src([`${sourceDirectory}js/*.js`,
        `${sourceDirectory}js/helpers/*.js`,
        `${sourceDirectory}js/components/general/*.js`,
        `${sourceDirectory}js/components/*.js`,
        // `${nodeModulesDirectory}easy-autocomplete/dist/jquery.easy-autocomplete.min.js`
    ])
        .pipe($.plumber())
        .pipe($.concat('script.js'))
        .pipe(gulp.dest(`${buildDirectory}js`));
});

gulp.task('build-plugins-js', () => {
    return gulp.src(getPluginsPaths('js'))
        .pipe($.plumber())
        .pipe($.concat('components.js'))
        .pipe($.uglify())
        .pipe(gulp.dest(`${buildDirectory}js`));
});

gulp.task('copy-img', () => {
    return gulp.src([`${sourceDirectory}img/*.{jpg,jpeg,png,svg,gif,ico}`]
        .concat(getPluginsPaths('img')))
        .pipe(gulp.dest(`${buildDirectory}img`));
});

gulp.task('copy-fonts', () => {
    return gulp.src([`${sourceDirectory}font/*.{ttf,eot,woff,woff2,svg}`]
        .concat(getPluginsPaths('font')))
        .pipe(gulp.dest(`${buildDirectory}font`));
});

gulp.task('icon-font', () => {
    const fs = require('fs');
    const path = `${sourceDirectory}scss/icons/icon-codes.scss`;
    let iconsContent = '';

    fs.writeFileSync(path, iconsContent);

    return gulp.src(`${sourceDirectory}img/icons/*.svg`)
        .pipe($.iconfont({
            fontName: 'icons',
            prependUnicode: true,
            formats: ['ttf', 'eot', 'woff', 'woff2', 'svg'],
            timestamp: Math.round(Date.now() / 1000),
            normalize: true
        }))
        .on('glyphs', glyphs => {
            for (let glyph of glyphs) {
                iconsContent += `.icon_${glyph.name}:before { content: '\\${glyph.unicode[0].charCodeAt(0).toString(16).toUpperCase()}'; }\n`;
            }

            fs.writeFileSync(path, iconsContent);
        })
        .pipe(gulp.dest(`${sourceDirectory}font`));
});

gulp.task('prettify', gulp.series(
    function csscmb() {
        csscomb.processDirectory(`${sourceDirectory}scss`);
        return csscomb.processPath(`${buildDirectory}css/style.css`);
    },

    function groupmq() {
        return gulp.src(`${buildDirectory}css/style.css`)
            .pipe($.groupCssMediaQueries())
            .pipe(gulp.dest(`${buildDirectory}css`))
    },

    function beautify() {
        return gulp.src([`${buildDirectory}*.html`,
            `${buildDirectory}js/script.js`])
            .pipe($.jsbeautifier({
                config: beautifierConfigPath,
                mode: 'VERIFY_AND_WRITE'
            }))
            .pipe($.rename(path => {
                path.dirname = (path.extname === '.js') ? `${path.dirname}/js` : path.dirname;
        path.dirname = (path.extname === '.css') ? `${path.dirname}/css` : path.dirname;
    }))
    .pipe(gulp.dest(buildDirectory));
    }
));

gulp.task('check-code', () => {
    return gulp.src(`${buildDirectory}*.html`)
        .pipe($.htmlhint(htmlConfig))
        .pipe($.htmlhint.reporter());
});

gulp.task('watch', () => {
    browserSync.init({
        port: process.env.PORT || 3000,
        server: {
            baseDir: buildDirectory
        }
    });
    gulp.watch(`${sourceDirectory}jade/**/*.jade`, gulp.parallel('build-jade'));
    gulp.watch(`${sourceDirectory}scss/**/*.scss`, gulp.parallel('build-css'));
    gulp.watch(`${sourceDirectory}js/**/*.js`, gulp.parallel('build-js'));
    gulp.watch(`${sourceDirectory}img/*.*`, gulp.parallel('copy-img'));
    gulp.watch(`${sourceDirectory}img/icons/*.svg`, gulp.series('icon-font', 'copy-fonts', 'build-css'));
    gulp.watch(`${sourceDirectory}font/**`, gulp.parallel('copy-fonts'));
    gulp.watch(`${buildDirectory}*.html`).on('change', browserSync.reload);
    gulp.watch(`${buildDirectory}css/*.css`).on('change', browserSync.reload);
    gulp.watch(`${buildDirectory}js/*.js`).on('change', browserSync.reload);
});

gulp.task('build', gulp.series(
    gulp.parallel('build-jade', 'copy-fonts', 'build-plugins-js', 'build-js', 'build-js', 'copy-img'),
    gulp.series('icon-font', 'build-css'),
    gulp.parallel('prettify'),
    gulp.parallel('check-code')
));

gulp.task('default', gulp.parallel('build'));
