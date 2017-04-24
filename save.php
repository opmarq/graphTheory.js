<?php 

	$graph = $_POST['graph'];
	$order = $_POST['order'];
	$algo = $_POST['algo'];
	$from = $_POST['dijfrom'];
	$to = $_POST['dijto'];

	if($to == "")
	{
		$to = 'mode = "all"';
	}

	//$graph = '[{"from":"0","to":"1","weight":"4"},{"from":"0","to":"5","weight":"2"}]';

	$graph_decoded = json_decode($graph,true);

	//echo "Graph est bien sauvgarder";

	//preg_match("/\d/",$graph,$resuilt);

	//var_dump($graph_decoded);

	//file_put_contents("graph.txt",$graph_decoded);

	echo $order;
	echo $algo;

	$weigthString = "c(";
	$graphString = "c(";

	if($algo == "kruskal")
	{
		for ($i=0; $i < sizeof($graph_decoded) ; $i++) { 
			if($i != 0)
			{	
				$graphString = $graphString.",";
			}

			$graphString = $graphString."".$graph_decoded[$i]['from'].",".$graph_decoded[$i]['to'].",".$graph_decoded[$i]['weight'];
		}

	}else{
		for ($i=0; $i < sizeof($graph_decoded) ; $i++) { 
			if($i != 0)
			{	
				$weigthString = $weigthString.",";
				$graphString = $graphString.",";
			}

			$graphString = $graphString."".$graph_decoded[$i]['from'].",".$graph_decoded[$i]['to'];
			$weigthString = $weigthString."".$graph_decoded[$i]['weight'];
		}
	}

	
	$weigthString = $weigthString.")";
	$graphString = $graphString.")";

	if( $algo == "wareshall")
	{
		 $RScript = 
		'	library(tcltk)
		library(igraph)
		library(interventionalDBN)
		library(optrees)
		M1<-graph('.$graphString.',n='.$order.',directed = FALSE)
		E(M1)$weight<-'.$weigthString.'
		plot(M1,edge.label=round(E(g)$weight))
		S1<-warshall(M1)
		tkplot(S1)';

	}else if($algo == "prime")
	{
		$RScript = 
		'	library(igraph)
		g<-graph('.$graphString.',n ='.$order.',directed = FALSE)
		E(g)$weight<-'.$weigthString.'
		plot(g,edge.label=round(E(g)$weight))
		mst <- minimum.spanning.tree(g,algorithm = "prim")
		tkplot(mst, edge.width=E(g)$weight)';
	}else if($algo == "dijkstra")
	{
		$RScript = 
		'	library(tcltk)
		library(igraph)
		Gr<-graph('.$graphString.',directed = FALSE)
		E(Gr)$weight<-'.$weigthString.'
		plot(Gr,edge.label=round(E(Gr)$weight))
		sol<-shortest.paths(Gr,'.$from.','.$to.',algorithm ="dijkstra")
		tkplot(Gr, edge.width=E(Gr)$weight)';	

	}else if($algo == "kruskal")
	{
		$RScript = 
		'	library(igraph)
		library(interventionalDBN)
		library(optrees)
		# Kruskal Algorithm 
		nodes <- 1:'.$order.'
		arcs <- matrix('.$graphString.',ncol = 3, byrow = TRUE)
		# Minimum cost spanning tree with several algorithms
		getMinimumSpanningTree(nodes, arcs, algorithm = "Kruskal")';	
	}


	echo $graphString;

	file_put_contents("script.R",$RScript);


