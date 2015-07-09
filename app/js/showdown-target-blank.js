/*! showdown-target-blank 24-04-2015 */

/* global module */

//
//  Target blank extension
//  [somelink](https://some.url.com/some/path) -> <a target="_blank" href="..." >somelink</a>
//

( function() {
    "use strict";

    var targetblank = function() {
        return [
            {
                regex: "<a(.*)a>",
                replace: function( match, content ) {
                    if ( content.indexOf( "www" ) !== -1 ) {
                        return "<a target=\"_blank\"" + content + "a>";
                    }
                    return "<a" + content + "a>";
                }
            }
        ];
    };

    // Client-side export
    if ( typeof window !== "undefined" && window.showdown && window.showdown.extensions ) {
        window.showdown.extensions.targetblank = targetblank;
    }

    // Server-side export
    if ( typeof module !== "undefined" ) {
        module.exports = targetblank;
    }

}() );

//# sourceMappingURL=showdown-target-blank.js.map
