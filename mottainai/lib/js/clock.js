$(document).ready(function() {
    var currentdate = new Date();
    var l=0;
    function callme()
    {
        currentdate = new Date();
        $('.hour').html(currentdate.getHours());
        $('.min').html(currentdate.getMinutes());
        $('.second').html(currentdate.getSeconds());
        $('.data').css({'padding-left':l+'px'});
        l=l+5;
    }
    window.setInterval(callme,1000);

});