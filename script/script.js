const getCategories = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(res => res.json())
        .then(data => displayCategories(data.categories))
}
const getvideo = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
        .then(res => res.json())
        .then(data => displayVideo(data.videos))
}
const displayCategories = (categories) => {
    for (const category of categories) {
        const categoryContainer = getElementId('categoryContainer');
        const div = newElement('div')
        div.innerHTML = `
        <button class="btn bg-btnBgGray hover:bg-btnBgRed hover:text-white duration-200">${category.category}</button>
        `;
        categoryContainer.append(div);
    }
}
const displayVideo = (videos) => {
    console.log(videos)
    for (const video of videos) {
        const videoContainer = getElementId('videoContainer');
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
                        <img class="w-[20px] h-[20px]" src="https://img.icons8.com/?size=48&id=QMxOVe0B9VzG&format=png" alt="">
                    </div>
                    <p>${video.others.views} Views</p>
                </div>

            </div>
        </div>
        `;
        videoContainer.append(div);
    }
}
getCategories()
getvideo()