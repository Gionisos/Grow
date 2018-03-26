// ADD buttons to change attributes (list)
// divide items in categories and put them in different selects

<template>
  <div>
    <div id="sideBar"> 
      <div id="avatarContainerPosition">
        <div id="avatarContainer">
          <div id="avatarImageContainer">
          </div>
        </div>
      </div>
    </div>
    <div id="loadAvatarConsole">
      <!-- Select your pet --> 
     <select v-model="petSelected" @change="avatarImageLoad">
      <option v-for="pet in pet" :value="pet.number" >{{pet.name}}</option>
     </select>
     <!-- Select pets size -->
     <input type="range" min="0" max="10" v-model="petSize" @change="avatarImageLoad(); petJump();">
     

     <!-- Weapon Equip -->
     <select v-model="weaponSelected" @change='avatarImageLoad'>
      <option v-for="item in weaponFilter" :value="item.number">{{item.name}}</option>
     </select>

     <!-- Armor equip --> 
     <select v-model="armorSelected" @change="avatarImageLoad">
      <option v-for="item in armorFilter" :value="item.number" >{{item.name}}</option>
     </select>
    </div>
  </div>
</template>

<script>

// VARIABLES
var petEquipped = "3",
    // AVATAR BACKGROUND VARIABLES
avatarBackground = [
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
  }],
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
    itemPlayGround = [
  {
    number: 0,
  name: "chainsaw",
  layer: 4,
  source: "http://res.cloudinary.com/gionisos/image/upload/a_29/v1497786925/chainsaw_klqmdz.png",
  category: "weapon",
  coordinates: [100, 98],
  descriptionShop: "RHMMMM RHMMMM!",
  descriptionSideBar: "It's so shiny!",
    size: [55, 50],
  gold: 50,
  },
  {
    number: 1,
    name: "fancy party robes",
    layer: 1,
    source: "http://res.cloudinary.com/gionisos/image/upload/v1497446465/partyRobes_ej2rzu_tg5bps.png",
    category: "armor",
  descriptionShop: "Fancy Schmancy and a little bit of garlic",
  descriptionSideBar: "Is it going to fit?!",
    coordinates: [42, 59],
    size: [60, 32],
  gold: 10,
  },
  {
    number: 2,
    name: "weird costume",
    layer: 1,
    source: "http://res.cloudinary.com/gionisos/image/upload/v1497446755/weirdRobes_vgy0ru_quwuye.png",
    category: "armor",
  descriptionShop: "You will never get dirty with these ones!",
    coordinates: [42, 59], 
    size: [60, 36],
  gold: 15
  },
  {
    number: 3,
    name: "basic sword",
    layer: 4,
    source: "http://res.cloudinary.com/gionisos/image/upload/v1497211196/55_9_f43pm3.png",
    category: "weapon",
    coordinates: [112, 117],
    size: [35, 35],
  },
  {
    number: 4,
    name: "fancy sword",
    layer: 4,
    source: "http://res.cloudinary.com/gionisos/image/upload/v1497211188/55_10_uuuedo.png",
    category: "weapon",
    coordinates: [109, 115],
    size: [35, 35],
  },
  {
    number: 5,
    name: "rusty hat",
    layer: 2,
    source: "http://res.cloudinary.com/gionisos/image/upload/v1497210647/55_22_apqpad.png",
    category: "helmet",
    coordinates: [80, 123],
    size: [64, 44],
  },
  {
    number: 6,
    name: "viking hat",
    layer: 2,
    source: "http://res.cloudinary.com/gionisos/image/upload/v1497211123/55_23_hcoanh.png",
    category: "helmet",
    coordinates: [78, 123],
    size: [65, 45],
  },
  {
    number: 7,
    name: "Axe",
    layer: 4,
    source: "http://res.cloudinary.com/gionisos/image/upload/v1497211178/55_11_jgeinf.png",
    category: "weapon",
    coordinates:  [92, 102],
    size: [50, 50],
  
  },
  {
    number: 8,
    name: "warrior armor",
    layer: 2,
    source: "http://res.cloudinary.com/gionisos/image/upload/v1497211148/55_18_j0wdw1.png",
    category: "armor",
    coordinates: [42, 59],
    size: [60, 37],
  },
  {
    number: 9,
    name: "Welcome to the Club",
    layer: 4,
    source: "http://res.cloudinary.com/gionisos/image/upload/v1497211169/55_12_hlq2hd.png",
    category: "weapon",
  descriptionShop: "Who does not like <br> a little bit of clubbing <br> once in a while?",
    coordinates: [92, 103],
    size: [50, 50],
  },
  {
    number: 10,
    name: "fiery sword",
    layer: 4,
    source: "http://res.cloudinary.com/gionisos/image/upload/v1497211160/55_14_brpmlx.png",
    category: "weapon",
  descriptionShop: "A burning piece of steel",
    coordinates: [7, 119],
    size: [40, 40], 
  },
  {
    number: 11,
    name: "golden shield",
    layer: 4,
    source: "http://res.cloudinary.com/gionisos/image/upload/v1497212849/latest_19_gnx49k.png",
    category: "shield",
    coordinates: [27, 103],
    size: [40, 40], 
  },
  {
    number: 12,
    name: "apprentice robe",
    layer: 1,
    source: "http://res.cloudinary.com/gionisos/image/upload/v1498582495/apprentice_robe_xzmad0.png",
    category: "armor",
    coordinates: [60, 119],
    size: [50, 60],
  gold: 25,  
  },
  {
    number: 13,
    name: "apprentice hat",
    layer: 2,
    source: "http://res.cloudinary.com/gionisos/image/upload/v1498582495/apprentice_hat_azxwzy.png",
    category: "helmet",
    coordinates: [78, 123],
    size: [65, 45],
  gold: 20,
  },
  {
    number: 14,
    name: "apprentice staff",
    layer: 4,
    source: "http://res.cloudinary.com/gionisos/image/upload/v1498582495/apprentice_staff_j6u0ot.png",
    category: "weapon",
    coordinates: [7, 49],
    size: [65,56],
  gold: 15,
  },
  {
    number: 15,
    name: "hitchhikers suits",
    layer: 1,
    source: "http://res.cloudinary.com/gionisos/image/upload/v1499957110/pageArmor_xt3cww.png",
    category: "armor",
    coordinates: [42, 59],
    size: [60, 65],
  gold: 25,
  },
];

var itemsEquipped = [],
  avatar = {
  equipped: {
    shield: "",
    weapon: {
    number: 14,
    name: "apprentice staff",
    layer: 4,
    source: "http://res.cloudinary.com/gionisos/image/upload/v1498582495/apprentice_staff_j6u0ot.png",
    category: "weapon",
    coordinates: [7, 49],
    size: [65,56],
  },
    armor: {
    number: 15,
    name: "hitchhikers suits",
    layer: 1,
    source: "http://res.cloudinary.com/gionisos/image/upload/v1499957110/pageArmor_xt3cww.png",
    category: "armor",
    coordinates: [42, 59],
    size: [60, 65],
  gold: 25,
  },
    helmet: "",
    shoes: ""
  }};



// LOAD AVATAR INTO RIGHT POSITION


export default {
  name: 'loadAvatar',
  data() {
    return {
      itemPlayGround: itemPlayGround,
      pet: pet,
      petSelected: "3",
      petSelectedName: "",
      petSize: 5,
      itemPlayGround: itemPlayGround,
      weaponSelected: "4",
      armorSelected: "1",
          }
  },
  methods: {
petJump: function() {
  $("#sideBarPet").css({
      animation: "petJump " + 0.8 + "s linear"
    });
},

avatarImageLoad: function() {
// push itemselected to itemEquipped 

let itemCategory = ["armor","shield","weapon","helmet","shoes"];

avatar.equipped["armor"] = itemPlayGround[this.armorSelected];
avatar.equipped["weapon"] = itemPlayGround[this.weaponSelected];




// REMOVE OTHER VERSIONS OF YOU!
$("#avatarContainer").children().remove();

// AvatarImageFloatingIsland 
$("#avatarContainer").append('<div id="avatarContainerBackgroundDiv"><img id="avatarContainerBackground" src="http://res.cloudinary.com/gionisos/image/upload/v1497889280/avatarImageBackground_fye7om_a3z0mi.png"></img></div>');
$("#avatarContainerBackgroundDiv").hide().fadeIn(800);

// linking up everything to one location and moving it relative from that point!
var avatarCoordinateX = 52, 
    avatarCoordinateY = 4;

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

// Append Example Avatar
$("#avatarContainer").append('<img id="avatarImage" src="http://res.cloudinary.com/gionisos/image/upload/v1497443267/avatarWithoutBackground_oal8a6.png"></img>'); 

// Put avatar into random location
$("#avatarImage").css({
   "top": avatarCoordinateY,
   "left":avatarCoordinateX
});


// Adding items to character
for (let i=0; i<4; i++){
 if (avatar.equipped[itemCategory[i]].length !== 0) {
 $("#avatarContainer").append(
      "<img src='" + avatar.equipped[itemCategory[i]].source +
        "' alt='" + avatar.equipped[itemCategory[i]].name + 
        "' value='" + itemCategory[i] + "Equipped" +  "' style=' width:" + avatar.equipped[itemCategory[i]].size[0]  + "px; height:" + avatar.equipped[itemCategory[i]].size[1] +  
        "px; position:absolute;top:" + (avatar.equipped[itemCategory[i]].coordinates[1] + avatarCoordinateY) + "px;left:" + (avatar.equipped[itemCategory[i]].coordinates[0] + avatarCoordinateX) + "px; z-index:"+ avatar.equipped[itemCategory[i]].layer + "'>");
}}

$("#avatarContainer > img").hide().fadeIn(800);

}
  },
  computed: {
    // replace weapon with respective item category
     weaponFilter: function() {
       return this.itemPlayGround.filter(function(argument) {
         if(argument.category === "weapon") {
          return argument;
         }
     })
   },
   armorFilter: function() {
       return this.itemPlayGround.filter(function(argument) {
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

#sideBar{
  width: 256px;
  height: 100%;
  position: absolute;
  top: 27px;
  float: left;
  background-color: white;
}

#avatarContainer {
  height: 192px;
  width: 255px;
  background-color: #A3320B;
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

#avatarImage {
  width: 48px; /*width changed from 36 to 48! */
  transform: translate(100%, 60%);
  border-radius: 25%;
  color: red;
  position: absolute;
}

#sideBarPet {
  position: absolute;
}

#loadAvatarConsole {
  height: 200px;
  width: 400px;
  background-color: lightgrey;
  position: absolute;
  top: 230px;
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

