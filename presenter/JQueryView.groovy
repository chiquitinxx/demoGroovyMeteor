import org.grooscript.asts.GsNative

/**
 * Date: 23/12/12
 */
class JQueryView  {

    def items = [:]

    def void setProperty(String name,Object value) {

        if (name.endsWith('Visible')) {
            putVisible(name.substring(0,name.length()-7),value);
        }

        if (name.endsWith('Enabled')) {
            putEnabled(name.substring(0,name.length()-7),value);
        }

        if (name.endsWith('Class')) {
            putAttribute(name.substring(0,name.length()-5),'class',value);
        }

        if (name.endsWith('Html')) {
            putHtml(name.substring(0,name.length()-4),value);
        }

        if (name.endsWith('Text')) {
            putText(name.substring(0,name.length()-4),value);
        }

        if (name.endsWith('Value')) {
            putVal(name.substring(0,name.length()-5),value);
        }

        if (name.endsWith('BackgroundColor')) {
            putCss(name.substring(0,name.length()-15),'backgroundColor',value);
        }

        items[name] = value
    }

    def getProperty(String name) {
        if (name.endsWith('Class') || name.endsWith('Text')) {
            if (!items[name]) {
                items[name] = ''
            }
        }
        return items[name]
    }

    @GsNative
    def modal(item,value) {/*
        $('#'+item).modal(value);
        */
    }

    @GsNative
    def putVisible(item,value) {/*
        if (value) {
            $('#'+item).show();
        } else {
            $('#'+item).hide();
        }
        */
    }

    @GsNative
    def putHtml(item,value) {/*
        $('#'+item).html(value);
        */
    }

    @GsNative
    def putEnabled(item,value) {/*
        if (value) {
          	$("#"+item).removeAttr("disabled").removeClass("disabled");
        } else {
            $("#"+item).attr("disabled", "disabled").addClass("disabled");
        }
        */
    }

    @GsNative
    def addClass(item,value) {/*
        $("#"+item).addClass(value);
        */
    }

    @GsNative
    def removeClass(item,value) {/*
        $("#"+item).removeClass(value);
        */
    }

    @GsNative
    def putAttribute(item,attribute,value) {/*
        $("#"+item).attr(attribute, value);
        */
    }

    @GsNative
    def putCss(item,attribute,value) {/*
        $("#"+item).css(attribute, value);
        */
    }

    @GsNative
    def putVal(item,value) {/*
        $("#"+item).val(value);
        */
    }

    @GsNative
    def putText(item,text) {/*
        $("#"+item).text(text);
        */
    }

    @GsNative
    def append(item,text) {/*
        $("#"+item).append(text);
        */
    }

    @GsNative
    def prepend(item,text) {/*
        $("#"+item).prepend(text);
        */
    }

    @GsNative
    def log(message) {/*
        if (console) {
            console.log(message);
        }
        */
    }

    @GsNative
    def ajaxCall(address,data,fSucess) {/*
        $.ajax({
           url: address,
           data: data,
           success: function(gotData) {
            fSucess(gotData);
           },
           error: function(xhr) {
                alert('Error Ajax!  Status = ' + xhr.status);
           }
        });
        */
    }

    def init(presenter) {
        presenter.metaClass.methods.each { method ->
            if (method.name.endsWith('OnClick')) {
                def name = method.name.substring(0,method.name.length()-7)
                bindEvent('click',name,presenter,method.name)
            }
            if (method.name.endsWith('OnChange')) {
                def name = method.name.substring(0,method.name.length()-8)
                bindWithItem('change',name,presenter,method.name)
            }
            if (method.name.endsWith('OnKeyup')) {
                def name = method.name.substring(0,method.name.length()-7)
                bindWithItem('keyup',name,presenter,method.name)
            }
        }
    }

    @GsNative
    def bindEvent(eventName,id,obj,funcName) { /*
        $('#'+id).on(eventName,obj[funcName]);
    */
    }

    @GsNative
    def bindWithItem(eventName, id, obj, funcName) { /*
        var f = function(event) {
            var data = event;
            if (eventName=='keyup') {
                data = event.keyCode;
            }
            obj[funcName]($(this).val(),data);
        };
        $('#'+id).on(eventName,f);
    */
    }

    def methodMissing(String name, args) {
        if (name.endsWith('AddClass')) {
            addClass(name.substring(0,name.length()-8),args[0]);
            def String value = getProperty(name.substring(0,name.length()-8)+'Class');
            if (!value.contains(args[0])) {
                value += ' '+args[0]
            }
            items[name.substring(0,name.length()-8)+'Class'] = value
        }
        if (name.endsWith('RemoveClass')) {
            removeClass(name.substring(0,name.length()-11),args[0]);
            def String value = getProperty(name.substring(0,name.length()-11)+'Class');
            if (value && value.contains(args[0])) {
                value = value.replaceAll(args[0],'')
            }
            items[name.substring(0,name.length()-11)+'Class'] = value
        }
        if (name.endsWith('Append')) {
            append(name.substring(0,name.length()-6),args[0]);
            items[name.substring(0,name.length()-6)+'Html'] = items[name.substring(0,name.length()-6)+'Html'] + args[0]
        }
        if (name.endsWith('Prepend')) {
            prepend(name.substring(0,name.length()-7),args[0]);
            items[name.substring(0,name.length()-7)+'Html'] = args[0] + items[name.substring(0,name.length()-7)+'Html']
        }
    }
}
