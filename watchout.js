// start slingin' some d3 here.


// var alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

// var width = 960,
//     height = 500;
var gameOptions = {
  height: 400,
  width: 700,
  nEnemies: 30,
  padding: 20
};

var gameStats ={
  score: 0,
  bestScore: 0
};

var axes ={
  x: d3.scale.linear().domain([0,100]).range([0,gameOptions.width]),
  y: d3.scale.linear().domain([0,100]).range([0,gameOptions.height])
}

var svg = d3.select(".gameboard").append("svg:svg").attr("width", gameOptions.width).attr("height", gameOptions.height);


//   // DATA JOIN
//   // Join new data with old elements, if any.
//   var text = svg.selectAll("text")
//       .data(data);

//   // UPDATE
//   // Update old elements as needed.
//   text.attr("class", "update");

//   // ENTER
//   // Create new elements as needed.
//   text.enter().append("text")
//       .attr("class", "enter")
//       .attr("x", function(d, i) { return i * 32; })
//       .attr("dy", ".35em");

//   // ENTER + UPDATE
//   // Appending to the enter selection expands the update selection to include
//   // entering elements; so, operations on the update selection after appending to
//   // the enter selection will apply to both entering and updating nodes.
//   text.text(function(d) { return d; });

//   // EXIT
//   // Remove old elements as needed.
//   text.exit().remove();
// }

// // The initial display.
// update(alphabet);

// // Grab a random sample of letters from the alphabet, in alphabetical order.
// setInterval(function() {
//   update(shuffle(alphabet)
//       .slice(0, Math.floor(Math.random() * 26))
//       .sort());
// }, 1500);

// // Shuffles the input array.
// function shuffle(array) {
//   var m = array.length, t, i;
//   while (m) {
//     i = Math.floor(Math.random() * m--);
//     t = array[m], array[m] = array[i], array[i] = t;
//   }
//   return array;
// }

