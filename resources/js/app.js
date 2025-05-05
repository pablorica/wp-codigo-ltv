import.meta.glob([
  '../images/**',
  '../fonts/**',
]);

//import domReady from '@roots/sage/client/dom-ready';
import Emitter from 'tiny-emitter';

/**
 * VUE dependencies
 */
import { createApp } from 'vue';
import Example from './vuecomponents/Example.vue';

export var emitter = new Emitter();

/**
 * Custom modules
 */
import consoleHello from './modules/consoleHello';



/**
 * Custom Modules
 */
const CDG = {
  onreadyFunctions: function() {
    consoleHello('CDG is ready');

    window.addEventListener("resize", function(){
      //consoleHello('window has resized');
      if(window.innerWidth < 768){
        //consoleHello('narrow');
      }
      else{
        //consoleHello('wide');
      }
    });
  },

  onloadFunctions: function() {
    //consoleHello('CDG is loaded');
  }
};

CDG.onreadyFunctions();

/**
 * Application entrypoint
 */
document.addEventListener('DOMContentLoaded', () => {
  consoleHello('DOMContentLoaded');

  CDG.onloadFunctions();

  /**
   * VUE Components
   */
  if (document.getElementById("vueExample")) {
    const app = createApp(Example);
    app.mount('#vueExample');
  }
});
