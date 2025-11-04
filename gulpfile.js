const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const replace = require('gulp-replace');
const connect = require('gulp-connect');

// Пути к файлам
const paths = {
  src: {
    html: 'src/*.html',
    scss: 'src/**/*.scss',
    js: 'src/**/*.js',
    images: 'src/images/**/*',
    fonts: 'src/fonts/**/*'
  },
  dist: {
    base: 'dist/',
    css: 'dist/css/',
    js: 'dist/js/',
    images: 'dist/images/',
    fonts: 'dist/fonts/'
  }
};

// Компиляция SCSS в CSS
function styles() {
  return gulp.src(paths.src.scss)
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest(paths.dist.css))
    .pipe(connect.reload());
}

// Обработка JavaScript
function scripts() {
  return gulp.src(paths.src.js)
    .pipe(concat('script.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.dist.js))
    .pipe(connect.reload());
}

// Копирование HTML
function html() {
  return gulp.src(paths.src.html)
    .pipe(replace(
      '<script src="https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.js"></script>',
      '<script src="./js/vue.min.js"></script>'
    ))
    .pipe(replace(
      '<script src="https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js"></script>',
      '<script src="./js/jquery.slim.min.js"></script>'
    ))
    .pipe(replace(
      '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css">',
      '<link rel="stylesheet" href="./css/bootstrap.min.css">'
    ))
    .pipe(replace(
      '<link rel="stylesheet" href="https://unpkg.com/bootstrap-vue@2.0.0-rc.11/dist/bootstrap-vue.css">',
      '<link rel="stylesheet" href="./css/bootstrap-vue.min.css">'
    ))
    .pipe(replace(
      '<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js"></script>',
      '<script src="./js/bootstrap.bundle.min.js"></script>'
    ))
    .pipe(replace(
      '<script src="https://unpkg.com/bootstrap-vue@2.0.0-rc.11/dist/bootstrap-vue.min.js"></script>',
      '<script src="./js/bootstrap-vue.min.js"></script>'
    ))
    .pipe(replace(
      '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css">',
      '<link rel="stylesheet" href="./css/animate.min.css">'
    ))
    .pipe(replace(
      '<link rel="stylesheet" href="style.css">',
      '<link rel="stylesheet" href="./css/style.min.css">'
    ))
    .pipe(replace(
      '<script src="script.js"></script>',
      '<script src="./js/script.min.js"></script>'
    ))
    .pipe(replace(
      'src="images/',
      'src="./images/'
    ))
    .pipe(gulp.dest(paths.dist.base))
    .pipe(connect.reload());
}

// Копирование изображений
function images() {
  return gulp.src(paths.src.images)
    .pipe(gulp.dest(paths.dist.images))
    .pipe(connect.reload());
}

// Копирование шрифтов
function fonts() {
  return gulp.src(paths.src.fonts)
    .pipe(gulp.dest(paths.dist.fonts))
    .pipe(connect.reload());
}

// Копирование библиотек из node_modules
function libs() {
  // Vue.js
  gulp.src('node_modules/vue/dist/vue.min.js')
    .pipe(rename('vue.min.js'))
    .pipe(gulp.dest(paths.dist.js));

  // jQuery
  gulp.src('node_modules/jquery/dist/jquery.slim.min.js')
    .pipe(rename('jquery.slim.min.js'))
    .pipe(gulp.dest(paths.dist.js));

  // Bootstrap CSS
  gulp.src('node_modules/bootstrap/dist/css/bootstrap.min.css')
    .pipe(gulp.dest(paths.dist.css));

  // Bootstrap JS
  gulp.src('node_modules/bootstrap/dist/js/bootstrap.bundle.min.js')
    .pipe(gulp.dest(paths.dist.js));

  // BootstrapVue CSS
  gulp.src('node_modules/bootstrap-vue/dist/bootstrap-vue.min.css')
    .pipe(gulp.dest(paths.dist.css));

  // BootstrapVue JS
  gulp.src('node_modules/bootstrap-vue/dist/bootstrap-vue.min.js')
    .pipe(gulp.dest(paths.dist.js));

  // Animate.css
  gulp.src('node_modules/animate.css/animate.min.css')
    .pipe(gulp.dest(paths.dist.css));

  return gulp.src('package.json').pipe(gulp.dest(paths.dist.base));
}

// Локальный сервер для разработки
function server() {
  connect.server({
    root: paths.dist.base,
    livereload: true,
    port: 8080
  });
}

// Наблюдение за изменениями файлов
function watch() {
  gulp.watch(paths.src.scss, styles);
  gulp.watch(paths.src.js, scripts);
  gulp.watch(paths.src.html, html);
  gulp.watch(paths.src.images, images);
  gulp.watch(paths.src.fonts, fonts);
}

// Основные задачи
const build = gulp.series(libs, gulp.parallel(styles, scripts, html, images, fonts));
const dev = gulp.series(build, gulp.parallel(server, watch));

// Экспорт задач
exports.styles = styles;
exports.scripts = scripts;
exports.html = html;
exports.images = images;
exports.fonts = fonts;
exports.libs = libs;
exports.build = build;
exports.serve = dev;
exports.default = dev;