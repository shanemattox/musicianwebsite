var buttons = [];

$( document ).ready( function() {
	
	var objects = [   $( '#rim' ), $( '#gear1' ), $( '#gear2' ), $( '#gear3' ),
					  $( '#gear4' ), $( '#gear5' ), $( '#gear6' ),
					  $( '#gear7' ), $( '#gear8' ), $( '#gear9' ), $( '#gear10' ) ];
	var degrees = [       0,   0,  16,  27,   0,  20,  27,  48,  20,  24,  32 ];
	var speeds = [       40, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200 ];
	var increments = [ 0.25,  10, -10,  10,  10, -10,  10,  20, -20, -20,  20 ];
	var intervals = [];
		 
	$.each(
		speeds,
		function(i) {
			intervals[i] = self.setInterval( function() { rotate(i); }, speeds[i] );
		}
	);
	
	function rotate( i ) {
		objects[i].css(
			{
						'transform' : 'rotate(' + degrees[i] + 'deg)',
				'-webkit-transform' : 'rotate(' + degrees[i] + 'deg)',
				   '-moz-transform' : 'rotate(' + degrees[i] + 'deg)',
					'-ms-transform' : 'rotate(' + degrees[i] + 'deg)',
					 '-o-transform' : 'rotate(' + degrees[i] + 'deg)'
			}
		);
	
		if ( degrees[i] >= 360 ) {
			degrees[i] -= 360;
		}
		else if ( degrees[i] <= -360) {
			degrees[i] += 360;
		}
		
		degrees[i] += increments[i];				
	}
	
	$( '.songbar' ).each(
	
		function(i) {
		
			buttons[i] = $( this );
			
			if ( $( this ).hasClass( 'playing' ) ) {
				$( this ).find( '.playPause' ).attr( 'src', 'images/pause.png' );
			} else {
				$( this ).find( '.playPause' ).attr( 'src', 'images/play.png' );
			}
	
			$( this ).mouseenter(
				function() {
					$( this ).find( '.hover' ).stop().animate(
						{
							'opacity' : '1'
						}, 200
					);
				}
			).mouseleave(
				function() {
					$( this ).find( '.hover' ).stop().animate(
						{
							'opacity' : '0'
						}, 200
					);
				}
			);

			var button = $( '.songbar' );
			var audio = document.querySelector( '#audio' );
			
			buttons[i].click(
			
				function() {
	
					if ( $( this ).hasClass( 'playing' ) ) {
						audio.pause();
						button.removeClass( 'playing' );
						button.find( '.playPause' ).attr( 'src', 'images/play.png' );
					} else {
						audio.play();
						button.removeClass( 'playing' );
						button.find( '.playPause' ).attr( 'src', 'images/play.png' );
						$( this ).find( '.playPause' ).attr( 'src', 'images/pause.png' );
						$( this ).addClass( 'playing' );
					}
					
				}
				
			);
		}
	);
	
	/* Eye-follow */
	$( document ).mousemove(
	
		function( e ) {
		
			var pageWidth = $( document ).width();
			var pageHeight = $( document ).height();					
			var cursorPercentX = ( e.pageX / pageWidth ) * 100;
			var cursorPercentY = ( e.pageY / pageHeight ) * 100;
		
			$( '#eye-iris' ).css(
				{
					'background-position' : ( cursorPercentX ) + '% ' + ( cursorPercentY ) + 'px'
				}
			)
		
		}
		
	);
	
	/* Navigation */
	var navButtons = $( '.nav, button' ).find( 'span' );
	
	navButtons.mouseenter(
		function() {
			$( this ).parent().addClass( 'active' );
		}
	).mouseleave(
		function() {
			$( this ).parent().removeClass( 'active' );
		}
	);
	
}); //$( document ).ready