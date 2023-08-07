



var readyPlayerMe = new ReadyPlayerMe();

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("canvas").appendChild(renderer.domElement);

var avatar = readyPlayerMe.createAvatar();
scene.add(avatar);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["three"], factory);
  } else if (typeof exports === "object") {
    module.exports = factory(require("three"));
  } else {
    global.ReadyPlayerMe = factory(global.THREE);
  }
})(this, function (THREE) {
  var ReadyPlayerMe = {
    createAvatar: function (options) {
      var xhr = new XMLHttpRequest();
      xhr.open("POST", "https://api.readyplayer.me/v2/avatars", true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.send(JSON.stringify(options));
      xhr.onload = function () {
        if (xhr.status === 200) {
          var response = JSON.parse(xhr.responseText);
          return new THREE.Mesh(
            THREE.BufferGeometry.fromGeometry(response.avatar),
            new THREE.MeshPhongMaterial({ color: 0xFFFFFF })
          );
        } else {
          console.error("Error creating avatar: " + xhr.statusText);
        }
      };
    },
  };
  return ReadyPlayerMe;
});