
const submit = document.querySelector('#search-btn')
const input = document.querySelector('#input')
const topAnimeBtn = document.querySelector('#topAnime-btn')
const animeWrapper = document.querySelector('#anime-wrapper')
const pagesDiv = document.querySelector('#btm-pages')
const topPages = document.querySelector('#top-pages')
const results = document.createElement('p')

//Api stuff
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'c3647210a0msh06c4c632bec0ec2p1464c8jsnb762441b6412',
		'X-RapidAPI-Host': 'anime-db.p.rapidapi.com'
	}
};

let currentPage = 1

const getAnime = async (page = 1, animeName = '')=> {
try {
	    animeName = input.value
	    
	    if(page !== currentPage){
	        currentPage = page
	    }
	    

	    const response = await fetch(`https://anime-db.p.rapidapi.com/anime?page=${page}&size=10&search=${animeName}&sortOrder=asc`, options)
	    
	    //To clear results if new search is detected
	    if (animeWrapper.childNodes.length > 5){
	       document.querySelectorAll('.anime').forEach(item => item.remove())
	       pagesDiv.innerHTML = ''
	       topPages.innerHTML = ''
	       results.innerHTML=  ''
	    } 
	
	    //If API Call is successful
	    if (response.status === 200) {
	        const anime = await response.json()
	        animeWrapper.style.visibility = 'visible'
	
	        //Search Results
	        
            if(input.value.length === 0){
                results.innerText = 'Anime Ranked In Order'
            } else{
                results.innerText = `Search Results for: "${input.value}"`
            }
	        results.setAttribute('class', 'h5 mt-5 mb-4 results')
            results.style.textDecoration = 'none'
            results.style.color = 'black'
	        animeWrapper.appendChild(results)
	        animeWrapper.insertBefore(results, topPages)
	        
	
	        //HTML Elements (ONLY TITLE RANK AND TYPE)
	        for (let i = 0; i < anime.data.length; i++) {
	
                //Div Wrapper For Anime Object
	            const animeDiv = document.createElement('div')
	            animeDiv.setAttribute('class', 'col-12 align-items-center col-md-6 anime')
	            animeWrapper.appendChild(animeDiv)
		//Image Div
		const imageDiv = document.createElement('div')
		animeDiv.appendChild(imageDiv)
		//IMG
	        const img = document.createElement('img')
                img.setAttribute('class', 'anime-img mb-3')
                img.src = anime.data[i].image
                imageDiv.appendChild(img)
                //Event to OPEN anime info_______________
	            img.addEventListener('click', ()=>{
	                location.assign(`anime.html#${anime.data[i]._id}`)
	
	            })
		//IMAGE TEXT
		const imgText = document.createElement('p')
		imgText.innerText = 'Tap for more info'
		imgText.setAttribute('class', 'img-text h5')
		imageDiv.appendChild(imgText)
	        //Title
                const animeTitle = document.createElement('p')
                animeTitle.innerText = anime.data[i].title
                animeTitle.setAttribute('class', 'h4 anime-title text-center')
	            animeDiv.appendChild(animeTitle)
                //Rank
	            const ranking = document.createElement('p')
                if(anime.data[i].ranking === 0){
                    ranking.innerText = `MAL Rank: N/A`
                } else{
                ranking.innerText = `MAL Rank: ${anime.data[i].ranking}`
                }
                ranking.setAttribute('class','h5 anime-subheader')
                animeDiv.appendChild(ranking)
                //Type
	            const animeType = document.createElement('p')
                animeType.innerText = `Type: ${anime.data[i].type}`
                animeType.setAttribute('class','h5 anime-subheader')
	            animeDiv.appendChild(animeType)
	            
	            //insert
	            animeWrapper.insertBefore(animeDiv, pagesDiv)
	
	            
	        }
	        //_________Pagination Buttons________//
	        let beforePages = currentPage - 1
	        let afterPages = currentPage + 1
	        let li = ''
	        let liActive
	        
	        const ulPaginationDiv = document.createElement('ul')
	        ulPaginationDiv.setAttribute('class', 'pagination pagination-lg justify-content-center')
	        const topUlPaginationDiv = document.createElement('ul')
	        topUlPaginationDiv.setAttribute('class', 'pagination pagination-lg justify-content-center')
	        pagesDiv.appendChild(ulPaginationDiv)
	        topPages.appendChild(topUlPaginationDiv)
	        if(currentPage > 1){
	            li += ` <li class="page-item page-back" >
	            <a class="page-link " href="#" aria-label="Previous">
	              <span aria-hidden="true">&laquo;</span>
	            </a>`
	            
	        }
	        //Creating Page Numbers
	        for (let i = beforePages; i <= afterPages; i++){
	            
	            if(i > anime.meta.totalPage){
	                continue
	            }
	
	            if(i == 0){
	                i = i +1
	            }
	
	            if(currentPage == i || page == i){
	                liActive = 'active'
	            } else{
	                liActive = ''
	            }
	            
	            li += `<li class="page-item ${liActive}" ><a class="page-link page-btn" href="#">${i}</a></li>`
	            
	        }
	        
	        if(currentPage < anime.meta.totalPage){
	            li += `<li class="page-item page-fwd" >
	            <a class="page-link " href="#search=${input.value}&page=${currentPage}" aria-label="Next">
	              <span aria-hidden="true">&raquo;</span>
	            </a>
	          </li>`
	          
	        }
	        ulPaginationDiv.innerHTML = li
	        topUlPaginationDiv.innerHTML = li
	        
	        //Event Handlers for Buttons
	        const pageButtons = document.querySelectorAll('.page-btn')
	        pageButtons.forEach(page =>{
	            page.addEventListener('click', async ()=>{
	                
	                getAnime(Number(page.innerText))
	                
	            }, false)
	
	        })
	        //FORWARD-BACK PAGE BUTTON LOGIC
	        if(document.querySelector('.page-fwd') !== null){
	            document.querySelector('.page-fwd').addEventListener('click', ()=>getAnime(currentPage + 1), false)
	        }
	        if(document.querySelector('.page-back') !== null){
	            document.querySelector('.page-back').addEventListener('click', ()=>getAnime(currentPage - 1), false)
	        }
	
	        if(anime.data.length === 0){
	
	            results.innerText = `Couldn't Find Anything!\nTry another anime.`
	            document.querySelector('#top-pages').innerHTML = ''
	            document.querySelector('#btm-pages').innerHTML =''
	            
	        } 
	
	        
	    } else{
            throw new Error('Request failed! Try again.')
        }
} catch (e) {
	animeWrapper.style.visibility = 'visible'
    results.style.color = '#F0E6EF'
    results.style.textDecoration = 'underline'
    results.innerText = e.message
}

}


if(submit){
    submit.addEventListener('click', ()=>getAnime())
}
if(input){
    input.addEventListener('change', ()=>{
        if(input.value.length !== 0){
            getAnime()
        }
    })
    
    input.addEventListener('input', ()=>{ 
        if(input.value.length !== 0){
            submit.removeAttribute('disabled')
        } else{
            submit.disabled = true
        }
    })
}

if(topAnimeBtn){
    topAnimeBtn.addEventListener('click', ()=>{
	if(input.value.length !== 0){
		input.value = ''
		getAnime()
	} 
		
	})
}



