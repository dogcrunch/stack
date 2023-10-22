const defaultCode = 
`// EXAMPLE - VARIABLES AND MATH
push 5
push 6
op * // the op keyword supports all js operators
let x
push "x = "
push x
op +
print



// EXAMPLE - IF STATEMENT
push x
push 4
op >
if // references bool at top of stack
  push "x is greater than 4"
  print
end



// EXAMPLE - FUNCTIONS
function square x
  push x
  push x
  op *
  return
end

push "x squared is "
push x
square
op +
print



// EXAMPLE - WHILE LOOP
push 0
let i

while
  push i
  push 5
  op <
do
  push i
  print

  push i
  push 1
  op +
  let i
end
`

document.getElementById("input").value = defaultCode;
var editor = CodeMirror.fromTextArea(document.getElementById("input"), {
    lineNumbers: true,
    theme: "dracula",

  });

  var output = CodeMirror.fromTextArea(document.getElementById("output"), {
    theme: "dracula",

  });
  var stackOutput = CodeMirror.fromTextArea(document.getElementById("stack"), {
    theme: "dracula",
    lineWrapping: true,

  });
  output.setSize("100%", "100%")
  editor.setSize("100%", "100%");
  stackOutput.setSize("100%", "100%");

document.getElementById("runButton").onclick = function(){
  parse(editor.getValue());
}
