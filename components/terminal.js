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

        cmd = sanitize_cmd(cmd);

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
            case "links":
                links_cmd();
                break;
            case "about_me":
                about_me_cmd();
            default:
                default_cmd(cmd);
        }

        return false;
    }
}

function sanitize_cmd(cmd) {
    var re_lt = new RegExp("<", "g");
    var re_gt = new RegExp(">", "g");

    cmd = cmd.replace(re_lt, "&lt;");
    cmd = cmd.replace(re_gt, "&gt;");

    return cmd;
}

function help_cmd() {
    var cmd_list = ["help", "resume", "links", "about_me"];

    var blocks = 4;
    var groups = cmd_list.map( function(e, i){
        return i%blocks===0 ? cmd_list.slice(i,i+blocks) : null;
    }).filter(function(e){ return e; });

    var cmd_table = document.createElement("table");
    cmd_table.setAttribute("id", "help");

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
    makeAjaxCall("assets/resume.html", resume_display);
}

function resume_display(data) {
    var color_wheel = new ColorWheel();

    var pointer = color_wheel.create_pointer();
    var key = pointer[0];
    var header_color = pointer[1];

    $("div#shell").append(data);

    var resume_points = document.getElementsByClassName("color");
    var resume_data = document.getElementsByClassName("box");
    while(resume_points.length) {
        let resume_color = color_wheel.iterate(key);

        resume_points[0].className = resume_color + "_cell";
        resume_data[0].className =  resume_color;
    }

    var skills = document.getElementsByClassName("skill");

    while(skills.length) {
        let skill_color = color_wheel.iterate(key);

        skills[0].className = skill_color;
    }

    prompt();
}

function links_cmd() {
    makeAjaxCall("assets/links.html", place_links);
}

function place_links(data) {
    $("div#shell").append(data);

    var color_wheel = new ColorWheel();

    var pointer = color_wheel.create_pointer();
    var key = pointer[0];

    var link_color = document.getElementsByClassName("special_link");
    console.log(link_color);
    while(link_color.length) {
        let color = color_wheel.iterate(key);

        link_color[0].className = color;
        console.log(link_color.length);
    }

    prompt();

}

function about_me_cmd() {
    makeAjaxCall("assets/about_me.txt", post_about);
}

function post_about(data) {
    $("$div#shell").append(data);

    prompt();
}

function default_cmd(cmd) {
    $("div#shell").append("Sorry \"" + cmd + "\" is not a valid command");
    prompt();
}
