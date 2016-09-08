/**
 * The main module of the app
 */
angular.module('paf.app', [])
    .run(AppRun);

function AppRun ($log) {
    $log.log('Working!');
}
