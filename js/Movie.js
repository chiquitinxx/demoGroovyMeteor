function Movie() {
  var gSobject = inherit(gsBaseClass,'Movie');
  gSobject.gSclass = [];
  gSobject.gSclass.superclass = [];
  gSobject.gSclass.superclass.name= 'java.lang.Object';
  gSobject.gSclass.superclass.simpleName= 'Object';
  gSobject.gSclass.name = 'Movie';
  gSobject.gSclass.simpleName = 'Movie';
  gSobject.name = null;
  gSobject.numberClicks = 0;
  gSobject.__defineGetter__('constraints', function(){ return Movie.constraints; });
  gSobject.__defineSetter__('constraints', function(gSval){ Movie.constraints = gSval; });
  gSobject.__defineGetter__('listColumns', function(){ return Movie.listColumns; });
  gSobject.__defineSetter__('listColumns', function(gSval){ Movie.listColumns = gSval; });
  gSobject.__defineGetter__('listItems', function(){ return Movie.listItems; });
  gSobject.__defineSetter__('listItems', function(gSval){ Movie.listItems = gSval; });
  gSobject.__defineGetter__('mapTransactions', function(){ return Movie.mapTransactions; });
  gSobject.__defineSetter__('mapTransactions', function(gSval){ Movie.mapTransactions = gSval; });
  gSobject.__defineGetter__('dataHandler', function(){ return Movie.dataHandler; });
  gSobject.__defineSetter__('dataHandler', function(gSval){ Movie.dataHandler = gSval; });
  gSobject.__defineGetter__('lastId', function(){ return Movie.lastId; });
  gSobject.__defineSetter__('lastId', function(gSval){ Movie.lastId = gSval; });
  gSobject.__defineGetter__('version', function(){ return Movie.version; });
  gSobject.__defineSetter__('version', function(gSval){ Movie.version = gSval; });
  gSobject.id = null;
  gSobject.errors = gSmap();
  gSobject.__defineGetter__('changeListeners', function(){ return Movie.changeListeners; });
  gSobject.__defineSetter__('changeListeners', function(gSval){ Movie.changeListeners = gSval; });
  gSobject.clientValidations = function(it) {
    var result = true;
    var item = this;
    gSobject.errors = gSmap();
    gSmethodCall(Movie.listColumns,"each",gSlist([function(field) {
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
  gSobject.list = function() { return Movie.list(); }
  gSobject.count = function() { return Movie.count(); }
  gSobject.processOnServerError = function(x0) { return Movie.processOnServerError(x0); }
  gSobject.processOnServerOk = function(x0) { return Movie.processOnServerOk(x0); }
  gSobject.processPublishMessage = function(x0) { return Movie.processPublishMessage(x0); }
  gSobject.processOnServerList = function(x0) { return Movie.processOnServerList(x0); }
  gSobject.get = function(x0) { return Movie.get(x0); }
  gSobject.save = function(onOk, onError) {
    if (onOk === undefined) onOk = null;
    if (onError === undefined) onError = null;
    if (!gSmethodCall(gSobject,"clientValidations",gSlist([]))) {
      return 0;
    } else {
      if (gSbool(Movie.dataHandler)) {
        var numberTransaction = null;
        if (!gSbool(gSgetProperty(gSthisOrObject(this,gSobject),"id"))) {
          numberTransaction = gSmethodCall(Movie.dataHandler,"insert",gSlist([gSgetProperty(this.gSclass,"name"), this]));
        } else {
          numberTransaction = gSmethodCall(Movie.dataHandler,"update",gSlist([gSgetProperty(this.gSclass,"name"), this]));
        };
        var transaction = gSmap().add("item",this).add("onOk",onOk).add("onError",onError);
        gSmethodCall(Movie.mapTransactions,"put",gSlist([numberTransaction, transaction]));
        return numberTransaction;
      } else {
        if (!gSbool(gSgetProperty(gSthisOrObject(this,gSobject),"id"))) {
          gSsetProperty(this,"id",++Movie.lastId);
          Movie.listItems.leftShift(this);
          gSmethodCall(this,"processChanges",gSlist([gSmap().add("action","insert").add("item",this)]));
        } else {
          gSmethodCall(this,"processChanges",gSlist([gSmap().add("action","update").add("item",this)]));
        };
        return gSgetProperty(gSthisOrObject(this,gSobject),"id");
      };
    };
  }
  gSobject.processChanges = function(x0) { return Movie.processChanges(x0); }
  gSobject.Movie1 = function(map) { gSpassMapToObject(map,this); return this;};
  if (arguments.length==1) {gSobject.Movie1(arguments[0]); }
  
  return gSobject;
};
Movie.list = function(it) {
  return Movie.listItems;
}
Movie.count = function(it) {
  return gSmethodCall(Movie.listItems,"size",gSlist([]));
}
Movie.processOnServerError = function(data) {
  if (Movie.mapTransactions [ gSgetProperty(data,"number")]) {
    if (gSbool(gSgetProperty(Movie.mapTransactions [ gSgetProperty(data,"number")],"onError"))) {
      gSgetProperty(Movie.mapTransactions [ gSgetProperty(data,"number")],"onError")();
    };
    return gSmethodCall(Movie.mapTransactions,"remove",gSlist([gSgetProperty(data,"number")]));
  } else {
    return null
  };
}
Movie.processOnServerOk = function(data) {
  if (Movie.mapTransactions [ gSgetProperty(data,"number")]) {
    var item = gSgetProperty(Movie.mapTransactions [ gSgetProperty(data,"number")],"item");
    gSmethodCall(gSgetProperty(data,"item"),"each",gSlist([function(key, value) {
      return gSsetProperty(item,"" + (key) + "",value);
    }]));
    if (gSequals(gSgetProperty(data,"action"), "insert")) {
      Movie.listItems.leftShift(item);
    };
    if (gSbool(gSgetProperty(Movie.mapTransactions [ gSgetProperty(data,"number")],"onOk"))) {
      gSgetProperty(Movie.mapTransactions [ gSgetProperty(data,"number")],"onOk")();
    };
    gSmethodCall(Movie.mapTransactions,"remove",gSlist([gSgetProperty(data,"number")]));
    return gSmethodCall(this,"processChanges",gSlist([data]));
  } else {
    return null
  };
}
Movie.processPublishMessage = function(data) {
  if (Movie.version < gSgetProperty(data,"version")) {
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
        Movie.listItems.leftShift(item);
      };
    };
    return gSmethodCall(this,"processChanges",gSlist([data]));
  } else {
    return null
  };
}
Movie.processOnServerList = function(data) {
  listItems = gSlist([]);
  var dataArrived = data;
  if (gSbool(gSgetProperty(data,"items"))) {
    gSmethodCall(gSgetProperty(data,"items"),"each",gSlist([function(row) {
      var item = gSmethodCall(gSclassForName(gSgetProperty(dataArrived,"model")),"newInstance",gSlist([]));
      gSmethodCall(row,"each",gSlist([function(key, value) {
        return gSsetProperty(item,"" + (key) + "",value);
      }]));
      return Movie.listItems.leftShift(item);
    }]));
  };
  return gSmethodCall(this,"processChanges",gSlist([data]));
}
Movie.get = function(value) {
  var number = value;
  var item = gSmethodCall(Movie.listItems,"find",gSlist([function(it) {
    return gSequals(gSgetProperty(it,"id"), number);
  }]));
  return item;
}
Movie.processChanges = function(data) {
  var actionData = data;
  if (gSbool(gSgetProperty(data,"version"))) {
    gSsetProperty(this,"version",gSgetProperty(data,"version"));
  };
  if (gSbool(Movie.changeListeners)) {
    return gSmethodCall(Movie.changeListeners,"each",gSlist([function(it) {
      return it(actionData);
    }]));
  } else {
    return null
  };
}
Movie.constraints = function(it) {
  return gSmethodCall(gSobject,"name",gSlist([gSmap().add("blank",false)]));
};
Movie.listColumns = gSlist([gSexpando(gSmap().add("name","name").add("type","java.lang.String").add("constraints",gSmap().add("blank",false))) , gSexpando(gSmap().add("name","numberClicks").add("type","java.lang.Integer").add("constraints",gSmap()))]);
Movie.listItems = gSlist([]);
Movie.mapTransactions = gSmap();
Movie.dataHandler = null;
Movie.lastId = 0;
Movie.version = 0;
Movie.changeListeners = gSlist([]);
