import {library} from "@fortawesome/fontawesome-svg-core";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {faUser, faCoffee} from "@fortawesome/free-solid-svg-icons";
import {faFontAwesome} from "@fortawesome/free-brands-svg-icons";

export default defineNuxtPlugin((nuxtApp) => {
    library.add(faUser, faCoffee, faFontAwesome);
    nuxtApp.vueApp.component("FontAwesomeIcon", FontAwesomeIcon)
})