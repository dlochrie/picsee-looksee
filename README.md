# picsee-looksee

##Description
This is an example of how to use [Picsee](https://github.com/dlochrie/picsee).

This example is build on ExpressJS, and it is using 
[JCrop](https://github.com/tapmodo/Jcrop), 
[Twitter Bootstrap](http://twitter.github.io/bootstrap/), 
[JQuery](http://jquery.com/), 
and [JQuery Form](https://github.com/malsup/form/).

Currently, you can upload a file, crop it (using JCrop), and see your outputted versions. 
If you are using this as an example for your app, change the `versions` as necessary, and 
update the option for `stagingDir` so that it is outside your app's docroot.

##Install

Clone this repo, and then `npm install -l`.

You will need to create 3 directories, one for staging, processing, and uploads. See the options in 
`app.js`.

