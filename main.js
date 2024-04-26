
const $=document.querySelector.bind(document);
const $$=document.querySelectorAll.bind(document);

let btnPlay=$(".btn-play");
let btnNext=$(".btn-next");
let btnPrev=$(".btn-prev"); 


let songNameHeading=$(".song-name-playing");
let cdThumb=$(".cd-thumb");
let audio=$("audio");
let progress=$(".progress");

const app={
    isPlaying:false,
    songs:[
        {
            name:"天下无双",
            singer:"Zhang Liang",
            path:"./assets/y2mate.com - Vietsub l Hán Việt Thiên Hạ Vô Song  Trương Lương Dĩnh Ost Thần Điêu Đại Hiệp 2006.mp3",
            image:"./assets/coco.jpg"
        },
        {
            name:"Perfect",
            singer:"Ed Sheeran",
            path:"./assets/y2mate.com - Ed Sheeran  Perfect Official Music Video.mp3",
            image:"./assets/ed.webp"
        },
        {
            name:"Baby ft Ludacris",
            singer:"Justin Bieber",
            path:"./assets/y2mate.com - Justin Bieber  Baby ft Ludacris.mp3",
            image:"./assets/justin.jpg"
        },
        {
            name:"Roar",
            singer:"Katy Perry",
            path:"./assets/y2mate.com - Katy Perry  Roar.mp3",
            image:"./assets/roar.jpg"
        },
        {
            name:"Despacito",
            singer:"Luis Fonsi",
            path:"./assets/y2mate.com - Luis Fonsi  Despacito ft Daddy Yankee.mp3",
            image:"./assets/despacito.png"
        }
    ],
    currentSong:"",
    currentIndex:0,
    handleEvents:function()
    {
        // khi bam nut play
        btnPlay.onclick=function()
        {
            if(app.isPlaying==false)
            {
                audio.play();
            }
            else{
                audio.pause();
                
            }
        }
        // Khi play
        audio.onplay=function(){
            app.isPlaying=true;
            btnPlay.innerHTML=`<i class="fa-solid fa-pause"></i>`;
           
        }
      
        // khi pause
        audio.onpause=function(){
            app.isPlaying=false;
            btnPlay.innerHTML=`<i class="fa-solid fa-play"></i>`;
        }
          // Khi time update
        audio.ontimeupdate=function(){
            // set thoi gian cho progress
            let currentTime=audio.currentTime;
            let duration=audio.duration;
            progress.value=Math.floor((currentTime/duration)*100);
        }    
        //Khi tua audio
        progress.onchange=function(){
            audio.currentTime=(progress.value*audio.duration)/100;
        }
        // Khi click vao next
        btnNext.onclick=function(){
            app.nextSong();
            app.loadCurrentSong();
            //set lai progress
            progress.value=0;
            audio.play();
        }
        //Khi click vao prev
        btnPrev.onclick=function(){
            app.prevSong();
            app.loadCurrentSong();
            //set lai progress
            progress.value=0;
            audio.play();
        }
        //Chuyen bai
        for(var item of $$(".song"))
        {
            console.log(item.getAttribute("data-id")+"Sss");
            item.onclick=function(e)
            {
                // Bo ac class active
                for(var song of $$(".song"))
                {
                    song.classList.remove("active");
                }
                let songElement=e.target.closest(".song");
                songElement.classList.add("active");
                console.log(songElement);
                app.currentIndex=songElement.getAttribute("data-id");
                app.loadCurrentSong();
                //set lai progress
                progress.value=0;
                audio.play();
            }
        }
        
    },
    loadCurrentSong:function(){
        app.currentSong=app.songs[app.currentIndex];
        audio.setAttribute("src",`${app.currentSong.path}`);
            
        songNameHeading.innerHTML=`${app.currentSong.name}`
        cdThumb.src=app.currentSong.image;
    },
    nextSong:function(){
        this.currentIndex++;
        if(this.currentIndex>this.songs.length-1){
            this.currentIndex=0;
        }
        
    },
    prevSong:function(){
        this.currentIndex--;
        if(this.currentIndex<0){
            this.currentIndex=0;
        }
        
    },
    render:function()
    {
        html=``;
        let i=0;
        for(var item of this.songs)
        {
            html+=`
            <div class="song" data-id="${i}">
                <div class="thumb" style="background-image: url('${item.image}')">
                </div>
                <div class="body">
                    <div class="author">
                        ${item.singer}
                    </div>
                    <div class="song-name">
                        ${item.name}
                    </div>
                </div>
                <div class="option">
                    <i class="fa-solid fa-ellipsis"></i>
                </div>
            </div>
            `
            i++;
        }
        $(".playlist").innerHTML=html;
    },

    start:function(){
        this.render();
        this.loadCurrentSong();
        this.handleEvents();
    }
}

app.start();