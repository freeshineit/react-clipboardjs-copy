const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
// const path = require("path");
const postcss = require('gulp-postcss');
const babel = require('gulp-babel');
const ts = require('gulp-typescript');
const del = require('del');
const through = require('through2');
const autoprefixer = require('autoprefixer');
const tsconfig = require('./tsconfig.json');

function clean() {
  return del(['./lib/**', './docs/**', './dist/**']);
}

const srcDir = `./src/lib`;

// const banner = `/*
// * ${filename}.js v${packageJson.version}
// * (c) ${new Date().getFullYear()} ${packageJson.author}
// * Released under the MIT License.
// */`;

function buildStyle() {
  return gulp
    .src([`${srcDir}/**/*.scss`], {
      base: srcDir,
      ignore: ['**/demos/**/*', '**/tests/**/*'],
    })
    .pipe(sass().on('error', sass.logError))
    .pipe(
      postcss([
        autoprefixer({
          overrideBrowserslist: 'iOS >= 10, Chrome >= 49',
        }),
      ])
    )
    .pipe(gulp.dest('./lib/es'))
    .pipe(gulp.dest('./lib/cjs'));
}

function copyAssets() {
  return gulp
    .src(`${srcDir}/assets/**/*`)
    .pipe(gulp.dest('lib/assets'))
    .pipe(gulp.dest('lib/es/assets'))
    .pipe(gulp.dest('lib/cjs/assets'));
}

function buildCJS() {
  return gulp
    .src(['lib/es/**/*.js'])
    .pipe(
      babel({
        plugins: ['@babel/plugin-transform-modules-commonjs'],
      })
    )
    .pipe(gulp.dest('lib/cjs/'));
}

function buildES() {
  const tsProject = ts({
    ...tsconfig.compilerOptions,
    module: 'ES6',
    isolatedModules: false,
  });
  return gulp
    .src([`${srcDir}/**/*.{ts,tsx}`], {
      ignore: ['**/demos/**/*', '**/tests/**/*'],
    })
    .pipe(tsProject)
    .pipe(
      babel({
        plugins: [],
      })
    )
    .pipe(gulp.dest('lib/es/'));
}

function buildDeclaration() {
  const tsProject = ts({
    ...tsconfig.compilerOptions,
    module: 'ES6',
    isolatedModules: false,
    declaration: true,
    emitDeclarationOnly: true,
  });
  return gulp
    .src([`${srcDir}/**/*.{ts,tsx}`], {
      ignore: ['**/demos/**/*', '**/tests/**/*'],
    })
    .pipe(tsProject)
    .pipe(gulp.dest('lib/es/'))
    .pipe(gulp.dest('lib/cjs/'));
}

function copyMetaFiles() {
  return gulp
    .src(['./README.md', 'README_zh-CN.md', './LICENSE.txt'])
    .pipe(gulp.dest('./lib/'));
}

function generatePackageJSON() {
  return gulp
    .src('./package.json')
    .pipe(
      through.obj((file, enc, cb) => {
        const rawJSON = file.contents.toString();
        const parsed = JSON.parse(rawJSON);
        delete parsed.scripts;
        delete parsed.devDependencies;
        delete parsed.publishConfig;
        delete parsed.files;
        delete parsed.resolutions;
        delete parsed.packageManager;
        const stringified = JSON.stringify(parsed, null, 2);
        file.contents = Buffer.from(stringified);
        cb(null, file);
      })
    )
    .pipe(gulp.dest('./lib/'));
}

exports.default = gulp.series(
  clean,
  buildES,
  buildCJS,
  gulp.parallel(buildDeclaration, buildStyle),
  copyAssets,
  copyMetaFiles,
  generatePackageJSON
);
