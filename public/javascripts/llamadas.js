$(function(){
    $('#procesar').on('submit', function(e){ 
        e.preventDefault;
        let nuevoItem= $('#item');

        $.ajax({
            url: '/todo/add',
            method: 'POST',
            data: {
                item: nuevoItem.val()
            },
            success: function(response){
                console.log(response)
            }
        })
    });
})