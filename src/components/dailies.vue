<template>
  <div id="dailyContainer">
   <h1 id="dailyTitle">Dailies</h1>

   <div id="dailyAddContainer" v-show="dailyMax < 3" @click="dailyAddName">
    <div id="dailyAdd">+</div>
   </div>
  </div>
</template>

<script>
export default {
  name: 'dailies',
  data () {
    return {
      dailyMax: 2,
    }
  },
  methods: {
    dailyAddName: function(){
      $("#dailyAdd").replaceWith('Name your daily: <input type="text" id="dailyAddName"></input>');
      $("#dailyAddName").focus();

      $("#dailyAddName").keypress(function(event){
        if (event.which == 13 || event.keyCode == 13) {
        //code to execute here
        alert("yes");
        return false;
      } else {
        return true;
      }
      });
    
    

    
}
}
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  #dailyContainer {
    position: absolute;
    left: 7px;
    top: 30px;
    display: inline-block;
    width: 384px;
    height: 384px;
    background-color: lightgray;
    box-sizing: border-box;
  }
  #dailyTitle {
    text-align: center;
    position: relative;
    top: -15px;
    font-size: 28px;
  }
  #dailyAddContainer {
  border: 1px solid black;
  width: 324px;
  height: 45px;
  margin-bottom: 20px;
  cursor: pointer;
  background-color: #F0FFF0;
  line-height: 45px;
  padding-left: 10px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.5);
  color: rgba(0, 0, 0, 0.8);
  list-style: none;
  transition: all 1000ms;
  font-size: 16px;
  position: relative;
  margin-left: 20px;
  opacity: 0;
  transition: all 1000ms;
  }

  #dailyAdd {
  float: left;
  width: 25px;
  height: 25px;
  margin: 8px 0 0 147px;
  border: 2px solid black;
  border-radius: 50%;
  line-height: 27px;
  text-align: center;
  cursor: pointer;
  opacity: 0;
}
#dailyAddContainer:hover, #dailyAdd {
  opacity: 0.6 !important;
}
</style>

