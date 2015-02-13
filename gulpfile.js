var gulp = require('gulp');
var jsd2md = require('gulp-jsdoc-to-markdown');
var replace = require('gulp-just-replace');
var rename = require("gulp-rename");
var concat = require('gulp-concat');
var gutil = require("gulp-util");
var del = require('del');
var me = require('./package.json');
var contribs = require('gulp-contribs');

gulp.task('replace', function(){
  return gulp.src(["readme_template.hbs","LICENSE"])
  .pipe(concat('readme.hbs'))
  .pipe(replace([
    {
      search: '%%NAME%%',
      replacement: me.name
    },
    {
      search: '%%DESCRIPTION%%',
      replacement: me.description
    }
  ]))
  .pipe(contribs())
  // .pipe(rename('readme.hbs'))
  .pipe(gulp.dest('./'))
})

gulp.task('doc-build', ['replace'], function(){
  var options = {template: "./readme.hbs"};
  return gulp.src('todoist.js')
  .pipe(jsd2md(options))
  .on("error", function(err){
    gutil.log(gutil.colors.red("jsdoc2md failed"), err.message)
  })
  .pipe(rename('README.md'))
  .pipe(gulp.dest('./'))
})

gulp.task('docs',['doc-build'], function(cb){
  return del(['readme.hbs'], cb);
})

gulp.task('default',['docs']);
