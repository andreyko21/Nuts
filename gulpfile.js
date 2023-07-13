const gulp = require("gulp");
const less = require("gulp-less");
const stylus = require("gulp-stylus");
const sass = require("gulp-sass")(require("sass"));
const rename = require("gulp-rename");
const cleanCSS = require("gulp-clean-css");
const ts = require("gulp-typescript");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const concat = require("gulp-concat");
const sourcemaps = require("gulp-sourcemaps");
const autoprefixer = require("gulp-autoprefixer");
const imagemin = require("gulp-imagemin");
const htmlmin = require("gulp-htmlmin");
const size = require("gulp-size");
const newer = require("gulp-newer");
const browsersync = require("browser-sync").create();
const fileinclude = require("gulp-file-include");
const webp = require("gulp-webp");
const flatten = require('gulp-flatten');

const paths = {
  favicon: {
    src: 'src/favicons/Favicon.ico',
    dest: 'dist/',
  },
  html: {
    src: ["src/*.html", "src/*.pug"],
    dest: "dist/",
  },
  styles: {
    src: [
      "src/styles/**/*.sass",
      "src/styles/**/*.scss",
      "src/styles/**/*.styl",
      "src/styles/**/*.less",
      "src/styles/**/*.css",
    ],
    dest: "dist/css/",
  },
  scripts: {
    src: [
      "src/scripts/**/*.coffee",
      "src/scripts/**/*.ts",
      "src/scripts/**/*.js",
    ],
    dest: "dist/js/",
  },
  images: {
    src: "src/assets/img/**/**.svg",
    dest: "dist/images/",
  },
  webImg: {
    src: "src/assets/img/**/**.{jpg,png}",
    dest: "dist/images/",
  },
  fonts: {
    src: "src/assets/fonts/**/*.*",
    dest: "dist/fonts/",
  },
};

function favicon() {
  return gulp.src(paths.favicon.src)
    .pipe(gulp.dest(paths.favicon.dest));
}

function html() {
  return gulp
    .src(paths.html.src)
    .pipe(
      fileinclude({
        prefix: "@@",
        basepath: "@file",
      })
    )
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(
      size({
        showFiles: true,
      })
    )
    .pipe(gulp.dest(paths.html.dest))
    .pipe(browsersync.stream());
}

function fonts() {
  return gulp.src(paths.fonts.src).pipe(gulp.dest(paths.fonts.dest));
}

function styles() {
  return gulp
    .src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(
      autoprefixer({
        cascade: false,
      })
    )
    .pipe(
      cleanCSS({
        level: 2,
      })
    )
    
    .pipe(sourcemaps.write("."))
    .pipe(
      size({
        showFiles: true,
      })
    )
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(browsersync.stream());
}

function webpTask() {
  return gulp
    .src(paths.webImg.src)
    .pipe(newer(paths.webImg.dest))
    .pipe(webp())
    .pipe(flatten())
    .pipe(
      size({
        showFiles: true,
      })
    )
    .pipe(gulp.dest(paths.webImg.dest));
}

// Обработка Java Script, Type Script и Coffee Script
function scripts() {
  return (
    gulp
      .src(paths.scripts.src)
      .pipe(sourcemaps.init())
      //.pipe(coffee({bare: true}))
      /*
  .pipe(ts({
    noImplicitAny: true,
    outFile: 'main.min.js'
  }))
  */
      .pipe(
        babel({
          presets: ["@babel/env"],
        })
      )
      .pipe(uglify())
      .pipe(sourcemaps.write("."))
      .pipe(
        size({
          showFiles: true,
        })
      )
      .pipe(gulp.dest(paths.scripts.dest))
      .pipe(browsersync.stream())
  );
}

// Сжатие изображений
function img() {
  return gulp
    .src(paths.images.src)
    .pipe(newer(paths.images.dest))
    .pipe(
      imagemin({
        optimizationLevel: 5,
        progressive: true,
        multipass: true
      })
    )
    .pipe(flatten())
    .pipe(
      size({
        showFiles: true,
      })
    )
    .pipe(gulp.dest(paths.images.dest));
}

// Отслеживание изменений в файлах и запуск лайв сервера
function watch() {
  browsersync.init({
    server: {
      baseDir: "./dist",
    },
  });
  gulp.watch(paths.html.dest).on("change", browsersync.reload);
  gulp.watch("src/**/*.htm").on("change", html);
  gulp.watch(paths.html.src, html);
  gulp.watch(paths.styles.src, styles);
  gulp.watch(paths.scripts.src, scripts);
  gulp.watch(paths.images.src, img);
}

// Таски для ручного запуска с помощью gulp clean, gulp html и т.д.
exports.favicon = favicon;
exports.html = html;
exports.styles = styles;
exports.scripts = scripts;
exports.img = img;
exports.watch = watch;
exports.fonts = fonts;

// Таск, который выполняется по команде gulp
exports.default = gulp.series(
  html,
  gulp.parallel(styles, scripts, img, fonts, webpTask, favicon),
  watch
);
