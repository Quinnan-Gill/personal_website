class ColorWheel {
    constructor() {
        //this.wheel = ["#FFFF00", "#099FFF", "#FF0000", "#00FFFF", "#FF00FF", "#FF6600", "#CC00FF"];
        this.wheel = ["yellow", "baby_blue", "green", "red", "neon_blue", "pink", "green", "orange", "purple"];
        this.start = Math.floor(Math.random() * (this.wheel.length));
        this.pointers = []
    }
    create_pointer() {
        this.pointers.push(this.start);
        return [this.pointers.length - 1, this.wheel[this.start]];
    }
    iterate(key){
        this.pointers[key] = (this.pointers[key] + 1) % this.wheel.length;
        let color_picked = this.wheel[this.pointers[key]];

        return color_picked;
    }
    iterate_num(key, num){
        let temp = Math.floor((this.pointers[key] + num) % this.wheel.length);
        this.pointers[key] = temp;
        let color_picked = this.wheel[temp];

        return color_picked;
    }
}

function makeAjaxCall(url, callback){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.send();
    xhr.onreadystatechange = function(){
        if (xhr.readyState === 4){
            if (xhr.status === 200){
                console.log("xhr done succesfully");
                var resp = xhr.responseText;
                callback(resp, url);
            } else {
                console.log("xhr processing going on");
            }
        }
    }
    console.log("request sent succesfully");
}

function extractAjaxData(data) {
    lines =  data.split("\n");
    var blocks = 10;
    var color_wheel = new ColorWheel();


    disp_overall = "<pre id=\"title\">"
    for(var i = 0; i < lines.length; i++) {
        let pointer = color_wheel.create_pointer();
        var key = pointer[0];

        var color = color_wheel.iterate_num(key, i / blocks);

        var disp_line = "<span id=\"" + color + "\">";

        disp_line += lines[i].substring(0, blocks - (i % blocks)) + "</span>";

        var normal = lines[i].substring(blocks - (i % blocks)).split('');
        var groups = normal.map( function(e, j){
            return j%blocks===0 ? normal.slice(j,j+blocks) : null;
        }).filter(function(e){ return e; });

        for(var j=0; j < groups.length; j++) {
            color = color_wheel.iterate(key);
            disp_line += "<span id=\"" + color + "\">" + groups[j].join("") + "</span>";
        }
        disp_overall += disp_line + "\n";
    }
    $("div#title_part").append(disp_overall);
}

makeAjaxCall("assets/title.txt", extractAjaxData);
console.log("title made");
