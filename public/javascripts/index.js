$(document).ready(function(){

    $("#j_deploy").click((e)=>{
        console.log(e);
        e.preventDefault();
        console.log($("#j_id").val());
        console.log($("#j_ws").val());
        console.log($("#j_port").val());
        let id = $("#j_id").val();
        let ws = $("#j_ws").val();
        let port = $("#j_port").val();

        var body = {
            'id' :  id,
            'ws' : ws,
            'port' : port
        }
        $.post('/generate', body, function(data, status){
            console.log(data);
        });
    })
    
});