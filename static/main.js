window.onload = function() {
    $("#stdin").on("keydown", function(e) {
        $("footer").first().css("height", "");
        $("footer").first().css("height", ($("#stdin")[0].scrollHeight) + "px");
        var code = e.keyCode || e.which; 
        if (code == 13) {
            if (!e.shiftKey) {
                e.preventDefault();
                queryAI();
            }
        }
    });

    $("#submit-btn").on("mouseup", function() {
        queryAI();
    });
}

let prev_human_msg = "";
let ai_response = "";

function queryAI() {
    console.log("Querying AI");

    // Log Human Text
    var stdin = $("#stdin").val();

    if (stdin.trim().length == 0) {
        return; // Make sure there is input
    }

    var conversation = "The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly. The assistant does not repeat itself.\n";

    if (prev_human_msg.trim().length != 0 && ai_response.trim().length != 0) {
        conversation += "Human: "+prev_human_msg+"\nAI: "+ai_response+"\n";
    }

    conversation += "Human: "+stdin+"\nAI:";

    prev_human_msg = stdin;

    $("#stdin").val("");

    var human_message = $("<div>").text(stdin).addClass("human");

    $("#conversation").append(human_message);

    console.log(conversation);

    // Query AI
    fetch("/query", {
        method: 'post',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify({ prompt: conversation, temperature: $("#temp").val()/10.0, max_tokens: 120, frequency_penalty: 1.0, presence_penalty: 1.5, stop: ["Human:"] }),
        mode: "no-cors"
    }).then(function(response){
        return response.json();
    }).then(function(data){
        ai_response = data.choices[0].text.trim();
        
        var ai_message = $("<div>").text(ai_response).addClass("ai");

        $("#conversation").append(ai_message);

        $("#conversation").scrollTop($('#conversation')[0].scrollHeight);
    });
}