var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');


gulp.task('clean', function () {
    return gulp.src("build", { read: false })
        .pipe($.rimraf());
})


gulp.task('scripts', ['clean'], function () {
    return gulp.src("app/flux-lib/*.js")
        .pipe($.ngAnnotate())
        .pipe($.uglify())
        .pipe($.concat("angular-flux.js"))
        .pipe(gulp.dest("dist"))
});


gulp.task('inject', function () {
    gulp.src("app/index.html")
        .pipe($.inject(gulp.src(["app/src/js/*.js", "app/src/js/**/*.js", "!app/src/js/controllers/appCtrl.js"], {read: false}),{
            ignorePath: 'app'
        }))
        .pipe(gulp.dest("build"))
});

gulp.task('server', ['inject'], function () {
    browserSync({
        server: {
            baseDir: ['build', 'app']
        },
        files: [
                "build" + '/**',
                '!' + "build" + '/**.map'
        ]
    })
});

gulp.task('watch', function(){
    gulp.watch(["app/index.html","app/src/js/*.js","app/src/js/**/*.js"], ['inject']);
    gulp.watch("app/flux-lib/*.js", ['scripts']);
});

gulp.task("default", ['server', 'watch']);
gulp.task("build", ['scripts']);