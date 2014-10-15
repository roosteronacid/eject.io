var RatingsHelper=function(t){var e=[];!function(){for(var r=t.length;r;)r--,e.push(parseInt(t[r].starRating,10))}(),this.getCollection=function(){return t},this.getRatings=function(){return e},this.getAverageRating=function(){for(var t=e.length,r=t,a=0;r;)r--,a+=e[r];return a/t},this.getAverageRatingCeiled=function(){return Math.ceil(this.getAverageRating())},this.getAverageRatingFormatted=function(){return this.getAverageRatingCeiled()+",0"},this.getStarDistribution=function(){for(var t=e.length,r=[0,0,0,0,0];t;)t--,r[e[t]-1]+=1;return r},this.getStarDistributionInDegrees=function(){for(var t=this.getStarDistribution(),r=t.length,a=[0,0,0];r;){r--;var n=t[r]/e.length*360;0===r?a[0]=n:r>0&&3>r?a[1]=a[1]+n:a[2]=a[2]+n}return a},this.getStarDistributionPercentages=function(t){for(var r=$.extend({},{floor:!1,ceil:!1,formatNumbers:!1},t),a=this.getStarDistribution(),n=a.length;n;){n--;var i=a[n]/e.length*100;r.floor&&(i=Math.floor(i)),r.ceil&&(i=Math.ceil(i)),r.formatNumbers&&(i+="%"),a[n]=i}return a}};$(function(){$.ajax({url:"json/reviews-alt.json",cache:!1,success:function(t){var e=new RatingsHelper(t.reviews),r=$(".scope-trustpilot");!function(){var t=r.find("header");t.find("h1").html(e.getAverageRatingFormatted()),t.find(".ratings").addClass("rating-"+e.getAverageRatingCeiled()),t.find("h2").addClass("rating-"+e.getAverageRatingCeiled()),t.find("h2 a span").html(e.getRatings().length)}(),function(){for(var t=r.find("section .bar-chart"),a=[],n=e.getStarDistributionPercentages({floor:!0}),i=n.length;i;)i--,a.push("<figure><figure style='width:"),a.push(n[i]),a.push("%'></figure></figure>");t.html(a.join(""))}(),r.removeClass("data-working data-error").addClass("data-loaded")},error:function(){$(".scope-trustpilot").removeClass("data-working data-loaded").addClass("data-error")}})});var PieChartGenerator=function(t){var e=["#35d888","#faac49","#fa4949"],r=function(t){return t*Math.PI/180},a=function(e){for(var r=0,a=0;e>a;a++)r+=t[a];return r};this.draw=function(n){for(var i=n.getContext("2d"),o=t.length,s=t.reverse();o;){o--,i.save();var g=Math.floor(n.width/2),l=Math.floor(n.height/2),u=Math.floor(n.width/2),d=r(a(o)),f=d+r(s[o]);i.beginPath(),i.moveTo(g,l),i.arc(g,l,u,d,f,!1),i.closePath(),i.fillStyle=e[o],i.fill(),i.restore()}}};$(function(){var t=$(".scope-trustpilot"),e=t.find("canvas").get(0);e&&$.ajax({url:"json/reviews-alt.json",cache:!1,success:function(r){var a=new RatingsHelper(r.reviews),n=new PieChartGenerator(a.getStarDistributionInDegrees());n.draw(e),t.removeClass("data-working data-error").addClass("data-loaded")},error:function(){$(".scope-trustpilot").removeClass("data-working data-loaded").addClass("data-error")}})});