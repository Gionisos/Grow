// make code more readable
// random look function
// make function to hit with a sword on click
// don't use jquery + vue?
// use small descriptive functions
// Save variables

<template>
  <div>
    <div id="sideBar"> 
      <div id="avatarContainerPosition">
        <div id="avatarContainer">
          <div id="avatarImageContainer">
          </div>
        </div>
      </div>
     <input id="avatarCreationNameInput" type="text"/>
    </div>



    <div id="loadAvatarConsole">

      <!-- Select your pet --> 
     <select v-model="petSelected" @change="avatarImageLoad">
      <option v-for="pet in pet" :value="pet.number" >{{pet.name}}</option>
     </select>

     <br>

     <!-- Select pets size -->
     <input type="range" min="0" max="10" v-model="petSize" @change="avatarImageLoad(); petJump();">
     

     <br><br>

    <!-- buttons to customize body parts -->
     <button class="buttonAvatarCreation" name="skin" @click="changeBodyPartButton">Skin++</button>
     <button class="buttonAvatarCreation" name="hair_bangs" @click="changeBodyPartButton">Hair++</button>
     <button class="buttonAvatarCreation" name="beard" @click="changeBodyPartButton">Beard++</button>
     <button class="buttonAvatarCreation" @click="randomLookButton">Random</button>

     <br><br>
    <!-- Weapon Equip -->
     <select v-model="weaponSelected" @change='avatarImageLoad'>
      <option v-for="item in weaponFilter" :value="item.number">{{item.name}}</option>
     </select>
     <br><br>
     <!-- Armor equip --> 
     <select v-model="armorSelected" @change="avatarImageLoad">
      <option v-for="item in armorFilter" :value="item.number" >{{item.name}}</option>
     </select>
     
    
    </div>
  </div>
</template>

<script>

// VARIABLES
// AVATAR BACKGROUND VARIABLES
var avatarBackground = [
  {
    number: 0,
    name: "background-red",
    source: "http://res.cloudinary.com/gionisos/image/upload/v1497443338/BackgroundRed_nzpixc.png",
    category: "background",
    size: [100, 100],
  },{
    number: 1,
    name: "background-yellow",
    source: "http://res.cloudinary.com/gionisos/image/upload/v1497785371/BackgroundYellow_nzpixc_gcbil8.png",
    category: "background",
    size: [100, 100],
  },
  {
    number: 2,
    name: "background-cherry-trees",
    source: "static/raw_sprites/spritesmith/backgrounds/background_cherry_trees.png",
    category: "background",
    size: [100, 100],
  },
  ],
  backgroundsOwned = [],

// PET VARIABLES
  pet = [{  
    name: "Dressed-up water melon",
  number: 0,
  source: "http://res.cloudinary.com/gionisos/image/upload/v1497446465/verkleidete_Wassermelone_fgucfh_qswtyf.png",
    layer: 5,
    coordinates: [0, 84],
    size: [52, 45],
  equipped: false,
  },{
    name: "white fox",
  number: 1,
  source: "http://res.cloudinary.com/gionisos/image/upload/v1497446465/whitefox_hfsbft_j0iojq.png",
  layer: 5,
    coordinates: [0, 84],
    size: [54, 45],
  equipped: false,
  }, {  
    name: "blue fox",
  number: 2,
  source: "http://res.cloudinary.com/gionisos/image/upload/v1498285418/foxBlue_juyx95.png",
    layer: 5,
    coordinates: [0, 84],
    size: [40, 34],
  equipped: false,
  },{
    // ONLY ONE WITH CHANGED COORDINATES SO FAR 
    name: "golden fox",
  number: 3,
  source: "http://res.cloudinary.com/gionisos/image/upload/v1498285418/foxGold_lyva5x.png ",
  layer: 5,
  coordinates: [0, 84],
  size: [54, 45],
  equipped: true,
  }, {  
    name: "black bear",
  number: 4,
  source: "http://res.cloudinary.com/gionisos/image/upload/v1498285418/BearBlack_kar4to.png",
    layer: 5,
    coordinates: [0, 84],
    size: [52, 45],
  equipped: false,
  }, {  
    name: "blue flying pig",
  number: 5,
  source: "http://res.cloudinary.com/gionisos/image/upload/v1498285418/PigBlue_tnm2uy.png",
    layer: 5,
    coordinates: [0, 84],
    size: [85, 85],
  equipped: false,
  },{
    name: "green flying pig",
  number: 6,
  source: "http://res.cloudinary.com/gionisos/image/upload/v1498285418/PigGreen_dskhns.png",
  layer: 5,
    coordinates: [0, 84],
    size: [54, 45],
  equipped: false,
  },      
],


//structure items with weapons / robes / etc. 
  body = [
  {
    number: 0,
    name: "no bodyPart",
    layer: 1,
    source: "static/raw_sprites/spritesmith/customize/skin/skin_ea8349.png",
    coordinates: [19,32],
    size: [85,85],
  },
  {
    number: 1,
    name: "white hair bangs",
    layer: 3,
    source: "static/raw_sprites/spritesmith/customize/hair/hair_bangs_1_ghostwhite.png",
    category: "hair_bangs",
    coordinates: [17,30],
    size: [88,88],
  },
  {
    number: 2,
    name: "bear skin",
    layer: 1,
    source: "static/raw_sprites/spritesmith/customize/skin/skin_bear.png",
    category: "skin",
    coordinates: [19,32],
    size: [85,85],
  },
  {
    number: 3,
    name: "midnight hair bangs",
    layer: 3,
    source: "static/raw_sprites/spritesmith/customize/hair/hair_bangs_1_midnight.png",
    category: "hair_bangs",
    coordinates: [17,30],
    size: [88,88],
  },
  {
    number: 4,
    name: "aurora skin",
    layer: 1,
    source: "static/raw_sprites/spritesmith/customize/skin/skin_aurora.png",
    category: "skin",
    coordinates: [19,32],
    size: [85,85],
  },{
    number: 5,
    name: "halloween hair bangs",
    layer: 3,
    source: "static/raw_sprites/spritesmith/customize/hair/hair_bangs_1_halloween.png",
    category: "hair_bangs",
    coordinates: [19,32],
    size: [85,85],
  },{
    number: 6,
    name: "zombie hair bangs",
    layer: 3,
    source: "static/raw_sprites/spritesmith/customize/hair/hair_bangs_1_zombie.png",
    category: "hair_bangs",
    coordinates: [19,32],
    size: [85,85],
  },{
    number: 7,
    name: "aurora beard",
    layer: 2,
    source: "static/raw_sprites/spritesmith/customize/beards/hair_beard_1_aurora.png",
    category: "beard",
    coordinates: [19,32],
    size: [85,85],
  },{
    number: 8,
    name: "black beard",
    layer: 2,
    source: "static/raw_sprites/spritesmith/customize/beards/hair_beard_2_black.png",
    category: "beard",
    coordinates: [19,32],
    size: [85,85],
  },{
    number: 9,
    name: "midnight beard",
    layer: 2,
    source: "static/raw_sprites/spritesmith/customize/beards/hair_beard_2_midnight.png",
    category: "beard",
    coordinates: [19,32],
    size: [85,85],
  },{
    number: 10,
    name: "frost beard",
    layer: 2,
    source: "static/raw_sprites/spritesmith/customize/beards/hair_beard_1_frost.png",
    category: "beard",
    coordinates: [19,32],
    size: [85,85],
  },{
    number: 11,
    name: "midnight beard",
    layer: 2,
    source: "static/raw_sprites/spritesmith/customize/beards/hair_beard_3_midnight.png",
    category: "beard",
    coordinates: [19,32],
    size: [85,85],
  },{
    number: 12,
    name: " candicorn hair bangs",
    layer: 3,
    source: "static/raw_sprites/spritesmith/customize/hair/hair_bangs_2_candycorn.png",
    category: "hair_bangs",
    coordinates: [19,32],
    size: [85,85],
  },{
    number: 13,
    name: "orange hair bangs",
    layer: 3,
    source: "static/raw_sprites/spritesmith/customize/hair/hair_bangs_4_porange2.png",
    category: "hair_bangs",
    coordinates: [19,32],
    size: [85,85],
  },{
    number: 14,
    name: "skeleton skin",
    layer: 1,
    source: "static/raw_sprites/spritesmith/customize/skin/skin_skeleton2.png",
    category: "skin",
    coordinates: [19,32],
    size: [85,85],
  },{
    number: 15,
    name: "winterstar skin",
    layer: 1,
    source: "static/raw_sprites/spritesmith/customize/skin/skin_winterstar.png",
    category: "skin",
    coordinates: [19,32],
    size: [85,85],
  },{
    number: 16,
    name: "wolf skin",
    layer: 1,
    source: "static/raw_sprites/spritesmith/customize/skin/skin_wolf.png",
    category: "skin",
    coordinates: [19,32],
    size: [85,85],
  },{
    number: 17,
    name: "dapper skin",
    layer: 1,
    source: "static/raw_sprites/spritesmith/customize/skin/skin_dapper.png",
    category: "skin",
    coordinates: [19,32],
    size: [85,85],
  },
  {
    number: 18,
    name: "white skin",
    layer: 1,
    source: "static/raw_sprites/spritesmith/customize/skin/skin_ea8349.png",
    category: "skin",
    coordinates: [19,32],
    size: [85,85],
  },

  ],





    item = [
  {
  number: 0,
  name: "no item",
  category: "weapon"
  },
  {
    number: 1,
    name: "basic sword",
    layer: 4,
    source: "http://res.cloudinary.com/gionisos/image/upload/v1497211196/55_9_f43pm3.png",
    category: "weapon",
    coordinates: [35,70],
    size: [35, 35],
  },
  {
    number: 2,
    name: "apprentice staff",
    layer: 4,
    source: "http://res.cloudinary.com/gionisos/image/upload/v1498582495/apprentice_staff_j6u0ot.png",
    category: "weapon",
    coordinates: [7, 49],
    size: [68,60],
  gold: 15,
  },
  {
    number: 3,
    name: "rusty hat",
    layer: 2,
    source: "http://res.cloudinary.com/gionisos/image/upload/v1497210647/55_22_apqpad.png",
    category: "helmet",
    coordinates: [80, 123],
    size: [64, 44],
  },
  {
    number: 4,
    name: "viking hat",
    layer: 2,
    source: "http://res.cloudinary.com/gionisos/image/upload/v1497211123/55_23_hcoanh.png",
    category: "helmet",
    coordinates: [78, 123],
    size: [65, 45],
  },
  {
    number: 5,
    name: "warrior armor",
    layer: 2,
    source: "http://res.cloudinary.com/gionisos/image/upload/v1497211148/55_18_j0wdw1.png",
    category: "armor",
    coordinates: [39, 79],
    size: [66, 42],
  },
 {
  number: 6,
  name: "hitchhikers suits",
  layer: 1,
  source: "http://res.cloudinary.com/gionisos/image/upload/v1499957110/pageArmor_xt3cww.png",
  category: "armor",
  coordinates: [42, 59],
  size: [60, 65],
  gold: 25,
  },
  {
    number: 7,
    name: "golden shield",
    layer: 4,
    source: "http://res.cloudinary.com/gionisos/image/upload/v1497212849/latest_19_gnx49k.png",
    category: "shield",
    coordinates: [27, 103],
    size: [40, 40], 
  },
  {
    number: 8,
    name: "Bad Ass Sword",
    layer: 4,
    source: 'static/raw_sprites/spritesmith/gear/weapon/weapon_special_1.png',
    category: "weapon",
    coordinates: [26, 35],
    size: [60,80], 
  },
  {
  number: 9,
  name: "chainsaw",
  layer: 4,
  source: "http://res.cloudinary.com/gionisos/image/upload/a_29/v1497786925/chainsaw_klqmdz.png",
  category: "weapon",
  descriptionShop: "RHMMMM RHMMMM!",
  descriptionSideBar: "It's so shiny!",
  coordinates: [16,54],
  size: [55, 50],
  gold: 50,
  },
];

var itemsEquipped = [],
  
  avatar = 
  {
    body: {
      skin: 18,
      hair_bangs: 13,
      beard: 11,
    },
    equipped: {
      shield: 0,
      weapon: 2,
      armor: 6,
      helmet: 0,
      shoes: 0
  }};



// LOAD AVATAR INTO RIGHT POSITION


export default {
  name: 'loadAvatar',
  data() {
    return {
      item: item,
      pet: pet,
      petSelected: "3",
      petSize: 5,
      weaponSelected: avatar.equipped.weapon,
      armorSelected: avatar.equipped.armor,
      skinSelected: avatar.body.skin,
      hairSelected: avatar.body.hair_bangs,
      beardSelected: avatar.body.beard,
      }
  },
  methods: {

// making your pet jump on growing!
petJump: function() {
  $("#sideBarPet").css({
      animation: "petJump " + 0.8 + "s linear"
    });
},




// Button to switch between differen body parts: One button to switch them all!
changeBodyPartButton: function(){
  let bodyFilter = body.filter(function(element) {
  // if number that is passed in is the same as avatar.... category == this way you know if its skin or beard
         if(element.category === event.target.name) {
          return element;
         }});
  

let bodyPartNames = ["skinSelected", "hairSelected", "beardSelected"];
let bodyPartWhich = "";
if (event.target.name == "skin"){
  bodyPartWhich = 0;
} else if (event.target.name == "hair_bangs"){
  bodyPartWhich = 1;
} else if (event.target.name == "beard"){
  bodyPartWhich = 2;
} else {
  return alert("Event.Target.Name doesn't match bodypart");
}


for(let i=0;i<bodyFilter.length; i++){
  if(this[bodyPartNames[bodyPartWhich]] === bodyFilter[i].number ){
    this[bodyPartNames[bodyPartWhich]] = bodyFilter[i+1].number;
    break;
  } else if(this[bodyPartNames[bodyPartWhich]] === bodyFilter[bodyFilter.length-1].number){
    this[bodyPartNames[bodyPartWhich]] = bodyFilter[0].number;
    break;
  }
}
  this.avatarImageLoad();
},


randomLookButton: function() {

let bodyPartCategory = ["skin", "hair_bangs", "beard"],
    bodyPartName = ["skinSelected", "hairSelected", "beardSelected"];

for(let i=0; i<bodyPartCategory.length; i++){
var bodyFilter = body.filter(function(element) {
         if(element.category === bodyPartCategory[i]) {
          return element;
         }});


this[bodyPartName[i]] = bodyFilter[(Math.floor(Math.random() * bodyFilter.length))].number;

}

this.avatarImageLoad();
},



avatarImageLoad: function() {

// push itemselected to itemEquipped 
let itemCategory = ["armor","shield","weapon","helmet","shoes"];

 avatar.equipped.weapon = this.weaponSelected;
 avatar.equipped.armor = this.armorSelected;
 avatar.body.skin = this.skinSelected;
 avatar.body.hair_bangs = this.hairSelected;
 avatar.body.beard = this.beardSelected;


// REMOVE OTHER VERSIONS OF YOU!
$("#avatarContainer").children().remove();

// linking up everything to one location and moving it relative from that point!
var avatarCoordinateX = 52, 
    avatarCoordinateY = 40;

// ATTACH ITEMS TO AVATAR RELATIVE TO POSITION 
if (this.petSelected !== ""){

//IF PET IS EQUIPPED MAKE SPACE WITH AVATAR
avatarCoordinateX += 19;
avatarCoordinateY -= 9;

//APPEND PET
$("#avatarContainer").append('<img id="sideBarPet" style="width:'+ (pet[this.petSelected].size[0] * (0.5 + (0.1 * this.petSize)))  +'px; height:'+ (pet[this.petSelected].size[1] * (0.5 + (0.1 * this.petSize))) +'px" src="'+ pet[this.petSelected].source +'"></img>');

//MOVE PET INTO RIGHT POSITION
$("#sideBarPet").css({
   "top": avatarCoordinateY + pet[this.petSelected].coordinates[1],
   "left":avatarCoordinateX + pet[this.petSelected].coordinates[0]
});}





// creating character out of several pieces 
let avatarBodyParts = ["skin", "hair_bangs", "beard"];

for (let i=0; i<3; i++){
 if (body[avatar.body[avatarBodyParts[i]]].length !== 0 && body[avatar.body[avatarBodyParts[i]]].number !== 0) {
 $("#avatarContainer").append(
      "<img src='" + body[avatar.body[avatarBodyParts[i]]].source +
        "' alt='" + body[avatar.body[avatarBodyParts[i]]].name + 
        "' value='" + avatarBodyParts[i] + "Equipped" +  "' style=' width:" + body[avatar.body[avatarBodyParts[i]]].size[0]  + "px; height:" + body[avatar.body[avatarBodyParts[i]]].size[1] +  
        "px; position:absolute;top:" + (body[avatar.body[avatarBodyParts[i]]].coordinates[1] + avatarCoordinateY) + "px;left:" + (body[avatar.body[avatarBodyParts[i]]].coordinates[0] + avatarCoordinateX) + "px; z-index:"+ body[avatar.body[avatarBodyParts[i]]].layer + "'>");
}};

// Adding items to character
for (let i=0; i<4; i++){
 if (item[avatar.equipped[itemCategory[i]]].length !== 0 && item[avatar.equipped[itemCategory[i]]].number !== 0) {
 $("#avatarContainer").append(
      "<img src='" + item[avatar.equipped[itemCategory[i]]].source +
        "' alt='" + item[avatar.equipped[itemCategory[i]]].name + 
        "' value='" + itemCategory[i] + "Equipped" +  "' style=' width:" + item[avatar.equipped[itemCategory[i]]].size[0]  + "px; height:" + item[avatar.equipped[itemCategory[i]]].size[1] +  
        "px; position:absolute;top:" + (item[avatar.equipped[itemCategory[i]]].coordinates[1] + avatarCoordinateY) + "px;left:" + (item[avatar.equipped[itemCategory[i]]].coordinates[0] + avatarCoordinateX) + "px; z-index:"+ item[avatar.equipped[itemCategory[i]]].layer + "'>");
}}

// $("#avatarContainer > img").hide().fadeIn(800);

}
  },
  computed: {
    // replace weapon with respective item category
     weaponFilter: function(element) {
      
      //Problemkind
      // alert(element.name);
       return this.item.filter(function(argument) {
         if(argument.category === "weapon") {
          return argument;
         }
     })
   },
   armorFilter: function() {
       return this.item.filter(function(argument) {
         if(argument.category === "armor") {
          return argument;
         }
     })
   }


  },
  mounted () {
  this.avatarImageLoad();
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  body{
    background-color: #464646;
  }
#sideBar{
  width: 256px;
  height: 100%;
  position: relative;
  left: 50%;
  top: 15%;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
  
}

#avatarContainer {
  height: 192px;
  width: 255px;
  background-color: #A3320B;

  background-image: url("../../static/raw_sprites/spritesmith/backgrounds/background_autumn_forest.png");
  background-size:cover;
  -webkit-transition: background-image 0.5s;
  -moz-transition: background-image 0.5s;
  -ms-transition: background-image 0.5s;
  -o-transition: background-image 0.5s;
  transition: background-image 0.5s;
  position: absolute;
  border-bottom: 1px solid gray;
  /* Keeps Avatar Image in the foreground */
  z-index: 9;
  
}

#avatarContainerPosition {
  height: 192px;
  width: 255px;
}

#avatarContainerBackgroundDiv {
  position: absolute; 
  top: 100px;
  left: -10px;
  
}

#avatarContainerBackground {
  margin-left: 84px;
  margin-top: -5px;
  z-index: 10;
}

#sideBarPet {
  position: absolute;
}

#avatarCreationNameInput {
  position: relative;
  top: 5px;
  left: 40px;
  text-align: center;
}


#loadAvatarConsole {
  height: 200px;
  width: 400px;
  background-color: lightgrey;
  position: relative;
  margin-top: 15px;
  left: 50%;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
}

.buttonAvatarCreation{
  margin-left: 25px;
}

@keyframes petJump {
  0% {
    transform: translate(0px,7px);
  }
  25% {
    transform: translate(0px, 0px);
  }
  50% {
   transform: translate(0px,7px)
  }
  75% {
    transform: translate(0px, 0px)
  }
  100% {
   transform: translate(0px,7px)
  }
}

</style>

