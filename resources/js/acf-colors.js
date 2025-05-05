//https://www.advancedcustomfields.com/resources/javascript-api/#filters-color_picker_args


  acf.add_filter('color_picker_args', function (args, $field) {
    /* Colours (must match with resources/css/app.css ) */
    args.palettes = [
      '#D9C2B6', // beige
      '#000000', // black
      '#00B2E3', // blue
      '#005CB9', // darkblue
      '#898A8D', // darkgrey
      '#00945E', // green
      '#C8C8C8', // grey
      '#A7C6ED', // lightblue
      '#FF5F39', // orange
      '#FFC0CB', // pink
      '#D51C59', // red
      '#E8E1D6', // sand
      '#FFFFFF', // white
      '#FFCD00', // yellow
    ]
    return args;
  });

