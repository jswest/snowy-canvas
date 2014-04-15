/*
 * Particle objects
 * 
 */
var Particle = function( width, height ) {
  
  var that = this;

  var width  = width // duh
  ,   height = height // duh
  ,   vx     = -2 + ( Math.random() * -5 ) // velocity of horozontal travel
  ,   vy     = 1.5 + ( Math.random() * 3.5 ); // velocity of vertical travel

  this.x     = ( width * 1.5 ) + ( Math.floor( Math.random() * width + 1 ) )
  this.y     = -( height ) + ( Math.floor( Math.random() * height ) );
  this.coloration = "rgb(255,255,255)";

  this.updatePosition = function( wind ) {
    that.x = that.x + ( vx * wind );
    if ( that.x < 0 ) { that.x = width; }
    that.y = that.y + ( vy * wind );
    if ( that.y > height ) { that.y = 0; }
  }
};







var Snowfield = function( progression, numberOfParticles ) {
  
  var that = this;

  var width  = $(window).width()
  ,   height = $(window).height();

  var canvas = document.getElementById( 'snowy-canvas' );
  canvas.width = $(window).width();
  canvas.height = $(window).height();

  var context          = canvas.getContext( '2d' )
  ,   particles        = []
  ,   progressionIndex = 0
  ,   smallIndex       = 0;

  var particleExtraWidth  = 3
  ,   particleExtraHeight = 3;

  var draw = function () {
    context.fillStyle = "rgb(0,0,0)";
    context.fillRect( 0, 0, width, height );
    var particle;
    for ( var i = 0; i < particles.length; i++ ) {
      particle = particles[i];
      context.fillStyle = particle.coloration;
      context.fillRect(
        particle.x,
        particle.y,
        Math.random() * particleExtraWidth,
        Math.random() * particleExtraHeight
      );
      particle.updatePosition( progression[ progressionIndex ] );
    }
  }

  this.init = function() {
    for( var i = 0; i < numberOfParticles; i++ ) {
      particles.push( new Particle( width, height ) );
    }
  };



  var run = function() {
    draw();
    smallIndex++;
    if( smallIndex > 16 ) {
      smallIndex = 0;
      progressionIndex++;
      if( progressionIndex > progression.length - 1 ) {
        progressionIndex = 0;
      }
    }
    requestAnimFrame( run );
  };
  this.start = function () {
    run();
  }
};