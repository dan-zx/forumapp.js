ForumApp.js
===========

[![License](https://img.shields.io/badge/licence-Apache_Licence_2.0-blue.svg)](https://www.apache.org/licenses/LICENSE-2.0.html)

A forum application example using AngularJS and Angular Material.

![Demo](etc/demo.gif)

Getting started
---------------

Install dependencies

1. Install Google Chrome / Chromium and NPM.

2. Run the following command:

```sh
$ npm install -g 
        karma \
        karma-chrome-launcher \ 
        karma-jasmine \
        jasmine-core \
        ng-html2js \
        karma-ng-html2js-preprocessor \
        http-server
```

Run tests
---------

```sh
$ cd <PROJECT_HOME_DIR>
$ karma start karma.conf.js
```

Run UI
------

> You need a backend to use the app. You can use the [ForumApp API](https://github.com/dan-zx/forumapp-api) or create your BE own implementation.

```sh
$ cd <PROJECT_HOME_DIR>
$ http-server
```

License
-------

    Copyright 2018 Daniel Pedraza-Arcega

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
