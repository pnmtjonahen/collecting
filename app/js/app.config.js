( function() {
    "use strict";

    angular
            .module( "collectingApp" )
            .config( configTheming )
            .config( configIvoMarktdown )
            ;

    configTheming.$inject = [ "$mdThemingProvider" ];
    function configTheming( $mdThemingProvider ) {

        $mdThemingProvider.theme( "default" )
                .primaryPalette( "brown" )
                .accentPalette( "red" );

    }

    configIvoMarktdown.$inject = [ "ivoMarkdownConfigProvider" ];
    function configIvoMarktdown( ivoMarkdownConfigProvider ) {
        ivoMarkdownConfigProvider.config( { extensions: [ "table", "targetblank" ] } );
    }

} )();
