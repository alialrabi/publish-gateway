![Dropify](src/images/cover.jpg)

# Dropify

Override your input files with style.

Demo here : [http://jeremyfagis.github.io/dropify](http://jeremyfagis.github.io/dropify/)

## Dependency

[jQuery](https://github.com/jquery/jquery) is required to do the magic.

## Installation

Clone the project in your workspace

    $ git clone git@github.com:JeremyFagis/dropify.git
    $ cd dropify

Download packages

    $ npm install

Compile assets

    $ gulp build

## Compilation

    # All compilations and watch. You will have minified and not minified files.
    $ gulp

    # Dev compilation (watch & no-minification)
    $ gulp --dev

    # Prod compilation, you will have minified and not minified files
    $ gulp build

    # Prod compilation, you will have only minified files
    $ gulp build --dev

## NPM Package

[www.npmjs.com/package/dropify](https://www.npmjs.com/package/dropify)

## Usage

You have to include **[dist/js/dropify.js](dist/js/dropify.js)**, **[dist/css/dropify.css](dist/css/dropify.css)** and **dist/fonts/\*** to your project, then you juste have to init the jQuery plugin like that :

```javascript
$('.dropify').dropify();
```

## Options

- **defaultFile:** If there is a default file on the input. You can use options when you use the plugin or directly **data-default-file="url_of_your_file"** on you DOM element (it's recommended).

```html
<input type="file" class="dropify" data-default-file="url_of_your_file" />
```

- **height:** Set the height of your dropify element. For exemple you want 300px height, you have to add the attribute **data-height="300"** on your DOM element.

```html
<input type="file" class="dropify" data-height="300" />
```

- **maxFileSize:** Set the max filesize of the uploaded document. An error will be display if the file size is bigger than the option. You can use unit like K, M and G.

```html
<input type="file" class="dropify" data-max-file-size="3M" />
```

- **minWidth:** Set the min width allowed. An error will be display if the width is smaller than the option.

```html
<input type="file" class="dropify" data-min-width="400" />
```

- **maxWidth:** Set the max width allowed. An error will be display if the width is bigger than the option.

```html
<input type="file" class="dropify" data-max-width="1000" />
```

- **minHeight:** Set the min height allowed. An error will be display if the width is smaller than the option.

```html
<input type="file" class="dropify" data-min-height="400" />
```

- **maxHeight:** Set the max height allowed. An error will be display if the width is bigger than the option.

```html
<input type="file" class="dropify" data-max-height="1000" />
```

- **disabled:** You can disable the input if you add the attr **disabled="disabled"**.

```html
<input type="file" class="dropify" disabled="disabled" />
```

- **showRemove:** You can hide the remove button if you add the attr **data-show-remove="false"**. Default: true.

```html
<input type="file" class="dropify" data-show-remove="false" />
```

- **showLoader:** You can hide the loader if you add the attr **data-show-loader="false"**. Default: true.

```html
<input type="file" class="dropify" data-show-loader="false" />
```

- **showErrors:** You can hide errors if you add the attr **data-show-loader="false"**. Default: true.

```html
<input type="file" class="dropify" data-show-errors="true" />
```

- **errorsPosition:** You can choose where you want to display the errors, overlay or outside. Default: overlay.

```html
<input type="file" class="dropify" data-errors-position="outside" />
```

- **allowedFormats:** You can allow/deny pictures formats. If you add the attr **data-allowed-formats="portrait square"** only portrait and square picture will be allowed. Default: ['portrait', 'square', 'landscape'].

```html
<input type="file" class="dropify" data-allowed-formats="portrait square" />
```

- **messages:** You can translate default messages. You juste have to add an options array when you init the plugin. This messages will be replaced in the **tpl** option.

```javascript
$('.dropify').dropify({
    messages: {
        'default': 'Drag and drop a file here or click',
        'replace': 'Drag and drop or click to replace',
        'remove':  'Remove',
        'error':   'Ooops, something wrong appended.'
    }
}
```

- **error:** You can translate default errors messages. You juste have to add an options array when you init the plugin. **{{ value }}** text will be replaced by the option.

```javascript
$('.dropify').dropify({
    error: {
        'fileSize': 'The file size is too big ({{ value }} max).',
        'minWidth': 'The image width is too small ({{ value }}}px min).',
        'maxWidth': 'The image width is too big ({{ value }}}px max).',
        'minHeight': 'The image height is too small ({{ value }}}px min).',
        'maxHeight': 'The image height is too big ({{ value }}px max).',
        'imageFormat': 'The image format is not allowed ({{ value }} only).'
    }
}
```

- **tpl:** You can update default template. You juste have to add an options array when you init the plugin.

```javascript
$('.dropify').dropify({
    tpl: {
        wrap:            '<div class="dropify-wrapper"></div>',
        loader:          '<div class="dropify-loader"></div>',
        message:         '<div class="dropify-message"><span class="file-icon" /> <p>{{ default }}</p></div>',
        preview:         '<div class="dropify-preview"><span class="dropify-render"></span><div class="dropify-infos"><div class="dropify-infos-inner"><p class="dropify-infos-message">{{ replace }}</p></div></div></div>',
        filename:        '<p class="dropify-filename"><span class="file-icon"></span> <span class="dropify-filename-inner"></span></p>',
        clearButton:     '<button type="button" class="dropify-clear">{{ remove }}</button>',
        errorLine:       '<p class="dropify-error">{{ error }}</p>',
        errorsContainer: '<div class="dropify-errors-container"><ul></ul></div>'
    }
}
```

## Events

- **dropify.beforeClear:** This event is called when you click on the "remove" button, just before clearing the Dropify. You can access to all the Dropify object properties using **element.xxxx**. See how to use it.

```javascript
var drEvent = $('.dropify').dropify();

drEvent.on('dropify.beforeClear', function(event, element) {
  return confirm('Do you really want to delete "' + element.filename + '" ?');
});
```

- **dropify.afterClear:** This event is called after the Dropify is clear. You can access to all the Dropify object properties using **element.xxxx**. See how to use it.

```javascript
var drEvent = $('.dropify').dropify();

drEvent.on('dropify.afterClear', function(event, element) {
  alert('File deleted');
});
```

- **dropify.errors:** This event is called when there is one or more error during process. See how to use it.

```javascript
var drEvent = $('.dropify').dropify();

drEvent.on('dropify.errors', function(event, element) {
  alert('Has Errors!');
});
```

- **dropify.error.xxxxx:** In addition to the event **dropify.errors:**, you can bind errors events one by one. See how to use it.

```javascript
var drEvent = $('.dropify').dropify();

drEvent.on('dropify.error.fileSize', function(event, element) {
  alert('Filesize error message!');
});
drEvent.on('dropify.error.minWidth', function(event, element) {
  alert('Min width error message!');
});
drEvent.on('dropify.error.maxWidth', function(event, element) {
  alert('Max width error message!');
});
drEvent.on('dropify.error.minHeight', function(event, element) {
  alert('Min height error message!');
});
drEvent.on('dropify.error.maxHeight', function(event, element) {
  alert('Max height error message!');
});
drEvent.on('dropify.error.imageFormat', function(event, element) {
  alert('Image format error message!');
});
```
