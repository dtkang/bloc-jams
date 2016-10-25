var animatePoints = function() {
    var points = document.getElementsByClassName('point');

    var revealPoint = function(arr) {
        for (var i=0; i<arr.length; i++) {
            arr[i].style.opacity = 1;
            arr[i].style.transform = "scaleX(1) translateY(0)";
            arr[i].style.msTransform = "scaleX(1) translateY(0)";
            arr[i].style.WebkitTransform = "scaleX(1) translateY(0)";
        }
    }
    revealPoint(points);
};

animatePoints();