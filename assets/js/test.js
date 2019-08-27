jQuery(document).ready(function(){
    jQuery('#test').click(function(){
        console.log('hello')
    })

    jQuery('#country-opp-switch').bootstrapToggle({
        on: 'Search By Type',
        off: 'Search By Country'
      });
})