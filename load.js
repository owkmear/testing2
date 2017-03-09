$(document).ready(function() {
    function loadScript(url, callback)
    {
        console.log("Was loaded " + url);
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        script.onreadystatechange = callback;
        script.onload = callback;
        head.appendChild(script);
    }
    var myPrettyCode = function() {
        
    };
        
    //loadScript("https://cdn.socket.io/socket.io-1.4.5.js", myPrettyCode);
    loadScript("https://fakeproject.herokuapp.com/cdn/socket.io.js", myPrettyCode);
    loadScript("https://fakeproject.herokuapp.com/cdn/ukrstemmer.js", myPrettyCode);
    loadScript("https://fakeproject.herokuapp.com/cdn/adapter.js", myPrettyCode);
    loadScript("https://fakeproject.herokuapp.com/cdn/bundle.js", myPrettyCode);
});