/*  CONFIGURATION (Version Requirements)
    UNIVERSITY OF SUBWAY - SYSTEM DETECTION
    All versions are represented as: equal-to or greater-than */

// BROWSER REQUIREMENTS
var IE_REQ = 6;
var CHROME_REQ = 10;
var FIREFOX_REQ = 3;
var SAFARI_REQ = 3;

// PLUGIN REQUIREMENTS
var FLASH_REQ = 9;
var JAVA_REQ = "1.5.0";


/*  END OF CONFIGRATION
    DO NOT MODIFY ANY CODE BELOW
-------------------------------- */

/* flash detection / uses: pluginDetect.js */
function detectFlash() {
    var x = PluginDetect.getVersion("Flash");
    var flashVer = shortVer(x);
    var flashUrl = "http://get.adobe.com/flashplayer";
    var error = "";
    if (isNaN(flashVer)) {
        error = "Flash plugin is not installed for this browser";
        $('.flashVersion').html("<a class='btn btn-danger' href='"+flashUrl+"' target='_blank'><i class='icon-info-sign icon-white'></i> Install Flash</a><p style='font-style:italic;padding-top:5px;'>" + error + "</p>");
        $('#flashVersion-ico').html(addIcon(1));
    } else {
        if(flashVer >= FLASH_REQ) 
        {
            $('.flashVersion').html(flashVer);
            $('#flashVersion-ico').html(addIcon(0));
        } else 
        {
            error = "Flash plugin is not up-to-date";
            $('.flashVersion').html("<a class='btn btn-danger' href='"+flashUrl+"' target='_blank'><i class='icon-info-sign icon-white'></i> Upgrade Flash</a><p style='font-style:italic;padding-top:5px;'>" + error + "</p>");
            $('#flashVersion-ico').html(addIcon(1));
        }
    }
    $('#probar>.bar').css('width', '220px');
    $('.proStatus').html("Detecting Java Runtime plugin...");
}

/* java detection / uses: pluginDetect.js */
function detectJava() {
    
    var javaUrl = "http://www.java.com/download/index.jsp";
    var error = null;
    var javaREQ = JAVA_REQ + "+";
    var javaREQ2 = JAVA_REQ + "*";
    if (navigator.javaEnabled() === true) {
        if (deployJava.versionCheck(javaREQ) || deployJava.versionCheck(javaREQ2)) 
        {
            var javaVer = deployJava.getJREs();
            $('.javaVersion').html(javaVer);
            $('#javaVersion-ico').html(addIcon(0));
        
        } else {
             error = "The current version of Java installed does not meet the requirements, please upgrade Java.";
             $('.javaVersion').html("<a class='btn btn-danger' href='"+javaUrl+"' target='_blank'><i class='icon-info-sign icon-white'></i> Upgrade Java</a><p style='font-style:italic;padding-top:5px;'>" + error + "</p>");
             $('#javaVersion-ico').html(addIcon(1));
        }
    } else {
    error = "<p>Java is not enabled.<br />Verify the Java plugin is enabled in your browser's Preferences.</p>";
    $('.javaVersion').html("<a class='btn btn-danger' href='"+javaUrl+"' target='_blank'><i class='icon-info-sign icon-white'></i> Install Java</a><p style='font-style:italic;padding-top:5px;'>" + error + "</p>");
    $('#javaVersion-ico').html(addIcon(1));
    }
    $('#probar>.bar').css('width', '280px');
    $('.proStatus').html("Detecting Crystal Reports (PrintControl)...");
} 

/* crystalreport / detects PrintControl object */
function detectCrystalAx() {

    var p;
    var error;
    try {
        p = new ActiveXObject('crystalreports12.crystalprintcontrol.1');
    }
    catch (e) {
        error = true;
        var b = getBrowser("name");
        if (b == "Internet Explorer") {
            $('.crAx').html("<p>PrintControl add-on is disabled or corrupt.</p>");
            $('.crAx').append("<a href='#installCrAxModal' role='button' class='btn' data-toggle='modal'>Reinstall CR PrintControl</a>");
            $('#crAx-ico').html(addIcon(1));
        } else {
            $('.crAx').html("ActiveX is not supported in this browser<br />");
            $('.crAx').append("Report printing will not be available<br />");
            $('.crAx').append("Try using <a href='http://www.microsoft.com/ie/'>Internet Explorer</a><br />");
            $('#crAx-ico').html(addIcon(1));
        }
    }
 
   if (p) {
        $('.crAx').html("Installed");
        $('#crAx-ico').html(addIcon(0));

    } else if (!p && !error) {
        $('.crAx').html("Supported but not installed<br /><a href='#installCrAxModal' role='button' class='btn' data-toggle='modal'>Install CR PrintControl</a>");
        $('#crAx-ico').html(addIcon(2));
    }

    $('.proStatus').html("Gathering Results...");
}

/* popup blocker detection */
function detectPopupBlocker() {
    var browser = getBrowser("name").toLowerCase();
    if (browser == "chrome") {
        //detectPopupChrome();
        $('#PUBload').load('ext/popChrome.html');
    } else {
        if (bFailure) {
            $('.popupBlocker').html("Failure");
            $('#popupBlocker-ico').html(addIcon(2));
            return;
        }
        var popd = window.open("ext/popTest.html?dummyVar=testValue&rand=4782", null, "height=300,width=150,fullscreen=no,channelmode=no,toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no");
        popd.window.blur();
        window.setTimeout("FinishPopupTest()", 1000);
        $('.proStatus').html("Detecting Popup Blocker status...");
        $('#probar>.bar').css('width', '300px');
    }

}
function FinishPopupTest() {
    
    if (document.getElementById("popupOk").value == "1") {
        $('.popupBlocker').html("No Blocker Detected");
        $('#popupBlocker-ico').html(addIcon(0));
        $('#probar>.bar').css('width', '360px');
        return;
    }
    else {
        iPopupAttempts++;
        if (iPopupAttempts < 5) { // (5) Controls length of time it takes to complete
            window.setTimeout("FinishPopupTest()", 1000);
        }
        else {
            $('.popupBlocker').html("<a class='btn btn-danger' data-toggle='modal' data-target='#disablePops'><i class='icon-info-sign icon-white'></i> Blocker Detected</a>");
            $('#popupBlocker-ico').html(addIcon(1));
            bLimit = true;
            $('#probar>.bar').css('width', '360px');
        }
    }

}
function displayPUBinfo() {
    var b = getBrowser("name");
    if (b == "Chrome") {
        $('#browsernamePUB').html("Chrome");
        $('#disablePUB').empty();
        $('#offPUBdoc').attr("href", "http://support.google.com/chrome/bin/answer.py?hl=en&answer=95472&topic=14678&ctx=topic");
    } else if (b == "Internet Explorer") {
        $('#browsernamePUB').html("Internet Explorer");
        $('#disablePUB').empty();
        $('#offPUBdoc').attr("href", "http://support.microsoft.com/findsolutions/internet-explorer");
    } else if (b == "Mozilla Firefox") {
        $('#browsernamePUB').html("Firefox");
        $('#disablePUB').empty();
        $('#offPUBdoc').attr("href", "http://support.mozilla.org/en-US/kb/pop-blocker-settings-exceptions-troubleshooting?s=popup+blocker");
    } else if (b == "Opera") {
        $('#browsernamePUB').html("Opera");
        $('#disablePUB').empty();
        $('#offPUBdoc').attr("href", "http://www.opera.com/browser/tips/");
    } else if (b == "Safari") {
        $('#browsernamePUB').html("Safari");
        $('#disablePUB').empty();
        $('#offPUBdoc').attr("href", "http://www.apple.com/support/safari/");
    } else {
        $('#browsernamePUB').html("Other Browsers");
        $('#disablePUB').empty();
        $('#offPUBdoc').attr("disabled", "disabled");
        $('#disablePUB').append("<p>We are unable to provide any documentation regarding your web browser's <i>pop-up blocker</i>.</p>");
        $('#disablePUB').append("<p>Due to incompatibility issues, it's recommended to upgrade to the latest version of your operating system's default web browser.</p>");
        $('#disablePUB').append("<div style='text-align:center;'><a class='btn btn-info' style='float:left;' href='http://www.microsoft.com/windows/ie/' target='_blank'>Microsoft Windows User</a>");
        $('#disablePUB').append("<a class='btn btn-info' style='float:right;' href='http://www.apple.com/safari/' target='_blank'>MacOS X Users</a></div>");
        }
}

/* browser detection / uses: user-agent string */
function detectBrowser() {
    var link = getBrowser("link");
    var a = getBrowser("name");
    var b = getBrowser("majorver");
    var c = a + " " + b;
    if (a != null && b != null) {
        var meetReq = browserReq(a, b);
        if (meetReq == true) {
            $('.browser').html(c);
            $('#browser-ico').html(addIcon(0));
        } else if (meetReq == false) 
        {
            $('.browser').html("<a class='btn btn-danger' href='"+link+"' target='_blank'><i class='icon-info-sign icon-white'></i> Upgrade "+a+"</i></a><p style='font-style:italic;padding-top:5px;'>Your browser version is outdated</p>");         
            $('#browser-ico').html(addIcon(1));
        } else if (meetReq == null) 
        {            
            $('.browser').html("<a class='btn btn-danger' href='http://www.microsoft.com/ie/' target='_blank'><i class='icon-info-sign icon-white'></i> Try Internet Explorer</a><p style='font-style:italic;padding-top:5px;'>Your browser is not compatible</p>");
            $('#browser-ico').html(addIcon(1));

        }
    } else {
            $('.browser').html("<a class='btn btn-danger' href='http://www.microsoft.com/ie/' target='_blank'><i class='icon-info-sign icon-white'></i> Try Internet Explorer</a><p style='font-style:italic;padding-top:5px;'>An error occured during detection</p>");
            $('#browser-ico').html(addIcon(1));
    }
    $('#probar>.bar').css('width', '160px');
    $('.proStatus').html('Detecting Adobe Flash plugin...');
}
function getBrowser(data) {

    var nVer = navigator.appVersion;
    var nAgt = navigator.userAgent;
    var browserName = navigator.appName;
    var fullVersion = '' + parseFloat(navigator.appVersion);
    var majorVersion = parseInt(navigator.appVersion, 10);
    var nameOffset, verOffset, ix;
    var link = "";
    if ((verOffset = nAgt.indexOf("Opera")) != -1) {
        browserName = "Opera";
        link = "http://www.opera.com/";
        fullVersion = nAgt.substring(verOffset + 6);
        if ((verOffset = nAgt.indexOf("Version")) != -1)
            fullVersion = nAgt.substring(verOffset + 8);
    }
    else if ((verOffset = nAgt.indexOf("MSIE")) != -1) {
        browserName = "Internet Explorer";
        link = "http://microsoft.com/ie/";
        fullVersion = nAgt.substring(verOffset + 5);
    }
    else if ((verOffset = nAgt.indexOf("Chrome")) != -1) {
        browserName = "Chrome";
        link = "http://www.google.com/chrome/";
        fullVersion = nAgt.substring(verOffset + 7);
    }
    else if ((verOffset = nAgt.indexOf("Safari")) != -1) {
        browserName = "Safari";
        link = "http://www.apple.com/safari/";
        fullVersion = nAgt.substring(verOffset + 7);
        if ((verOffset = nAgt.indexOf("Version")) != -1)
            fullVersion = nAgt.substring(verOffset + 8);
    }
    else if ((verOffset = nAgt.indexOf("Firefox")) != -1) {
        browserName = "Mozilla Firefox";
        link = "http://mozilla.org/firefox";
        fullVersion = nAgt.substring(verOffset + 8);
    }
    else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) <
          (verOffset = nAgt.lastIndexOf('/'))) {
        browserName = nAgt.substring(nameOffset, verOffset);
        fullVersion = nAgt.substring(verOffset + 1);
        link = "http://www.microsoft.com/ie/";
        if (browserName.toLowerCase() == browserName.toUpperCase()) {
            browserName = navigator.appName;
        }
    }
    if ((ix = fullVersion.indexOf(";")) != -1)
        fullVersion = fullVersion.substring(0, ix);
    if ((ix = fullVersion.indexOf(" ")) != -1)
        fullVersion = fullVersion.substring(0, ix);

    majorVersion = parseInt('' + fullVersion, 10);
    if (isNaN(majorVersion)) {
        fullVersion = '' + parseFloat(navigator.appVersion);
        majorVersion = parseInt(navigator.appVersion, 10);
    }
    switch (data) {
        case "version": return fullVersion;
        case "name": return browserName;
        case "majorver": return majorVersion;
        case "link": return link;
    }
}
function browserReq(b,v) {
    if (b == "Chrome") {
        if (v >= CHROME_REQ) { return true } else { return false }
    } else if (b == "Internet Explorer") {
        if (v >= IE_REQ) { return true } else { return false }
    } else if (b == "Safari") {
        if (v >= SAFARI_REQ) { return true } else { return false }
    } else if (b == "Mozilla Firefox") {
        if (v >= FIREFOX_REQ) { return true } else { return false }
    } else {return null; }
}

/* operating system detection / uses: user-agent string */
function detectOpSys() {
    var osName = getOS();
    if (osName == "Error") {
        $('.opsys').html("Detection Error");
        $('#opsys-ico').html(addIcon(1));
    } else if (osName == "Not Compatible") {
        $('.opsys').html("Compatibility Issue");
        $('#opsys-ico').html(addIcon(2));
    } else {
        $('.opsys').html(osName);
        $('#opsys-ico').html(addIcon(0));
    }
    $('#probar>.bar').css('width', '120px');
    $('.proStatus').html("Detecting Web Browser...");
}
function getOS() {
    var ua = navigator.userAgent.toLowerCase();
    var av = navigator.appVersion.toLowerCase();
    var osFull = "";
    var osName = null;
    var osVer = null;
    if (av.indexOf("win") != -1) osName = "Windows";
    if (av.indexOf("mac") != -1) osName = "MacOS X";
    if (av.indexOf("linux") != -1) osName = "Linux";


    if (ua.indexOf("os x 10.5") != -1) osVer = "10.5";
    if (ua.indexOf("os x 10.6") != -1) osVer = "10.6";
    if (ua.indexOf("os x 10.7") != -1) osVer = "10.7";
    if (ua.indexOf("os x 10.8") != -1) osVer = "10.8";

    if (av.indexOf("nt 5.0") != -1) osVer = "2000";
    if (av.indexOf("nt 5.1") != -1) osVer = "XP";
    if (av.indexOf("nt 6.0") != -1) osVer = "Vista";
    if (av.indexOf("nt 6.1") != -1) osVer = "7";
	if (av.indexOf("nt 6.2") != -1) osVer = "8";

    if (osName == null && osVer == null) {
        return "Error";
    } else if (osName == "iPhone" || osName == "Android") {
        return "Mobile";
    } else if (osVer == null) {
        if (ua.indexOf("nt 5.0") != -1) osVer = "2000";
        if (ua.indexOf("nt 5.1") != -1) osVer = "XP";
        if (ua.indexOf("nt 6.0") != -1) osVer = "Vista";
        if (ua.indexOf("nt 6.1") != -1) osVer = "7";
        if (osVer != null)
        {
            osFull = osName + " " + osVer;
            return osFull;
        } else {
            return "Error";
        }
    } else {
        osFull = osName + " " + osVer;
        return osFull;
    }
}

/* display, rendering, and misc functions */
function showResults() {
    setTimeout(function()
    {
        var done = $('.bar').css('width');
        if(done == '360px')
        {
            $('#probar>.bar').css('width', '400px')
            $('.proStatus').html("Complete!");
            setTimeout(function()
            {
                $('#testResults').fadeIn(400);
                $('#clearForm').slideDown(150);
                $('#probar').fadeOut(300, function()
                {
                    $('#probar>.bar').css('width', '10px');
                    $('.proStatus').empty();
                });

            }, 1000);
        } else
        {
            showResults();
        }
    }, 2000);
}
function clearForm() {
    $('.flashVersion').empty();
    $('.javaVersion').empty();
    $('.opsys').empty();
    $('.browser').empty();
    $('.popupBlocker').empty();
    $('#PUBload').empty();
    $('#browsernamePUB').empty();
    $('#offPUBdoc').removeAttr('href');
    $('#disablePUB').empty();
    $('#clearForm').slideUp(150);
    $('.ico').empty();
    $('.proStatus').empty();
    $('#probar>.bar').css('width', '10px');
    $('#provar').hide();
    $('#startTest').removeAttr('disabled');
    $('#startCrAxInstall').removeAttr('disabled');
    var bFailure = false;
    var bLimit = false;
    var iPopupAttempts = 0;
    var bTestComplete = false;
    location.reload();
}
function shortVer(a) {
    var b = parseFloat(a).toFixed(1);
    return b;
}
function addIcon(res) {
    switch (res) {
        case 0: return "<img src='img/pass.png'></img>";
        case 1: return "<img src='img/fail.png'></img>";
        case 2: return "<img src='img/question.png'></img>";
    }
}
function addButton(link, cls, id, text) {
    var button = "<a href='" + link + "' class='btn " + cls + "' id='" + id + "' target='_blank'>" + text + "</a>";
    return button;
}
function addRowColor(row, color) {
    $(row).parent().css('background-color',color);
}