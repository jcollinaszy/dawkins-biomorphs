		var gene = [-5, -5, -5, -5, -5, 0, 5, 5, 6];
		var dx = [9, 9, 9, 9, 9, 9, 9, 9];
		var dy = [9, 9, 9, 9, 9, 9, 9, 9];
		
		function randomIntFromInterval(min,max) {
			return Math.floor(Math.random()*(max-min+1)+min);
		}
		
		function randomizeGene() {
			for ( let i = 0; i < gene.length-1; i++ ) {
				gene[i] = randomIntFromInterval(-9, 9);
			}
			gene[8] = randomIntFromInterval(2, 9);
			dx[3] = gene[0];    //basic dx directions
			dx[4] = gene[1];   
			dx[5] = gene[2];   
				
			dx[1] = -dx[3]; 	//symmetry about y axis
			dx[0] = -dx[4];   
			dx[7] = -dx[5];   
				
			dx[2] = 0;  
			dx[6] = 0;   
				
			dy[2] = gene[3]; 	//basic y directions
			dy[3] = gene[6];   
			dy[4] = gene[5];   
			dy[5] = gene[6];   
			dy[6] = gene[7];   
				
			dy[0] = dy[4]; 		//ensure symmetry
			dy[1] = dy[3];   
			dy[7] = dy[5]; 
		}
		
		function drawTree(ctx, x, y, length, dir) { 
			dir = (dir + 8)%8;
			var xnew = x + length * dx[dir];
			var ynew = y - length * dy[dir];
			ctx.moveTo(x, y);
			ctx.lineTo(xnew, ynew);
			ctx.stroke();
			if (length > 0) { 
				drawTree(ctx, xnew, ynew, length - 1, dir - 1); 
				drawTree(ctx, xnew, ynew, length - 1, dir + 1); 
			} 
		} 
		
		/*
		// needs to check edges
		function mutation(x) {
			let offspring = x.slice();
			let index = Math.floor(Math.random()*9);
			offspring[index] += Math.random() > 0.5 ? 1 : -1;
			return offspring;
		}
		
		function uniformCrossover(x, y) {
			let offspring = [];
			for ( let i = 0; i < x.length; i++ ) {
				if ( Math.random() > 0.5 ) {
					offspring.push(x[i]);
				} else {
					offspring.push(y[i]);
				}
			}
			return offspring;
		}	
		*/
		
		$(document).ready(function(){
			draw();
		});
		
		let draw = function() {
			var c = document.getElementById("myCanvas");
			var ctx = c.getContext("2d");
			randomizeGene();
			drawTree(ctx, 500, 500, gene[8], 2);
		};