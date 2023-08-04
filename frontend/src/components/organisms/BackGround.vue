<template>
  <div class="background">
    <div class="circle-2"></div>
    <div class="circle-3"></div>

    <div class="triangle-1"></div>
    <div class="triangle-2"></div>
    <div class="triangle-3"></div>
    <div class="triangle-4"></div>
    <div class="triangle-5"></div>
    <div class="triangle-6"></div>
    <div class="triangle-7"></div>

    <div class="circle-1"></div>
    <div class="circle-4"></div>
  </div>
</template>

<style lang="scss">
$blue: #076996;
$green: #21a687;
$orange: #d82f18;

body {
  background: white;
  min-height: 100vh;
  margin: 0;
  font-family: Arial, sans-serif;
  color: white;
  font-size: 18px;
  text-align: center;
}

.triangle-1 {
  position: absolute;
  top: 1%;
  left: 0%;
  border-width: 300px 500px 300px 0;
  border-color: transparent $green transparent transparent;
  border-style: solid;
  filter: drop-shadow(-7px -4px 1px #a3a3a3);
  transform: rotate(250deg);
}

.triangle-2 {
  position: absolute;
  top: 17%;
  left: 2%;
  border-width: 300px 500px 300px 0;
  border-color: transparent $blue transparent transparent;
  border-style: solid;
  filter: drop-shadow(-7px -4px 1px #a3a3a3);
  transform: rotate(234deg);
}

.triangle-3 {
  position: absolute;
  top: 80%;
  left: 0%;
  border-width: 300px 500px 300px 0;
  border-color: transparent $blue transparent transparent;
  border-style: solid;
  filter: drop-shadow(-17px -5px 1px #a3a3a3);
  transform: rotate(250deg);
}

.triangle-4 {
  position: absolute;
  top: 10%;
  right: 12%;
  border-width: 300px 500px 400px 0;
  border-color: transparent $orange transparent transparent;
  border-style: solid;
  filter: drop-shadow(-8px 9px 1px #a3a3a3);
  transform: rotate(309deg);
  z-index: 0;
}

.triangle-5 {
  position: absolute;
  top: 10%;
  right: 14%;
  border-width: 300px 500px 400px 0;
  border-color: transparent $blue transparent transparent;
  border-style: solid;
  filter: drop-shadow(2px 9px 1px #a3a3a3);
  z-index: 0;
}

.triangle-6 {
  position: absolute;
  top: 0%;
  right: 0%;
  border-width: 0 250px 250px 0;
  border-color: transparent $orange transparent transparent;
  border-style: solid;
  filter: drop-shadow(-2px 5px 1px #a3a3a3);
  z-index: 0;
}

.triangle-7 {
  position: absolute;
  top: 75%;
  right: 0%;
  border-width: 200px 500px 250px 0;
  border-color: transparent $green transparent transparent;
  border-style: solid;
  filter: drop-shadow(2px 9px 1px #a3a3a3);
  z-index: 0;
}

.circle-1 {
  position: absolute;
  top: 87%;
  right: 0%;
  height: 15rem;
  width: 15rem;
  background-color: $blue;
  filter: drop-shadow(-5px 5px 1px #a3a3a3);
  border-radius: 50%;
}

.circle-2 {
  position: absolute;
  bottom: 80%;
  right: 0%;
  height: 15rem;
  width: 15rem;
  background-color: $green;
  filter: drop-shadow(-5px 5px 1px #a3a3a3);
  border-radius: 50%;
}

.circle-3 {
  position: absolute;
  top: 77%;
  right: 75%;
  height: 35rem;
  width: 35rem;
  background-color: $orange;
  filter: drop-shadow(-5px 5px 1px #a3a3a3);
  border-radius: 50%;
}

.background {
  z-index: 0;
}

@media (max-width: 1200px) {
  .circle-1,
  .circle-2,
  .circle-3,
  .triangle-1,
  .triangle-2,
  .triangle-3,
  .triangle-4,
  .triangle-5,
  .triangle-6,
  .triangle-7 {
    display: none;
  }
}
</style>
