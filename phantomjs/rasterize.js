var page = require('webpage').create(),
    system = require('system'),
    address, output, size;

phantom.injectJs('underscore.js');

console.log(system.args);

address = system.args[1];
output = system.args[2];
page.viewportSize = { width: system.args[3], height: system.args[4] };

var render = _.debounce(function () {
  page.render(output);
  phantom.exit();
}, 1000);


page.open(address, function (status) {
  render();
});
