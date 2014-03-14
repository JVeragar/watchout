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



// var movePlayerToNode = function(player, target){
//   console.log('moveplayerToNode');
//   player.attr("transform", "translate(" + target.y + ")");
// };

var tryMove = function(player, target){
  // console.log('tryMove')
  // console.log(target)
  // console.log('target x', target.x);
  // console.log('target y',target.y);
  // console.log('target children', target.children)
  // console.log('target parent', target.parent)
  player.transition().duration(1000).attr("transform", function(d){
    return "rotate(" + (target.x) +") translate(" + target.y + ")";
  });
  getCourse(target);
  return player;


};

var getCourse = function(target){
  if(target===destination){console.log('we out here')}
  if (target.parent===undefined){
    console.log('we have arrived at the marcus');
  } else if (target.children===undefined){
    console.log('we have arrived at the leaf');
    getCourse(target.parent);
  }

  if(target.parent&&target.children){
    console.log('helpdesk or floor', target);
  }

};



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

var destination;

var node = svg.selectAll(".node")
  .data(nodes)
  .enter().append("g")
    .attr("class", "node")
    .attr("transform", function(d) { return "rotate(" + (d.x) + ")translate(" + d.y + ")"; })
    .on("click", function (obj,index){
      //console.log('obj ', obj, 'index ', index, 'dom element ',this);
      //console.log(obj.y);
     tryMove(window.player, obj);
     destination=obj;


    });

// create player
var makePlayer = function(target){

  var player = target.append("circle").attr("r", "10").attr("class", "player");
  player.occupies = target;
  return player;

};

var makeHelper = function(target){

  var helper = target.append("circle").attr("r", "8").attr("class", "helper");
  helper.occupies = target;
  return helper;

};

window.player;
var g = d3.select("g");
window.player = makePlayer(g);

window.helper;
//window.helper = makeHelper(g);


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

window.sourceCourse =function(source){
  var course = {};
  course['0x'] = source.parent.x;
  course['0y'] =source.parent.y;
  course['1x'] = source.parent.parent.x;
  course['1y'] = source.parent.parent.y;
  course['2x'] = source.parent.parent.parent.x;
  course['2y'] = source.parent.parent.parent.y;
  console.log(course);
  return course;
};

var moveHater = function(hater, course){
  // console.log('tryMove')
  // console.log(target)
  // console.log('target x', target.x);
  // console.log('target y',target.y);
  // console.log('target children', target.children)
  // console.log('target parent', target.parent)
  //console.log('moving here ', course[0x], 'and here 'course[0y]);

  hater.transition().duration(1000).attr("transform", function(d){
    return "rotate(" + (course['0x']) +") translate(" + course['0y'] + ")";
  });

   debugger;


  hater.transition().duration(1000).attr("transform", function(d){
    return "rotate(" + (course['1x']) +") translate(" + course['1y'] + ")";
  });
  hater.transition().duration(1000).attr("transform", function(d){
    return "rotate(" + (course['2x']) +") translate(" + course['2y'] + ")";
  });
  //getCourse(target);
  return hater;


};

var makeHater = function(target){

  var hater = target.append("circle").attr("r", "8").attr("class", "hater");
  hater.occupies = target;
  return hater;

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
    var course = sourceCourse(source);
    var hater = makeHater(d3source);
    console.log('hater player ', hater)
    moveHater(player,course);
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
