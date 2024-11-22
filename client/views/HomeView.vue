<script setup lang="ts"></script>

<template>
  <main>
    <div class="cover">
      <div class="background"></div>
      <h1 class="title">Cornucopia</h1>
      <div class="float-button">
        <button class="button-39">
          <a href="#info">Learn More</a>
        </button>
      </div>
    </div>
    <div style="display: flex; align-items: center; flex-direction: column">
      <div class="info" id="info">
        <h3>What we do</h3>
        <p>
          Food insecurity affects the well-being of individuals and communities and it's especially prominent since the pandemic, with over 40 million adults and children in the US facing food
          insecurity in 2020. To address these challenges, we present Cornucopia, an app that helps streamline food pantry operations.
        </p>
      </div>
      <div class="info">
        <h4>Features</h4>
        <div class="row">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="#52c07c" class="bi bi-box2-heart-fill" viewBox="0 0 16 16">
              <path
                d="M3.75 0a1 1 0 0 0-.8.4L.1 4.2a.5.5 0 0 0-.1.3V15a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V4.5a.5.5 0 0 0-.1-.3L13.05.4a1 1 0 0 0-.8-.4h-8.5ZM8.5 4h6l.5.667V5H1v-.333L1.5 4h6V1h1zM8 7.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132"
              />
            </svg>
            <p class="features">smart inventory tracking and algorithmic resource allocation</p>
          </div>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="#52c07c" class="bi bi-house-fill" viewBox="0 0 16 16">
              <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293z" />
              <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6Z" />
            </svg>
            <p class="features">individualized household management</p>
          </div>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="#52c07c" class="bi bi-translate" viewBox="0 0 16 16">
              <path d="M4.545 6.714 4.11 8H3l1.862-5h1.284L8 8H6.833l-.435-1.286zm1.634-.736L5.5 3.956h-.049l-.679 2.022H6.18z" />
              <path
                d="M0 2a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v3h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-3H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zm7.138 9.995c.193.301.402.583.63.846-.748.575-1.673 1.001-2.768 1.292.178.217.451.635.555.867 1.125-.359 2.08-.844 2.886-1.494.777.665 1.739 1.165 2.93 1.472.133-.254.414-.673.629-.89-1.125-.253-2.057-.694-2.82-1.284.681-.747 1.222-1.651 1.621-2.757H14V8h-3v1.047h.765c-.318.844-.74 1.546-1.272 2.13a6.066 6.066 0 0 1-.415-.492 1.988 1.988 0 0 1-.94.31z"
              />
            </svg>
            <p class="features">support for audio and text translational accommodation</p>
          </div>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="#52c07c" class="bi bi-calendar4-range" viewBox="0 0 16 16">
              <path
                d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M2 2a1 1 0 0 0-1 1v1h14V3a1 1 0 0 0-1-1zm13 3H1v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z"
              />
              <path d="M9 7.5a.5.5 0 0 1 .5-.5H15v2H9.5a.5.5 0 0 1-.5-.5zm-2 3v1a.5.5 0 0 1-.5.5H1v-2h5.5a.5.5 0 0 1 .5.5" />
            </svg>
            <p class="features">integrated volunteer scheduling services</p>
          </div>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="#52c07c" class="bi bi-tools" viewBox="0 0 16 16">
              <path
                d="M1 0 0 1l2.2 3.081a1 1 0 0 0 .815.419h.07a1 1 0 0 1 .708.293l2.675 2.675-2.617 2.654A3.003 3.003 0 0 0 0 13a3 3 0 1 0 5.878-.851l2.654-2.617.968.968-.305.914a1 1 0 0 0 .242 1.023l3.27 3.27a.997.997 0 0 0 1.414 0l1.586-1.586a.997.997 0 0 0 0-1.414l-3.27-3.27a1 1 0 0 0-1.023-.242L10.5 9.5l-.96-.96 2.68-2.643A3.005 3.005 0 0 0 16 3c0-.269-.035-.53-.102-.777l-2.14 2.141L12 4l-.364-1.757L13.777.102a3 3 0 0 0-3.675 3.68L7.462 6.46 4.793 3.793a1 1 0 0 1-.293-.707v-.071a1 1 0 0 0-.419-.814zm9.646 10.646a.5.5 0 0 1 .708 0l2.914 2.915a.5.5 0 0 1-.707.707l-2.915-2.914a.5.5 0 0 1 0-.708M3 11l.471.242.529.026.287.445.445.287.026.529L5 13l-.242.471-.026.529-.445.287-.287.445-.529.026L3 15l-.471-.242L2 14.732l-.287-.445L1.268 14l-.026-.529L1 13l.242-.471.026-.529.445-.287.287-.445.529-.026z"
              />
            </svg>
            <p class="features">administrative organization management tools</p>
          </div>
        </div>
      </div>
      <div class="info">
        <h4>What are you waiting for?</h4>
        <ul>
          <li>If you are an organization administrator, create an account with Cornucopia, register your pantry, and get started!</li>
          <li>If you are looking to volunteer at an organization that uses Cornucopia, create an account and ask an admin to add you!</li>
        </ul>
      </div>
    </div>
    <div class="bottom">
      <div class="about">
        <h4 style="margin-top: 0">About us</h4>
        <p>
          We are 3rd and 4th-year computer science undergraduates at MIT, currently taking Software Design (6.1040), tasked with creating an authentic app that addresses an important problem domain
          for our final project. We were initially inspired to create Cornucopia during an interview with Phoebe Heyman, the coordinator of the Margaret Fuller House Food Pantry; we saw many
          opportunities to digitize processes at these important organizations and hope that our app will provide a more efficient, streamlined, centralized, and accommodative experience for
          administrators, volunteers, and patrons.
        </p>
      </div>
      <footer>
        <small> Questions or feedback? Contact us at aaap at mit dot edu. </small>
      </footer>
    </div>
  </main>
</template>

<style scoped>
h1 {
  text-align: left;
  display: flex;
  float: left;
  width: 100%;
  padding-left: 60px;
  padding-top: 150px;
  margin: 5px;
}

/* .background {
  background: url(../assets/images/vegetables.png) no-repeat center fixed;
  background-size: cover;
  height: 32em;
  width: 100%;
} */

.title {
  color: #fff;
  font-family: "Gowun Batang", serif;
  font-size: 150px;
  font-weight: 400;
}

.button-39 {
  font-size: x-large;
  padding: 15px;
  font-weight: 400;
}

.cover {
  background-image: url("../assets/images/vegetables.png");
  background-size: cover;
  display: block;
  height: 32em;
  width: 100%;
  position: relative;
  top: -2em;
}
.float-button {
  float: left top;
  padding-left: 70px;
}

.info {
  display: flex;
  justify-content: center;
  text-align: center;
  font-size: x-large;
  flex-direction: column;
  width: 41em;
  margin-bottom: 0.5em;
}

.subinfo {
  width: 35em;
  font-size: large;
  padding-left: 5em;
}

.users {
  width: 35em;
  font-size: x-large;
  padding-left: 2em;
  padding-top: 2em;
}

.about {
  font-size: medium;
  padding-left: 3em;
  padding-right: 3em;
  padding-top: 2em;
}

footer {
  padding: 10px;
  padding-left: 3em;
  font-style: italic;
}

a {
  color: black;
  text-decoration: none;
}

p {
  font-size: smaller;
  color: rgb(82, 82, 82);
}

h3 {
  margin-top: 2em;
  margin-bottom: 0.25em;
}

h4 {
  margin-top: 2em;
  margin-bottom: 0.25em;
}

.row {
  margin-top: 1em;
  display: flex;
  justify-content: center;
  gap: 2em;
}

.features {
  font-size: small;
  width: 10em;
}

li {
  font-size: small;
  font-weight: 400;
  margin-bottom: 0.5em;
}

ul {
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: left;
  padding-left: 5em;
  margin-bottom: 2em;
}

hr {
  border: none;
  height: 1px;
  /* Set the hr color */
  color: #a2a2a2; /* old IE */
  background-color: #333; /* Modern Browsers */
}

.bottom {
  width: 100%;
  height: 100%;
  background-color: #d6d6d6;
  padding-bottom: 1em;
}

.loader {
  width: 50px;
  height: 50px;
  animation-name: spin;
  animation-duration: 1000ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  /* transform: rotate(3deg); */
  /* transform: rotate(0.3rad);/ */
  /* transform: rotate(3grad); */
  /* transform: rotate(.03turn);  */
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
