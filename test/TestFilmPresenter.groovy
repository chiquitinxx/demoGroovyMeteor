import Movie
import spock.lang.Specification

/**
 * User: jorgefrancoleza
 * Date: 01/02/13
 */
class TestFilmPresenter extends Specification {

    def static final FILM_NAME = 'Blade'
    def static final NAME = 'Jorge'
    def static final MESSAGE = 'Hello!'

    def getPresenter() {
        def presenter = new FilmsPresenter()
        presenter.view = new JQueryView()
        presenter.onLoad()
        return presenter
    }

    def cleanup() {
        Movie.listItems = []
        Movie.lastId = 0
        Movie.changeListeners = []
    }


    def 'load presenter'() {
        given:
        def presenter = getPresenter()

        expect:
        Movie.list().size() == 0
        presenter.view.newItemNameValue == ''
        presenter.view.itemsHtml == '<p>No items added.</p>'
    }

    def 'add a film'() {
        given: 'add a film'
        def presenter = getPresenter()
        presenter.view.newItemNameValue = FILM_NAME
        presenter.addFilmOnClick()

        expect: 'movie added to database and show in window'
        Movie.count() == 1
        Movie.get(1).name == FILM_NAME
        presenter.view.itemsHtml == "<ul><li onclick='presenter.addOneClick(${Movie.get(1).id})'>${FILM_NAME} has been clicked 0 times.</li></ul>"

        and:

        when:'chick on added movie'
        presenter.addOneClick(Movie.get(1).id);

        then:'number of clicks increased'
        Movie.get(1).numberClicks == 1
        presenter.view.itemsHtml == "<ul><li onclick='presenter.addOneClick(${Movie.get(1).id})'>${FILM_NAME} has been clicked 1 times.</li></ul>"
        presenter.view.newItemNameValue == ''
    }

    /*
    def 'change name or message in the chat'() {
        given:
        def presenter = getPresenter()

        when: 'Name of message in chat changes'
        presenter.nameChatOnKeyup(name,null)
        presenter.messageChatOnKeyup(message,null)

        then: 'Button "send" enabled if name>3 and message>0 and labelMessage changes with name'
        presenter.view.addMessageEnabled == buttonEnabled
        presenter.view.labelMessageText == nameText

        where:
        name    |message    |buttonEnabled  |nameText
        ''      |''         |false          |FilmsPresenter.INITIAL_CHAT_LABEL
        NAME    |''         |false          |NAME+' :'
        ''      |MESSAGE    |false          |FilmsPresenter.INITIAL_CHAT_LABEL
        NAME    |MESSAGE    |true           |NAME+' :'
    }

    def 'send a message appears in chat window'() {
        given:
        def presenter = getPresenter()
        presenter.nameChatOnKeyup(NAME,null)
        presenter.messageChatOnKeyup(MESSAGE,null)

        when:'send message button click'
        presenter.sendMessageOnClick()

        then: 'message added to db, appears in chat window and message chat blanks'
        Chat.count() == 1
        Chat.list()[0].who == NAME
        Chat.list()[0].message == MESSAGE
        presenter.view.messagesHtml.contains("<p>${NAME}: ${MESSAGE}</p>")
        presenter.view.messageChatValue == ''
    }
    */

}
