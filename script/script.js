const getCategories = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(res => res.json())
        .then(data => displayCategories(data.categories))
}

const displayCategories = (categories) => {
    for(const category of categories){
        const categoryContainer = getElementId('categoryContainer');
        const div = newElement('div')
        div.innerHTML = `
        <button class="btn bg-btnBgGray hover:bg-btnBgRed hover:text-white duration-200">${category.category}</button>
        `;
        categoryContainer.append(div);
    }
}

getCategories()