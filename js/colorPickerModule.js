var colorPickerModule = angular.module('colorPickerModule',[]);

colorPickerModule.controller('colorPickerController', [ '$scope', function ($scope) {
  var canvas = $("#cv").get(0)
  var context = $('#cv').get(0).getContext('2d');
  const double_pi = 2 * Math.PI;
  const increment = Math.PI / ( 180 * 8 );

  var resizeCanvas = function () {
    $("#cv").height($("#cv").width() + "px");

    canvas.width = $("#cv").width();
    canvas.height = $("#cv").height();
    draw();
  };
  window.addEventListener('resize', resizeCanvas, false);

  setTimeout(resizeCanvas, 0);

  var draw = function () {
    var width = canvas.width;
    var height = canvas.height;
    var radius = (canvas.height / 2)- 10;

    var center = {
      x: width / 2,
      y: height / 2
    };

    for(var i = 0; i < double_pi; i += increment){
      var point = {
        x : center.x + (Math.cos(i) * radius),
        y : center.y + (Math.sin(i) * radius)
      };
      var outer_color = "hsl(" + ( i * 180 / Math.PI  ) + ", 100%, 50%)";
      var inner_color = "hsl(" + ( i * 180 / Math.PI  ) + ", 50%, 50%)";
      var colorGradient = context.createLinearGradient(center.x, center.y,point.x,point.y);
      colorGradient.addColorStop(0.0,"white");
      colorGradient.addColorStop(0.7,inner_color);
      colorGradient.addColorStop(1.0,outer_color);
      context.strokeStyle = colorGradient;
      context.beginPath();
      context.moveTo(center.x, center.y);
      context.lineTo(point.x, point.y);
      context.stroke();
    }
    context.strokeStyle = "black";
    context.lineWidth=5;
    context.beginPath();
    context.arc(center.x,center.y,radius,0,2*Math.PI);
    context.stroke();
  };

  function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }

  function rgbToHex(color) {
    var out = "#" + componentToHex(color[0]) + componentToHex(color[1]) + componentToHex(color[2]);
    return out.toUpperCase();
  }

  function updateColor(e) {
    var data = context.getImageData(e.offsetX, e.offsetY, 1, 1).data;
    $scope.color = "rgb(" + data[0] + "," + data[1]+ "," + data[2]+  ")";
    // $scope.hex = "#" + componentToHex(data[0]) + "";
    $scope.hex = rgbToHex(data);
    $scope.$apply();
  }

  $('#cv').contextmenu(function () {
    active = !active;
  });

  $('#cv').click(function (e) {
    active = false;
    updateColor(e);
  });

  var active = false;
  $("#cv").on('mousemove', function (e) {
    if(active){
      updateColor(e);
    }
  });

} ] );
