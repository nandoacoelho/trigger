(function() {
    'use strict';

    var gulp = require('gulp'),
        concat = require('gulp-concat'),
        sass = require('gulp-sass'),
        sassGlob = require('./sass_globbing'),
        debug = require('gulp-debug'),
        jade = require('gulp-jade'),
        cssmin = require('gulp-cssmin'),
        autoprefixer = require('gulp-autoprefixer'),
        harp = require('harp'),
        browserSync = require('browser-sync'),
        csscomb = require('gulp-csscomb'),
        data = require('gulp-data'),
        reload = browserSync.reload;

    /**
     * Harp Server
     */

    gulp.task('app', function() {
        harp.server('./public/', {
            port: 9000
        }, function() {
            browserSync({
                proxy: "localhost:9000"
            });

            gulp.watch(
                [
                    './public/assets/styles/**/*.sass'
                ], ['sass']
            );

            gulp.watch(
                [
                    './public/**/*.jade'
                ], ['jade']
            );

            gulp.watch("public/**/*", function () {
                reload({stream: true});
            });

            gulp.watch("public/assets/styles/**/*.sass", function () {
                reload("main.css", {stream: true});
            });

            gulp.watch(["public/**/*.jade", "public/**/*.json"], function () {
                reload();
            });
        });
    });

    gulp.task('server', ['app']);

    gulp.task('sass_globbing', function() {
        gulp.src([
            'generic/*.sass',
            'settings/*.sass',
            'base/*.sass',
            'tools/*.sass',
            'objects/*.sass',
            'components/*.sass',
            'components/**/*.sass',
            'trumps/*.sass',
            './**/*.sass',
            '!main.sass'
        ], {cwd: './public/assets/styles/'})
            .pipe(sassGlob(
                {
                    path: 'main.sass'
                },
                {
                    useSingleQuotes: true,
                    signature: '// Partials included with grunt-sass-globbing.'
                }
            ))
            .pipe(gulp.dest('./public/assets/styles'));
    });

    gulp.task('sass', ['sass_globbing'], function() {
        gulp.src('./public/assets/styles/main.sass')
            .pipe(csscomb())
            .pipe(sass())
            .pipe(autoprefixer())
            .pipe(debug({title: 'sass:'}))
            .pipe(concat('main.css'))
            .pipe(cssmin())
            .on('error', sass.logError)
            .pipe(gulp.dest('./public/assets/styles/'))
            .pipe(browserSync.stream());
    });

    gulp.task('jade-modules', function(done) {
        gulp.src('./public/**/*.jade')
            .pipe(data(function(file) {
                return require('./harp.json').globals;
            }))
            .pipe(jade({
                pretty: true
            }))
            .pipe(debug({title: 'jade modules:'}))
            .pipe(gulp.dest('./deploy'))
            .pipe(browserSync.stream())
            .on('end', done);
    });

    gulp.task('deploy-assets', function(done) {
        gulp.src(
            [
                './public/assets/styles/main.css',
                './public/assets/styles/styleguide.css',
                './public/assets/styles/stylesheet.css',
            ]
        )
            .pipe(gulp.dest('./deploy/assets/styles/'));
    });

    gulp.task('deploy-other-assets', function(done) {
        gulp.src(
            [
                './public/*.png',
                './harp.json',
                './public/manifest.json',
                './public/service-worker.js'

            ]
        )
            .pipe(gulp.dest('./deploy/'));
    });

    gulp.task('deploy-scripts', function(done) {
        gulp.src(
            [
                './public/assets/scripts/**/*.*'
            ]
        )
            .pipe(gulp.dest('./deploy/assets/scripts/'));
    });

    gulp.task('deploy-fonts', function(done) {
        gulp.src(
            [
                './public/assets/fonts/*.*'
            ]
        )
            .pipe(gulp.dest('./deploy/assets/fonts/'));
    });

    gulp.task('deploy-images', function(done) {
        gulp.src(
            [
                './public/assets/images/**/*.*'
            ]
        )
            .pipe(gulp.dest('./deploy/assets/images/'));
    });

    gulp.task('deploy-server', function(done) {
        gulp.src(
            [
                './server.js'
            ]
        )
            .pipe(gulp.dest('./deploy/'));
    });

    gulp.task('jade', ['jade-modules']);
    gulp.task('default', ['sass', 'server']);
    gulp.task('build', [
        'jade-modules',
        'deploy-assets',
        'deploy-images',
        'deploy-fonts',
        'deploy-scripts',
        'deploy-other-assets',
        'deploy-server',
        'sass'
    ], function() {
    });
})();