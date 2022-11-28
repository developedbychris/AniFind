
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
	    

	    const response = await fetch(`https://anime-db.p.rapidapi.com/anime?page=${page}&size=12&search=${animeName}&sortOrder=asc`, options)
	    
	    //To clear results if new search is detected
	    if (animeWrapper.childNodes.length > 5){
	       document.querySelectorAll('.anime').forEach(item => item.remove())
	       pagesDiv.innerHTML = ''
	       topPages.innerHTML = ''
	       results.innerHTML=  ''
		   localStorage.clear()
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
            results.style.color = 'white'
	        animeWrapper.appendChild(results)
	        animeWrapper.insertBefore(results, topPages)
	        
	
	        //HTML Elements (ONLY TITLE RANK AND TYPE)
	        for (let i = 0; i < anime.data.length; i++) {
			
                //Card Height Equal Div
	            const animeDiv = document.createElement('div')
	            animeDiv.setAttribute('class', 'col-12 col-lg-3 col-md-4 col-sm-5 d-flex mx-auto align-items-stretch') 
	            animeWrapper.appendChild(animeDiv)
				
				//Div Wrapper For Anime Object
				const cardDiv = document.createElement('div')
				cardDiv.setAttribute('class','card mx-auto my-3 anime')
				cardDiv.style.width = '18rem'
				animeDiv.appendChild(cardDiv)
				cardDiv.addEventListener('click', ()=>{
	                location.assign(`anime.html?a=${i}#${anime.data[i]._id}`)
	            }) 

				//Card IMG
	        	const img = document.createElement('img')
                img.setAttribute('class', 'card-img-top anime-img mb-3')
                img.src = anime.data[i].image
                cardDiv.appendChild(img)                                  
                //Event to OPEN anime info_______________
	            img.addEventListener('click', ()=>{
	                location.assign(`./anime.html?a=${i}#${anime.data[i]._id}`)
	            })
				
				//Card Div
				const cardbodyDiv = document.createElement('div')
				cardbodyDiv.setAttribute('class','card-body')
				cardDiv.appendChild(cardbodyDiv)

	    		//Card Title
                const animeTitle = document.createElement('h5')
                animeTitle.innerText = anime.data[i].title
                animeTitle.setAttribute('class', 'card-title text-wrap anime-title')
	            cardbodyDiv.appendChild(animeTitle)
				localStorage.setItem(`title${[i]}`,(animeTitle.innerText))
                
				//Rank
	            const ranking = document.createElement('p')
                if(anime.data[i].ranking === 0){
                    ranking.innerText = `MAL Rank: N/A`
                } else{
                ranking.innerText = `MAL Rank: ${anime.data[i].ranking}`
                }
                ranking.setAttribute('class','card-text anime-subheader')
                cardbodyDiv.appendChild(ranking)
                localStorage.setItem(`rank${[i]}`, (anime.data[i].ranking))
				//Type
	            const animeType = document.createElement('p')
                animeType.innerText = `Type: ${anime.data[i].type}`
                animeType.setAttribute('class','card-text anime-subheader')
	            cardbodyDiv.appendChild(animeType)
	            localStorage.setItem(`type${[i]}`, (anime.data[i].type))
	            //EXTRA LOCAL STORAGE DATA
				localStorage.setItem(`id${[i]}`, (anime.data[i]._id))
				const regex = /[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/
				localStorage.setItem(`jp-title${[i]}`, (anime.data[i].alternativeTitles.filter(title => title.match(regex))))
				localStorage.setItem(`image${[i]}`, (anime.data[i].image))
				localStorage.setItem(`mal-link${[i]}`, (anime.data[i].link))
				localStorage.setItem(`episodes${[i]}`, (anime.data[i].episodes))
				localStorage.setItem(`synopsis${[i]}`, (anime.data[i].synopsis))
				localStorage.setItem(`genre${[i]}`, (anime.data[i].genres.join(', ')))				
	            //insert
	            animeWrapper.insertBefore(animeDiv, pagesDiv)
	        }

	        //_________Pagination Buttons________//
	        let beforePages = currentPage - 1
	        let afterPages = currentPage + 1
	        let li = ''
	        let liActive
	        
	        const ulPaginationDiv = document.createElement('ul')
	        ulPaginationDiv.setAttribute('class', 'pagination pagination-lg my-3 justify-content-center')
	        const topUlPaginationDiv = document.createElement('ul')
	        topUlPaginationDiv.setAttribute('class', 'pagination pagination-lg my-3 justify-content-center')
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
		} else{
			getAnime()
		} 
		
	})
}



