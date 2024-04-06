const gulp = require('gulp');
const babel = require('gulp-babel');
const ts = require('gulp-typescript');
const through = require('through2');
const tsconfig = require('./tsconfig.json');

const distDir = 'dist';
const srcDir = `./src`;

// const banner = `/*
// * ${filename}.js v${packageJson.version}
// * (c) ${new Date().getFullYear()} ${packageJson.author}
// * Released under the MIT License.
// */`;

// function buildStyle() {
//   return gulp
//     .src([`${srcDir}/**/*.scss`], {
//       base: srcDir,
//       ignore: ['**/demos/**/*', '**/tests/**/*'],
//     })
//     .pipe(sass().on('error', sass.logError))
//     .pipe(
//       postcss([
//         autoprefixer({
//           overrideBrowserslist: 'iOS >= 10, Chrome >= 49',
//         }),
//       ]),
//     )
//     .pipe(gulp.dest(`./${distDir}/es`))
//     .pipe(gulp.dest(`./${distDir}/cjs`));
// }

// function copyAssets() {
//   return gulp
//     .src(`${srcDir}/assets/**/*`)
//     .pipe(gulp.dest(`${distDir}/assets`))
//     .pipe(gulp.dest(`${distDir}/es/assets`))
//     .pipe(gulp.dest(`${distDir}/cjs/assets`));
// }

function buildCJS() {
  return gulp
    .src(['lib/es/**/*.js'])
    .pipe(
      babel({
        plugins: ['@babel/plugin-transform-modules-commonjs'],
      }),
    )
    .pipe(gulp.dest(`${distDir}/cjs/`));
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
      }),
    )
    .pipe(gulp.dest(`${distDir}/es/`));
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
    .pipe(gulp.dest(`${distDir}/es/`))
    .pipe(gulp.dest(`${distDir}/cjs/`));
}

function copyMetaFiles() {
  return gulp
    .src(['../../README.md', '../../README_zh-CN.md', '../../LICENSE.txt'], { allowEmpty: true })
    .pipe(gulp.dest(`./${distDir}/`));
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
        parsed.main = './cjs/index.js';
        parsed.module = './es/index.js';
        parsed.types = './es/index.d.ts';

        const stringified = JSON.stringify(parsed, null, 2);

        file.contents = Buffer.from(stringified);
        cb(null, file);
      }),
    )
    .pipe(gulp.dest(`./${distDir}/`));
}

exports.default = gulp.series(
  buildES,
  buildCJS,
  gulp.parallel(buildDeclaration),
  copyMetaFiles,
  generatePackageJSON,
);
