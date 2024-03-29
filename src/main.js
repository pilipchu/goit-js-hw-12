import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { getImages } from "./js/pixebay-api";
import { renderImages } from "./js/render-functions";


export let image
let page = 1
let maxPage = 0
const perSize = 24

export const refs = {
    formElem: document.querySelector('form'),
    list: document.querySelector('.gallery-image'),
    loadItem: document.querySelector('.loader-cont'),
    btnLoad: document.querySelector('.btn-primary')
}


refs.formElem.addEventListener('submit', onFormSubmit)


refs.btnLoad.addEventListener('click', onLoadMoreClick)

async function onFormSubmit(event){
    event.preventDefault()
    hideLoadMore()
    page = 1
    image = event.target.elements.search.value.trim()
    if (image) {
    refs.list.innerHTML = ''
        const data = await getImages(image, page) 
   maxPage = Math.ceil(data.total / perSize) 
    refs.list.insertAdjacentHTML('beforeend', renderImages(data.hits))
    checkBtnStatus()
    } else {
        refs.list.innerHTML = '' 
        iziToast.info({
        message: "Line is empty, enter a value",
        position: "topLeft"
    })
}
    event.target.reset()
}


// запит для загрузки більше данних з сервера
async function onLoadMoreClick() {
 page +=1
    const data = await getImages(image, page) 

    refs.list.insertAdjacentHTML('beforeend', renderImages(data.hits))
    checkBtnStatus()
}

function checkBtnStatus() {
    if (page >= maxPage) {
        hideLoadMore()
    } else {
        showLoadMore()
    }
}

// показує кнопку
function showLoadMore() {
    refs.btnLoad.classList.remove('hidden')
}
// приховує кнопку
export function hideLoadMore() {
    refs.btnLoad.classList.add('hidden')
}