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

//var floorPlan = d3.json("floorplan.json");
var floorPlan = {
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



// * tree maker functions * //

var nodes = tree.nodes(floorPlan),
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
   movePlayer(window.player, obj);
   destination=obj;
});

node.append("circle")
    .attr("r", 10);

node.append("text")
    .attr("dy", ".31em")
    .attr("text-anchor", function(d) { return "start"; })
    .attr("transform", function(d) { return  "rotate(45)translate(11)"; })
    .text(function(d) { return d.name; });

d3.select().style("height", diameter - 150 + "px");


var nonContact = false;
var checkContact = function(){
  var helpReqs = d3.selectAll(".hater");
  var contact = false;
  var nonContact = false;
  helpReqs.each(function(){
    var hlpRq = d3.transform(d3.select(this).attr("transform"));
    var plyr = d3.transform(d3.select(".player").attr("transform"));
    var x = hlpRq.translate[0] - plyr.translate[0];
    var y = hlpRq.translate[1] - plyr.translate[1];
    //console.log(x,y)
    if( Math.sqrt(x * x + y * y) < 10 ){
      contact = true;
      console.log('we gotta hit yo!!!!!!!!!!!!')
    }
    if(contact) {
      //debugger;
      d3.select(this).remove();
    }else{
////////////////////////
    }
  });
  nonContact = contact;
};
d3.timer(checkContact);

 //* create player *//

var makePlayer = function(target){

  var player = target
    .append("circle")
    .attr("r", "10")
    .attr("class", "player");
  player.occupies = target;
  return player;

};

window.player;
var g = d3.select("g");
window.player = makePlayer(g);

// var makeHelper = function(target){

//   var helper = target
//     .append("circle")
//     .attr("r", "8")
//     .attr("class", "helper");
//   helper.occupies = target;
//   return helper;

// };

// window.helper;
//window.helper = makeHelper(g);
// window.getLink = function(nodeName){
//   var result;
//   d3.selectAll("path").each(function(obj){
//     window.obj = obj;
//     if (obj.target.name === nodeName) {
//       result = [obj, this];
//     }
//   });
//   return result;
// };

var movePlayer = function(player, target){
  //console.log(target);
  var course = playerCourseMaker(player.occupies, target);
  player.occupies = target;
  var playString='player'
  for (var i=0; i<course.length; i++){
    playString = playString +'.transition().duration(1000).attr("transform", function(d){ return "rotate(" + '+course[i][0]+' +") translate(" + '+course[i][1]+' + ")"})';
  }
  playString = playString+';';
  eval(playString);

  return player;
};


window.playerCourseMaker = function(curNode, tarNode){
  //move to the parent till the root
  //move out the tree to the leaf
  //are we on the same desk?
  var course = [];
  if (curNode.depth===tarNode.depth
  && curNode.parent === tarNode.parent){
    //just go there via curNode.parent
    course.push([curNode.parent.x,curNode.parent.y]);
    course.push([tarNode.x,tarNode.y]);
    return course;
  //are we on the same floor?
  } else if (curNode.depth===tarNode.depth
  && curNode.parent.parent === tarNode.parent.parent){
    //go to curNode.parent, curNode.parent.parent, tarNode.parent, tarNode
    course.push([curNode.parent.x,curNode.parent.y]);
    course.push([curNode.parent.parent.x,curNode.parent.parent.y]);
    course.push([tarNode.parent.x,tarNode.parent.y]);
    course.push([tarNode.x,tarNode.y]);
    return course;
  }
  //we have to cross the root to get there!
  //what's the curNode.depth?, whats the tarNode.depth?
  //get me to the root, then to the target
  //
  if (curNode.depth=== 1){
    //only one up to the root
    course.push([curNode.parent.x,curNode.parent.y]);
  } else if (curNode.depth === 2){
    //two up to root
    course.push([curNode.parent.x,curNode.parent.y]);
    course.push([curNode.parent.parent.x,curNode.parent.parent.y]);
  } else if (curNode.depth === 3){
    //leaf me alone
    course.push([curNode.parent.x,curNode.parent.y]);
    course.push([curNode.parent.parent.x,curNode.parent.parent.y]);
    course.push([curNode.parent.parent.parent.x,curNode.parent.parent.parent.y]);
  }

  //now to the leaf
  if (tarNode.depth === 1){
    //only to the floor
    course.push([tarNode.x,tarNode.y]);
  } else if (tarNode.depth === 2){
    //only to the desk
    course.push([tarNode.parent.x,tarNode.parent.y]);
    course.push([tarNode.x,tarNode.y]);
  } else if (tarNode.depth === 3){
    //root to leaf traversal
    course.push([tarNode.parent.parent.x,tarNode.parent.parent.y]);
    course.push([tarNode.parent.x,tarNode.parent.y]);
    course.push([tarNode.x,tarNode.y]);
  }
  // console.log('yo here it is ', course);
  return course;
};

// * make enemies * //

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


window.sourceCourse = function(source){
  var course = {};
  course['sx'] = source.x;
  course['sy'] = source.y;
  course['px'] = source.parent.x;
  course['py'] = source.parent.y;
  //ppx is the parent of the parent x
  course['ppx'] = source.parent.parent.x;
  course['ppy'] = source.parent.parent.y;
  /// route to root, the root is great-grand-parent
  course['pppx'] = source.parent.parent.parent.x;
  course['pppy'] = source.parent.parent.parent.y;
  console.log('helpReq course', course);
  return course;
};

var moveHelpReq = function(helpReq, course){
  helpReq
    .attr("transform", function(d){
      return "rotate(" + (course.sx) +") translate(" + course.sy + ")";
    })
    .transition()
    .duration(1000)
    .attr("transform", function(d){
      return "rotate(" + (course.px) +") translate(" + course.py + ")";
    })
    .transition()
    .duration(1000)
    .attr("transform", function(d){
      return "rotate(" + (course.ppx) +") translate(" + course.ppy + ")";
    })
    .transition()
    .duration(1000)
    .attr("transform", function(d){
      return "rotate(" + (course.pppx) +") translate(" + course.pppy + ")";
    });
  //getCourse(target);
  return helpReq;

};


var makeHelpReq = function(target){

  var helpReq = g//target
  .append("circle")
  .attr("r", "8")
  .attr("class", "hater");

  helpReq.occupies = target;
  return helpReq;
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
    var helpReq = makeHelpReq(d3source);

    console.log('helpReq player ', helpReq)

    moveHelpReq(helpReq,course);
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
