export class RouteData {
    /**
     * @private
     * @type {string}
     */
    name = "";
    /**
     * @private
     * @type {string}
     */
    path = "";

    /**
     * @param path
     * @param name
     * @param views
     */
    constructor({ path, name, views }) {
        this.path = path;
        this.name = name;
        this.views = views;
    }

    //  Getters
    get path() {
        return this.path;
    }

    get name() {
        return this.name;
    }

    /**
     *
     * @return {React.Component|*}
     */
    get views() {
        return this.views;
    }

    /**
     * @private
     * @type {React.Component}
     */
    views = () => {
    };
}