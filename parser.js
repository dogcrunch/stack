print = function(x)
{
    output.setValue(output.getValue()+x+"\n")
};
pow = Math.pow;
sin = Math.sin;
cos = Math.cos;
floor = Math.floor;
round = Math.round;
arctan = Math.arctan;

const parameters = {
    print: 1
}
function parse(text)
{
    let js = "_stack=[];";
    let lines = text.split("\n");
    for (let i = 0; i < lines.length; i++)
    {
        lines[i] = lines[i].split("//")[0];
    }
    for (let i= 0; i < lines.length; i++)
    {
        lines[i] = lines[i].trimStart();
        if (lines[i]=="") continue;
        let keyword = lines[i].split(" ")[0];
        
        let str = lines[i].slice(keyword.length+1,lines[i].length);
        switch(keyword){
            case "push":
                js+="_stack.push("+str+");"
                break;
            case "op":
                js+="_stack.push("+"_stack[_stack.length-2] "+str+"_stack[_stack.length-1]);"
                js+="_stack.splice(_stack.length-3,2);"
                break;
            case "let":
                js+=str+"=_stack[_stack.length-1];_stack.splice(_stack.length-1,1);"
                break;
            default:
            {
                js+="_stack.push("+keyword+"(";
                let args;
                if (parameters[keyword] != undefined)
                    args = parameters[keyword];
                else
                {
                    try{
                        eval("args = "+keyword+".length");
                    }
                    catch(error)
                    {
                        output.setValue("ERROR: " + error.message);
                    }
                }
                for (let j = 0; j < args; j++)
                {
                    js+="_stack[_stack.length-("+(j+1)+")]";
                    if (j<args-1)
                    js+=",";
                }
                js+="));";
                js+="_stack.splice(_stack.length-"+(args-1).toString()+","+args.toString()+");"
            }
        }
    }
    console.log(js);

    try{
        output.setValue("");
        eval(js)
    }
    catch(error)
    {
        output.setValue("ERROR: "+error.message);
    }
}
