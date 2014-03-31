(function()
{
 "use strict";
 /*
   hook up event handlers 
 */
 function register_event_handlers()
 {
        // user preferences that later will be read from a preferences.json
        var btc_quotation = 628.88;
        var currency = "BRL/";
        var globalBTC = false;
        var apiURL = "https://api.bitcoinaverage.com/ticker/";
     
        
     
        // toggol the money mask on money_field class 
        $('.money_field').maskMoney();
        
        // show the convension forms and hide the final result divs 
        // convert to fiat money button
        $("#to_fiat_button").click(function(evt)
        {
            $('#btc2fiat').show();
            $('#fiat2btc').hide();
            $('.final_block').hide();
        });
     
        // convert to BTC button
        $("#to_btc_button").click(function(evt)
        {
            $('#btc2fiat').hide();
            $('#fiat2btc').show();
            $('.final_block').hide();
        });
     
        /* function to convert fiat money to BTC
        to understand the basic BTC sub-units, please see:
        https://en.bitcoin.it/wiki/FAQ#What_do_I_call_the_various_denominations_of_bitcoin.3F for units definition
        */
        $("#convert2btc_button").click(function(evt)
        {
            var amount = numeral($('#money_amount').val());
//            alert(amount);
//            alert(typeof(amount));
            var result = amount.divide(btc_quotation);
            $('#btc_value').html(result.value());
            $('#mBtc_value').html(result.multiply(1000).value()); // 3 zeros
            $('#miBtc_value').html(result.multiply(1000000).value()); //6 zeros
            $('#satoshi_value').html(result.multiply(100000000).value()); // 8 zeros
            $('#final_btc_block').show();
        });
        
        // function to convert BTC to fiat money
        $("#convert2fiat_button").click(function(evt)
        {
            var amount = numeral($('#btc_amount').val());
            alert(amount.value());
            var unit_option = $('input[name="af-group-0"]:checked').val();
            switch(unit_option)
            {
                case "0":
                    var result = amount.multiply(btc_quotation);
                    break;
                case "1":
                    var intermediate = amount.divide(1000);
                    var result = intermediate.multiply(btc_quotation);
                    break;
                case "2":
                    var intermediate = amount.divide(1000000);
                    var result = intermediate.multiply(btc_quotation);
                    break;
                case "3":
                    var intermediate = amount.divide(100000000);
                    var result = intermediate.multiply(btc_quotation);
                    break;
            }
           // $('#final_money_value').html(result.value());
            alert(result.value());
//            $('#final_btc_block').show();
        });
        
        // grab BTC quotation function
        $("#update_btc_button").click(function(evt)
        {
            // decide if we're going to request a global quotation or market specific
            var quotationAPI = "";
            if (globalBTC === true){
                quotationAPI = apiURL + "global/" + currency;
            }
            else {
                quotationAPI = apiURL + currency;
            } 
            
            // quotation API request
            var quotation;
            
            $.getJSON( quotationAPI, function(json){
                console.log("successfully connected to " + quotationAPI);
                quotation = json;
                btc_quotation = quotation["24h_avg"];
            })
                .done(function(){
                    console.log("finished requesting API JSON");
                    $("#quotation_display").html(btc_quotation);
                })
                .fail(function(){
                    console.log("error on JSON request");
                })
        });
}
 $(document).ready(register_event_handlers);
})();