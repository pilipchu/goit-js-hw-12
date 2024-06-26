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
const perSize = 15

// обєкт з доступом до елементів розмітки
export const refs = {
    formElem: document.querySelector('form'),
    list: document.querySelector('.gallery-image'),
    loadItem: document.querySelector('.loader-cont'),
    btnLoad: document.querySelector('.btn-primary'),
    loadIcon: document.querySelector('.content-loader'),
    loadIconMore: document.querySelector('.loader')
}


refs.formElem.addEventListener('submit', onFormSubmit)


refs.btnLoad.addEventListener('click', onLoadMoreClick)

// івент по запиту на сервер
async function onFormSubmit(event){
    event.preventDefault()
    hideLoadMore()
    page = 1
    image = event.target.elements.search.value.trim()
    refs.list.innerHTML = ''
    if (!image && checkData) {
        hideLoadIcon()
        iziToast.info({
            message: "Line is empty, enter a value",
            position: "topLeft"
        })
        refs.list.innerHTML = ''
        return
    }
    try {
        showLoadIcon()
         const data = await getImages(image, page) 
        maxPage = Math.ceil(data.totalHits / perSize) 
        refs.list.insertAdjacentHTML('beforeend', renderImages(data.hits))
        lightbox.refresh()
        checkBtnStatus()
        hideLoadIcon()
    } catch (err) {
        console.log(err)
    }
    
    event.target.reset()
}


// запит для загрузки більше данних з сервера
async function onLoadMoreClick() {
    try {
        page += 1
        showLoadBtn()
        const data = await getImages(image, page) 

        refs.list.insertAdjacentHTML('beforeend', renderImages(data.hits))
        hiddenLoadBtn()
        lightbox.refresh()
    }catch (err) {
        console.log(err)
    }
    myScroll()
    checkBtnStatus()
}

// перевіка чи потрібно показувати кнопку
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

// функция показу іконки при загрузкі
function showLoadIcon() {
    refs.loadIcon.classList.remove('hidden')
}

// функция приховування іконки загрузки
export function hideLoadIcon() {
    refs.loadIcon.classList.add('hidden')
}

// функция показу іконки загрузки в кнопкі
function showLoadBtn(){
    refs.loadIconMore.classList.remove('hidden')
}

// функция приховування іконки загрузки в кнопкі
function hiddenLoadBtn(){
    refs.loadIconMore.classList.add('hidden')
}

// скрол на висоту двох вкладень
function myScroll(){
    const item = document.querySelector('.gallery-item')
    const height = item.getBoundingClientRect().height;

    window.scrollBy({
        top: height*2,
        behavior: 'smooth',
      });
}

// слайт бар
export const lightbox = new SimpleLightbox('.gallery-link', { 
    captionsData: 'alt',
    captionDelay: 250,
    overlayOpacity: 0.8,
 })