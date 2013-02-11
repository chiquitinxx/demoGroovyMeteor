import data.ast.DomainClass

/**
 * User: jorgefrancoleza
 * Date: 01/02/13
 */
@DomainClass
class Movie  {

    String name
    Integer numberClicks = 0

    static constraints = {
        name blank:false
    }
}
