import data.ServerDb
import files.FilesController
import org.grooscript.GrooScript
import org.vertx.groovy.core.eventbus.EventBus

/**
 * User: jfl
 * Date: 19/01/13
 */

def EventBus eb = vertx.eventBus

//Little db in memory for model's data
def database = new ServerDb()

//Data handler of model actions in clients
def myDatabaseHandler = { message ->
    //println "I received a message ${message.body}"

    def model = message.body.model
    def result = database.process(message.body)
    message.reply result

    if (result.status && result.status == ServerDb.OK_STATUS) {
        //Publish Ok message, inserts and updates
        eb.publish(model, result)
    }
}

//Register handler for incoming model's data from clients
eb.registerHandler("model", myDatabaseHandler)

//Http Server
def server = vertx.createHttpServer().requestHandler { req ->
    def file = req.uri == "/" ? "html/index.html" : "."+req.uri

    req.response.sendFile "$file"
}

//Files Control
def FilesController filesController = new FilesController()
filesController.init()

//Default local port
def port = 8080

//Bridge config
def config = ["prefix": "/eventbus"]
def inboundPermitted = []
inboundPermitted << ["address": "model"]
def outboundPermitted = []

//Add all model files to outbound
def thisFolder = System.getProperty("user.dir")
filesController.files.each { fileData ->
    if (fileData.name.startsWith(thisFolder+'/model/')) {
        def String name = fileData.name.substring(thisFolder.size()+7,fileData.name.size()-7)
        name = name.replaceAll('/','.')
        println 'Adding Model Event->'+name
        outboundPermitted << ["address": name]
    }
}

outboundPermitted << ["address": "reload"]

//Create sockjs bridge in http server
vertx.createSockJSServer(server).bridge(config, inboundPermitted, outboundPermitted)

//Launch http server
server.listen( (System.getenv('PORT')?System.getenv('PORT') as int : port), '0.0.0.0' )

println 'Running SockJs/Web server on '+port

//Grooscript conversion
def convert = { String nameFile ->

    def pathSource = nameFile
    def pathOutput = 'js'

    GrooScript.setConversionProperty('addClassNames',true)
    GrooScript.convert(pathSource,pathOutput)
}

//Periodic task
//TODO this async with vertx stuff
vertx.setPeriodic(1000,  {
    //log.info('Every second this is printed')
    filesController.readFiles()
    if (filesController.hasChanges()) {
        //Convert to javascript model and presenter files modified
        filesController.changes.each { data ->
            if (data.name.contains("/presenter/")) {
                convert(data.name)
            }
            if (data.name.contains("/model/")) {
                convert(data.name)
            }
        }
        filesController.commitFileChanges()
        //println "Sending reload."
        eb.publish("reload",[reload:true])
    }
})


