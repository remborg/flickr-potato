function bindHtmlUnsafe($compile) {

    return function(scope, element, attrs) {
        var compile = function(newHTML) {
            newHTML = '<span>' + newHTML + '</span>';
            newHTML = $compile(newHTML)(scope);
            element.html('').append(newHTML);
        };
        var htmlName = attrs.bindHtmlUnsafe;

        scope.$watch(htmlName, function(newHTML) {
            if (!newHTML) {
                return;
            }
            compile(newHTML);
        });

    };
}


angular.module('potatoFeed')
    .directive('bindHtmlUnsafe', ['$compile', bindHtmlUnsafe]);
