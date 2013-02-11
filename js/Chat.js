function Chat() {
  var gSobject = inherit(gsBaseClass,'Chat');
  gSobject.gSclass = [];
  gSobject.gSclass.superclass = [];
  gSobject.gSclass.superclass.name= 'java.lang.Object';
  gSobject.gSclass.superclass.simpleName= 'Object';
  gSobject.gSclass.name = 'Chat';
  gSobject.gSclass.simpleName = 'Chat';
  gSobject.who = null;
  gSobject.message = null;
  gSobject.__defineGetter__('listColumns', function(){ return Chat.listColumns; });
  gSobject.__defineSetter__('listColumns', function(gSval){ Chat.listColumns = gSval; });
  gSobject.__defineGetter__('listItems', function(){ return Chat.listItems; });
  gSobject.__defineSetter__('listItems', function(gSval){ Chat.listItems = gSval; });
  gSobject.__defineGetter__('mapTransactions', function(){ return Chat.mapTransactions; });
  gSobject.__defineSetter__('mapTransactions', function(gSval){ Chat.mapTransactions = gSval; });
  gSobject.__defineGetter__('dataHandler', function(){ return Chat.dataHandler; });
  gSobject.__defineSetter__('dataHandler', function(gSval){ Chat.dataHandler = gSval; });
  gSobject.__defineGetter__('lastId', function(){ return Chat.lastId; });
  gSobject.__defineSetter__('lastId', function(gSval){ Chat.lastId = gSval; });
  gSobject.__defineGetter__('version', function(){ return Chat.version; });
  gSobject.__defineSetter__('version', function(gSval){ Chat.version = gSval; });
  gSobject.id = null;
  gSobject.errors = gSmap();
  gSobject.__defineGetter__('changeListeners', function(){ return Chat.changeListeners; });
  gSobject.__defineSetter__('changeListeners', function(gSval){ Chat.changeListeners = gSval; });
  gSobject.clientValidations = function(it) {
    var result = true;
    var item = this;
    gSobject.errors = gSmap();
    gSmethodCall(Chat.listColumns,"each",gSlist([function(field) {
      if (gSbool(gSgetProperty(field,"constraints"))) {
        if ((gSequals((gSgetProperty(field,"constraints") [ "blank"]), false)) && !gSgetProperty(item,"" + (gSgetProperty(field,"name")) + "")) {
          gSmethodCall(gSobject.errors,"put",gSlist([gSgetProperty(field,"name"), gSplus("blank validation on value ", gSgetProperty(item,"" + (gSgetProperty(field,"name")) + ""))]));
          return result = false;
        } else {
          return null
        };
      } else {
        return null
      };
    }]));
    return result;
  }
  gSobject.hasErrors = function(it) {
    return gSobject.errors;
  }
  gSobject.list = function() { return Chat.list(); }
  gSobject.count = function() { return Chat.count(); }
  gSobject.processOnServerError = function(x0) { return Chat.processOnServerError(x0); }
  gSobject.processOnServerOk = function(x0) { return Chat.processOnServerOk(x0); }
  gSobject.processPublishMessage = function(x0) { return Chat.processPublishMessage(x0); }
  gSobject.processOnServerList = function(x0) { return Chat.processOnServerList(x0); }
  gSobject.get = function(x0) { return Chat.get(x0); }
  gSobject.save = function(onOk, onError) {
      console.log('Chat going!');
    if (onOk === undefined) onOk = null;
    if (onError === undefined) onError = null;
    if (!gSmethodCall(gSobject,"clientValidations",gSlist([]))) {
      return 0;
    } else {

        if (gSbool(Chat.dataHandler)) {
        var numberTransaction = null;
        if (!gSbool(gSgetProperty(gSthisOrObject(this,gSobject),"id"))) {
          numberTransaction = gSmethodCall(Chat.dataHandler,"insert",gSlist([gSgetProperty(this.gSclass,"name"), this]));
        } else {
          numberTransaction = gSmethodCall(Chat.dataHandler,"update",gSlist([gSgetProperty(this.gSclass,"name"), this]));
        };
        var transaction = gSmap().add("item",this).add("onOk",onOk).add("onError",onError);
        gSmethodCall(Chat.mapTransactions,"put",gSlist([numberTransaction, transaction]));
        return numberTransaction;
      } else {
        if (!gSbool(gSgetProperty(gSthisOrObject(this,gSobject),"id"))) {
          gSsetProperty(this,"id",++Chat.lastId);
          Chat.listItems.leftShift(this);
          gSmethodCall(this,"processChanges",gSlist([gSmap().add("action","insert").add("item",this)]));
        } else {
          gSmethodCall(this,"processChanges",gSlist([gSmap().add("action","update").add("item",this)]));
        };
        return gSgetProperty(gSthisOrObject(this,gSobject),"id");
      };
    };
  }
  gSobject.processChanges = function(x0) { return Chat.processChanges(x0); }
  gSobject.Chat1 = function(map) { gSpassMapToObject(map,this); return this;};
  if (arguments.length==1) {gSobject.Chat1(arguments[0]); }
  
  return gSobject;
};
Chat.list = function(it) {
  return Chat.listItems;
}
Chat.count = function(it) {
  return gSmethodCall(Chat.listItems,"size",gSlist([]));
}
Chat.processOnServerError = function(data) {
  if (Chat.mapTransactions [ gSgetProperty(data,"number")]) {
    if (gSbool(gSgetProperty(Chat.mapTransactions [ gSgetProperty(data,"number")],"onError"))) {
      gSgetProperty(Chat.mapTransactions [ gSgetProperty(data,"number")],"onError")();
    };
    return gSmethodCall(Chat.mapTransactions,"remove",gSlist([gSgetProperty(data,"number")]));
  } else {
    return null
  };
}
Chat.processOnServerOk = function(data) {
    console.log('Chat coming->'+data);
  if (Chat.mapTransactions [ gSgetProperty(data,"number")]) {
    var item = gSgetProperty(Chat.mapTransactions [ gSgetProperty(data,"number")],"item");
    gSmethodCall(gSgetProperty(data,"item"),"each",gSlist([function(key, value) {
      return gSsetProperty(item,"" + (key) + "",value);
    }]));
    if (gSequals(gSgetProperty(data,"action"), "insert")) {
      Chat.listItems.leftShift(item);
    };
    if (gSbool(gSgetProperty(Chat.mapTransactions [ gSgetProperty(data,"number")],"onOk"))) {
      gSgetProperty(Chat.mapTransactions [ gSgetProperty(data,"number")],"onOk")();
    };
    gSmethodCall(Chat.mapTransactions,"remove",gSlist([gSgetProperty(data,"number")]));
    return gSmethodCall(this,"processChanges",gSlist([data]));
  } else {
    return null
  };
}
Chat.processPublishMessage = function(data) {
  if (Chat.version < gSgetProperty(data,"version")) {
    if (gSequals(gSgetProperty(data,"action"), "list")) {
      gSmethodCall(this,"processOnServerList",gSlist([data]));
    } else {
      var item = null;
      if (gSequals(gSgetProperty(data,"action"), "insert")) {
        item = gSmethodCall(gSclassForName(gSgetProperty(data,"model")),"newInstance",gSlist([]));
      } else {
        item = gSmethodCall(this,"get",gSlist([gSgetProperty(gSgetProperty(data,"item"),"id")]));
      };
      if (gSbool(gSgetProperty(data,"item"))) {
        gSmethodCall(gSgetProperty(data,"item"),"each",gSlist([function(key, value) {
          return gSsetProperty(item,"" + (key) + "",value);
        }]));
      };
      if (gSequals(gSgetProperty(data,"action"), "insert")) {
        Chat.listItems.leftShift(item);
      };
    };
    return gSmethodCall(this,"processChanges",gSlist([data]));
  } else {
    return null
  };
}
Chat.processOnServerList = function(data) {
  listItems = gSlist([]);
  var dataArrived = data;
  if (gSbool(gSgetProperty(data,"items"))) {
    gSmethodCall(gSgetProperty(data,"items"),"each",gSlist([function(row) {
      var item = gSmethodCall(gSclassForName(gSgetProperty(dataArrived,"model")),"newInstance",gSlist([]));
      gSmethodCall(row,"each",gSlist([function(key, value) {
        return gSsetProperty(item,"" + (key) + "",value);
      }]));
      return Chat.listItems.leftShift(item);
    }]));
  };
  return gSmethodCall(this,"processChanges",gSlist([data]));
}
Chat.get = function(value) {
  var number = value;
  var item = gSmethodCall(Chat.listItems,"find",gSlist([function(it) {
    return gSequals(gSgetProperty(it,"id"), number);
  }]));
  return item;
}
Chat.processChanges = function(data) {
  var actionData = data;
  if (gSbool(gSgetProperty(data,"version"))) {
    gSsetProperty(this,"version",gSgetProperty(data,"version"));
  };
  if (gSbool(Chat.changeListeners)) {
    return gSmethodCall(Chat.changeListeners,"each",gSlist([function(it) {
      return it(actionData);
    }]));
  } else {
    return null
  };
}
Chat.listColumns = gSlist([gSexpando(gSmap().add("name","who").add("type","java.lang.String").add("constraints",gSmap())) , gSexpando(gSmap().add("name","message").add("type","java.lang.String").add("constraints",gSmap()))]);
Chat.listItems = gSlist([]);
Chat.mapTransactions = gSmap();
Chat.dataHandler = null;
Chat.lastId = 0;
Chat.version = 0;
Chat.changeListeners = gSlist([]);
