function JQueryView() {
  var gSobject = inherit(gsBaseClass,'JQueryView');
  gSobject.gSclass = [];
  gSobject.gSclass.superclass = [];
  gSobject.gSclass.superclass.name= 'java.lang.Object';
  gSobject.gSclass.superclass.simpleName= 'Object';
  gSobject.gSclass.name = 'JQueryView';
  gSobject.gSclass.simpleName = 'JQueryView';
  gSobject.items = gSmap();
  gSobject.setProperty = function(name, value) {
    if (gSmethodCall(name,"endsWith",gSlist(["Visible"]))) {
      gSmethodCall(gSobject,"putVisible",gSlist([gSmethodCall(name,"substring",gSlist([0, gSminus(gSmethodCall(name,"length",gSlist([])), 7)])), value]));
    };
    if (gSmethodCall(name,"endsWith",gSlist(["Enabled"]))) {
      gSmethodCall(gSobject,"putEnabled",gSlist([gSmethodCall(name,"substring",gSlist([0, gSminus(gSmethodCall(name,"length",gSlist([])), 7)])), value]));
    };
    if (gSmethodCall(name,"endsWith",gSlist(["Class"]))) {
      gSmethodCall(gSobject,"putAttribute",gSlist([gSmethodCall(name,"substring",gSlist([0, gSminus(gSmethodCall(name,"length",gSlist([])), 5)])), "class", value]));
    };
    if (gSmethodCall(name,"endsWith",gSlist(["Html"]))) {
      gSmethodCall(gSobject,"putHtml",gSlist([gSmethodCall(name,"substring",gSlist([0, gSminus(gSmethodCall(name,"length",gSlist([])), 4)])), value]));
    };
    if (gSmethodCall(name,"endsWith",gSlist(["Text"]))) {
      gSmethodCall(gSobject,"putText",gSlist([gSmethodCall(name,"substring",gSlist([0, gSminus(gSmethodCall(name,"length",gSlist([])), 4)])), value]));
    };
    if (gSmethodCall(name,"endsWith",gSlist(["Value"]))) {
      gSmethodCall(gSobject,"putVal",gSlist([gSmethodCall(name,"substring",gSlist([0, gSminus(gSmethodCall(name,"length",gSlist([])), 5)])), value]));
    };
    if (gSmethodCall(name,"endsWith",gSlist(["BackgroundColor"]))) {
      gSmethodCall(gSobject,"putCss",gSlist([gSmethodCall(name,"substring",gSlist([0, gSminus(gSmethodCall(name,"length",gSlist([])), 15)])), "backgroundColor", value]));
    };
    return (gSobject.items [ name]) = value;
  }
  gSobject.getProperty = function(name) {
    if (gSmethodCall(name,"endsWith",gSlist(["Class"])) || gSmethodCall(name,"endsWith",gSlist(["Text"]))) {
      if (!gSobject.items [ name]) {
        (gSobject.items [ name]) = "";
      };
    };
    return gSobject.items [ name];
  }
  gSobject.modal = function(item, value) {
    $('#'+item).modal(value);
  }
  gSobject.putVisible = function(item, value) {
    if (value) {
            $('#'+item).show();
        } else {
            $('#'+item).hide();
        }
  }
  gSobject.putHtml = function(item, value) {
    $('#'+item).html(value);
  }
  gSobject.putEnabled = function(item, value) {
    if (value) {
          	$("#"+item).removeAttr("disabled").removeClass("disabled");
        } else {
            $("#"+item).attr("disabled", "disabled").addClass("disabled");
        }
  }
  gSobject.addClass = function(item, value) {
    $("#"+item).addClass(value);
  }
  gSobject.removeClass = function(item, value) {
    $("#"+item).removeClass(value);
  }
  gSobject.putAttribute = function(item, attribute, value) {
    $("#"+item).attr(attribute, value);
  }
  gSobject.putCss = function(item, attribute, value) {
    $("#"+item).css(attribute, value);
  }
  gSobject.putVal = function(item, value) {
    $("#"+item).val(value);
  }
  gSobject.putText = function(item, text) {
    $("#"+item).text(text);
  }
  gSobject.append = function(item, text) {
    $("#"+item).append(text);
  }
  gSobject.prepend = function(item, text) {
    $("#"+item).prepend(text);
  }
  gSobject.log = function(message) {
    if (console) {
            console.log(message);
        }
  }
  gSobject.ajaxCall = function(address, data, fSucess) {
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
  }
  gSobject.init = function(presenter) {
    return gSmethodCall(gSgetProperty((presenter = gSmetaClass(presenter)),"methods"),"each",gSlist([function(method) {
      if (gSmethodCall(gSgetProperty(method,"name"),"endsWith",gSlist(["OnClick"]))) {
        var name = gSmethodCall(gSgetProperty(method,"name"),"substring",gSlist([0, gSminus(gSmethodCall(gSgetProperty(method,"name"),"length",gSlist([])), 7)]));
        gSmethodCall(gSobject,"bindEvent",gSlist(["click", name, presenter, gSgetProperty(method,"name")]));
      };
      if (gSmethodCall(gSgetProperty(method,"name"),"endsWith",gSlist(["OnChange"]))) {
        var name = gSmethodCall(gSgetProperty(method,"name"),"substring",gSlist([0, gSminus(gSmethodCall(gSgetProperty(method,"name"),"length",gSlist([])), 8)]));
        gSmethodCall(gSobject,"bindWithItem",gSlist(["change", name, presenter, gSgetProperty(method,"name")]));
      };
      if (gSmethodCall(gSgetProperty(method,"name"),"endsWith",gSlist(["OnKeyup"]))) {
        var name = gSmethodCall(gSgetProperty(method,"name"),"substring",gSlist([0, gSminus(gSmethodCall(gSgetProperty(method,"name"),"length",gSlist([])), 7)]));
        gSmethodCall(gSobject,"bindWithItem",gSlist(["keyup", name, presenter, gSgetProperty(method,"name")]));
      };
    }]));
  }
  gSobject.bindEvent = function(eventName, id, obj, funcName) {
    $('#'+id).on(eventName,obj[funcName]);
  }
  gSobject.bindWithItem = function(eventName, id, obj, funcName) {
    var f = function(event) {
            var data = event;
            if (eventName=='keyup') {
                data = event.keyCode;
            }
            obj[funcName]($(this).val(),data);
        };
        $('#'+id).on(eventName,f);
  }
  gSobject.methodMissing = function(name, args) {
    if (gSmethodCall(name,"endsWith",gSlist(["AddClass"]))) {
      gSmethodCall(gSobject,"addClass",gSlist([gSmethodCall(name,"substring",gSlist([0, gSminus(gSmethodCall(name,"length",gSlist([])), 8)])), args [ 0]]));
      var value = gSmethodCall(gSobject,"getProperty",gSlist([gSplus(gSmethodCall(name,"substring",gSlist([0, gSminus(gSmethodCall(name,"length",gSlist([])), 8)])), "Class")]));
      if (!gSmethodCall(value,"contains",gSlist([args [ 0]]))) {
        value += (gSplus(" ", (args [ 0])));
      };
      (gSobject.items [ (gSplus(gSmethodCall(name,"substring",gSlist([0, gSminus(gSmethodCall(name,"length",gSlist([])), 8)])), "Class"))]) = value;
    };
    if (gSmethodCall(name,"endsWith",gSlist(["RemoveClass"]))) {
      gSmethodCall(gSobject,"removeClass",gSlist([gSmethodCall(name,"substring",gSlist([0, gSminus(gSmethodCall(name,"length",gSlist([])), 11)])), args [ 0]]));
      var value = gSmethodCall(gSobject,"getProperty",gSlist([gSplus(gSmethodCall(name,"substring",gSlist([0, gSminus(gSmethodCall(name,"length",gSlist([])), 11)])), "Class")]));
      if (value && gSmethodCall(value,"contains",gSlist([args [ 0]]))) {
        value = gSmethodCall(value,"replaceAll",gSlist([args [ 0], ""]));
      };
      (gSobject.items [ (gSplus(gSmethodCall(name,"substring",gSlist([0, gSminus(gSmethodCall(name,"length",gSlist([])), 11)])), "Class"))]) = value;
    };
    if (gSmethodCall(name,"endsWith",gSlist(["Append"]))) {
      gSmethodCall(gSobject,"append",gSlist([gSmethodCall(name,"substring",gSlist([0, gSminus(gSmethodCall(name,"length",gSlist([])), 6)])), args [ 0]]));
      (gSobject.items [ (gSplus(gSmethodCall(name,"substring",gSlist([0, gSminus(gSmethodCall(name,"length",gSlist([])), 6)])), "Html"))]) = (gSplus((gSobject.items [ (gSplus(gSmethodCall(name,"substring",gSlist([0, gSminus(gSmethodCall(name,"length",gSlist([])), 6)])), "Html"))]), (args [ 0])));
    };
    if (gSmethodCall(name,"endsWith",gSlist(["Prepend"]))) {
      gSmethodCall(gSobject,"prepend",gSlist([gSmethodCall(name,"substring",gSlist([0, gSminus(gSmethodCall(name,"length",gSlist([])), 7)])), args [ 0]]));
      (gSobject.items [ (gSplus(gSmethodCall(name,"substring",gSlist([0, gSminus(gSmethodCall(name,"length",gSlist([])), 7)])), "Html"))]) = (gSplus((args [ 0]), (gSobject.items [ (gSplus(gSmethodCall(name,"substring",gSlist([0, gSminus(gSmethodCall(name,"length",gSlist([])), 7)])), "Html"))])));
    };
  }
  gSobject.JQueryView1 = function(map) { gSpassMapToObject(map,this); return this;};
  if (arguments.length==1) {gSobject.JQueryView1(arguments[0]); }
  
  return gSobject;
};
