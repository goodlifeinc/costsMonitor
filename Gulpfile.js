var gulp = require('gulp'),
    gp_concat = require('gulp-concat'),
    gp_rename = require('gulp-rename'),
    gp_uglify = require('gulp-uglify'),
    gp_sourcemaps = require('gulp-sourcemaps');

gulp.task('browserify', function () {

    var files = [
        './node_modules/angular/angular.js',
        './node_modules/angular-animate/angular-animate.js',
        './node_modules/angular-aria/angular-aria.js',
        './node_modules/angular-material/angular-material.js',
        './front/src/**/**.js'
    ];

    return gulp.src(files)
        .pipe(gp_sourcemaps.init())
        .pipe(gp_concat('concat.js'))
        .pipe(gulp.dest('./front/public'))
        .pipe(gp_rename('uglify.js'))
        .pipe(gp_uglify())
        .pipe(gp_sourcemaps.write('./'))
        .pipe(gulp.dest('./front/public'));
});

gulp.task('css', function () {

    var files = [
        './node_modules/angular-material/angular-material.css',
        './front/src/style/**.css'
    ];

    return gulp.src(files)
        .pipe(gp_concat('style.css'))
        .pipe(gulp.dest('./front/public'));
});

gulp.task('watch', function () {

    gulp.watch('./front/src/**/**.js', ['browserify']);
    gulp.watch('./front/src/style/**.css', ['css']);
});

gulp.task('default', ['browserify', 'css', 'watch'], function () {
    // place code for your default task here
});