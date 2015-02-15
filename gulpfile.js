var del = require('del');
var gulp = require('gulp');
var to5 = require('gulp-6to5');
var concat = require('gulp-concat');
var contribs = require('gulp-contribs');
var jsd2md = require('gulp-jsdoc-to-markdown');
var replace = require('gulp-just-replace');
var strip = require('gulp-strip-comments');

var me = require('./package.json');


gulp.task('replace', function(){
  return gulp.src(["readme_template.hbs","LICENSE"])
  .pipe(concat('readme.hbs'))
  .pipe(replace([
    {
      search: /%%NAME%%/g,
      replacement: me.name
    },
    {
      search: /%%DESCRIPTION%%/g,
      replacement: me.description
    }
  ]))
  .pipe(contribs())
  .pipe(gulp.dest('./'))
})

gulp.task('doc-build', ['replace'], function(){
  var options = {template: "./readme.hbs"};
  return gulp.src('src/todoist.js')
  .pipe(jsd2md(options))
  .on("error", function(err){
    console.error("JSDoc2Markdown failed:" + err.message);
  })
  .pipe(concat('README.md'))
  .pipe(gulp.dest('./'))
})

gulp.task('docs',['doc-build'], function(cb){
  return del(['readme.hbs'], cb);
})

gulp.task('build', function(){
  return gulp.src('src/*.js')
  .pipe(concat('todoist.js'))
  .pipe(strip())
  .pipe(to5())
  .pipe(gulp.dest('./'));
})

gulp.task('default',['build','docs']);
