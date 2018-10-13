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
        $.post('/generate/jupyter', body, function(data, status){
            console.log(data);
        });
    })

    $("#r_deploy").click((e)=>{
        console.log(e);
        e.preventDefault();
        console.log($("#r_id").val());
        console.log($("#r_ws").val());
        console.log($("#r_port").val());
        let id = $("#r_id").val();
        let ws = $("#r_ws").val();
        let port = $("#r_port").val();

        var body = {
            'id' :  id,
            'ws' : ws,
            'port' : port
        }
        $.post('/generate/remix', body, function(data, status){
            console.log(data);
        });
    })
    
});