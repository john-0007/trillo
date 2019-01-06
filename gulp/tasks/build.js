const gulp = require("gulp"),
 imagemin =require("gulp-imagemin"),
 del = require("del");
//  usemin =require("gulp-usemin"),
//  rev = require("gulp-rev"),
//  cssnano =require("gulp-cssnano"),
//  uglify= require("gulp-uglify"),
//  browserSync=require("browser-sync").create();

gulp.task("deleteDistFolder", function() {
	return del('./dist');
});

 gulp.task('optimizeImage',['deleteDistFolder'],function() {
	return gulp.src(["./app/assets/img/**/*","!./app/assets/img/icons","!./app/assets/img/icons/**/*"])
	.pipe(imagemin({
			progressive:true,
			interlaced:true,
			multipass:true
	}))
	.pipe(gulp.dest("./dist/assets/images"));
})

gulp.task("usemin",["styles","scripts"],function(){
	return gulp.src("./app/index.html")
	 .pipe(usemin({
			css:[function(){return rev();},function(){return cssnano();}],
			js:[function(){return rev();},function(){return uglify();}]
	}))
	 .pipe(gulp.dest("./docs"));
});

 gulp.task('build',['optimizeImage'])