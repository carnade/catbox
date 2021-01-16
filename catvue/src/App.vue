<template>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Kattlådan</title>
  </head>
  <body>
    <div
      class="app"
      :class="[confirmed? 'app__green' : '']">
      <div class="demo__container" v-if="isNameSet">
        <div class="demo__title">
          Hej {{this.name}}!!
        </div> 
        <div class="demo__button">
          <ConfirmationButton
            :messages="customMessages"
            ref="confirmationButton"
            v-on:confirmation-success="sendCleaned()">
          </ConfirmationButton>
        </div>
      </div>
      <div class="demo__container" v-else>
        <div class="demo__title">
          Vem ska rensa?!?
        </div> 
        <div class="col-3 input-effect">
          <input class="effect-17" type=text v-model="name" v-on:keyup.enter="nameSet()" placeholder="">
          <label>Ditt namn</label>
          <span class="focus-border"></span>
        </div>
      </div>
    </div>
  </body>
</html>

<!--
  <div class="confirmation__button">
    <ConfirmationButton
      :messages="customMessages"
      v-on:confirmation-success="sendCleaned()">
    </ConfirmationButton>
  </div>
  -->
</template>

<script>

import ConfirmationButton from './components/ConfirmationButton.vue';

export default {
  name: 'App',
  components: {
    ConfirmationButton
  },
  data: () => ({
      customMessages: [],
      name: "",
      isNameSet: false
  }),
  created() {
    this.customMessages = [
      'Jag har tömt!',
      'Säker?',
      this.motd()
      ],
      this.name = window.location.pathname.replace(/[^A-Za-z]/g, ''),
      (this.name != "") ? this.isNameSet=true:this.isNameSet=false

  },
  methods: {
    sendCleaned() {
      //const host = process.env.CATSERVER || "localhost"
      const host = "192.168.1.222"
      const baseURI = "http://" + host + ":3040/catbox/";

    this.$http
      .post(baseURI + this.name)
      .then((result) => {
        console.log(JSON.stringify(result.data));
      })
      .catch((error) => {
        this.console.log(error);
      });
      console.log("SENDING!!!")
    },
    nameSet() {
      this.isNameSet = true;
    },
    motd() {
      var messages = ['Sjukt bra jobbat!!', 'Nova älskar dig!',
        'Snyggt!!', "Belöna dig för ett bra jobb!!",
        "Rent och fint!", "En ren toalett är en bra toalett!",
        "Kattens bästis!", "Bra, bäst, kattkompis!",
        "Nova vill ha en kram!", "Katter kommer komma ihåg vad du gjort för dom!",
        "Humans <3 Cats", "Cats <3 Humans", "Alla dagar är en bra dag i lådan!"];
      return messages[Math.floor(Math.random() * messages.length)];
    }
  },
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
body {
  padding: 0;
  margin: 0;
  font-family: sans-serif;
}
.app {
  background: #B3B5E7;
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
} 
.app__green {
  background: #abd6ac;
}
.demo__title {
  color: #ffffff;
  font-size: 35px;
  font-weight: 700;
  padding: 1vh 0;
  text-align: center;
}
.demo__button, .demo__controls {
  display: flex;
  justify-content: center;
  padding: 3em;
}
.demo__controls {
  padding-top: 5vh;
}
.simple-button {
  outline: 0;
  margin: 0 5px;
  border: 1px solid #ffffff;
  background: none;
  border-radius: 30px;
  color: #ffffff;
  cursor: pointer;
  font-size: 1em;
}
.simple-input {
  outline: 0;
  margin: 0 5px;
  border: 1px solid #ffffff;
  background: none;
  border-radius: 30px;
}
.credits {
  position: absolute;
  display: block;
  bottom: 0;
  right: 0;
  text-align: right;
  font-weight: 700;
  padding: 1em;
}
.credits > a {
  text-decoration: none;
  color: #ffffff;
}
.col-3{float: left; width: 80%; margin: 10px 3%; position: relative;}
input[type="text"] {
    font: 20px/30px "Lato", Arial, sans-serif;
    color: #eee;
    width: 100%;
    box-sizing: border-box;
    letter-spacing: 1px;
}
:focus{outline: none;}
.effect-17{
  border: 0;
  padding: 3px 0;
  border-bottom: 1px solid #efefef;
  background-color: transparent;
}
.effect-17~.focus-border {
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 2px;
    background-color: #efefef;
    transition: 0.4s;
}
.effect-17:focus~.focus-border,
.has-content.effect-17~.focus-border {
    width: 100%;
    transition: 0.4s;
    left: 0;
}
.effect-17~label {
    position: absolute;
    left: 0;
    width: 100%;
    top: 9px;
    color: #efefef;
    transition: 0.3s;
    z-index: 0;
    letter-spacing: 0.5px;
}
.effect-17:focus~label,
.has-content.effect-17~label {
    top: -16px;
    font-size: 12px;
    color: #efefef;
    transition: 0.3s;
}
</style>
