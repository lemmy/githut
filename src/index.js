/**
 * Entrypoint for the react app
 * Provides a basic app wrapper for react
 * @author Fabian Beuke <mail@beuke.org>
 * @license AGPL-3.0
 */

import { HashRouter } from "react-router-dom";
import Layout from "components/Layout"
import { getMaxDataDate } from "common/utils.js"
import { hydrate, render } from "react-dom"

const production = window.location.href.includes("lemmster.de")

const main = async () => {
    const { year, quarter } = await getMaxDataDate()
    const defaultPath = "#/total/" + year + "/" + quarter
    const loc = window.location.href
    const validUrlParams = ["total", "pull_requests", "pushes", "stars", "issues"]
    const isValidURL = validUrlParams.some((v) => loc.includes(v))
    const url = (production ? "/FMLangStats/" : "/") + defaultPath

    if (!isValidURL) {
        window.history.pushState("", "", url)
    }

    const rootElement = document.getElementById("root")
    if (rootElement.hasChildNodes()) {
        hydrate(
            <HashRouter>
                <Layout />
            </HashRouter>,
            document.getElementById("root")
        )
    } else {
        render(
            <HashRouter>
                <Layout />
            </HashRouter>,
            document.getElementById("root")
        )
    }
}

main()
