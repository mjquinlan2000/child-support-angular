# CO Child Support Calculator

This application is developed to calculate child support for the state of Colorado ONLY. This was built using Yeoman, Grunt, Bower, Node, Bootstrap, and AngularJS.

## Installation

The application can actually be run from the `/dist` directory if you would like to see the current build only. The easiest way to do it is to use a simple web server like the one offered by Python (of course you need Python installed!). Just cd to the `/dist` directory and run:

	$ python -m SimpleHTTPServer [port]
	
And the application will be hosted locally on whichever port you specify.

In order to run and modify the source code, you'll have to install a few things. First install [Node.js](http://nodejs.org/download/) because it is going to be our package manger. Once node is installed run this:

	$ npm install -g bower grunt
	
Then from the application root, you're going to have to install all of your dependencies:

	$ npm install && bower install
	
After all your dependencies have been downloaded, you should be able to run the application with: 

	$ grunt serve
	
All relevant files are in the `/app` directory. If you have no idea now Node, Yeoman, or AngularJS work, you should read the documentation at their websites.

## Testing

Though there's not much testing going on at this point, tests can be run with [PhantomJS](http://phantomjs.org). After downloading you can run tests by executing

	$ grunt test
	
## Other Information

The current build is hosted on Heroku at [http://child-support.herokuapp.com](http://child-support.herokuapp.com).

Here is the information of the creator, [Mike Quinlan](http://hiremikequinlan.com)

## License (Open Source... for now)

The MIT License (MIT)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.