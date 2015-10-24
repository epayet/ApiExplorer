var gulp = require("gulp");
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var bowerFiles = require('gulp-bower-files');
var es = require('event-stream');
var clean = require('gulp-clean');
var concatCss = require('gulp-concat-css');
var minifyCSS = require('gulp-minify-css');
var connect = require('gulp-connect');
var runSequence = require('run-sequence');
var less = require('gulp-less');

var port = 8001;

var paths = {
    appScripts: ["app/js/**","bower_components/angular-bootstrap/ui-boostrap.js"],
    //specify order
    vendorScripts: ["build/lib/jquery/**/*.js", "build/lib/angular/**/*.js", "build/lib/**/*.js"],
    appCss: "app/style/css/**/*.css",
    bootstrapLess: "bower_components/bootstrap/less/bootstrap.less",
    vendorCss: ["build/lib/**/*.css"],
    assets: "app/img/*",
    less: "app/style/less/**/*.less"
};

gulp.task("default", function(callback) {
    runSequence("build", ["server", "watch"], callback);
});

//Deploy bower files
gulp.task("bower", ["bower-files", "vendor", "clean"]);

//build everything
gulp.task("build", ["appScripts", "bower" , "appCss", "copy"
//    , "copyLess"
//    ,"buildLess"
]);

//Execute the server
gulp.task("server", function() {
    return connect.server({
        root: 'public',
        livereload: true,
        port: port
    });
});

gulp.task('copyLess', function(){
    return gulp.src(paths.less)
        .pipe(gulp.dest("bower_components/bootstrap/less"));
});

gulp.task('buildLess', ['copyLess'], function(){
    return gulp.src(paths.bootstrapLess)
        .pipe(less())
        .pipe(gulp.dest('public/css'));
});

/*gulp.task('less', function(){
    gulp.src("app/css/style.less").pipe(gulp.dest('bower_components/bootstrap/less'));
   return gulp.src(paths.bootstrapLess)
        .pipe(less())
        .pipe(gulp.dest('public/css'));
});*/

//Minify app js files
gulp.task("appScripts", function() {
    return gulp.src(paths.appScripts)
        .pipe(concat("app.min.js"))
        .pipe(uglify())
        .pipe(gulp.dest("public/js"))
});

//Minify and concat every css from app into app.css
gulp.task("appCss", function() {
    return gulp.src(paths.appCss)
        .pipe(concatCss("app.min.css"))
        .pipe(minifyCSS({keepSpecialComments: 0}))
        .pipe(gulp.dest("public/css"));
});

//Minify js files from bower into one vendor.js
gulp.task("vendorScripts", ['bower-files'], function() {
    return gulp.src(paths.vendorScripts)
        .pipe(concat("vendor.min.js"))
        .pipe(uglify())
        .pipe(gulp.dest("public/js"))
});

//Same for css files
gulp.task("vendorCss", ["bower-files"], function() {
    return gulp.src(paths.vendorCss)
        .pipe(concatCss("vendor.min.css"))
        .pipe(minifyCSS())
        .pipe(gulp.dest("public/css"));
});

//Copy the vendor fonts in the public css folder (bootstrap needs it)
gulp.task("vendorFonts", ["bower-files"], function() {
    return gulp.src("build/lib/bootstrap/dist/fonts/**")
        .pipe(gulp.dest("public/fonts/"))
});

//Vendor stuff (bower)
gulp.task("vendor", ["vendorScripts", "vendorFonts"]);

//Take the main files from bower_components and put them into build
gulp.task("bower-files", function(){
    return bowerFiles().
        pipe(gulp.dest("build/lib"));
});

//Clean the build folder when the vendor stuff is finished
gulp.task("clean", ["vendor"], function() {
    return gulp.src("build").pipe(clean());
});

//Copy other stuff to public (img, html, etc.)
gulp.task("copy", function() {
    return es.merge(
        gulp.src("app/**/*.html").pipe(gulp.dest("public")),
        gulp.src(paths.assets).pipe(gulp.dest("public/img"))
    );
});

//Stuff to watch to redeploy, doesn't work for bower, have to run "gulp bower" to redeploy new packages
gulp.task("watch", function() {
    gulp.watch(paths.appCss, ["appCss"]);
    gulp.watch(paths.appScripts, ["appScripts"]);
    //gulp.watch("bower.json", ["bower"]);
    gulp.watch(["app/**/*.html", paths.assets], ["copy"]);
});