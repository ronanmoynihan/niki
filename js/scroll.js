var smoothScroll = function (direction) {
    
    
                        if(direction=='up'){
                            var endLocation = window.pageYOffset - 700;
                            if(window.pageYOffset<700){endLocation = 0;}
                        }
                        else{
                            var endLocation = document.body.scrollTop + 700;
                        }
                            
                            

                        // Calculate how far and how fast to scroll
                        var startLocation = window.pageYOffset;                       
                        var distance = endLocation - startLocation;
                        var increments = distance/(250/16);
                        var stopAnimation;

                        // Scroll the page by an increment, and check if it's time to stop
                        var animateScroll = function () {
                                window.scrollBy(0, increments);
                                stopAnimation();
                        };

                        // If scrolling down
                        if ( increments >= 0 ) {
                                // Stop animation when you reach the anchor OR the bottom of the page
                                stopAnimation = function () {
                                        var travelled = window.pageYOffset;
                                        if ( (travelled >= (endLocation - increments)) || ((window.innerHeight + travelled) >= document.body.offsetHeight) ) {
                                                clearInterval(runAnimation);
                                        }
                                };
                        }
                        // If scrolling up
                        else {
                                // Stop animation when you reach the anchor OR the top of the page
                                stopAnimation = function () {
                                        var travelled = window.pageYOffset;
                                        if ( travelled <= (endLocation || 0) ) {
                                                clearInterval(runAnimation);
                                        }
                                };
                        }

                        // Loop the animation function
                        var runAnimation = setInterval(animateScroll, 16);

                };