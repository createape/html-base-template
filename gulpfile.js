const { src, dest, watch, series,parallel } = require('gulp');
const ejs = require('gulp-ejs');
const gutil = require('gulp-util');
const image = require('gulp-image');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const browserSync = require('browser-sync').create();
const rename = require("gulp-rename");
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');

////////template engie
function concatHTML(cb) {
  return src('./base/pages/*.ejs')
    .pipe(ejs())
    .pipe(rename(function(path) {
          path.extname = ".html"
      }))
    .pipe(dest('./dist')); 
  cb();
}
// ///////////optimzation if images

function opImages(cb) {
  return src('./base/images/*')
    .pipe(image())
    .pipe(dest('./dist/images'))
    cb();
}

// ///////////optimzation if images


// /////////// CSS

function compSass(cb) {
  return src('./base/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('./dist/css'))
    .pipe(browserSync.reload({
      stream: true
    }));
    cb();
}

function copyCss(cb) {
    src('./base/css/**/*.*')
    .pipe(dest('./dist/css/'));
    cb();
}

function copyFont(cb) {
  src('./base/fonts/**/*.*')
  .pipe(dest('./dist/fonts/'));
  cb();
}



// ///////////CSS


// /////////// JavaScript

function javaScript (cb) {
    return src('./base/js/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(concat('app.js'))
        .pipe(dest('dist/js'));
        cb();
}


function copyJavaScripts (cb) {
    src('./base/script/**/*.*')
    .pipe(dest('./dist/js'));
    cb();
}

// /////////// JavaScript

// /////////// JavaScript

function copyContent(cb) {
    src('./base/content/*')
    .pipe(dest('./dist/content'));
    cb();
}

// /////////// JavaScript

// ///////////browserSync

function browserReload(cb) {
  browserSync.init({
    server: {
      baseDir: './dist'
    },
  })
}

function browserReloadPages(cb) {
  browserSync.reload()
  cb();
}

// ///////////browserSync


function watchAll (){
  watch('./base/pages/**/*.ejs', series(concatHTML,browserReloadPages));
  watch('./base/images/*', series(opImages,browserReloadPages));
  watch('./base/sass/**/*.scss', series(compSass,browserReloadPages));
  watch('./base/css/**/*.*', series(copyCss,browserReloadPages));
  watch('./base/fonts/**/*.*', series(copyFont,browserReloadPages));
  watch('./base/js/*.js', series(javaScript,browserReloadPages));
  watch('./base/script/**/*.*', series(copyJavaScripts,browserReloadPages));
  watch('./base/content/*', series(copyContent,browserReloadPages)); 
  // watch('./dist/*', browserReloadPages);
 
}

exports.default = parallel(concatHTML, opImages, compSass, copyCss, copyFont, javaScript, copyJavaScripts, copyContent, browserReload, watchAll);
