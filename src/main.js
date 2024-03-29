import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { getImages } from "./js/pixebay-api";
import { renderImages } from "./js/render-functions";
import { checkData } from "./js/render-functions";


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
    refs.list.innerHTML = ''
    if (!image && checkData) {
        iziToast.info({
            message: "Line is empty, enter a value",
            position: "topLeft"
        })
        refs.list.innerHTML = ''
        return
    }
    try {
         const data = await getImages(image, page) 
   maxPage = Math.ceil(data.totalHits / perSize) 
        refs.list.insertAdjacentHTML('beforeend', renderImages(data.hits))
        lightbox.refresh()
        checkBtnStatus()
    } catch (err) {
        console.log(err)
    }
    
    event.target.reset()
}


// запит для загрузки більше данних з сервера
async function onLoadMoreClick() {
    try {
        page += 1
        const data = await getImages(image, page) 

        refs.list.insertAdjacentHTML('beforeend', renderImages(data.hits))
        lightbox.refresh()
    }catch (err) {
        console.log(err)
    }
    checkBtnStatus()
}

function checkBtnStatus() {
    if (page >= maxPage) {
        hideLoadMore()
        iziToast.info({
            message: "We're sorry, but you've reached the end of search results.",
            position: "topRight",
        })
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


export const lightbox = new SimpleLightbox('.gallery-link', { 
    captionsData: 'alt',
    captionDelay: 250,
    overlayOpacity: 0.8,
 })