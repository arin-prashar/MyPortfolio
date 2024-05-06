const title = document.querySelector("#title");
const container = document.querySelector(".container");
let before = document.querySelector("#before");
const liner = document.querySelector("#liner");
const command = document.querySelector("#typer"); 
const textarea = document.querySelector("#texter"); 
const terminal = document.querySelector("#terminal");
const theme = localStorage.getItem("themes");

var git = 0;
var commands = [];

setTimeout(function() {
  loopLines(banner, "", 80);
  textarea.focus();
}, 100);

window.addEventListener("keyup", enterKey);

if (theme != null){
  document.getElementById("currentTheme").setAttribute("href", theme);
};

textarea.value = "";
command.innerHTML = textarea.value;

function enterKey(e) {
  if (e.keyCode == 181) {
    document.location.reload(true);
  }
  
  if (e.keyCode == 13) {
    commands.push(command.innerHTML);
    git = commands.length;
    addLine("guest@53ur!tyd3m0n:~$ " + command.innerHTML, "no-animation", 0);
    commander(command.innerHTML.toLowerCase());
    command.innerHTML = "";
    textarea.value = "";
  }
  if (e.keyCode == 38 && git != 0) {
    git -= 1;
    textarea.value = commands[git];
    command.innerHTML = textarea.value;
  }
  if (e.keyCode == 40 && git != commands.length) {
    git += 1;
    if (commands[git] === undefined) {
      textarea.value = "";
    } else {
      textarea.value = commands[git];
    }
    command.innerHTML = textarea.value;
  }
}

function commander(cmd) {
  switch (cmd.toLowerCase()) {
    case "help":
      loopLines(help, "color2 margin", 80);
      break;
    case "about":
      loopLines(whoami, "color2 margin", 80);
      break;
    case "social":
      loopLines(social, "color2 margin", 80);
      break;
    case "projects":
      loopLines(projects, "color2 margin", 80);
      break;
    case "history":
      addLine("<br>", "", 0);
      loopLines(commands, "color2", 80);
      addLine("<br>", "command", 80 * commands.length + 50);
      break;
    case "clear":
      setTimeout(function() {
        terminal.innerHTML = '<a id="before"></a>';
        before = document.getElementById("before");
      }, 1);
      break;
    case "cv":
      loopLines(cv, "color2 margin", 80);
      break;
    case "ls":
      loopLines(ls, "color2 margin", 80);
      break;
    // socials
    case "github":
      addLine("Opening GitHub...", "color2", 0);
      newTab(github);
      break;
    // languages
    case "python":
      loopLines(python, "color2 margin", 80);
    break;

    default:
      addLine("<span class=\"inherit\">shell: command not found: ".concat(cmd,". Try <span class=\"command\">'help'</span> to get started.</span> "), "error", 100);
      break;
  }
}

function newTab(link) {
  setTimeout(function() {
    window.open(link, "_blank");
  }, 500);
}

function addLine(text, style, time) {
  var t = "";
  for (let i = 0; i < text.length; i++) {
    if (text.charAt(i) == " " && text.charAt(i + 1) == " ") {
      t += "&nbsp;&nbsp;";
      i++;
    } else {
      t += text.charAt(i);
    }
  }
  setTimeout(function() {
    var next = document.createElement("p");
    next.innerHTML = t;
    next.className = style;

    before.parentNode.insertBefore(next, before);

    container.scrollTo(0, terminal.offsetHeight);
  }, time);
}

function loopLines(name, style, time) {
  name.forEach(function(item, index) {
    addLine(item, style, index * time);
  });
}

function changeStyle(sheet) {
    document.getElementById("currentTheme").setAttribute("href", "Themes/" + sheet + ".css");  
    textarea.focus();

    if (typeof(Storage) !== "undefined") {
      localStorage.setItem("themes", document.getElementById("currentTheme").getAttribute("href"));
    }

    return false
}

window.addEventListener("keydown", function(e) {
  textarea.focus();
  if(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
      e.preventDefault();
  }
}, false);