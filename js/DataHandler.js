function DataHandler() {
  var gSobject = inherit(gsBaseClass,'DataHandler');
  gSobject.eventBus = null;
  gSobject.numberCall = 0;
  gSobject.sendAction = function(table, item, action) {
    var shortItem = gSmap();
    gSmethodCall(gSgetProperty(item,"listColumns"),"each",gSlist([function(field) {
      return (shortItem [ gSgetProperty(field,"name")]) = (item [ gSgetProperty(field,"name")]);
    }]));
    if (gSequals(action, "update")) {
      (shortItem [ "id"]) = gSgetProperty(item,"id");
    };
    var sendItem = gSmap().add("action",action).add("model",table).add("number",++gSobject.numberCall).add("item",shortItem);
    gSmethodCall(gSobject,"sendEventBus",gSlist(["model", sendItem, this["processResult"]]));
    return gSobject.numberCall;
  }
  gSobject.sendList = function(table) {
    var sendItem = gSmap().add("action","list").add("model",table);
    gSmethodCall(gSobject,"sendEventBus",gSlist(["model", sendItem, this["processList"]]));
    return gSobject.numberCall;
  }
  gSobject.insert = function(table, item) {
    return gSmethodCall(gSobject,"sendAction",gSlist([table, item, "insert"]));
  }
  gSobject.update = function(table, item) {
    return gSmethodCall(gSobject,"sendAction",gSlist([table, item, "update"]));
  }
  gSobject.list = function(table) {
    return gSmethodCall(gSobject,"sendList",gSlist([table]));
  }
  gSobject.processResult = function(data) {
      data = gSmethodCall(gSobject,"convertData",gSlist([data]));
    if (gSequals(gSgetProperty(data,"status"), "ERROR")) {
      gSmethodCall(gSmethodCall(gSobject,"getClassData",gSlist([gSgetProperty(data,"model")])),"processOnServerError",gSlist([data]));
    };
    if (gSequals(gSgetProperty(data,"status"), "OK")) {
      gSmethodCall(gSmethodCall(gSobject,"getClassData",gSlist([gSgetProperty(data,"model")])),"processOnServerOk",gSlist([data]));
    };
  }
  gSobject.processList = function(data) {
    data = gSmethodCall(gSobject,"convertData",gSlist([data]));
    return gSmethodCall(gSmethodCall(gSobject,"getClassData",gSlist([gSgetProperty(data,"model")])),"processOnServerList",gSlist([data]));
  }
  gSobject.DataHandler1 = function(vertxEventBus) {
    gSobject.eventBus = vertxEventBus;
    return this;
  }
  if (arguments.length==1) {gSobject.DataHandler1(arguments[0]); }
  
  return gSobject;
};
