(function()
{
 "use strict";
 /*
   hook up event handlers 
 */
 function register_event_handlers()
 {
    
        var btc_quotation = 628.88;
     
        $('.money_field').maskMoney();
        $("#to_fiat_button").click(function(evt)
        {
            $('#btc2fiat').show();
            $('#fiat2btc').hide();
            $('#final_conv_block').hide();
        });
        
        $("#to_btc_button").click(function(evt)
        {
            $('#btc2fiat').hide();
            $('#fiat2btc').show();
            $('#final_conv_block').hide();
        });
     
        $("#convert2btc_button").click(function(evt)
        {
            var amount = numeral($('#money_amount').val());
//            alert(amount);
//            alert(typeof(amount));
            var result = amount.divide(btc_quotation);
            $('#final_value').html(result.value());
            $('#final_conv_block').show();
        });
}
 $(document).ready(register_event_handlers);
})();
