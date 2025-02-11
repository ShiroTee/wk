// Node-link tree diagram using the Reingold-Tilford "tidy" algorithm
d3.layout.layerTree = function() {
  var hierarchy = d3.layout.hierarchy().sort(null).value(null),
      separation = d3_layout_treeSeparation,
      size = [1, 1], // width, height
      nodeSize = null;
    // Pre-order traversal.
	function d3_layout_hierarchyVisitBefore(node, callback) {
	  var nodes = [node];
	  while ((node = nodes.pop()) != null) {
		callback(node);
		if ((children = node.children) && (n = children.length)) {
		  var n, children;
		  while (--n >= 0) nodes.push(children[n]);
		}
	  }
	}

	// Post-order traversal.
	function d3_layout_hierarchyVisitAfter(node, callback) {
	  var nodes = [node], nodes2 = [];
	  while ((node = nodes.pop()) != null) {
		nodes2.push(node);
		if ((children = node.children) && (n = children.length)) {
		  var i = -1, n, children;
		  while (++i < n) nodes.push(children[i]);
		}
	  }
	  while ((node = nodes2.pop()) != null) {
		callback(node);
	  }
	}
  var nodeLeaf=1;
  function tree(d, i) {
    var nodes = hierarchy.call(this, d, i),
        root0 = nodes[0],
        root1 = wrapTree(root0);
	//计算子节点数
	d.node_layer_index=0;//node_layer_index 同层级的索引
	nodeLeaf=calcTreeAllLeaf(d);
    tree.nodeLeaf=nodeLeaf;	
    // Compute the layout using Buchheim et al.'s algorithm.
    d3_layout_hierarchyVisitAfter(root1, firstWalk), root1.parent.m = -root1.z;
    d3_layout_hierarchyVisitBefore(root1, secondWalk);

    // If a fixed node size is specified, scale x and y.
    if (nodeSize) d3_layout_hierarchyVisitBefore(root0, sizeNode);

    // If a fixed tree size is specified, scale x and y based on the extent.
    // Compute the left-most, right-most, and depth-most nodes for extents.
    else {
      var left = root0,
          right = root0,
          bottom = root0;
      d3_layout_hierarchyVisitBefore(root0, function(node) {
        if (node.x < left.x) left = node;
        if (node.x > right.x) right = node;
        if (node.depth > bottom.depth) bottom = node;
      });
      var tx = separation(left, right) / 2 - left.x,
          kx = size[0]; // / (right.x + separation(right, left) / 2 + tx),
          ky =size[1]; //size[1] / (bottom.depth || 1);
      d3_layout_hierarchyVisitBefore(root0, function(node) {
        node.x = ((node.x + tx)>1 ?(1-0.01):(node.x + tx)) * kx;
        node.y = node.depth * ky+getNodeYOffset2(node);
		var rc=2*Math.PI/360*(node.x-90);
		node.rx=Math.cos(rc)*node.y;
		node.ry=Math.sin(rc)*node.y;
		node.w=getTextContentWidth(node);
		//console.log(node.name+" x: "+node.x +" y: "+node.y);
      });
    }

    return nodes;
  }
  function getNodeYOffset2(node)
  {
  	var y=0;
  	if(node.parent && node.parent.nodeLeaf>40 && !node.children && ((0<node.x && node.x<50) || (150<node.x && node.x<220) || (320<node.x && node.x<361)))
  	{
  		y=20*(node.node_layer_index%3==2?-1:node.node_layer_index%3);
  	}
  	return y;
  }
  // calc node all child leaf
  function calcTreeAllLeaf(d)
  {
	 var size=1;
	 if(d.children)
     {
		d.leaf=false;
		size=0; 
		for(var i=0;i<d.children.length;i++)
		{
			d.children[i].node_layer_index=i;
			size+=calcTreeAllLeaf(d.children[i]);
		}
	 }
	 else
	 {
		 d.leaf=true;
	 }
     d.nodeLeaf=size;	
    return size;	 
  }
  // calc text content width
  function getTextContentWidth(d)
  {
	var str="",strLen=0,fontSize=14;
	str=d.name?d.name:"";
	strLen=str.replace(/[^\x00-\xff]/g,"aa").length;  
	if(size[2]) fontSize=size[2];
    return fontSize/2*strLen; 	
  }
  function wrapTree(root0) {
    var root1 = {A: null, children: [root0]},
        queue = [root1],
        node1;

    while ((node1 = queue.pop()) != null) {
      for (var children = node1.children, child, i = 0, n = children.length; i < n; ++i) {
        queue.push((children[i] = child = {
          _: children[i], // source node
          parent: node1,
          children: (child = children[i].children) && child.slice() || [],
          A: null, // default ancestor
          a: null, // ancestor
          z: 0, // prelim
          m: 0, // mod
          c: 0, // change
          s: 0, // shift
          t: null, // thread
          i: i // number
        }).a = child);
      }
    }

    return root1.children[0];
  }

  // FIRST WALK
  // Computes a preliminary x-coordinate for v. Before that, FIRST WALK is
  // applied recursively to the children of v, as well as the function
  // APPORTION. After spacing out the children by calling EXECUTE SHIFTS, the
  // node v is placed to the midpoint of its outermost children.
  function firstWalk(v) {
    var children = v.children,
        siblings = v.parent.children,
        w = v.i ? siblings[v.i - 1] : null;
    if (children.length) {
      d3_layout_treeShift(v);
      var midpoint = (children[0].z + children[children.length - 1].z) / 2;
	  v.midpoint=midpoint;
      if (w) {
        v.z = w.z + separation(v._, w._)+midpoint;
        v.m = v.z- midpoint;
      } else {
        v.z = midpoint;
      }
    } else if (w) {
      v.z = w.z + separation(v._, w._)+(w.midpoint ? w.midpoint:0);
    }
    v.parent.A = apportion(v, w, v.parent.A || siblings[0]);
  }

  // SECOND WALK
  // Computes all real x-coordinates by summing up the modifiers recursively.
  function secondWalk(v) {
    v._.x = v.z + v.parent.m;
    v.m += v.parent.m;
  }

  // APPORTION
  // The core of the algorithm. Here, a new subtree is combined with the
  // previous subtrees. Threads are used to traverse the inside and outside
  // contours of the left and right subtree up to the highest common level. The
  // vertices used for the traversals are vi+, vi-, vo-, and vo+, where the
  // superscript o means outside and i means inside, the subscript - means left
  // subtree and + means right subtree. For summing up the modifiers along the
  // contour, we use respective variables si+, si-, so-, and so+. Whenever two
  // nodes of the inside contours conflict, we compute the left one of the
  // greatest uncommon ancestors using the function ANCESTOR and call MOVE
  // SUBTREE to shift the subtree and prepare the shifts of smaller subtrees.
  // Finally, we add a new thread (if necessary).
  function apportion(v, w, ancestor) {
    if (w) {
      var vip = v,
          vop = v,
          vim = w,
          vom = vip.parent.children[0],
          sip = vip.m,
          sop = vop.m,
          sim = vim.m,
          som = vom.m,
          shift;
      while (vim = d3_layout_treeRight(vim), vip = d3_layout_treeLeft(vip), vim && vip) {
        vom = d3_layout_treeLeft(vom);
        vop = d3_layout_treeRight(vop);
        vop.a = v;
        shift = vim.z + sim - vip.z - sip + separation(vim._, vip._);
        if (shift > 0) {
          d3_layout_treeMove(d3_layout_treeAncestor(vim, v, ancestor), v, shift);
          sip += shift;
          sop += shift;
        }
        sim += vim.m;
        sip += vip.m;
        som += vom.m;
        sop += vop.m;
      }
      if (vim && !d3_layout_treeRight(vop)) {
        vop.t = vim;
        vop.m += sim - sop;
      }
      if (vip && !d3_layout_treeLeft(vom)) {
        vom.t = vip;
        vom.m += sip - som;
        ancestor = v;
      }
    }
    return ancestor;
  }

  function sizeNode(node) {
    node.x *= size[0];
    node.y = node.depth * size[1];
  }

  tree.separation = function(x) {
    if (!arguments.length) return separation;
    separation = x;
    return tree;
  };

  /**
  *x[0] 圆弧，全圆为360
  *x[1] 树形每层之间的距离,如第一层与第二层的距离
  *x[2] 字体大小，如果未设则默认为14
  **/
  tree.size = function(x) {
    if (!arguments.length) return nodeSize ? null : size;
    nodeSize = (size = x) == null ? sizeNode : null;
    return tree;
  };

  tree.nodeSize = function(x) {
    if (!arguments.length) return nodeSize ? size : null;
    nodeSize = (size = x) == null ? null : sizeNode;
    return tree;
  };
  function d3_layout_hierarchyLinks(nodes) {
    return d3.merge(nodes.map(function(parent) {
      return (parent.children || []).map(function(child) {
        return {
          source: parent,
          target: child
        };
      });
    }));
  }
  function d3_layout_hierarchyRebind(object, hierarchy) {
    d3.rebind(object, hierarchy, "sort", "children", "value");
    object.nodes = object;
    object.links = d3_layout_hierarchyLinks;
    return object;
  }
  return d3_layout_hierarchyRebind(tree, hierarchy);
};

function d3_layout_treeSeparation(a, b) {
  return a.parent == b.parent ? 1 : 2;
}

// function d3_layout_treeSeparationRadial(a, b) {
//   return (a.parent == b.parent ? 1 : 2) / a.depth;
// }

// NEXT LEFT
// This function is used to traverse the left contour of a subtree (or
// subforest). It returns the successor of v on this contour. This successor is
// either given by the leftmost child of v or by the thread of v. The function
// returns null if and only if v is on the highest level of its subtree.
function d3_layout_treeLeft(v) {
  var children = v.children;
  return children.length ? children[0] : v.t;
}

// NEXT RIGHT
// This function works analogously to NEXT LEFT.
function d3_layout_treeRight(v) {
  var children = v.children, n;
  return (n = children.length) ? children[n - 1] : v.t;
}

// MOVE SUBTREE
// Shifts the current subtree rooted at w+. This is done by increasing
// prelim(w+) and mod(w+) by shift.
function d3_layout_treeMove(wm, wp, shift) {
  var change = shift / (wp.i - wm.i);
  wp.c -= change;
  wp.s += shift;
  wm.c += change;
  wp.z += shift;
  wp.m += shift;
}

// EXECUTE SHIFTS
// All other shifts, applied to the smaller subtrees between w- and w+, are
// performed by this function. To prepare the shifts, we have to adjust
// change(w+), shift(w+), and change(w-).
function d3_layout_treeShift(v) {
  var shift = 0,
      change = 0,
      children = v.children,
      i = children.length,
      w;
  while (--i >= 0) {
    w = children[i];
    w.z += shift;
    w.m += shift;
    shift += w.s + (change += w.c);
  }
}

// ANCESTOR
// If vi-’s ancestor is a sibling of v, returns vi-’s ancestor. Otherwise,
// returns the specified (default) ancestor.
function d3_layout_treeAncestor(vim, v, ancestor) {
  return vim.a.parent === v.parent ? vim.a : ancestor;
}
