const animeWrapper = document.querySelector('#anime-wrapper')

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



const genAnime = async (animeID) =>{
    const response = await fetch(`https://anime-db.p.rapidapi.com/anime/by-id/${animeID}`, options2)
  
    if(response.status === 200){
      const anime = await response.json()
      //Opens Div
      animeWrapper.style.visibility = 'visible'


      //CREATING HTML ELEMENTS
      
      //IMAGE DIV
      const imageDiv = document.createElement('div')
      imageDiv.setAttribute('class', ' mt-4 p-2 col-12 col-md-6')
      animeWrapper.appendChild(imageDiv)
      //TEXT DIV
      const textDiv = document.createElement('div')
      textDiv.setAttribute('class', 'p-5 col-12 col-md-6 anime text-md-start')
      animeWrapper.appendChild(textDiv)

      //IMG
      const img = document.createElement('img')
      img.src = anime.image
      img.setAttribute('class', 'anime-img2 mb-4')
      imageDiv.appendChild(img)
      //TITLE
      const animeTitle = document.createElement('p')
      animeTitle.innerText = anime.title
      animeTitle.setAttribute('class', 'display-4 anime-title text-center')
      textDiv.appendChild(animeTitle)
      //Japanese Title
      const regex = /[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/
      const japaneseTitle = document.createElement('p')
      japaneseTitle.innerText = anime.alternativeTitles.filter(title => title.match(regex))
      japaneseTitle.setAttribute('class', 'h4 j-title text-center mb-4')
      textDiv.appendChild(japaneseTitle)
      //MAL RANK
      const rank = document.createElement('p')
      rank.setAttribute('class','h5 anime-subheader')
      if(anime.ranking === 0){
        rank.innerText = `MAL Rank: N/A`
      } else{
        rank.innerText = `MAL Rank: ${anime.ranking}`
      }     
      textDiv.appendChild(rank)
      //GENRES
      const genres = document.createElement('p')
      genres.setAttribute('class','h5 anime-subheader')
      if(anime.genres.length == 0){
        genres.innerText = `Genre: N/A`
        } else{
        genres.innerText = `Genre: ${anime.genres.join(', ')}`
        }
      textDiv.appendChild(genres)
      //Type
      const aniType = document.createElement('p')
      aniType.innerText = `Type: ${anime.type}`
      aniType.setAttribute('class','h5 anime-subheader')
      textDiv.appendChild(aniType)
      //MAL Page Button
      const malBtn = document.createElement('button')
      malBtn.innerText = `MAL Page`
      malBtn.setAttribute('class', 'btn btn-info mt-2 mb-4')
      malBtn.addEventListener('click', ()=> parent.open(anime.link))
      textDiv.appendChild(malBtn)
      //Synopsis
      const synop = document.createElement('p')
      synop.innerText = anime.synopsis
      synop.classList.add('synop')
      textDiv.appendChild(synop)
      
     

    }
  
}

genAnime(pageID)
            