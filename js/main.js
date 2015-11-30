// Main listeners
var pop = false;
$(document).ready(function()
{
    /* persistant removal of disabled attribute for startTest button on page reload/refresh */
    $('#startTest').removeAttr('disabled');

    /* start test button, reset progress-bar, some animation (listener) */
    $('#startTest').on('click', function()
    {
        $('#probar').show();
        $('#probar>.bar').css('width', '40px;');
        $('#startTest').attr('disabled', 'disabled');
        $('.proStatus').html("Detecting Operating System...");
        detectOpSys();
        detectBrowser();
        detectFlash();
        detectJava();
        detectPopupBlocker();
        detectCrystalAx();
        showResults();
    });
    
    /* clear form button (listener) */
    $('#clearForm').on('click', function()
    {
        $('#testResults').fadeOut(150);
        clearForm();
    });

    /* generate instructions for disabling popups modal (listener) */
    $('#disablePops').on('shown', function()
    {
        displayPUBinfo();
    });

    /* PrintControl deployment (listener) */
    $('#startCrAxInstall').on('click', function()
    {
        $(this).text('Installing');
        $(this).attr('disabled', 'disabled');
        $('#crAxload').load('ext/AxPrintControl.html');
    });

    /* popovers with test requirements (listener)*/
    //$('th[scope=row]').on('hover', function () {
    //    var hoveringClass = $(this).find('.tableReq');

    //    $(hoveringClass).slideToggle('slow');

    //    $(this).popover({
    //        animation: false,
    //        trigger: 'click',
    //        placement: 'right',
    //        title: 'Requirements',
    //        content: popString(hoveringClass)
    //    });
    //});
    
});


/* returns popover content string */
function popString(a) {
    var string = null;
    switch (a) {
        case "row-os":
            string = "<ul><li>Windows XP SP2 or higher</li><li>Mac OS X v10.5 or higher</li><li>Red Hat Linux v3 or higher</li></ul>"
            return string;
            break;
        case "row-browser":
            string = "<ul><li>Internet Explorer v6 or higher</li><li>Google Chrome v10 or higher</li><li>Mozilla Firefox v3 or higher</li><li>Apple Safari v3 or higher</li></ul>"
            return string;
            break;
        case "row-flash":
            string = "<ul><li>Adobe Flash plugin v9 or higher</li></ul>"
            return string;
            break;
        case "row-java":
            string = "<ul><li>Java (JRE) plugin v1.5 or higher</li></ul>"
            return string;
            break;
        case "row-popupblock":
            string = "<ul><li>Disable Popup Blocker</li><li>Allow exception for: <b>http://subway.sabanow.net/</b></li></ul>"
            return string;
            break;
        case "row-crax":
            string = "Both of the following: <ul><li>ActiveX Support</li><li>Java (JRE) plugin</li></ul><br /><b>This test is only recommended, not required!</b>"
            return string;
            break;
        default: return string;
    }
}

/* cross-browser console support */
if (!(window.console && console.log)) {
    (function () {
        var noop = function () { };
        var methods = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'markTimeline', 'profile', 'profileEnd', 'markTimeline', 'table', 'time', 'timeEnd', 'timeStamp', 'trace', 'warn'];
        var length = methods.length;
        var console = window.console = {};
        while (length--) {
            console[methods[length]] = noop;
        }
    }());
}
