// fetch('https://openapi.programming-hero.com/api/videos/category/1000')
//     .then(response => response.json())
//     .then(json => console.log(json.data))
let currentId = 1000;
const loadVideosByCategory = async (id) => {
    const url = `https://openapi.programming-hero.com/api/videos/category/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    const phones = data.data;
    displayVideosByCategory(phones);
}
const displayVideosByCategory = phones => {
    const apiContainer = document.getElementById('video-container');
    apiContainer.innerHTML= '';
    phones.forEach(phone => {
        console.log(phone.title);
        const num = phone.others?.posted_date;
        const years = Math.floor(num / 31104000);
        const restYears = num - (years * 31104000);
        const months = Math.floor(restYears / 2592000);
        const restMonths = restYears - (months * 2592000);
        const days = Math.floor(restMonths / 86400);
        const restDays = restMonths - (days * 86400);
        const hour = Math.floor(restDays / 3600);
        const restHour = restDays - (hour * 3600);
        const minute = Math.floor(restHour / 60);
        // const second = Math.floor(restHour - (minute * 60));
        const time = `${years}years ${months}month ${days}days ${hour}hrs ${minute} mins ago`;
        const card = document.createElement('div')
        card.innerHTML =
            `<div class="mb-4 bg-primary-100 dark:bg-primary-900">
             <img class="w-full h-52 rounded-lg" src="${phone.thumbnail}" alt="">
             </div>
             <div class="flex items-start gap-5">
             <img class="rounded-full h-10 w-10" src="${phone.authors[0].profile_picture}">
             <div class="flex flex-col">
             <h3 class="mb-2 text-xl font-bold dark:text-white">${phone.title}</h3>
             <h3 class="text-md font-bold dark:text-white">${phone.authors[0].profile_name}</h3>
             <p class="text-gray-800 text-md font-medium dark:text-gray-400 capitalize">views: ${phone.others?.views}</p>
             <p class="text-gray-800 text-md font-medium dark:text-gray-400 capitalize">posted-date: ${time}</p>
             </div>
             </div>
             `;

             apiContainer.appendChild(card)
    })
}
const handleCategoryClick = (id) => {
currentId = id;
console.log(id);
loadVideosByCategory(id)
}
const displayCategory = categories =>{
    const categoriesContainer = document.getElementById('container');
    categories.forEach(category => {
        // console.log(category);
        const categoryButton = document.createElement('button');
        categoryButton.innerText = `${category.category}`
        categoryButton.classList = 'w-32 h-10 rounded-lg bg-gray-300 hover:bg-gray-400 font-semibold text-slate-800 focus:text-white active:bg-blue-600 focus:bg-blue-600 capitalize'
        categoryButton.addEventListener('click', () => handleCategoryClick(category.category_id));
           
        categoriesContainer.appendChild(categoryButton)
    })
    const allButton = document.querySelector('#container');
    if (allButton) {
        allButton.firstChild.classList.add('btn-active');
    }
}
const loadCategory = async() =>{
    const url = 'https://openapi.programming-hero.com/api/videos/categories';
    const res = await fetch(url); 
    const data = await res.json();
    const categories = data.data;
    displayCategory(categories);
}

const initialPage = () =>{
    loadCategory();
    loadVideosByCategory(currentId);
}
initialPage()
 // console.log(`${category.category} Button has been clicked`),
            // handleCategoryClick(category.category_id)