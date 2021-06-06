let bearer_Token ='BQCKa1OCeFJJ2IjbRFTPfeu1_pF44i4IiNG-b23sMiIWI22HuMWSq6nKce2uOcEzYHH11TQR-YeeNYpySbM4-sBsyCtBK03nBgkOOJkobwQ1ApJwwn-CCH7jnA23xtNDi9_maJ8927qSKcl5l7dXVGFYTX9naTXCR1gY7fTZThJWAHcgzRN_J75zZWKdUkKjyIs0eR255p0BE_tq9m09-7cSULn05glDIGTThonPLX-yMzoa3z_esJTXnpO5fXdqjRhmFk3hunuZSKebtZBMax7nw6px1zx2BzuVMKYr'

let url ='https://api.spotify.com/v1/shows'
let bearer =  'Bearer ' + bearer_Token
function fetch_featured(){
    let show_id = "2nIvarXvvZcp1cePx69x9N";
    fetch(url+"?ids="+show_id+"&market=US",{
        method:"GET",
        headers:{
            'Authorization':bearer,
            'Accept':'application/json',
            'Content-Type':'application/json',
        }
    })
    .then((data)=>{return data.json()})
    .then((data)=>{
        let show = data.shows[0]
        let featured_html = `
            <div class='featured'>
                <img src='${show.images[1].url}' />
                <div>
                    <h2>${show.name}</h2>
                    <h4>${show.description}</h4>
                    <h3>Don't forget to listen to today's episode!</h3>
                    <button>Listen now</button>
                </div>
            </div>
        `
        document.getElementById("featured").innerHTML = featured_html;
    })
    .catch(console.log)
}

function fetch_latest(){
    let show_id = "3VNyXX3WiMSoNQz6pxHQjw%2C3VjjICIKCIRfovUt7YN1D8%2C5rgumWEx4FsqIY8e1wJNAk%2C3VNyXX3WiMSoNQz6pxHQjw%2C2LOJaYKijiwNefCvzczyib";
    fetch(url+"?ids="+show_id+"&market=US",{
        method:"GET",
        headers:{
            'Authorization':bearer,
            'Accept':'application/json',
            'Content-Type':'application/json',
        }
    })
    .then((data)=>{return data.json()})
    .then((data)=>{
        data.shows.forEach(show => {
            let show_html = `
            <div class='show' onclick='location.href="show.html?id=${show.id}"'>
                <img src='${show.images[1].url}' />
                <div>
                    <h4>${show.name}</h4>
                    <h5>${show.publisher}</h5>
                    
                    
                </div>
            </div>
        `
        document.getElementById("shows").innerHTML += show_html;
            
        });
      
      
    })
    .catch(console.log)
}
function fetch_all(){
    fetch_featured()
    fetch_latest()
}

function get_show(id){
    fetch(url+'/'+id+'?market=US',{
        method:"GET",
        headers:{
            'Authorization':bearer,
            'Accept':'application/json',
            'Content-Type':'application/json',
        }

        })
        .then((data)=>{
            return data.json();
        
        })
        .then((data)=>{
            let header_html = `
            <img src='${data.images[1].url}'/>
            <div>
            <p>PODCAST</P>
            <h2>${data.name}</h2>
            <h5>${data.publisher}</h5>


            </div>
            
            
            `
            document.getElementById('header').innerHTML= header_html

        })
    
    

}

function get_episodes(id){
    fetch(url+'/'+id+'/episodes?market=US',{
        method:"GET",
        headers:{
            'Authorization':bearer,
            'Accept':'application/json',
            'Content-Type':'application/json',
        }

        })
        .then((data)=>{
            return data.json()
        
        })
        .then((data)=>{
            data.items.forEach(episode => {
                let episode_html =`
                <div class="episode">
                <img src="${episode.images[1].url}"/>
                <div class="episode_details">
                <h2>${episode.name}</h2>
                </div>

                <div class="audio">
                <div class="play_button">

                    <audio src ="${episode.audio_preview_url}" controls></audio>
                </div>
                <p>Preview</p>
                
            </div>
                </div>
                
                
                
                
                `
                document.getElementById('episodes').innerHTML+= episode_html
                
            })
        })


}