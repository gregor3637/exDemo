/* globals process */
const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const port = process.env.PORT || 3001;

gulp.task('server', () => {
    const app = require('./app');
    app.listen(port, () => console.log('magic happens at' + port));
});


gulp.task('dev', ['server'], () => {
    return nodemon({
        ext: 'js',//sledi za promqna na failove s razshirenie '.js'
        tasks: ['server'], //pri nalichie na promqna, startirai 'server' task-a
        script: 'server.js',
    });
});

gulp.task('test-server:start', () => {
    const randomPort = parseInt(Math.random() * 3000 + 1000, 10);
    const connectionString = 'mongodb://items-db-test-' + randomPort;
    const app = require('./app');
    app.listen(randomPort, () => console.log('magic happens at' + port));
})

//2:51:00
//gulp-a e vajen za testvaneto
//gulp-a shte puska fake server na random port (primerno) 3009 
//testovete shte se puskat na tozi fake server
//samite testove nqma da znaqt kakav e application-a 
//sled kato testovete sa gotovi, server-a biva spiran pak ot gulp
