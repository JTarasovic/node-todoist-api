var gulp = require('gulp');
var jsd2md = require('gulp-jsdoc-to-markdown');
var replace = require('gulp-just-replace');
var rename = require("gulp-rename");
var gutil = require("gulp-util");
var me = require('./package.json');
var del = require('del');

console.log(me.name);

gulp.task('replace', function(){
  return gulp.src("readme_template.hbs").
  pipe(replace([
    {
      search: '%%NAME%%',
      replacement: me.name
    },
    {
      search: '%%DESCRIPTION%%',
      replacement: me.description
    }
  ]))
  .pipe(rename('readme.hbs'))
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
