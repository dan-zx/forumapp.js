module.exports = function (config) {
  config.set({

    basePath: '',

    frameworks: ['jasmine'],

    files: [
      'tests/unit/libs/jquery.min.js',
      'assets/libs/angular.min.js',
      'assets/libs/angular-route.min.js',
      'assets/libs/angular-animate.min.js',
      'assets/libs/angular-aria.min.js',
      'assets/libs/angular-material.min.js',
      'tests/unit/libs/angular-mocks.js',
      'app/**/*View.html',
      'app/components/comments/commentsController.js',
      'app/components/comments/commentsService.js',
      'app/components/posts/postsController.js',
      'app/components/posts/postsService.js',
      'app/shared/comment/commentDirective.js',
      'app/shared/comment/commentDirectiveController.js',
      'app/shared/header/headerController.js',
      'app/shared/header/headerDirective.js',
      'app/shared/misc/sharedObjectsService.js',
      'app/shared/misc/syncHttpService.js',
      'app/shared/postDialog/postDialogController.js',
      'app/shared/post/postDirective.js',
      'app/shared/profile/profileController.js',
      'app/shared/profile/profileDirective.js',
      'app/app.routes.js',
      'app/app.theme.js',
      'app/app.module.js',
      'tests/unit/src/**/*.js'
    ],

    preprocessors: {
      'app/**/*View.html': ['ng-html2js'],
    },

    ngHtml2JsPreprocessor: {
      moduleName: 'forumAppTemplates'
    },

    reporters: ['progress'],

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: true,

    browsers: ['Chrome'],

    singleRun: false,

    concurrency: Infinity
  })
};