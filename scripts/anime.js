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

//  Clears localStorage except for requested anime
window.addEventListener('DOMContentLoaded', ()=>{
  for (let i = 0; i < localStorage.length; i++) {
    if (i === animeIndex) {continue}
    localStorage.removeItem(`title${i}`)
    localStorage.removeItem(`rank${i}`)
    localStorage.removeItem(`type${i}`)
    localStorage.removeItem(`id${i}`)
    localStorage.removeItem(`genre${i}`)
  }
})

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
      img.src = localStorage.getItem(`image${animeIndex}`)
      img.setAttribute('class', 'anime-img2 mb-1')
      imageDiv.appendChild(img)
      //TITLE
      const animeTitle = document.createElement('p')
      animeTitle.innerText = localStorage.getItem(`title${animeIndex}`)
      animeTitle.setAttribute('class', 'display-4 anime-title2 text-center')
      textDiv.appendChild(animeTitle)
      //Japanese Title
      const japaneseTitle = document.createElement('p')
      japaneseTitle.innerText = localStorage.getItem(`jp-title${animeIndex}`)
      japaneseTitle.setAttribute('class', 'h4 j-title text-center mb-4')
      textDiv.appendChild(japaneseTitle)
      //MAL RANK
      const rank = document.createElement('p')
      rank.setAttribute('class','h5 anime-subheader')
      if(localStorage.getItem(`rank${animeIndex}`) == 0){
        rank.innerText = `MAL Rank: N/A`
      } else{
        rank.innerText = `MAL Rank: ${localStorage.getItem(`rank${animeIndex}`)}`
      }     
      textDiv.appendChild(rank)
      //GENRES
      const genres = document.createElement('p')
      genres.setAttribute('class','h5 anime-subheader')
      if(localStorage.getItem(`genre${animeIndex}`).length === 0){
        genres.innerText = `Genre: N/A`
        } else{
        genres.innerText = `Genre: ${localStorage.getItem(`genre${animeIndex}`)}`
        }
      textDiv.appendChild(genres)
      //EPISODES
      const episodes = document.createElement('p')
      episodes.setAttribute('class', 'h5 anime-subheader')
      episodes.innerText = `Episodes: ${localStorage.getItem(`episodes${animeIndex}`)}`
      textDiv.appendChild(episodes)
      //Type
      const aniType = document.createElement('p')
      aniType.innerText = `Type: ${localStorage.getItem(`type${animeIndex}`)}`
      aniType.setAttribute('class','h5 anime-subheader')
      textDiv.appendChild(aniType)
      //MAL Page Button
      const malBtn = document.createElement('button')
      malBtn.innerText = `MAL`
      malBtn.setAttribute('class', 'btn mx-auto btn-mal mt-2 mb-4')
      malBtn.addEventListener('click', ()=> parent.open(localStorage.getItem(`mal-link${animeIndex}`)))
      textDiv.appendChild(malBtn)
      //Synopsis
      const synop = document.createElement('p')
      if(localStorage.getItem(`synopsis${animeIndex}`).length > 0 && localStorage.getItem(`synopsis${animeIndex}`).length < 200){
        
        synop.innerText = localStorage.getItem(`synopsis${animeIndex}`)
        textDiv.appendChild(synop)
      } else if (localStorage.getItem(`synopsis${animeIndex}`).length > 400){
        
        let displayText = `${localStorage.getItem(`synopsis${animeIndex}`).slice(0, 400)}...`
        let fullText = localStorage.getItem(`synopsis${animeIndex}`)
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

        console.log(synop.innerText === displayText)
      }
      synop.setAttribute('class', 'synop text-start')
      

    
  
}

genAnime()


