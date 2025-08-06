// carousel of images for the home page

import Swiper from "swiper";
import {Navigation, Pagination, Autoplay} from "swiper/modules";

const swiper = new Swiper('.swiper', {
    modules: [Navigation, Pagination, Autoplay],
    loop: true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    pagination: {}
})