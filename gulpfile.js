const gulp = require("gulp");
const replace = require("gulp-replace");
const uglify = require("gulp-uglifycss");

function pageTask() {
  return gulp
    .src("./src/*.html")
    .pipe(
      replace(
        `type="module" src="./scripts/app.js"`,
        `src="./scripts/bundle.js"`
      )
    )
    .pipe(gulp.dest("./dist/"));
}
function imageTask() {
  return gulp.src("./src/assets/**/*").pipe(gulp.dest("./dist/assets/"));
}
function styleTask() {
  return gulp
    .src("./src/styles/style.css")
    .pipe(uglify())
    .pipe(gulp.dest("./dist/styles/"));
}

const taskList = [pageTask, styleTask, imageTask];
const series = gulp.series(taskList);
exports.default = series;
