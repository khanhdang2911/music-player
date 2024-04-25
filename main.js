
const $=document.querySelector.bind(document);
const $$=document.querySelectorAll.bind(document);
let btnPlay=$(".btn-play");
let currentPlaying=$("audio");
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
    playSong:function()
    {
        btnPlay.onclick=function()
        {
            if(this.isPlaying==false)
            {
                currentPlaying.play();
                this.isPlaying=true;
                btnPlay.innerHTML=`<i class="fa-solid fa-pause"></i>`;
            }
            else{
                currentPlaying.pause();
                this.isPlaying=false;
                btnPlay.innerHTML=`<i class="fa-solid fa-play"></i>`;
            }
        }  
        
    },
    render:function()
    {
        html=``;
        for(var item of this.songs)
        {
            html+=`
            <div class="song">
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
        }
        $(".playlist").innerHTML=html;
    },

    start:function(){
        this.render();
        this.playSong();
    }
}

app.start();