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

function findParams(line)
{
    let s = false;
    let b = 0;
    let p = 0;
    let q = 0;
    let last = 0;
    let params = [];
    for (let i = 0; i < line.length; i++)
    {
        if (line[i]=="(") p++;
        if (line[i]==")") p--;
        if (line[i]=="[") b++;
        if (line[i]=="]") b--;
        if (line[i]=="{") q++;
        if (line[i]=="}") q--;
        if (line[i]=="\"") s=!s;
        if (line[i]==" "&&p==0&&b==0&&q==0&&!s)
        {
            params.push(line.slice(last,i));
            last = i+1;
        }
    }
    return params;
}
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
        lines[i]+=" ";
        lines[i] = lines[i].replace( /\s\s+/g, ' ' );
        let params = findParams(lines[i]);
        let keyword = params[0];

        switch(keyword){
            case "push":
                js+="_stack.push("+params[1]+");"
                break;
            case "op":
                js+="_stack.push("+"_stack[_stack.length-2] "+params[1]+"_stack[_stack.length-1]);"
                js+="_stack.splice(_stack.length-3,2);"
                break;
            case "let":
                js+=params[1]+"=_stack[_stack.length-1];_stack.splice(_stack.length-1,1);"
                break;
            case "break":
                js+="break;";
                break;
            case "function":
                {
                    parameters[params[1]] = params.length-2;
                    js+="function "+params[1]+"(";
                    for (let i = 2; i < params.length; i++)
                    {
                        js+=params[i];
                        if (i < params.length-1)
                        js+=",";
                        
                    }
                    js+="){"
                    break;
                }
            case "return":
                js+="let _temporary=_stack[_stack.length-1];_stack.splice(_stack.length-1,1);return _temporary"
                break;
            case "continue":
                js+="continue;"
                break;
            case "while":
                js+="while(true){"
                break;
            case "end":
                js+="}";
                break;
            case "if":
                js+="let _temporary=_stack[_stack.length-1];_stack.splice(_stack.length-1,1);if(_temporary){"
                break;
            case "else":
                js += "}else{";
                break;
            case "do":
                js+="let _temporary=_stack[_stack.length-1];_stack.splice(_stack.length-1,1);if(!_temporary){break;}"
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
                js+="_stack.splice(_stack.length-"+(args+1)+","+args+");"
                js+="if(_stack[_stack.length-1]==undefined)_stack.splice(_stack.length-1,1);"
            }
        }
    }
    console.log(js);

    try{
        output.setValue("");
        eval(js)
        let stackString = "[";
        for (let i = 0; i < _stack.length; i++)
        {
            stackString+=String(_stack[i]);
            if (i<_stack.length-1)
            stackString+=",";
        }
        stackString+="]";
        stackOutput.setValue(stackString);
    }
    catch(error)
    {
        stackOutput.setValue("");
        output.setValue(output.getValue()+"ERROR: "+error.message);
    }
}
