var count_cmd = 1;

window.onload = function() {
    prompt();
}

function prompt() {


    // Create the form
    var form = document.createElement("form");
    form.setAttribute("class", "cmd_" + count_cmd);
    form.setAttribute("method","get");
    form.innerHTML = "sh-64$ ";

    var input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("id", "exe_cmd_" + count_cmd);
    input.setAttribute("onkeypress", "return runExeCmd(event)");
    input.setAttribute("onblur","this.focus()");
    input.setAttribute("autofocus","");

    form.appendChild(input);

    $("div#shell").append(form);
    $("#exe_cmd_" + count_cmd).focus();
}



function runExeCmd(e) {
    if (e.keyCode == 13) {
        var input = document.getElementById("exe_cmd_" + count_cmd);
        var cmd = input.value.trim("\n");

        // Render the field useless
        input.removeAttribute("onblur");
        input.removeAttribute("autofocus");
        input.setAttribute("disabled","");
        count_cmd++;

        switch(cmd) {
            case "help":
                help_cmd();
                break;
            case "resume":
                resume_cmd();
                break;
            default:
                default_cmd(cmd);
        }

        return false;
    }
}

function help_cmd() {
    var cmd_list = ["help", "resume"];

    var blocks = 4;
    var groups = cmd_list.map( function(e, i){
        return i%blocks===0 ? cmd_list.slice(i,i+blocks) : null;
    }).filter(function(e){ return e; });

    var cmd_table = document.createElement("table");

    for(var i=0; i < groups.length; i++) {
        let table_row = document.createElement("tr");
        for(var j=0; j < groups[i].length; j++) {
            let table_el = document.createElement("td");
            table_el.innerHTML = groups[i][j];

            table_row.appendChild(table_el);
        }
        cmd_table.appendChild(table_row);
    }

    $("div#shell").append("The available commands are:");
    $("div#shell").append(cmd_table);
    prompt();
}

function resume_cmd() {
    $("div#shell").append("Stuff for resume command");
    prompt();
}

function default_cmd(cmd) {
    $("div#shell").append("Sorry \"" + cmd + "\" is not a valid command");
    prompt();
}
