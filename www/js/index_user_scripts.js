(function()
{
 "use strict";
 /*
   hook up event handlers 
 */
 function register_event_handlers()
 {
    
    
/*         $(".uib_w_4").click(function(evt)
        {
            $('#btc2fiat').toogle(true);
            $('#fiat2btc').toggle(false);
        });
*/
        $("#to_fiat_button").click(function(evt)
        {
            $('#btc2fiat').show();
            $('#fiat2btc').hide();
        });
        
        $("#to_btc_button").click(function(evt)
        {
            $('#btc2fiat').hide();
            $('#fiat2btc').show();
        });
}
 $(document).ready(register_event_handlers);
})();
