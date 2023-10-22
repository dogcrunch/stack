const defaultCode = 
`// Example 1
push 2
push 3
push 5
op +
pow
let x // the let keyword defines a variable as the top of stack

push "x is equal 2^(3+5)"
print

push "x = "
push x
op +
print

push "x + 5 = "
push x
push 5
op +
op +
print`

document.getElementById("input").value = defaultCode;
var editor = CodeMirror.fromTextArea(document.getElementById("input"), {
    lineNumbers: true,
    theme: "dracula",

  });
  var output = CodeMirror.fromTextArea(document.getElementById("output"), {
    theme: "dracula",

  });
  output.setSize("100%", "100%")
  editor.setSize("100%", "100%");

document.getElementById("runButton").onclick = function(){
  parse(editor.getValue());
}
