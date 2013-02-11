var presenter;

//var eb = new vertx.EventBus('http://mighty-mountain-3330.herokuapp.com/eventbus')
//var eb = new vertx.EventBus('http://localhost:8080/eventbus')

(function () {

    //var thereIsARemoteModel = true;
    var namePresenter;
    var serverDirection = 'http://localhost:8080';
    //var serverDirection = 'http://mighty-mountain-3330.herokuapp.com';

    function dinamicallyLoadJs(route, callOnFinish) {
        var headID = document.getElementsByTagName("head")[0];
        var newScript = document.createElement('script');
        newScript.type = 'text/javascript';
        newScript.onload=callOnFinish;
        newScript.src = route;
        headID.appendChild(newScript);
    }

    function eventbusLoaded() {
        var eb = new vertx.EventBus(serverDirection+'/eventbus');

        var dataHandler = DataHandler(eb);
        dataHandler.sendEventBus = function(name,data,functionBack) {
            delete data.gSdefaultValue;
            delete data.item.gSdefaultValue;
            //console.log('Data to send->'+data);
            this.eventBus.send(name, data, functionBack)
        }
        dataHandler.getClassData = function(name) {
            //Remove package data
            while (name.indexOf('.')>=0) {
                name = name.substr(name.indexOf('.')+1)
                //console.log('Name->'+name);
            }
            return eval(name);
        }
        dataHandler.convertData = function(data) {
            var result = null;
            if (data!=null && data!=undefined && (typeof data === "object")) {
                if (data instanceof Array) {
                    result = gSlist([]);
                    for (obj in data) {

                        if (data[obj]!=null && data[obj]!=undefined && (typeof data[obj] === "object")) {
                            result.add(this.convertData(data[obj]));
                        } else {
                            result.add(data[obj]);
                        }
                    }
                } else {
                    result = gSmap();
                    for (obj in data) {

                        if (data[obj]!=null && data[obj]!=undefined && (typeof data[obj] === "object")) {
                            result.add(obj,this.convertData(data[obj]));
                        } else {
                            result.add(obj,data[obj]);
                        }
                    }
                }
            }
            return result;
        }

        eb.onopen = function() {

            //console.log('EventBus started');

            eb.registerHandler("reload", function(message) {

                //console.log('Got reload message :' + JSON.stringify(message));
                if (message.reload == true) {
                    window.location.reload();
                }

            });

            $.each($('body').find('[data-collection]'), function (item) {
                //console.log($(this).data('collection'));
                var name = $(this).data('collection');
                // name== 'model.Movie'
                //console.log('Name->'+name);
                eb.registerHandler(name, function(message) {

                    console.log('Got change message: ' + JSON.stringify(message));
                    var data = dataHandler.convertData(message);
                    gSclassForName(name).processPublishMessage(data);

                });

                //Lets get the list of items
                eb.send('model', {action: 'list', model:name}, function(message) {
                    console.log('Got list response: ' + JSON.stringify(message));
                    var data = dataHandler.convertData(message);
                    gSclassForName(name).processPublishMessage(data);
                });

                eb.onclose = function() {
                    if (console) console.log('Connection closed.');
                    //sockJSConn = new SockJS(url, undefined, options);
                }

            })

        }

        //Repeat for each model
        //Movie.dataHandler = dh;

        $.each($('body').find('[data-collection]'), function (item) {
            var name = $(this).data('collection');
            gSclassForName(name).dataHandler = dataHandler;
        });



    }


    function initPresenter() {
        //console.log('Init presenter.');
        presenter = eval(namePresenter)();
        presenter.view = JQueryView();
        presenter.view.init(presenter);
        presenter.onLoad();
    }

    var numberOfJs = 0;

    function jsLoaded() {
        numberOfJs = numberOfJs - 1;
        //console.log("One charged->"+numberOfJs);
        if (numberOfJs == 0) {

            //console.log("Starting loading...");
            //Do event bus stuff
            eventbusLoaded();

            //Init the presenter
            initPresenter();

            //gSconsoleInfo = true
        }
    }

    $(document).ready(function() {

        //Must be a presenter to launch all stuff
        if ($('body[data-presenter]')) {
            //console.log($(this).data('collection'));

            var numberOfModels = $('body').find('[data-collection]').size();
            //console.log("Number of models->"+numberOfModels);
            numberOfJs = 4 + numberOfModels;

            namePresenter = $('body').data('presenter');
            //Remove package if defined
            while (namePresenter.indexOf('.')>=0) {
                namePresenter = namePresenter.substr(namePresenter.indexOf('.')+1)
            }

            //We get js's
            dinamicallyLoadJs(serverDirection+'/js/'+namePresenter+'.js',jsLoaded);
            dinamicallyLoadJs(serverDirection+'/js/JQueryView.js',jsLoaded);

            //Now model
            $.each($('body').find('[data-collection]'), function (item) {
                var name = $(this).data('collection');
                //Remove package if defined
                while (name.indexOf('.')>=0) {
                    name = name.substr(name.indexOf('.')+1)
                }

                dinamicallyLoadJs(serverDirection+'/js/'+name+'.js',jsLoaded);
            });
            //Conexion to vertx server
            dinamicallyLoadJs(serverDirection+'/js/vertxbus.js',jsLoaded);
            dinamicallyLoadJs(serverDirection+'/js/DataHandler.js',jsLoaded);
        };

    });

})();

