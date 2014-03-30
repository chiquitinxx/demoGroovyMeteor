import model.Movie

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
            Movie.list().sort { it.name }.each { Movie film ->
                data+="<li onclick='presenter.addOneClick(${film.id})'>" +
                        "${film.name} has been clicked ${film.numberClicks} times."
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
}
