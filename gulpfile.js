var gulp = require("gulp");
var sass = require("gulp-dart-sass");
var sourcemaps = require("gulp-sourcemaps");
var browserSync = require("browser-sync").create();

var input = "./src/**/*.scss";
var output = "./css";

var sassOpts = {
  errorLogToConsole: true,
  outputStyle: "expanded",
};

var autoprefixerOpts = {
  browsers: ["last 2 versions"],
};

gulp.task(
  "sass",
  gulp.series(function () {
    return (
      gulp
        .src(input)
        // .pipe(sourcemaps.init())
        .pipe(sass(sassOpts).on("error", sass.logError))
        // .pipe(sourcemaps.write(''))
        .pipe(gulp.dest(output))
    );
  })
);

gulp.task(
  "serve",
  gulp.series("sass", function () {
    browserSync.init({
      injectChanges: true,
      open: true,
      server: {
        baseDir: "./",
      },
    });

    gulp.watch("src/**/*.scss", gulp.series("sass"));
    gulp.watch(["css/*.css", "*.html"]).on("change", browserSync.reload);
  })
);

gulp.task("default", gulp.series("serve"));
