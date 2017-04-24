	library(igraph)
		library(interventionalDBN)
		library(optrees)
		# Kruskal Algorithm 
		nodes <- 1:3
		arcs <- matrix(c(1,2,3,1,3,1,2,3,1),ncol = 3, byrow = TRUE)
		# Minimum cost spanning tree with several algorithms
		getMinimumSpanningTree(nodes, arcs, algorithm = "Kruskal")