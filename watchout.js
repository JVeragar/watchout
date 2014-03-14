/*
window.wo={};

wo.options = {
  height: window.innerHeight,
  width: window.innerWidth
};

wo.gameBoard = d3.select('body').append('svg:svg').attr('width', wo.options.width).attr('height', wo.options.height);

wo.handleResize = function(){
  window.onresize = function(){
    wo.options.height = window.innerHeight;
    wo.options.width = window.innerWidth;
    wo.gameBoard.attr("width", window.innerHeight);
    wo.gameBoard.attr("width", window.innerWidth);

  };
};

wo.createLevel = function(){
  wo.gameBoard.append('circle')
  .attr('cx', '50%').attr('cy', '50%').attr('r', '5%')
  .attr('stroke', 'black').attr('stroke-width', '0.5%')
  .attr('fill', 'green');
};

// Run Section
wo.handleResize();
wo.createLevel();
*/


// copy paste below



var diameter = 960;

var tree = d3.layout.tree()
    .size([360, diameter / 2 - 240])
    .separation(function(a, b) { return (a.parent == b.parent ? 1 : 2) / a.depth; });

var diagonal = d3.svg.diagonal.radial()
    .projection(function(d) { return [d.y, d.x / 180 * Math.PI]; });

var svg = d3.select("body").append("svg")
    .attr("width", diameter - 350)
    .attr("height", diameter - 150)
  .append("g")
    .attr("transform", "translate(" + diameter / 3 + "," + diameter / 3 + ")");


var jsonThing = {
  "name": "Marcus",
  "children": [
    {
      "name": "floor 1",
      "children": [
        {
          "name": "floor 1 help 1",
          "children": [
            {"name": "WeiMao", "size": 3938},
            {"name": "TristanYu", "size": 3812},
            {"name": "SeanSun", "size": 743}
          ]
        },
        {
          "name": "floor 1 help 2",
          "children": [
            {"name": "RobertHolmes", "size": 3534},
            {"name": "PhillipAlexander", "size": 5731},
            {"name": "KatieHempenius", "size": 5914}
          ]
        },
        {
          "name": "floor 1 help 3",
          "children": [
            {"name": "JoshuaGoldberg"},
            {"name": "JonathanTewksbury"},
            {"name": "FaridSiddiqi"}
          ]
        }
      ]
    },
    {
      "name": "floor 2",
      "children": [
        {
          "name": "floor 2 help 1",
          "children": [
              {"name": "EricCraft"},
              {"name": "AlbertLee"},
              {"name": "BarksMcKinzey"}

            ]
          },
          {"name": "floor 2 help 2",
          "children": [
              {"name": "MarkChatkha"},
              {"name": "JPWhitaker"},
              {"name": "AdnanWahab"}

            ]
          },

            {"name": "floor 2 help 3",
          "children": [
              {"name": "ChristenThompson"},
              {"name": "EmilyCoco"},
              {"name": "ChrisOliver"}

            ]
          },
          ]
        },
        {
          "name": "floor 3",
          "children": [
            {
              "name": "floor 3 help 1",
              "children": [
                {"name": "CharlesTai"},
                {"name": "AlexJacobs"},
                {"name": "AddisonLee"}
              ]
            },
            {"name": "floor 3 help 2",
          "children": [
              {"name": "AdrianKim"},
              {"name": "ElliottThoreby"},
              {"name": "MeganTulac"}

            ]
           },
            {"name": "floor 3 help 3",
          "children": [
              {"name": "HenryZhu"},
              {"name": "MariusFarioletti"},
              {"name": "ShaneKeller"}
            ]
        },
          ]
        },
        {
          "name": "floor 4",
          "children": [
            {"name": "floor 4 help 1",
            "children": [
              {"name": "NathanHoule"},
              {"name": "SherahSmith"},
              {"name": "IanLyons"}
            ]},
            {"name": "floor 4 help 2",
            "children": [
              {"name": "TimSchiller"},
              {"name": "MarkReveley"},
              {"name": "JunJung"}
            ]},
            {"name": "floor 4 help 3",
            "children": [
              {"name": "MarkRossetti"},
              {"name": "IanLyons"},
              {"name": "HenryZhu"}

            ]}
          ]
        },
      ]
    };
var makePlayer = function(target){

  var player = target.append("circle").attr("r", "8").attr("class", "player");
  player.occupies = target;
  return player;

};

var movePlayerToNode = function(player, target){
  player.attr("transform", "translate(" + target.y + ")");
};

var tryMove = function(player, target){
  //console.log(target)
  //console.log('target x', target.x);
  //console.log('target y',target.y);
  player.transition().duration(1000).attr("transform", function(d){
    return "rotate(" + (target.x) +") translate(" + target.y + ")";
  });

  return player;
};

var mouseClickToMove = function(){

}


// Start schim code

var nodes = tree.nodes(jsonThing),
    links = tree.links(nodes);
    window.testTree = tree;
    window.testNodes = nodes;
    window.testLinks = links;

for (var i = 0; i < nodes.length; i++) {
  nodes[i].x = nodes[i].x + 135;
}

var link = svg.selectAll(".link")
    .data(links)
  .enter().append("path")
    .attr("class", "link")
    .attr("d", diagonal);
window.player;

var node = svg.selectAll(".node")
  .data(nodes)
  .enter().append("g")
    .attr("class", "node")
    .attr("transform", function(d) { return "rotate(" + (d.x) + ")translate(" + d.y + ")"; })
    .on("click", function (obj,index){
      //console.log('obj ', obj, 'index ', index, 'dom element ',this);
      //console.log(obj.y);
     tryMove(window.player, obj);

    });

// create player
var g = d3.select("g");
window.player = makePlayer(g);


node.append("circle")
    .attr("r", 10);

node.append("text")
    .attr("dy", ".31em")
    .attr("text-anchor", function(d) { return "start"; })
    .attr("transform", function(d) { return  "rotate(45)translate(11)"; })
    .text(function(d) { return d.name; });

d3.select().style("height", diameter - 150 + "px");


// make enemies

window.activeRequests = {};
window.students = (function(){
  var nodes = d3.selectAll(".node");
  var students =[];
  nodes.each( function(obj){
    if (obj.depth===3){
      students.push(obj);
    }
  });
  return students;
})();

window.getLinks = function(nodeName){
  var result = [];
  var getLink = function(node){
    var nextNodeName;
    d3.selectAll("path").each(function(obj){
      if (obj.target.name === nodeName) {
        result.push([obj, this]);
        nextNodeName = obj.source.name;
      }
      return nextNodeName;
    });

  };
  var node=nodeName;
  for (var i=0; i<3; i++){
    node = getLink(node);
  }
  return result;
};

window.getLink = function(nodeName){
  var result;
  d3.selectAll("path").each(function(obj){
    window.obj = obj;
    if (obj.target.name === nodeName) {
      result = [obj, this];
    }
  });
  return result;
};

window.submitRequest = function(source){
  if (window.activeRequests[source.name]===undefined){
    window.activeRequests[source.name] = {
      timeSent: Date.now(),
      node: source
    };
    var d3source = d3.selectAll(".node").filter(function(thing){
      if (thing.name === source.name){
        return thing;
      }
    });
    //console.log(d3source);
    d3source.classed("circle", false);
    d3source.classed("infected", true);
  }
};

window.generateRequest = function(){
  var leng = window.students.length;
  var randomStudentIndex = Math.floor(d3.random.irwinHall(1)() * leng);
  window.submitRequest(students[randomStudentIndex]);
};

window.addSpawner = function(delay){
  setInterval(function(){
    window.generateRequest();
  }, (delay*d3.random.irwinHall(1)()));
};

// init
window.addSpawner(1000 * 10);
