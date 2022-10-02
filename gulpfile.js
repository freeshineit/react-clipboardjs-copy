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
const packageJson = require('./package.json');

function clean() {
  return del(['./lib/**', './docs/**', './dist/**']);
}

const srcDir = `./src/lib`;

const packageName = packageJson.name.split('/');
const filename =
  packageName.length > 1 ? packageName[packageName.length - 1] : packageName[0];

// 驼峰
const libraryName = filename.replace(/\-(\w)/g, function (all, letter) {
  return letter.toUpperCase();
});

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

function getViteConfigForPackage({ env, formats, external }) {
  const name = filename;
  const isProd = env === 'production';
  // https://github.com/vitejs/vite/blob/main/packages/vite/src/node/config.ts
  return {
    root: process.cwd(),
    mode: env,
    logLevel: 'silent',
    define: { 'process.env.NODE_ENV': `"${env}"` },
    // Set to `false` or an empty string to disable copied static assets to build dist dir.
    publicDir: false,
    build: {
      lib: {
        name: libraryName,
        entry: './lib/es/index.js',
        formats,
        fileName: format => `${name}.${format}${isProd ? '' : `.${env}`}.js`,
      },
      rollupOptions: {
        external,
        output: {
          dir: './lib/bundle',
          // exports: 'named',
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
          },
        },
      },
      minify: isProd ? 'esbuild' : false,
    },
  };
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
