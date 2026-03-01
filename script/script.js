const loaderShow = () => {
    const loader = getElementId('loadder');
    const videoContainer = getElementId('videoContainer');
    loader.classList.remove('hidden');
    videoContainer.classList.add('hidden');
}
const loaderDisabled = () => {
    const loader = getElementId('loadder');
    const videoContainer = getElementId('videoContainer');
    loader.classList.add('hidden');
    videoContainer.classList.remove('hidden');
}
const acriveClassRemove = () => {
    const acriveClass = document.getElementsByClassName('bg-btnBgRed');
    for (const active of acriveClass) {
        active.classList.remove('bg-btnBgRed');
        active.classList.remove('text-white');
    }
}
const getCategories = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(res => res.json())
        .then(data => displayCategories(data.categories))
}
const getvideo = (searchText = '') => {
    loaderShow()
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
        .then(res => res.json())
        .then(data => {
            acriveClassRemove()
            const btnAll = getElementId('getVideoAll');
            btnAll.classList.add('bg-btnBgRed')
            btnAll.classList.add('text-white')
            displayVideo(data.videos)
        })
}
const loadCategoryVideos = (id) => {
    loaderShow()
    const url = ` https://openapi.programming-hero.com/api/phero-tube/category/${id}`
    fetch(url).then(res => res.json()).then(data => {
        acriveClassRemove();
        const active = getElementId(`btn-${id}`)
        active.classList.add('bg-btnBgRed')
        active.classList.add('text-white')
        displayVideo(data.category)
    })
}
const loadVideoDettails = (videoId) => {
    const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
    fetch(url).then(res => res.json()).then(data => displayVideoDetails(data.video))
}
const displayVideoDetails = (video) => {
    const modal = getElementId('display_Details');
    modal.showModal();
    const modalInner = getElementId('modalInner');
    modalInner.innerHTML = `
        <h2>${video.title}</h2>
    `;
}
const displayCategories = (categories) => {

    for (const category of categories) {
        const categoryContainer = getElementId('categoryContainer');
        const div = newElement('div')
        div.innerHTML = `
        <button id="btn-${category.category_id}" onclick="loadCategoryVideos(${category.category_id})" class="btn bg-btnBgGray hover:bg-btnBgRed hover:text-white duration-200">${category.category}</button>
        `;
        categoryContainer.append(div);
    }
}
const displayVideo = (videos) => {
    loaderDisabled()
    const videoContainer = getElementId('videoContainer');
    videoContainer.innerHTML = '';
    if (videos.length === 0) {
        videoContainer.innerHTML = `
        <div class="col-span-full py-10 space-y-3">
            <div class="flex justify-center">
                <img src="assets/Icon.png" />
            </div>
            <h2 class="text-center font-bold">Oops!! Sorry, There is no <br> content here</h2>
        </div>        
        `
    }
    for (const video of videos) {
        const div = newElement('div');
        div.innerHTML = `
        <div class="card bg-base-100">
            <figure>
                <img class="w-full h-50 object-cover" src="${video.thumbnail}" />
            </figure>
            <div class="flex gap-3 py-3">
                <div class="avater">
                    <div class="avatar">
                        <div class="w-10 rounded-full">
                            <img src="${video.authors[0].profile_picture}" />
                        </div>
                    </div>
                </div>
                <div class="details">
                    <h2 class="font-bold text-sm">${video.title}</h2>
                    <div class="flex items-center gap-2">
                        <p>Awlad Hossain</p>
                        ${video.authors[0].verified == true ? `<img class="w-[20px] h-[20px]" src="https://img.icons8.com/?size=48&id=QMxOVe0B9VzG&format=png" alt=""></img>` : ''}
                    </div>
                    <p>${video.others.views} Views</p> 
                </div>

            </div>
            <button onclick="loadVideoDettails('${video.video_id}')" class="btn btn-block">Show Video Details</button>
        </div>
        `;
        videoContainer.append(div);
    }
}
const searchText = getElementId('search-input');
searchText.addEventListener("keyup", (e) => {
    getvideo(e.target.value);
})
getCategories()
getvideo()