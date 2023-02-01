const animeWrapper = document.querySelector('#anime-info')

const options2 = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'c3647210a0msh06c4c632bec0ec2p1464c8jsnb762441b6412',
		'X-RapidAPI-Host': 'anime-db.p.rapidapi.com'
	}
};

//Back Button
document.querySelector('#goBack-btn').addEventListener('click', ()=> history.back())

const pageID = location.hash.substring(1)
const params = new URLSearchParams(location.search)
const animeIndex = parseInt(params.get("a"))

const genAnime = () =>{   
      //Opens Div
      animeWrapper.style.visibility = 'visible'

      //CREATING HTML ELEMENTS
      
      //IMAGE DIV
      const imageDiv = document.createElement('div')
      imageDiv.setAttribute('class', ' mt-4 p-2 col-12 col-md-6')
      animeWrapper.appendChild(imageDiv)
      //TEXT DIV
      const textDiv = document.createElement('div')
      textDiv.setAttribute('class', 'p-5 col-12 col-md-6 anime')
      animeWrapper.appendChild(textDiv)

      //IMG
      const img = document.createElement('img')
      img.src = sessionStorage.getItem(`image${animeIndex}`)
      img.setAttribute('class', 'anime-img2 mb-4')
      imageDiv.appendChild(img)
      //TITLE
      const animeTitle = document.createElement('p')
      animeTitle.innerText = sessionStorage.getItem(`title${animeIndex}`)
      animeTitle.setAttribute('class', 'display-4 anime-title2 text-center')
      textDiv.appendChild(animeTitle)
      //Japanese Title
      const japaneseTitle = document.createElement('p')
      japaneseTitle.innerText = sessionStorage.getItem(`jp-title${animeIndex}`)
      japaneseTitle.setAttribute('class', 'h4 j-title text-center mb-4')
      textDiv.appendChild(japaneseTitle)
      //MAL RANK
      const rank = document.createElement('p')
      rank.setAttribute('class','h5 anime-subheader')
      if(sessionStorage.getItem(`rank${animeIndex}`) == 0){
        rank.innerText = `MAL Rank: N/A`
      } else{
        rank.innerText = `MAL Rank: ${sessionStorage.getItem(`rank${animeIndex}`)}`
      }     
      textDiv.appendChild(rank)
      //GENRES
      const genres = document.createElement('p')
      genres.setAttribute('class','h5 anime-subheader')
      if(sessionStorage.getItem(`genre${animeIndex}`).length === 0){
        genres.innerText = `Genre: N/A`
        } else{
        genres.innerText = `Genre: ${sessionStorage.getItem(`genre${animeIndex}`)}`
        }
      textDiv.appendChild(genres)
      //EPISODES
      const episodes = document.createElement('p')
      episodes.setAttribute('class', 'h5 anime-subheader')
      episodes.innerText = `Episodes: ${sessionStorage.getItem(`episodes${animeIndex}`)}`
      textDiv.appendChild(episodes)
      //Type
      const aniType = document.createElement('p')
      aniType.innerText = `Type: ${sessionStorage.getItem(`type${animeIndex}`)}`
      aniType.setAttribute('class','h5 anime-subheader')
      textDiv.appendChild(aniType)
      //MAL Page Button
      const malBtn = document.createElement('button')
      malBtn.innerText = `MAL`
      malBtn.setAttribute('class', 'btn mx-auto btn-mal mt-2 mb-4')
      malBtn.addEventListener('click', ()=> parent.open(sessionStorage.getItem(`mal-link${animeIndex}`)))
      textDiv.appendChild(malBtn)
      //Synopsis
      const synop = document.createElement('p')
      if(sessionStorage.getItem(`synopsis${animeIndex}`).length > 0 && sessionStorage.getItem(`synopsis${animeIndex}`).length < 200){
        synop.innerText = sessionStorage.getItem(`synopsis${animeIndex}`)
        textDiv.appendChild(synop)
      }
      else if(sessionStorage.getItem(`synopsis${animeIndex}`).length === 0){
        synop.innerText = `No synopsis available. Check MAL for more information.`
        textDiv.appendChild(synop)
      }
      else if (sessionStorage.getItem(`synopsis${animeIndex}`).length > 400){
        
        let displayText = `${sessionStorage.getItem(`synopsis${animeIndex}`).slice(0, 400)}...`
        let fullText = sessionStorage.getItem(`synopsis${animeIndex}`)
        synop.innerText = displayText
        textDiv.appendChild(synop)
        
        //Read More Button
        const readMoreBtn = document.createElement('button')
        readMoreBtn.innerText = 'Read More'
        readMoreBtn.setAttribute('class', 'text-center btn btn-sm btn-info readmore')
        readMoreBtn.addEventListener('click', ()=>{
          
          synop.innerText === displayText ? synop.innerText = fullText : synop.innerText = displayText
          readMoreBtn.innerText === 'Read More' ? readMoreBtn.innerText = 'Read Less' : readMoreBtn.innerText = 'Read More'

        })
        
        textDiv.appendChild(readMoreBtn)
      }
      synop.setAttribute('class', 'synop text-start')
      

    
  
}

genAnime()


