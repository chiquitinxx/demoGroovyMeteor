import Movie

class FilmsPresenter {

    def static final INITIAL_CHAT_LABEL = '? :'
	def view

    def onLoad() {
        putEmptyList()
        view.newItemNameValue = ''
        view.addFilmEnabled = false
        if (!Movie.changeListeners) {
            Movie.changeListeners << this.&renderFilms
        }

        /* Chat
        view.sendMessageEnabled = false
        view.labelMessageText = INITIAL_CHAT_LABEL
        view.nameChatValue = ''
        view.messageChatValue = ''
        if (!Chat.changeListeners) {
            Chat.changeListeners << this.&processChatChange
        }
        */
	}

    def newItemNameOnKeyup(String value, key) {
        view.newItemNameValue = value
        view.addFilmEnabled = value.size() > 3
        if (key == 13 && value.size() > 3) {
            addFilmOnClick();
        }
    }

    def addFilmOnClick() {
        def film = new Movie()
        film.name = view.newItemNameValue
        film.save()
        view.newItemNameValue = ''
    }

    def putEmptyList() {
        view.itemsHtml = '<p>No items added.</p>'
    }

    def renderFilms(dataRecieved) {
        if (Movie.count()==0) {
            putEmptyList()
        } else {
            String data = '<ul>'
            Movie.list().sort { it.numberClicks }.each { Movie film ->
                data+="<li onclick='presenter.addOneClick(${film.id})'>${film.name} has been clicked ${film.numberClicks} times."
                if (film.numberClicks>10) {
                    data+=' Maybe amazing.'
                } else if (film.numberClicks>5) {
                    data+=' Looks good movie.'
                }
                data+='</li>'
            }
            data += '</ul>'
            view.itemsHtml = data
        }
    }

    def addOneClick(id) {
        def Movie film = Movie.get(id)
        if (film) {
            film.numberClicks++
            film.save()
        }
    }

    /* Chat
    def checkSendMessageUp() {
        if (view.nameChatValue.size()>3 && view.messageChatValue.size()>0) {
            view.sendMessageEnabled = true
        } else {
            view.sendMessageEnabled = false
        }
    }

    def nameChatOnKeyup(String value, key) {
        view.nameChatValue = value
        if (value.size()>0) {
            view.labelMessageText = value + ' :'
        } else {
            view.labelMessageText = INITIAL_CHAT_LABEL
        }
        checkSendMessageUp()
    }

    def messageChatOnKeyup(String value, key) {
        view.messageChatValue = value
        checkSendMessageUp()
    }

    def sendMessageOnClick() {
        def newChat = new Chat(who: view.nameChatValue, message: view.messageChatValue)
        newChat.save()
        view.messageChatValue = ''
    }

    def processChatChange(dataRecieved) {
        if (dataRecieved.item) {
            view.messagesPrepend "<p>${dataRecieved.item.who}: ${dataRecieved.item.message}</p>"
        }
    }
    */
}
