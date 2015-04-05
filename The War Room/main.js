var territoryColors = <%= render partial: "territory_colors", locals: {territoryColors: @territoryColors} %>;
var territoryOwners = {<%= render partial: "territory_owners", locals: {territoryOwners: @territoryOwners} %>}
var Locations = [<%= render partial: "location", collection: @locations, locals: {user: @user} %>];
var LocationsDirectory = {}
var rendered_battles = []
<%= render partial: "battle", collection: @battles %>
var rendered_trades = []
var gameId = <%= @game.id%>
var swatches = <%= render partial: "swatch_list"%>
var userId = <%=@user.id%>
var trading = false;
var selected;
var globalItinerary
var globalSelectedIndex
var stop = false
var possibleMoves 
var movingObject = -1
seapoints = [];
var locationListenerData = {}
var changeLeg = [false,-1]
itinerary = [];
costToShip = 0;
var validLine = true;
mappingBattle = false
var activeBattleContext = {}
<%= render partial: "chess_pieces"%>
var User = {username:"<%= @user.username%>",id:<%= @user.id%>,name:"<%=@user.name%>"}
var GameAttribute = {id:<%=@user.game_attributes.find_by_game_id(@user.game_id).id%>}
var players = {<%= render partial: "user", collection: @users %>}
var globalScale = 1
var itinerary
var tradeLines
var cost
var quantity
var seapoints
var selectedIndex

var territoryPaths = <%= render partial: "images"%>

var continentFromTerritoryList = {central_america:"north_america",
central_asia:"asia",
central_south_america:"south_america",
china:"asia",
coastal_africa:"africa",
coastal_south_america:"south_america",
congo:"africa",
east_africa:"africa",
eastern_canada:"north_america",
eastern_south_america:"south_america",
egypt:"africa",
greenland:"north_america",
iceland:"europe",
india:"asia",
indonesia:"australia",
madagascar:"africa",
middle_east:"asia",
mongolia:"asia",
new_zealand:"australia",
non_contiguous_united_states:"north_america",
northeastern_united_states:"north_america",
northern_australia:"australia",
northern_europe:"europe",
northwestern_united_states:"north_america",
pacific_asia:"asia",
russia:"asia",
sahara:"africa",
southeastern_asia:"asia",
southeastern_united_states:"north_america",
southern_african_territory:"africa",
southern_australia:"australia",
southern_europe:"europe",
southwestern_united_states:"north_america",
ukraine:"europe",
united_kingdom:"europe",
western_europe:"europe",
western_canada:"north_america",
western_south_america:"south_america"}

var colors = {central_america:[ [0xe5,0x42,0x42], [496,591] ,[0.311006362]],
central_asia:[[0xf1,0x71,0x71], [2072,317] ,[0.284473688]],
central_south_america:[[0xfb,0x07,0x07], [849,803],[0.402101331]], 
china:[[0xfb,0x07,0xca], [2360,338] ,[0.073106002]], 
coastal_africa:[[0xd0,0x2e,0xb0], [1468,752] ,[0.653478724]], 
coastal_south_america:[[0xc4,0x56,0xae], [917,1136] ,[1.025283875]],
congo:[[0x87,0x13,0x70], [1746,816] ,[4.093718719]], 
east_africa:[[0x96,0x0e,0xbd], [1853,678] ,[3.45647866]], 
eastern_canada:[[0xc1,0x52,0xe1], [401,10] ,[0.338781336]], 
eastern_south_america:[[0xc6,0x00,0xff], [918,879] ,[1.078443444]], 
egypt:[[0x5d,0x1e,0x6f], [1732,567] ,[0.143233025]], 
greenland:[[0x48,0x0e,0xcb], [926,0] ,[1]],
iceland:[[0x84,0x55,0xef], [1399,193] ,[0.566702988]],
india:[[0x32,0x3a,0xde], [2305,580] ,[0.023725458]], 
indonesia:[[0x5f,0x65,0xd0], [2569,872] ,[0.177003406]], 
madagascar:[[0x5f,0xa4,0xd0], [2062,1071] ,[2.751700999]],
middle_east:[[0x0f,0x97,0xed], [1893,450] ,[0.218084511]], 
mongolia:[[0x33,0x79,0xa6], [2499,355] ,[8.573449039]], 
new_zealand:[[0x06,0xb5,0x6d], [3013,953] ,[0.292389938]],
non_contiguous_united_states:[[0x7e,0xc2,0xed], [0,137] ,[1.555525194]],
northeastern_united_states:[[0x30,0xcf,0xd5], [712,398] ,[0.02432892]], 
northern_australia:[[0x6b,0xf6,0xfb], [2881,1057] ,[1.060924816]], 
northern_europe:[[0x22,0x7f,0x82], [1693,480] ,[0.03048697]],
northwestern_united_states:[[0x67,0x91,0x93], [422,385] ,[0.145380297]], 
pacific_asia:[[0x73,0xe1,0xb4], [2856,458] ,[0.014887273]], 
russia:[[0x23,0xab,0x73], [1909,26] ,[0.484910872]],
sahara:[[0x23,0xab,0x33], [1472,520] ,[1.277875253]], 
southeastern_asia:[[0x7b,0xe1,0x87], [2421,597] ,[0.123679885]], 
southeastern_united_states:[[0x00,0xff,0x1e], [728,522] ,[0.03018645]], 
southern_african_territory:[[0x19,0x77,0x24], [1754,1031] ,[0.986084614]],
southern_australia:[[0x50,0x7E,0x55], [2746,1092] ,[0.442689699]], 
southern_europe:[[0x8f,0xc6,0x40], [1702,395] ,[0.035175045]], 
southwestern_united_states:[[0x51,0x8a,0x00], [420,452] ,[0.059710917]],
ukraine:[[0x97,0xde,0x32], [1671,128] ,[0.076732312]], 
united_kingdom:[ [0x19,0xaf,0xe0], [1537,277] ,[0.01625007]],
western_europe:[[0x8a,0xa6,0x33], [1546,367] ,[0.018317252]],
western_canada:[ [0xff,0xea,0x3d], [263,145] ,[1.358437809]], 
western_south_america:[[0xea,0xdb,0x35], [846,938] ,[2.043553816]]};

var color_key = {asia:[ [0x32,0x7c,0x00], [1844,226], [1662,1018],[1601.740805811558,902.0121478109274]], australia:[ [0x00,0x7c,0x78], [2546,1080], [868,640],[813.8564664278806,587.0005811784008]], africa:[ [0x2f,0x44,0x5a], [1444,724], [722,842],[673.9313422648022,807.502404949169]], europe:[ [0x5a,0x4c,0x2f], [1390,332], [654,442],[629.4471658304692,391.7846088201245]], north_america:[ [0x43,0x5a,0x2f], [0,178], [1532,912],[454.36824505888626,853.0609332048721]], south_america:[ [0x53,0x2f,0x5a], [798,1008], [528,786],[454.36824505888626,751.2988526644504]]};

// order asia australia africa e na sa 

var continentKey ={ asia:["central_asia","china","southeastern_asia","russia","mongolia","pacific_asia","india","middle_east"],
australia:["northern_australia","southern_australia","new_zealand","indonesia"],
africa:["sahara","egypt","congo","east_africa","southern_african_territory","madagascar","coastal_africa"],
europe:["northern_europe","southern_europe","western_europe","ukraine","united_kingdom","iceland"],
north_america:["northeastern_united_states","northwestern_united_states","southeastern_united_states","southwestern_united_states","eastern_canada","western_canada","greenland","central_america","non_contiguous_united_states"],
south_america:["coastal_south_america","eastern_south_america","western_south_america","central_south_america"]};

	function renderBattleAtSea(battle) {

		if (battle.pending == "t") {

			$("#battleAtSeaBoard").css("display","inline")
			$("#battleAtSeaBoard").css("margin-left",( ($(window).width()*0.85) - 768)/2)
			$("#battleAtSeaBoard").css("margin-top",( ($(window).height()) - 576)/2)

			$("#battleAtSeaPieces").append($("#ship1").clone().attr("class","ship").attr("id","piece1"))
			$("#battleAtSeaPieces").append($("#ship1").clone().attr("class","ship").attr("id","piece2"))
			$("#battleAtSeaPieces").append($("#ship1").clone().attr("class","ship").attr("id","piece3"))
			$("#battleAtSeaPieces").append($("#ship1").clone().attr("class","ship").attr("id","piece4"))

			$("#battleAtSeaPieces").append($("#ship2").clone().attr("class","ship").attr("id","piece5"))
			$("#battleAtSeaPieces").append($("#ship2").clone().attr("class","ship").attr("id","piece6"))
			$("#battleAtSeaPieces").append($("#ship2").clone().attr("class","ship").attr("id","piece7"))

			$("#battleAtSeaPieces").append($("#ship3").clone().attr("class","ship").attr("id","piece8"))
			$("#battleAtSeaPieces").append($("#ship3").clone().attr("class","ship").attr("id","piece9"))

			$("#battleAtSeaPieces").append($("#ship4").clone().attr("class","ship").attr("id","piece10"))

			$("#battleAtSeaPieces").append($("#ship5").clone().attr("class","ship").attr("id","piece11"))
			$("#battleAtSeaPieces").append($("#ship5").clone().attr("class","ship").attr("id","piece12"))

			$("#battleAtSeaPieces").append($("#ship6").clone().attr("class","ship").attr("id","piece13"))

			var movingPiece = false
			var clickStatus = false
			var rotate = 0
			var navy = []
			var selObject = false
			var selPiece = false
			var firstTime = true
			var valid = -1
			$(".ship").click(function() {
				var div = document.getElementsByClassName("test1")[0]
				var shipElem = this.cloneNode(true)
				div.appendChild(shipElem)
				$(shipElem).css("position","absolute").css("z-index","1001")
				movingPiece = shipElem
				$(this).css("display","none")
				$(movingPiece).click( function(e) {

					if (clickStatus != false) {
						$(movingPiece).css("display","none")
						if (document.elementFromPoint(e.pageX,e.pageY).id == "seaRadar") {
							var xco = parseInt($(movingPiece).css("left"))
							var yco = parseInt($(movingPiece).css("top"))
							var xco = Math.round(xco/32)*32
							var yco = Math.round(yco/32)*32
							var xcoordinate
							var ycoordinate
							if ($(movingPiece).css("transform") != "none") {
								xcoordinate = Math.floor(((xco + $(movingPiece).width()/2 - $("#offense").offset().left)/32))
								ycoordinate = Math.floor((((yco  - $(movingPiece).width()/2) - $("#offense").offset().top)/32))
							}
							else {
								xcoordinate = Math.floor(((xco - $("#offense").offset().left)/32))
								ycoordinate = Math.floor(((yco - $("#offense").offset().top)/32))
							}
							var tempNavy = navy.slice()
							var tempObject = jQuery.extend({},{id:parseInt(movingPiece.id.replace("piece","")),type:$(movingPiece).attr("alt").replace("Bas",""),coordinates:[xcoordinate,ycoordinate]});
							if (navy.length == 0) {

								if ($(movingPiece).css("transform") != "none" && $(movingPiece).css("transform") != "matrix(1, 0, 0, 1, 0, 0)") {
									tempNavy = [{id:parseInt(movingPiece.id.replace("piece","")),type:$(movingPiece).attr("alt").replace("Bas",""),coordinates:[xcoordinate,ycoordinate],rotation:"90deg"}]
									tempObject.rotation = "90deg"
								}
								else {
									tempNavy = [{id:parseInt(movingPiece.id.replace("piece","")),type:$(movingPiece).attr("alt").replace("Bas",""),coordinates:[xcoordinate,ycoordinate],rotation:"0deg"}]
									tempObject.rotation = "0deg"
								}
							}
							else {
								if ($(movingPiece).css("transform") != "none") {
									tempNavy.push({id:parseInt(movingPiece.id.replace("piece","")),type:$(movingPiece).attr("alt").replace("Bas",""),coordinates:[xcoordinate,ycoordinate],rotation:"90deg"})
									tempObject.rotation = "90deg"
								}
								else {
									tempNavy.push({id:parseInt(movingPiece.id.replace("piece","")),type:$(movingPiece).attr("alt").replace("Bas",""),coordinates:[xcoordinate,ycoordinate],rotation:"0deg"})
									tempObject.rotation = "0deg"
								}
							}
							if ($(movingPiece).css("transform") != "none") {


								if (varifyShipPlacement(tempNavy,tempObject) == true) {
									valid = true
									if (parseInt($(movingPiece).attr("alt").replace("Bas","")) % 2 == 0) {
										$(movingPiece).css("top", yco)
										$(movingPiece).css("left", xco + 9)
									}
									else {
										$(movingPiece).css("top", yco)
										$(movingPiece).css("left", xco - 9)
									}

									navy.push({id:parseInt(movingPiece.id.replace("piece","")),type:$(movingPiece).attr("alt").replace("Bas",""),coordinates:[xcoordinate,ycoordinate],rotation:"90deg"})
									$(selPiece).css("border","medium none black")
									selObject = {id:parseInt(movingPiece.id.replace("piece","")),type:$(movingPiece).attr("alt").replace("Bas",""),coordinates:[xcoordinate,ycoordinate],rotation:"90deg"}

									$(movingPiece).css("display","inline")
									$(movingPiece).attr("class","placedShip")

									selPiece = this
									$(this).css("border","3px solid black")
									movingPiece = false
									clickStatus = false
									firstTime = true
								}
								else {
									valid = false
								}
							}
							else {
								if (varifyShipPlacement(tempNavy,tempObject) == true) {
									valid = true
									navy.push({id:parseInt(movingPiece.id.replace("piece","")),type:$(movingPiece).attr("alt").replace("Bas",""),coordinates:[Math.floor(((xco - $("#offense").offset().left)/32)),Math.floor(((yco - $("#offense").offset().top)/32))],rotation:"0deg"})
									$(selPiece).css("border","medium none black")
									selObject = {id:parseInt(movingPiece.id.replace("piece","")),type:$(movingPiece).attr("alt").replace("Bas",""),coordinates:[Math.floor(((xco - $("#offense").offset().left)/32)),Math.floor(((yco - $("#offense").offset().top)/32))],rotation:"0deg"}
									$(movingPiece).css("top", yco)
									$(movingPiece).css("left", xco - 7)
									$(movingPiece).css("display","inline")
									$(movingPiece).attr("class","placedShip")

									selPiece = this
									$(this).css("border","3px solid black")
									movingPiece = false
									clickStatus = false
									firstTime = true
								}
								else {
									valid = false
								}
							}
						}
						else if (document.elementFromPoint(e.pageX,e.pageY).id == "battleAtSeaPieces") {
							$("#" + movingPiece.id).css("display","inline")
							movingPiece = false
							clickStatus = false
							$(movingPiece).remove()
						}
						$(movingPiece).css("display","inline")
					}
				})

			})
			$(document).on("click",".placedShip", function(e) {

				if (typeof selObject !== "undefined") {
					if (this.id == "piece" + selObject.id) {
						if (selObject != false) {
							if (firstTime != true) {
									for (var i = 0; i < navy.length; i++) {
										if ("piece" + navy[i].id == this.id) {
											navy.splice(i,1)
										}
									}
									movingPiece = this
									clickStatus = true
									$(selPiece).css("border","medium none black")
									selObject = false
									selPiece = false
							}
							firstTime = false
						}
					}
					else {
						if (valid == true) {
							$(selPiece).css("border","medium none black")
							var shipObject
							for (var i = 0; i < navy.length; i++) {
								if (navy[i]["id"] == parseInt(this.id.replace("piece",""))) {
									shipObject = navy[i]
								}
							}
							selObject = shipObject
							selPiece = this
							$(this).css("border","3px solid black")
						}
					}
				}
				else {
					$(selPiece).css("border","medium none black")
					var shipObject
					for (var i = 0; i < navy.length; i++) {
						if (navy[i]["id"] == parseInt(this.id.replace("piece",""))) {
							shipObject = navy[i]
						}
					}
					selObject = shipObject
					selPiece = this
					$(this).css("border","3px solid black")
				}
			})
			$("#offense").click( function(e) {
				if (selObject != false) {
					var staticxco = parseInt($(selPiece).css("left")) + $(selPiece).width()/2
					var staticyco = parseInt($(selPiece).css("top")) + $(selPiece).height()/2

					if (Math.abs(staticyco - e.pageY) > Math.abs(staticxco - e.pageX)) {



								var xco = parseInt($(selPiece).css("left"))
								var yco = parseInt($(selPiece).css("top"))

								var xco = Math.round(xco/32)*32
								var yco = Math.round(yco/32)*32


								var xcoordinate = Math.floor(((xco + $(selPiece).width()/2 - $("#offense").offset().left)/32))
								var ycoordinate = Math.floor((((yco  - $(selPiece).width()/2) - $("#offense").offset().top)/32))
								var navyTemp = navy.slice()
								for (var i = 0; i < navy.length; i++) {
									if (selObject.id == navy[i].id) {
										navyTemp[i]["rotation"] = "90deg"
										navyTemp[i]["coordinates"] = [xcoordinate,ycoordinate]
									}
								}

								var tempObject = jQuery.extend({},selObject);
								tempObject["rotation"] = "90deg"
								if (varifyShipPlacement(navyTemp,tempObject) == true) {
									selObject["rotation"] = "90deg"
									selObject["coordinates"] = [xcoordinate,ycoordinate]
									for (var i = 0; i < navy.length; i++) {
										if (selObject.id == navy[i].id) {
											navy[i]["rotation"] = "90deg"
											navy[i]["coordinates"] = [xcoordinate,ycoordinate]
										}
									}
									$(selPiece).css("transform","rotate(90deg)")
									if (parseInt(selObject["type"]) % 2 == 0) {
										$(selPiece).css("top", yco)
										$(selPiece).css("left", xco + 10)
									}
									else {
										$(selPiece).css("top", yco)
										$(selPiece).css("left", xco - 9)
									}
									$(selPiece).css("display","inline")
									$(selPiece).attr("class","placedShip")
								}

					}
					else {
								var xco = parseInt($(selPiece).css("left"))
								var yco = parseInt($(selPiece).css("top"))
								var xco = Math.round(xco/32)*32
								var yco = Math.round(yco/32)*32
								var navyTemp = navy.slice()
								for (var i = 0; i < navy.length; i++) {
									if (selObject.id == navy[i].id) {
										navyTemp[i]["rotation"] = "0deg"
										navyTemp[i]["coordinates"] = [xco/32,yco/32]
									}
								}
								var tempObject = jQuery.extend({},selObject);
								tempObject["rotation"] = "0deg"
								if (varifyShipPlacement(navyTemp,tempObject) == true) {
									$(selPiece).css("transform","rotate(0deg)")
									$(selPiece).css("top", yco )
									$(selPiece).css("left", xco)
									$(selPiece).css("display","inline")
									$(selPiece).attr("class","placedShip")
									selObject["rotation"] = "0deg"
									selObject["coordinates"] = [Math.floor(((xco - $("#offense").offset().left)/32)),Math.floor(((yco - $("#offense").offset().top)/32))]
									for (var i = 0; i < navy.length; i++) {
										if (selObject.id == navy[i].id) {
											navy[i]["rotation"] = "0deg"
											navy[i]["coordinates"] = [Math.floor(((xco - $("#offense").offset().left)/32)),Math.floor(((yco - $("#offense").offset().top)/32))]
										}
									}
								}
					}

				}
			})
			$("#battleAtSeaBoard").mousemove( function(e) {
				if (movingPiece != false) {
					clickStatus = true
					var width = $(movingPiece).width()/2
					var height = $(movingPiece).height()/2
					$(movingPiece).css("top",e.pageY - height)
					$(movingPiece).css("left",e.pageX - width)
				}
			})
		}

	}
	function varifyShipPlacement(navy,ship) {
		valid = true

		if (ship["rotation"] == "0deg") {
			for (var l = ship["coordinates"][0]; l < ship["coordinates"][0] + parseInt(ship["type"]); l++) {
				for (var i = 0 ; i < navy.length; i++) {
					if (navy[i]["id"] != ship["id"]) {

						if (navy[i]["rotation"] == "0deg") {
							for (var y = navy[i]["coordinates"][0]; y < navy[i]["coordinates"][0] + parseInt(navy[i]["type"]); y++) {

								if (y == l && ship["coordinates"][1] == navy[i]["coordinates"][1]) {

									valid = false
								}
							}
						}
						else {
							for (var y = navy[i]["coordinates"][1]; y < navy[i]["coordinates"][1] + parseInt(navy[i]["type"]); y++) {

								if (navy[i]["coordinates"][0] == l && y == ship["coordinates"][1]) {
									valid = false

								}
							}
						}
					}	
				}
			}
		}
		else {

			for (var l = ship["coordinates"][1]; l < ship["coordinates"][1] + parseInt(ship["type"]); l++) {

				for (var i = 0 ; i < navy.length; i++) {
					if (navy[i]["id"] != ship["id"]) {

						if (navy[i]["rotation"] == "0deg") {
							for (var y = navy[i]["coordinates"][0]; y < navy[i]["coordinates"][0] + parseInt(navy[i]["type"]); y++) {

								if (y == ship["coordinates"][0] && l == ship["coordinates"][1]) {
									valid = false

								}
							}
						}
						else {
							for (var y = navy[i]["coordinates"][1]; y < navy[i]["coordinates"][1] + parseInt(navy[i]["type"]); y++) {

								if (y == l && ship["coordinates"][0] == navy[i]["coordinates"][0]) {
									valid = false

								}
							}
						}
					}	
				}
			}
		}

		if (ship.rotation == "0deg") {
			if (varifyShipPlacementBoardValidity(ship.coordinates,parseInt(ship.type) - 1) == false) {
				valid = false
			}
		}
		else {
			if (varifyShipPlacementBoardValidity(ship.coordinates,0) == false) {
				valid = false
			}
		}

		return valid
	}
	function varifyShipPlacementBoardValidity(coordinates,shipLength) {
		var valid = false
		switch(coordinates[1]) {
			case 0: 
				if (coordinates[0] > 4 && coordinates[0]+shipLength <12) {
					valid = true
				}
			break
			case 1: 
				if (coordinates[0] > 2 && coordinates[0]+shipLength <14) {
					valid = true
				}
			break

			case 2: 
				if (coordinates[0] > 1 && coordinates[0]+shipLength <15) {
					valid = true
				}
			break

			case 3: 
				if (coordinates[0] > 0 && coordinates[0]+shipLength <16) {
					valid = true
				}
			break

			case 4: 
				if (coordinates[0] > 0 && coordinates[0]+shipLength <16) {
					valid = true
				}
			break

			case 5: 
				if (coordinates[0] > -1 && coordinates[0]+shipLength <17) {
					valid = true
				}
			break

			case 6: 
				if (coordinates[0] > -1 && coordinates[0]+shipLength <17) {
					valid = true
				}
			break

			case 7: 
				if (coordinates[0] > -1 && coordinates[0]+shipLength <17) {
					valid = true
				}
			break

			case 8: 
				if (coordinates[0] > -1 && coordinates[0]+shipLength <17) {
					valid = true
				}
			break

			case 9: 
				if (coordinates[0] > -1 && coordinates[0]+shipLength <17) {
					valid = true
				}
			break

			case 10: 
				if (coordinates[0] > -1 && coordinates[0]+shipLength <17) {
					valid = true
				}
			break

			case 11: 
				if (coordinates[0] > -1 && coordinates[0]+shipLength <17) {
					valid = true
				}
			break

			case 12: 
				if (coordinates[0] > 0 && coordinates[0]+shipLength <16) {
					valid = true
				}
			break

			case 13: 
				if (coordinates[0] > 0 && coordinates[0]+shipLength <16) {
					valid = true
				}
			break


			case 14: 
				if (coordinates[0] > 1 && coordinates[0]+shipLength <15) {
					valid = true
				}
			break

			case 15: 
				if (coordinates[0] > 2 && coordinates[0]+shipLength <14) {
					valid = true
				}
			break

			case 16: 
				if (coordinates[0] > 4 && coordinates[0]+shipLength <12) {
					valid = true
				}
			break
		}
		return valid
	}
var previous_level = [];
	function paintChessBoard(battle) {

		$("#chessBoard").css("display","inline")
		$("#chessBoard").find("path").attr("d","")

		for (key in battle["board"]) {

			if (battle["board"][key] != "empty") {
			
				var attribute = key.replace("B","").replace("A"," ").replace("C","")

				$("#chessBoard").find("#" + attribute.split(" ")[0] + attribute.split(" ")[1]).find("path").attr("d",piecePaths[battle["board"][key]["piece_type"]])

				$("#chessBoard").find("#" + attribute.split(" ")[0] + attribute.split(" ")[1]).find("svg").css("fill","#" + players[battle["board"][key]["owner_id"].toString()]["color"])

			}

		}

		//$(".one,#yours").css("background-color","#" + swatches["central_asia"]["L" + players[battle.user_one_id.toString()]["color"]])
		//$(".two,#theirs").css("background-color","#" + swatches["central_asia"]["L" + players[battle.user_two_id.toString()]["color"]])

	}
function appendMove(piece,move,empty,turn) {

	for (var i = 0; i < rendered_battles.length; i++) {
		if (rendered_battles[i]["id"] == piece.battle_id) {
			rendered_battles[i]["turn"] = turn
			for (var y = 0; y < empty.length; y++) {

				rendered_battles[i]["board"]["B" + empty[y].toString().split("")[0] + "A" + empty[y].toString().split("")[1] + "C"] = "empty"
			}
			rendered_battles[i]["board"]["B" + parseInt(piece.coordinates.split(",")[0]) + "A" + parseInt(piece.coordinates.split(",")[1]) + "C"] = "empty"


			rendered_battles[i]["board"]["B" + move[0] + "A" + move[1] + "C"] = {id:piece.id, piece_type:piece.piece_type, owner_id: piece.owner_id}



			paintChessBoard(rendered_battles[i])
		}
	}
	for (var i = 0; i < $("#chessBoard").find("path").length; i++) {
		$($("#chessBoard").find("path")[i]).css("fill",$($("#chessBoard").find("path")[i]).parent().css("fill"))
	}
	for (var i = 0; i < $("td").length; i++) {

		$($("td")[i]).css("background-color",$("." + $($("td")[i]).attr("class")).css("background-color"))
	}
	possibleMoves = []
	movingObject = -1

}
$( document ).ready(function() {

//renderChess(rendered_battles[rendered_battles.length - 1])
//renderBattleAtSea(rendered_battles[21])
//truncating script
	Number.prototype.toFixedDown = function(digits) {
	    var re = new RegExp("(\\d+\\.\\d{" + digits + "})(\\d)"),
		m = this.toString().match(re);
	    return m ? parseFloat(m[1]) : this.valueOf();
	};



//Object Funtions

	function deselect(context) {

		var selPastIndex = 0
		var selObject = []

		for (i = 0; i < rendered_forts.length; i++) {

			if (rendered_forts[i][1] == "sel" && selPastIndex < 1) {
			
				if (context != "mappingBattle") {
					rendered_forts[i][1] = "selpast"
				}
				else {
					selObject = ["fort",i]
				}
			}
			if (context == "mappingBattle") {

				if (rendered_forts[i][1] == "selpast") {

					selPastIndex++
				}
			}
		}
		for (i = 0; i < rendered_encampments.length; i++) {

			if (rendered_encampments[i][1] == "sel" && selPastIndex < 1) {

				if (context != "mappingBattle") {
					rendered_encampments[i][1] = "selpast"
				}
				else {
					selObject = ["encampment",i]
				}
			}
			if (context == "mappingBattle") {

				if (rendered_encampments[i][1] == "selpast") {

					selPastIndex++
				}
			}
		}
		for (i = 0; i < seapoints.length; i++) {

			if (seapoints[i][1] == "sel" && selPastIndex < 1) {

				if (context != "mappingBattle") {
					seapoints[i][1] = "selpast"
				}
				else {
					selObject = ["seapoint",i]
				}
			}
			if (context == "mappingBattle") {

				if (rendered_forts[i][1] == "selpast") {

					selPastIndex++
				}
			}
		}
		if (context == "mappingBattle") {
			if (selPastIndex < 2) {
				if (selObject[0] == "encampment") {

					rendered_encampments[selObject[1]][1] = "selpast"
				}
				else if (selObject[0] == "fort") {
					rendered_forts[selObject[1]][1] = "selpast"
				}
			}
			return selPastIndex
		}

	}
	
	function changeSel(object,indexInList) {

		deselect(-1)
			if (object == "seapoint") {
				seapoints[indexInList][1] = "sel"
			}
			else if (object.id.replace(/[0-9]/g, '') == "fort") {

				rendered_forts[indexInList][1] = "sel"

			}
			else if (object.id.replace(/[0-9]/g, '') == "encampment") {

				rendered_encampments[indexInList][1] = "sel"

			}

			renderObject("encampment",zoomLevel,true);
			renderObject("fort",zoomLevel);
	}

	function selectFirst() {

		deselect(-1)
			for (var i = 0; i < rendered_forts.length; i++) {

				if (typeof itinerary[itinerary.length - 1][rendered_forts[i][0].date.toString()] !== 'undefined') {

					rendered_forts[i][1] = "sel"

					return	
				}
			}
			for (i = 0; i < seapoints.length; i++) {

				if (seapoints[i][0]["xco"] == itinerary[itinerary.length - 1][0]["xco"]) {

					seapoints[seapoints.length - 1][1] = "sel"
					return	
				}
			}
			for (var i = 0; i < rendered_encampments.length; i++) {

				if (typeof itinerary[itinerary.length - 1][rendered_encampments[i][0].date.toString()] !== 'undefined') {

					rendered_encampments[i][1] = "sel"
					return	
				}
			}

			changeLeg[0] = false
	}
	function validateLine(oldObject, currentObject) {

		validLine = true
		var escapeFuntion = false

		var passThroughTerritory;
		var passContex
		var activeCanvas = document.getElementById('activeCanvas')
		var activeContext = activeCanvas.getContext("2d");
		var activeImage = document.getElementById('activeImage')
		activeContext.drawImage(activeImage,0,0);
		var activePixelData = activeContext.getImageData(0,0,$("#activeCanvas").width(),$("#activeCanvas").height())["data"];

		var globalScaleFactor = parseFloat($("#globalMap").children("g").attr("transform").split(")")[0].replace("scale(",""))

		var oldxco
		var oldyco
		var xco
		var yco
		var color
		var oldColor

		if (currentObject["territory"] != "global") {

			xco = (currentObject["xco"] + colors[currentObject["territory"].replace("#","")][1][0])*0.1251425314
			yco = (currentObject["yco"] + colors[currentObject["territory"].replace("#","")][1][1])*0.1251425314

			color = [colors[currentObject["territory"].replace("#","")][0][0],colors[currentObject["territory"].replace("#","")][0][1],colors[currentObject["territory"].replace("#","")][0][2]]		
		}
		else {

			xco = (currentObject["xco"]/globalScaleFactor)*0.1251425314
			yco = (currentObject["xco"]/globalScaleFactor)*0.1251425314

			color = [73,73,73]	
		}

		if (oldObject["territory"] != "global") {

			oldxco = (oldObject["xco"] + colors[oldObject["territory"].replace("#","")][1][0])*0.1251425314
			oldyco = (oldObject["yco"] + colors[oldObject["territory"].replace("#","")][1][1])*0.1251425314

			oldColor = [colors[oldObject["territory"].replace("#","")][0][0],colors[oldObject["territory"].replace("#","")][0][1],colors[oldObject["territory"].replace("#","")][0][2]]		
		}
		else {

			oldxco = (oldObject["xco"]/globalScaleFactor)*0.1251425314
			oldyco = (oldObject["xco"]/globalScaleFactor)*0.1251425314

			oldColor = [73,73,73]	
		}

		var xdistance = xco - oldxco
		var ydistance = yco - oldyco
		var slope = xdistance/ydistance

		for (var y = 0; y < Math.abs(ydistance); y++) {

			var xindex = Math.round(y*slope)

			var pixel = [activePixelData[((Math.round(oldyco + y)*439) + Math.round(oldxco + xindex))*4],activePixelData[((Math.round(oldyco + y)*439) + Math.round(oldxco + xindex))*4 +1],activePixelData[((Math.round(oldyco + y)*439) + Math.round(oldxco + xindex))*4 + 2],activePixelData[((Math.round(oldyco + y)*439) + Math.round(oldxco + xindex))*4 + 3]]

			if ((pixel[0] == 73 && pixel[1] == 73 && pixel[2] == 73) || (pixel[0] == color[0] && pixel[1] == color[1] && pixel[2] == color[2]) || (pixel[0] == oldColor[0] && pixel[1] == oldColor[1] && pixel[2] == oldColor[2])) {

			}
			else {
				for (var key in colors) {
					if (colors[key][0][0] == pixel[0] && colors[key][0][1] == pixel[1] && colors[key][0][1] == pixel[1]) {

						if (territoryOwners[key]["owner_id"] == <%= @user.id %>) {

						}
						else {
							alertBox("You must stop at a fort or camp <br> to travel throughout a forign country",-1,1,["alertOkay"])
							validLine = false
						}
					}
				}

			}
		}

		
	}
	function validateSeaPoint() {

		var activeCanvas = document.getElementById('activeCanvas')
		var activeContext = activeCanvas.getContext("2d");
		var activeImage = document.getElementById('activeImage')
		activeContext.drawImage(activeImage,0,0);
		var activePixelData = activeContext.getImageData(0,0,$("#activeCanvas").width(),$("#activeCanvas").height())["data"];
		var valid =true
		var oldObject;
		var oldxco
		var oldyco
		var globalScaleFactor = parseFloat($("#globalMap").children("g").attr("transform").split(")")[0].replace("scale(",""))
		var xco = ((alertContext.pageX - $("#background").offset().left)/globalScaleFactor)*0.1251425314
		var yco = ((alertContext.pageY - $("#background").offset().top)/globalScaleFactor)*0.1251425314

		var color

		if (changeLeg[0] == false) {

			oldObject = itinerary[itinerary.length - 1]
		}
		else {

			oldObject = itinerary[changeLeg[1]]
		}
		if (typeof oldObject[1] === "undefined") {

			for (key in oldObject) {

				oldxco = (oldObject[key]["xco"] + colors[oldObject[key]["territory"].replace("#","")][1][0])*0.1251425314
				oldyco = (oldObject[key]["yco"] + colors[oldObject[key]["territory"].replace("#","")][1][1])*0.1251425314
				oldObject = oldObject[key]

				color = [colors[oldObject["territory"].replace("#","")][0][0],colors[oldObject["territory"].replace("#","")][0][1],colors[oldObject["territory"].replace("#","")][0][2]]	
			}	
		}
		else {

			oldxco = (oldObject["xco"]/globalScaleFactor)*0.1251425314
			oldyco = (oldObject["xco"]/globalScaleFactor)*0.1251425314
			oldObject = oldObject[0]
			color = [73,73,73]	
		}
		var xdistance = xco - oldxco
		var ydistance = yco - oldyco
		var slope = xdistance/ydistance

		for (var y = 0; y < Math.abs(ydistance); y++) {

			var xindex = Math.round(y*slope)

			var pixel = [activePixelData[((Math.round(oldyco + y)*439) + Math.round(oldxco + xindex))*4],activePixelData[((Math.round(oldyco + y)*439) + Math.round(oldxco + xindex))*4 +1],activePixelData[((Math.round(oldyco + y)*439) + Math.round(oldxco + xindex))*4 + 2],activePixelData[((Math.round(oldyco + y)*439) + Math.round(oldxco + xindex))*4 + 3]]

			if ((pixel[0] == 73 && pixel[1] == 73 && pixel[2] == 73) || (pixel[0] == color[0] && pixel[1] == color[1] && pixel[2] == color[2])) {
			}
			else {
				valid = false
			}

		}
		if (valid == true) {
			return true
		}
	}
	function mapTrade(object) {

		trading = true
		var cancel = false
		$("#user_trades_attributes_100000000000_quantity").css("display","inline")	
		$("#itemSelector").css("display","inline")
		$("#submitObject").css("display","inline")
		$("#forms").append("<p id='cost'>$0</p>")

		$("#cancelCreation").click( function() {
			if (trading == true) {
				trading = false
				itinerary = []
				for (var i = 0; i < rendered_forts.length; i++) {
					rendered_forts[i].splice(1,1)
				}
				for (var i = 0; i < rendered_encampments.length; i++) {
					rendered_encampments[i].splice(1,1)
				}
				$("#traderoutes").children().not("#activeTrade").remove() //Will need updated
				$("#submitObject").css("display","none")
				$("#itemSelector").css("display","none")
				$("#cancelCreation").css("display","none")
				$(".newObjectButton").css("display", "inline")
				$(".fields").remove()	
				$("#cost").remove()	
				renderObject("encampment",zoomLevel,true);
				renderObject("fort",zoomLevel);
				renderTrade(itinerary,"trade proposal",false)
				cancel = false
			}
		})
		$("#submitObject").click( function() {
			if (trading == true) {
				trading = false
				itinerary = []
				for (var i = 0; i < rendered_forts.length; i++) {
					rendered_forts[i].splice(1,1)
				}
				for (var i = 0; i < rendered_encampments.length; i++) {
					rendered_encampments[i].splice(1,1)
				}
				$("#traderoutes").children().remove() //Will need updated
				$("#submitObject").css("display","none")
				$("#itemSelector").css("display","none")
				$("#cancelCreation").css("display","none")
				$(".newObjectButton").css("display", "inline")
				$(".fields").css("display","none")	
				$("#cost").remove()	
				renderObject("encampment",zoomLevel,true);
				renderObject("fort",zoomLevel);
				renderTrade(itinerary,"trade proposal",false)
				cancel = false
			}	
		})
		$("#user_trades_attributes_100000000000_quantity").change( function() {

			if (isNaN(parseInt($("#user_trades_attributes_100000000000_quantity").val())) == false) {
				$("#cost").text("$" + Math.round(costToShip*parseInt($("#user_trades_attributes_100000000000_quantity").val()*100)/100))
			}
		})
		$("#alertConfirm").click( function() {
			if (cancel == false && validateSeaPoint() == true) {
				if (alerting == "seapoint") {
						deselect(-1)

						if (changeLeg[0] == false) {
							if (itinerary.length > 0) {
								var currentObject = {xco:alertContext.pageX - $("#background").offset().left,yco:alertContext.pageY - $("#background").offset().top,territory:"global"}
								var oldObject

								var oldObjectId = [itinerary[itinerary.length - 1]]

								if (typeof oldObjectId[0][1] === "undefined") {

									for (key in oldObjectId[0]) {

										oldObject = oldObjectId[0][key] 
										if (typeof oldObjectId[0][key]["ownership"] === "undefined") {

											oldObjectId.push("encampment")
										}
										else {

											oldObjectId.push("fort")
										}

										oldObjectId[0] = oldObjectId[0][key]["id"]
									}
								}
								else {
									oldObject = oldObjectId[0][0] 
									oldObjectId = [oldObjectId[0]["xco"] + " " + oldObjectId[0]["yco"],"seapoint"]
								}

									var temp = validateLine(oldObject,currentObject)

								if (validLine == true) {

										$("#create_leg").click(); 

										$("#user_trades_attributes_100000000000_legs_attributes_" + (100000000000 + $(".leg_fields").length - 1).toString() + "_location_id").val((alertContext.pageX - $("#background").offset().left) + " " + (alertContext.pageY - $("#background").offset().top));

										$("#user_trades_attributes_100000000000_legs_attributes_" + (100000000000 + $(".leg_fields").length - 1).toString() + "_location_type").val("seapoint");

										$("#user_trades_attributes_100000000000_legs_attributes_" + (100000000000 + $(".leg_fields").length - 1).toString() + "_trade_index").val($(".leg_fields").length - 1);							

									itinerary.push([{xco:alertContext.pageX - $("#background").offset().left,yco:alertContext.pageY - $("#background").offset().top,territory:"global"},"seapoint"])
									seapoints.push([{xco:alertContext.pageX - $("#background").offset().left,yco:alertContext.pageY - $("#background").offset().top,territory:"global"},"sel"])
								}
							}
							else {
								$("#create_leg").click(); 
	
									$("#user_trades_attributes_100000000000_legs_attributes_" + (100000000000 + $(".leg_fields").length - 1).toString() + "_location_id").val((alertContext.pageX - $("#background").offset().left) + " " + (alertContext.pageY - $("#background").offset().top));

									$("#user_trades_attributes_100000000000_legs_attributes_" + (100000000000 + $(".leg_fields").length - 1).toString() + "_location_type").val("seapoint");

									$("#user_trades_attributes_100000000000_legs_attributes_" + (100000000000 + $(".leg_fields").length - 1).toString() + "_trade_index").val(0);							


								itinerary.push([{xco:alertContext.pageX - $("#background").offset().left,yco:alertContext.pageY - $("#background").offset().top,territory:"global"},"seapoint"])
								seapoints.push([{xco:alertContext.pageX - $("#background").offset().left,yco:alertContext.pageY - $("#background").offset().top,territory:"global"},"sel"])
							}
						}
						else if (changeLeg[0] == true) {
									var submitObject 

									var oldObject
									var currentObject

									var oldObjectId
									var presentObject

									var fieldNumber = changeLeg[1]

									if (changeLeg[1] % 2 == 1) {

										currentObject = {xco:alertContext.pageX - $("#background").offset().left,yco:alertContext.pageY - $("#background").offset().top,territory:"global"}
										presentObject = [currentObject.xco + " " + currentObject.yco, "seapoint"]

										oldObjectId = [itinerary[changeLeg[1] - 1]]

										if (typeof oldObjectId[0][1] === "undefined") {

											for (key in oldObjectId[0]) {

												oldObject = oldObjectId[0][key]
												if (typeof oldObjectId[0][key]["ownership"] === "undefined") {

													oldObjectId.push("encampment")
												}
												else {

													oldObjectId.push("fort")
												}

												oldObjectId[0] = oldObjectId[0][key]["id"]
											}
										}
										else {

											oldObject = oldObjectId[0][0]
											oldObjectId[0] = oldObjectId[0][0]["xco"] + " " + oldObjectId[0][0]["yco"]
											oldObjectId.push("seapoint")
										}
										submitObject = presentObject
									}
									else {
										oldObject = {xco:alertContext.pageX - $("#background").offset().left,yco:alertContext.pageY - $("#background").offset().top,territory:"global"}
										oldObjectId = [oldObject.xco + " " + oldObject.yco, "seapoint"]

										presentObject = [itinerary[changeLeg[1] + 1]]
						
										if (typeof presentObject[1] !== "undefined") {

											for (key in presentObject[0]) {	

												currentObject = presentObject[0]["key"]
												if (typeof presentObject[0][key]["ownership"] === "undefined") {

													presentObject.push("encampment")
												}
												else {

													presentObject.push("fort")
												}

												presentObject[0] = presentObject[0][key]["id"]
											}
										}
										else {
											currentObject = presentObject[0][0]
											presentObject[0] = presentObject[0][0]["xco"] + " " + oldObjectId[0][0]["yco"]
											presentObject.push("seapoint")
										}
										submitObject = oldObjectId
						
									}

									var temp = validateLine(oldObject,currentObject)
									if (validLine == true) {

										$("#user_trades_attributes_100000000000_legs_attributes_" + (100000000000 + fieldNumber).toString() + "_location_id").val(submitObject[0]);

										$("#user_trades_attributes_100000000000_legs_attributes_" + (100000000000 + fieldNumber).toString() + "_location_type").val(submitObject[1]);

										$("#user_trades_attributes_100000000000_legs_attributes_" + (100000000000 + fieldNumber).toString() + "_trade_index").val(changeLeg[1]);

										itinerary[changeLeg[1]] = [{xco:alertContext.pageX - $("#background").offset().left,yco:alertContext.pageY - $("#background").offset().top,territory:"global"},"seapoint"]
										seapoints[changeLeg[2]] = [{xco:alertContext.pageX - $("#background").offset().left,yco:alertContext.pageY - $("#background").offset().top,territory:"global"},"sel"]

									}
						}
						renderTrade(itinerary,"trade proposal",false)
						renderObject("encampment",zoomLevel,true);
						renderObject("fort",zoomLevel);
				}
			}
			else {
				return
			}
	
		});

		if (zoomLevel[0] == "territorial") {
			$("svg").click( function(e) {

				if (cancel == false && zoomLevel[0] == "territorial") {
					$("#renderedSprites").css("pointer-events","auto")

					if ($(document.elementFromPoint(e.pageX, e.pageY)).attr("class") == "renderedSprite" && zoomLevel[0] != "global") {

						var checkpoint = document.elementFromPoint(e.pageX, e.pageY)

						var objectInCompleteList
						var completeList

						if (checkpoint.id.replace(/[0-9]/g, '') == "fort") {

							completeList = rendered_forts

							for (var i = 0; i < rendered_forts.length; i++) {

								if (rendered_forts[i][0].date == visibleObjects[checkpoint.id.replace(/[0-9]/g, '')][parseInt(checkpoint.id.replace(/\D/g,''))][0].date) {

									objectInCompleteList = i;

									if (rendered_forts[i][1] == 'selpast' || rendered_forts[i][1] == 'sel') {

										for (y = 0; y < itinerary.length; y++) {

											if ((typeof itinerary[y][rendered_forts[i][0].date.toString()] !== "undefined" &&  rendered_forts[i][1] == 'selpast') || (itinerary[y][rendered_forts[i][0].date.toString()] !== "undefined" &&  rendered_forts[i][1] == 'sel' && y - 1 == itinerary.length)) {

												changeSel(checkpoint,i)
												changeLeg = [true,y,i,"fort"]
											}
											else if (typeof itinerary[y][rendered_forts[i][0].date.toString()] !== "undefined" && rendered_forts[i][1] == 'sel') {

												selectFirst()
												changeLeg[0] = false
											}
										
										}
									}
								}
							}
						}

						else if (checkpoint.id.replace(/[0-9]/g, '') == "encampment") {

							completeList = rendered_encampments

							for (var i = 0; i < rendered_encampments.length; i++) {

								if (rendered_encampments[i][0].date == visibleObjects[checkpoint.id.replace(/[0-9]/g, '')][parseInt(checkpoint.id.replace(/\D/g,''))][0].date) {

									objectInCompleteList = i;

									if (rendered_encampments[i][1] == 'selpast' || rendered_encampments[i][1] == 'sel') {

										for (y = 0; y < itinerary.length; y++) {

											if ((typeof itinerary[y][rendered_encampments[i][0].date.toString()] !== "undefined" &&  rendered_encampments[i][1] == 'selpast') || (itinerary[y][rendered_encampments[i][0].date.toString()] !== "undefined" &&  rendered_encampments[i][1] == 'sel' && y - 1 == itinerary.length)) {

												changeSel(checkpoint,i)
												changeLeg = [true,y,i,"encampment"]
											}
											else if (typeof itinerary[y][rendered_encampments[i][0].date.toString()] !== "undefined" && rendered_encampments[i][1] == 'sel') {
												selectFirst()
												changeLeg[0] = false
											}
							
										}
									}
								}
							}
						}

							if (typeof completeList[objectInCompleteList][1] === 'undefined'){


							//Put the thing in itinerary under its date - Fucked up shit if you ask me

							var idDate = visibleObjects[checkpoint.id.replace(/[0-9]/g, '')][parseInt(checkpoint.id.replace(/\D/g,''))][0].date.toString()
							var objectInfo = visibleObjects[checkpoint.id.replace(/[0-9]/g, '')][parseInt(checkpoint.id.replace(/\D/g,''))][0]
							var tempObject =  {}
							tempObject[idDate] = objectInfo


							if (changeLeg[0] == false) {

								if (itinerary.length > 0) {

									var oldObject
									var currentObject =  tempObject
									for (key in tempObject) {
					
										currentObject = tempObject[key]
									}

									var presentObject = [currentObject.id]
									var oldObjectId = [itinerary[itinerary.length - 1]] 

									if (typeof currentObject["ownership"] === "undefined") {
										presentObject.push("encampment")
									}
									else {
										presentObject.push("fort")
									}

									if (typeof oldObjectId[0][1] === "undefined") {
								
										for (key in oldObjectId[0]) {
											oldObject = oldObjectId[0][key]
											if (typeof oldObjectId[0][key]["ownership"] === "undefined") {

												oldObjectId.push("encampment")
											}
											else {

												oldObjectId.push("fort")
											}

											oldObjectId[0] = oldObjectId[0][key]["id"]
										}
									}
									else {
										oldObject = oldObjectId[0][0]
										oldObjectId[0] = oldObjectId[0][0]["xco"] + " " + oldObjectId[0][0]["yco"]
										oldObjectId.push("seapoint")
									}

									var temp = validateLine(oldObject,currentObject)
									valid = validLine
									if (validLine == true) {
										$("#create_leg").click()
										$("#user_trades_attributes_100000000000_legs_attributes_" + (100000000000 + $(".leg_fields").length - 1).toString() + "_location_id").val(presentObject[0]);

										$("#user_trades_attributes_100000000000_legs_attributes_" + (100000000000 + $(".leg_fields").length - 1).toString() + "_location_type").val(presentObject[1]);

										$("#user_trades_attributes_100000000000_legs_attributes_" + (100000000000 + $(".leg_fields").length - 1).toString() + "_trade_index").val($(".leg_fields").length - 1);
										itinerary.push(tempObject)
									}
									else {
										var object
										for (prop in tempObject) {
											object = tempObject[prop]
										}
										if (typeof object["ownership"] !== "undefined") {

											for (var y = 0; y < rendered_forts.length; y++) {
												if (object == rendered_forts[i]) {
													rendered_forts[i] = rendered_forts[i].slice(1,2)
												}
											}
										}
										else {
											for (var y = 0; y < rendered_encampments.length; y++) {
												if (object == rendered_encampments[i]) {
													rendered_encampments[i] = rendered_encampments[i].slice(1,2)
												}
											}
										}
									}
								}
								else {
									presentObject = tempObject
									for (var key in tempObject) {
										presentObject = tempObject[key]
									}
									if (typeof presentObject["ownership"] !== "undefined") {
										presentObject = [presentObject.id,"fort"]
									}
									else {
										presentObject = [presentObject.id,"encampment"]
									}
									$("#create_leg").click()

									$("#user_trades_attributes_100000000000_legs_attributes_" + (100000000000 + $(".leg_fields").length - 1).toString() + "_location_id").val(presentObject[0]);

									$("#user_trades_attributes_100000000000_legs_attributes_" + (100000000000 + $(".leg_fields").length - 1).toString() + "_location_type").val(presentObject[1]);

									$("#user_trades_attributes_100000000000_legs_attributes_" + (100000000000 + $(".leg_fields").length - 1).toString() + "_trade_index").val(0);
									itinerary.push(tempObject)
								}
							}
							else {

									var submitObject

									var oldObject
									var currentObject

									var presentObject
									var oldObjectId

									var fieldNumber = changeLeg[1]

									if (changeLeg[1] % 2 == 1) {

										currentObject = tempObject
										for (key in currentObject) {
					
											currentObject = currentObject[key]
										}
										presentObject = [currentObject.id]

										if (typeof currentObject["ownership"] === "undefined") {
											presentObject.push("encampment")
										}
										else {
											presentObject.push("fort")
										}

										oldObjectId = [itinerary[changeLeg[1] - 1]]

										if (typeof oldObjectId[0][1] === "undefined") {

											for (key in oldObjectId[0]) {

												oldObject = oldObjectId[0][key]
												if (typeof oldObjectId[0][key]["ownership"] === "undefined") {

													oldObjectId.push("encampment")
												}
												else {

													oldObjectId.push("fort")
												}

												oldObjectId[0] = oldObjectId[0][key]["id"]
											}
										}
										else {
											oldObject = oldObjectId[0]
											oldObjectId.push("seapoint")
											oldObjectId[0] = oldObjectId + " " +  oldObjectId
										}
										submitObject = presentObject

									}
									else {
										
										oldObject = tempObject
										oldObjectId = [oldObject.id]
										for (key in oldObject) {
					
											oldObject = oldObject[key]
										}
										if (typeof oldObject["ownership"] === "undefined") {
											oldObjectId.push("encampment")
										}
										else {
											oldObjectId.push("fort")
										}
					
										var presentObject = [itinerary[changeLeg[1] + 1]]

										if (typeof presentObject[0][1] === "undefined") {

											for (key in presentObject[0]) {	

												currentObject = presentObject[0][key]
												if (typeof presentObject[0][key]["ownership"] === "undefined") {

													presentObject.push("encampment")
												}
												else {

													presentObject.push("fort")
												}

												presentObject[0] = presentObject[0][key]["id"]
											}
										}
										else {
											currentObject = presentObject[0][0]
											presentObject.push("seapoint")
											presentObject[0] = presentObject[0].xco + " " +  presentObject[0].yco
										}
										submitObject = oldObjectId

									}

									var temp = validateLine(oldObject,currentObject)
									valid = validLine
									if (validLine == true) {

										$("#user_trades_attributes_100000000000_legs_attributes_" + (100000000000 + fieldNumber).toString() + "_location_id").val(submitObject[0]);

										$("#user_trades_attributes_100000000000_legs_attributes_" + (100000000000 + fieldNumber).toString() + "_location_type").val(submitObject[1]);

										$("#user_trades_attributes_100000000000_legs_attributes_" + (100000000000 + fieldNumber).toString() + "_trade_index").val(changeLeg[1]);

										itinerary[changeLeg[1]] = tempObject
		

										if (changeLeg[3] == "encampment") {
											rendered_encampments[changeLeg[2]].splice(1,1)
										}
										else if (changeLeg[3] == "fort") {
											rendered_forts[changeLeg[2]].splice(1,1)
										}
										else if (changeLeg[3] == "seapoint") {
											seapoints.splice(changeLeg[2], 1);
										}
									}
							}
							if (validLine == true) {
							deselect(-1)
								for (i = 0; i < rendered_forts.length; i++) {
									if (rendered_forts[i][0].date == visibleObjects[checkpoint.id.replace(/[0-9]/g, '')][parseInt(checkpoint.id.replace(/\D/g,''))][0].date) {
										rendered_forts[i].push("sel")
										if (changeLeg[0] == true) {
											changeLeg[3] = "fort"
											changeLeg[2] = i
										}


									}
								}
								for (i = 0; i < rendered_encampments.length; i++) {
									if (rendered_encampments[i][0].date == visibleObjects[checkpoint.id.replace(/[0-9]/g, '')][parseInt(checkpoint.id.replace(/\D/g,''))][0].date) {
										rendered_encampments[i].push("sel")
										if (changeLeg[0] == true) {
											changeLeg[3] = "encampment"
											changeLeg[2] = i
										}	

									}
								}
							}
						}

					}
					renderObject("encampment",zoomLevel,true);
					renderObject("fort",zoomLevel);

					renderTrade(itinerary,"trade proposal",false)

					$("#renderedSprites").css("pointer-events","none")
				}
				else {
					return
				}
			})

		}
	}
	function mapBattle() {

		mappingBattle = true


		$("#submitBattle").css("display","inline")
		
		var currentObject
		var oldObject

		$("svg").click( function(e) {

			if (zoomLevel[0] == "territorial" && mappingBattle == true && trading == false) {
				$("#renderedSprites").css("pointer-events","auto")
				if ($(document.elementFromPoint(e.pageX, e.pageY)).attr("class") == "renderedSprite" && zoomLevel[0] != "global") {

					var sprite = document.elementFromPoint(e.pageX, e.pageY)

					var object = visibleObjects[sprite.id.replace(/[0-9]/g, '')][parseInt(sprite.id.replace(/\D/g,''))]
					if (deselect("mappingBattle") < 2 ) {

						if (sprite.id.replace(/[0-9]/g, '') == "fort") {

							for (var i = 0; i < rendered_forts.length; i++) {

								if (rendered_forts[i][0]["date"] == object[0]["date"]) {
									if (rendered_forts[i][0]["owner_id"] == <%= @user.id %>) {
										if (typeof currentObject === "undefined") {
										rendered_forts[i].push("sel")
										}
									}
									else {
										if (typeof oldObject === "undefined") {
										rendered_forts[i].push("sel")
										}
									}
								}
							}
						}
						else {
							for (var i = 0; i < rendered_encampments.length; i++) {
								if (rendered_encampments[i][0]["date"] == object[0]["date"]) {
									if (rendered_encampments[i][0]["owner_id"] == <%= @user.id %>) {
										if (typeof currentObject === "undefined") {
										rendered_encampments[i].push("sel")
										}
									}
									else {
										if (typeof oldObject === "undefined") {
										rendered_encampments[i].push("sel")
										}
									}
								}
							}
						}
						if (object[0]["owner_id"] != <%=@user.id%>) {
							$("#user_battles_attributes_100000000000_user_two_id").val(object[0]["owner_id"])
							$("#user_battles_attributes_100000000000_location_two_id").val(object[0]["id"])
							$("#user_battles_attributes_100000000000_location_two_type").val(sprite.id.replace(/[0-9]/g, ''))
							oldObject = object
							activeBattleContext["oldObject"] = object[0]
						}
						else {
							if (typeof currentObject === "undefined") {
							$("#user_battles_attributes_100000000000_location_one_id").val(object[0]["id"])
							$("#user_battles_attributes_100000000000_location_one_type").val(sprite.id.replace(/[0-9]/g, ''))
								activeBattleContext["currentObject"] = object[0]
								xco = object["xco"]
								yco = object["yco"]
								currentObject = object
							}
							else {
								alertBox("You cannot battle your own empire", -1,-1,["alertOkay"])
							}
						}
					}
				}
				renderObject("encampment",zoomLevel,true);
				renderObject("fort",zoomLevel);
				if (typeof currentObject !== "undefined" && typeof oldObject !== "undefined") {
				renderBattle(currentObject[0],oldObject[0])
				}
				$("#renderedSprites").css("pointer-events","none")
			}
		});
		$("#submitBattle").click( function() {
			var battleContext = validateBattle(oldObject,currentObject)
			if (battleContext[0] == true) {

				$("#user_battles_attributes_100000000000_battle_type").val(battleContext[1])
				//$("submitObject").click()
			}
			else {
				alertBox("Invalid Battle", -1,-1,["alertOkay"])
			}
			mappingBattle = false 
			$("#submitBattle").css("display","none")
			$("#cancelCreation").css("display","none")
			$("#traderoutes").children("#battleLine").remove()
			for (var i = 0; i < rendered_encampments.length; i++) {
				rendered_encampments[i] = [rendered_encampments[i][0]]
			}
			for (var i = 0; i < rendered_forts.length; i++) {
				rendered_forts[i] = [rendered_forts[i][0]]
			}
			activeBattleContext = []
			renderObject("encampment",zoomLevel,true);
			renderObject("fort",zoomLevel);

		})
	}

	function renderChess(battle) {
		$("#chessBoard").css("margin-left",( ($(window).width()*0.85) - 776)/2)
		$("#chessBoard").css("margin-top",( ($(window).height()) - 616)/2)
		$("#chessBoard").css("display","auto")


		paintChessBoard(battle)

		var possibleMoves
		movingObject = -1

		$("#chessBoard").find("td").not("path").click( function() {
			if (movingObject != -1) {
				for (var i = 0; i < possibleMoves.length; i++) {

					if (possibleMoves[i] == this.id) {

						var coordinates = [parseInt(this.id.charAt(0)),parseInt(this.id.charAt(1))]
						$(".moveField").remove()
						$(".edit_user").append("<input  class='moveField' id='user_pieces_attributes_*_coordinates' type='hidden' value='@' name='user[pieces_attributes][1000][coordinates]'></input> <input class='moveField' id='user_pieces_attributes_*_coordinates' type='hidden' value='&' name='user[pieces_attributes][1000][id]'></input>".replace("*", movingObject[0]["id"]).replace("&", + movingObject[0]["id"]).replace("@",possibleMoves[i]))
						

						$("#submitObject").click()
						for (var i = 0; i < $("#chessBoard").find("path").length; i++) {
							$($("#chessBoard").find("path")[i]).css("fill",$($("#chessBoard").find("path")[i]).parent().css("fill"))
						}
						for (var i = 0; i < $("td").length; i++) {

							$($("td")[i]).css("background-color",$("." + $($("td")[i]).attr("class")).css("background-color"))
						}
						possibleMoves = []
						movingObject = -1
							}
						} 
			}
		})
		$("#chessBoard").find("path").click( function() {


				var coordinates = [parseInt($(this).parents("td")[0].id.slice().charAt(0)),parseInt($(this).parents("td")[0].id.slice().charAt(1))]
				var pieceObject = battle["board"]["B" + coordinates[0] + "A" + coordinates[1] + "C"]


				if ($(this).css("fill") != "rgb(0, 0, 0)") {
					if (pieceObject.owner_id == userId) {

						movingObject = [pieceObject,"B" + coordinates[0] + "A" + coordinates[1] + "C"]
						for (var i = 0; i < $("#chessBoard").find("path").length; i++) {
							$($("#chessBoard").find("path")[i]).css("fill",$($("#chessBoard").find("path")[i]).parent().css("fill"))
						}
						$(this).css("fill","black")

						possibleMoves = demonstrateMovement(battle,pieceObject,coordinates, false, true)

					}
				}
				else {
					for (var i = 0; i < $("#chessBoard").find("path").length; i++) {
						$($("#chessBoard").find("path")[i]).css("fill",$($("#chessBoard").find("path")[i]).parent().css("fill"))
					}
					for (var i = 0; i < $("td").length; i++) {

						$($("td")[i]).css("background-color",$("." + $($("td")[i]).attr("class")).css("background-color"))
					}
					possibleMoves = []
					movingObject = -1
				}
		})
	}
	function demonstrateMovement(battle, pieceObject, coordinates, check, checkCheck) {

		var moveArray = []

		if (check == false) {
			if (pieceObject.piece_type == "pawn") {

				if (battle["board"]["B" + (coordinates[0]).toString() + "A" + (coordinates[1] + 1).toString() + "C"] == "empty") {	
				moveArray.push(coordinates[0].toString() + (coordinates[1] + 1).toString())

					if (battle["board"]["B" + (coordinates[0]).toString() + "A" + (coordinates[1] +2 ).toString() + "C"] == "empty" && pieceObject.first_move == "f") {	
						moveArray.push(coordinates[0].toString() + (coordinates[1] + 2).toString())
					}
				}

				if (battle["board"]["B" + (coordinates[0] - 1).toString() + "A" + (coordinates[1] + 1).toString() + "C"] != "empty") {

					moveArray.push((coordinates[0] - 1).toString() + (coordinates[1] + 1).toString())
				}
				if (battle["board"]["B" + (coordinates[0] + 1).toString() + "A" + (coordinates[1] + 1).toString() + "C"] != "empty") {	
					moveArray.push((coordinates[0] + 1).toString() + (coordinates[1] + 1).toString())
				}
			}
			else if (pieceObject.piece_type == "king") {
					if (typeof battle["board"]["B" + (coordinates[0] + 1).toString() + "A" + (coordinates[1]).toString() + "C"] !== "undefined") {
						if (typeof battle["board"]["B" + (coordinates[0] + 1).toString() + "A" + (coordinates[1]).toString() + "C"].owner_id === "undefined") {
						moveArray.push((coordinates[0] + 1).toString() + (coordinates[1] + 0).toString())
						}
						else if (battle["board"]["B" + (coordinates[0] + 1).toString() + "A" + (coordinates[1]).toString() + "C"].owner_id != userId) {
						moveArray.push((coordinates[0] + 1).toString() + (coordinates[1] + 0).toString())
						}
					}
					if (typeof battle["board"]["B" + (coordinates[0] - 1).toString() + "A" + (coordinates[1]).toString() + "C"] !== "undefined") {
						if (typeof battle["board"]["B" + (coordinates[0] - 1).toString() + "A" + (coordinates[1]).toString() + "C"].owner_id === "undefined") {
						moveArray.push((coordinates[0] - 1).toString() + (coordinates[1] + 0).toString())
						}
						else if (battle["board"]["B" + (coordinates[0] - 1).toString() + "A" + (coordinates[1]).toString() + "C"].owner_id != userId) {
						moveArray.push((coordinates[0] - 1).toString() + (coordinates[1] + 0).toString())
						}
					}
					if (typeof battle["board"]["B" + (coordinates[0]).toString() + "A" + (coordinates[1] + 1).toString() + "C"] !== "undefined") {
						if (typeof battle["board"]["B" + (coordinates[0]).toString() + "A" + (coordinates[1] + 1).toString() + "C"].owner_id === "undefined") {
						moveArray.push((coordinates[0]).toString() + (coordinates[1] + 1).toString())
						}
						else if (battle["board"]["B" + (coordinates[0]).toString() + "A" + (coordinates[1] + 1).toString() + "C"].owner_id != userId) {
						moveArray.push((coordinates[0] + 0).toString() + (coordinates[1] + 1).toString())
						}
					}
					if (typeof battle["board"]["B" + (coordinates[0]).toString() + "A" + (coordinates[1] - 1).toString() + "C"] !== "undefined") {
						if (typeof battle["board"]["B" + (coordinates[0]).toString() + "A" + (coordinates[1] - 1).toString() + "C"].owner_id === "undefined") {
						moveArray.push((coordinates[0]).toString() + (coordinates[1] -1).toString())
						}
						else if (battle["board"]["B" + (coordinates[0]).toString() + "A" + (coordinates[1] - 1).toString() + "C"].owner_id != userId) {
						moveArray.push((coordinates[0] + 0).toString() + (coordinates[1] - 1).toString())
						}
					}
					if (typeof battle["board"]["B" + (coordinates[0] + 1).toString() + "A" + (coordinates[1] + 1).toString() + "C"] !== "undefined") {
						if (typeof battle["board"]["B" + (coordinates[0] + 1).toString() + "A" + (coordinates[1] + 1).toString() + "C"].owner_id === "undefined") {
						moveArray.push((coordinates[0] + 1).toString() + (coordinates[1] + 1).toString())
						}
						else if (battle["board"]["B" + (coordinates[0] + 1).toString() + "A" + (coordinates[1] + 1).toString() + "C"].owner_id != userId) {
						moveArray.push((coordinates[0] + 1).toString() + (coordinates[1] + 1).toString())
						}
					}
					if (typeof battle["board"]["B" + (coordinates[0] + 1).toString() + "A" + (coordinates[1] - 1).toString() + "C"] !== "undefined") {
						if (typeof battle["board"]["B" + (coordinates[0] + 1).toString() + "A" + (coordinates[1] - 1).toString() + "C"].owner_id === "undefined") {
						moveArray.push((coordinates[0] + 1).toString() + (coordinates[1] - 1).toString())
						}
						else if (battle["board"]["B" + (coordinates[0] + 1).toString() + "A" + (coordinates[1] - 1).toString() + "C"].owner_id != userId) {
						moveArray.push((coordinates[0] + 1).toString() + (coordinates[1] - 1).toString())
						}
					}
					if (typeof battle["board"]["B" + (coordinates[0] - 1).toString() + "A" + (coordinates[1] + 1).toString() + "C"] !== "undefined") {
						if (typeof battle["board"]["B" + (coordinates[0] - 1).toString() + "A" + (coordinates[1] + 1).toString() + "C"].owner_id === "undefined") {
						moveArray.push((coordinates[0] - 1).toString() + (coordinates[1] + 1).toString())
						}
						else if (battle["board"]["B" + (coordinates[0] - 1).toString() + "A" + (coordinates[1] + 1).toString() + "C"].owner_id != userId) {
						moveArray.push((coordinates[0] - 1).toString() + (coordinates[1] + 1).toString())
						}
					}
					if (typeof battle["board"]["B" + (coordinates[0] - 1).toString() + "A" + (coordinates[1] - 1).toString() + "C"] !== "undefined") {
						if (typeof battle["board"]["B" + (coordinates[0] - 1).toString() + "A" + (coordinates[1] - 1).toString() + "C"].owner_id === "undefined") {
						moveArray.push((coordinates[0] - 1).toString() + (coordinates[1] - 1).toString())
						}
						else if (battle["board"]["B" + (coordinates[0] - 1).toString() + "A" + (coordinates[1] - 1).toString() + "C"].owner_id != userId) {
						moveArray.push((coordinates[0] - 1).toString() + (coordinates[1] - 1).toString())	
						}
					}
			}
			else if (pieceObject.piece_type == "knight") {

					moveArray.push((coordinates[0] + 1).toString() + (coordinates[1] + 2).toString())
					moveArray.push((coordinates[0] + 2).toString() + (coordinates[1] + 1).toString())
					moveArray.push((coordinates[0] - 1).toString() + (coordinates[1] - 2).toString())
					moveArray.push((coordinates[0] - 2).toString() + (coordinates[1] - 1).toString())
					moveArray.push((coordinates[0] - 1).toString() + (coordinates[1] + 2).toString())
					moveArray.push((coordinates[0] - 2).toString() + (coordinates[1] + 1).toString())
					moveArray.push((coordinates[0] + 1).toString() + (coordinates[1] - 2).toString())
					moveArray.push((coordinates[0] + 2).toString() + (coordinates[1] - 1).toString())

			}
			else if (pieceObject.piece_type == "bishop") {
				for (var x = coordinates[0] + 1, y = coordinates[1] + 1, block = false; (y < 9) && (x < 9) && (y > 0) && (x > 0) && (block == false); x++, y++) {

						if (battle["board"]["B" + x + "A" + y + "C"] == "empty" && block == false) {
							moveArray.push(x.toString() + (y).toString())
						}
						else {
							if (battle["board"]["B" + x + "A" + y + "C"].owner_id != userId) {
							moveArray.push(x.toString() + (y).toString())
							}
							block = true	
						}
				}
				for (var x = coordinates[0] - 1, y = coordinates[1] - 1, block = false; (y < 9) && (x < 9) && (y > 0) && (x > 0) && (block == false); x--, y--) {

						if (battle["board"]["B" + x + "A" + y + "C"] == "empty" && block == false) {
							moveArray.push(x.toString() + (y).toString())
						}
						else {
							if (battle["board"]["B" + x + "A" + y + "C"].owner_id != userId) {
							moveArray.push(x.toString() + (y).toString())
							}
							block = true	
						}
				}
				for (var x = coordinates[0] - 1, y = coordinates[1] + 1, block = false; (y < 9) && (x < 9) && (y > 0) && (x > 0) && (block == false); x--, y++) {

						if (battle["board"]["B" + x + "A" + y + "C"] == "empty" && block == false) {
							moveArray.push(x.toString() + (y).toString())
						}
						else {
							if (battle["board"]["B" + x + "A" + y + "C"].owner_id != userId) {
							moveArray.push(x.toString() + (y).toString())
							}
							block = true	
						}
				}
				for (var x = coordinates[0] + 1, y = coordinates[1] - 1, block = false; (y < 9) && (x < 9) && (y > 0) && (x > 0) && (block == false); x++, y--) {

						if (battle["board"]["B" + x + "A" + y + "C"] == "empty" && block == false) {
							moveArray.push(x.toString() + (y).toString())
						}
						else {
							if (battle["board"]["B" + x + "A" + y + "C"].owner_id != userId) {
							moveArray.push(x.toString() + (y).toString())
							}
							block = true	
						}
				}
			}
			else if (pieceObject.piece_type == "rook") {

				for (var x = coordinates[0], y = coordinates[1] + 1, block = false; (y < 9) && (x < 9) && (y > 0) && (x > 0) && (block == false); y++) {

						if (battle["board"]["B" + x + "A" + y + "C"] == "empty" && block == false) {
							moveArray.push(x.toString() + (y).toString())
						}
						else {
							if (battle["board"]["B" + x + "A" + y + "C"].owner_id != userId) {
							moveArray.push(x.toString() + (y).toString())
							}
							block = true	
						}
					
				}
				for (var x = coordinates[0], y = coordinates[1] - 1, block = false; (y < 9) && (x < 9) && (y > 0) && (x > 0) && (block == false); y--) {

						if (battle["board"]["B" + x + "A" + y + "C"] == "empty" && block == false) {
							moveArray.push(x.toString() + (y).toString())
						}
						else {
							if (battle["board"]["B" + x + "A" + y + "C"].owner_id != userId) {
							moveArray.push(x.toString() + (y).toString())
							}
							block = true	
						}
					
				}
				for (var x = coordinates[0] + 1, y = coordinates[1], block = false; (y < 9) && (x < 9) && (y > 0) && (x > 0) && (block == false); x++) {

						if (battle["board"]["B" + x + "A" + y + "C"] == "empty" && block == false) {
							moveArray.push(x.toString() + (y).toString())
						}
						else {
							if (battle["board"]["B" + x + "A" + y + "C"].owner_id != userId) {
							moveArray.push(x.toString() + (y).toString())
							}
							block = true	
						}
					
				}
				for (var x = coordinates[0] - 1, y = coordinates[1], block = false; (y < 9) && (x < 9) && (y > 0) && (x > 0) && (block == false); x--) {

						if (battle["board"]["B" + x + "A" + y + "C"] == "empty" && block == false) {
							moveArray.push(x.toString() + (y).toString())
						}
						else {
							if (battle["board"]["B" + x + "A" + y + "C"].owner_id != userId) {
							moveArray.push(x.toString() + (y).toString())
							}
							block = true	
						}
				}
			}
			else if (pieceObject.piece_type == "queen") {
				for (var x = coordinates[0] + 1, y = coordinates[1] + 1, block = false; (y < 9) && (x < 9) && (y > 0) && (x > 0) && (block == false); x++, y++) {

						if (battle["board"]["B" + x + "A" + y + "C"] == "empty" && block == false) {
							moveArray.push(x.toString() + (y).toString())
						}
						else {
							if (battle["board"]["B" + x + "A" + y + "C"].owner_id != userId) {
							moveArray.push(x.toString() + (y).toString())
							}
							block = true	
						}
				}
				for (var x = coordinates[0] - 1, y = coordinates[1] - 1, block = false; (y < 9) && (x < 9) && (y > 0) && (x > 0) && (block == false); x--, y--) {

						if (battle["board"]["B" + x + "A" + y + "C"] == "empty" && block == false) {
							moveArray.push(x.toString() + (y).toString())
						}
						else {
							if (battle["board"]["B" + x + "A" + y + "C"].owner_id != userId) {
							moveArray.push(x.toString() + (y).toString())
							}
							block = true	
						}
				}
				for (var x = coordinates[0] - 1, y = coordinates[1] + 1, block = false; (y < 9) && (x < 9) && (y > 0) && (x > 0) && (block == false); x--, y++) {

						if (battle["board"]["B" + x + "A" + y + "C"] == "empty" && block == false) {
							moveArray.push(x.toString() + (y).toString())
						}
						else {
							if (battle["board"]["B" + x + "A" + y + "C"].owner_id != userId) {
							moveArray.push(x.toString() + (y).toString())
							}
							block = true	
						}
				}
				for (var x = coordinates[0] + 1, y = coordinates[1] - 1, block = false; (y < 9) && (x < 9) && (y > 0) && (x > 0) && (block == false); x++, y--) {

						if (battle["board"]["B" + x + "A" + y + "C"] == "empty" && block == false) {
							moveArray.push(x.toString() + (y).toString())
						}
						else {
							if (battle["board"]["B" + x + "A" + y + "C"].owner_id != userId) {
							moveArray.push(x.toString() + (y).toString())
							}
							block = true	
						}
				}
				for (var x = coordinates[0], y = coordinates[1] + 1, block = false; (y < 9) && (x < 9) && (y > 0) && (x > 0) && (block == false); y++) {

						if (battle["board"]["B" + x + "A" + y + "C"] == "empty" && block == false) {
							moveArray.push(x.toString() + (y).toString())
						}
						else {
							if (battle["board"]["B" + x + "A" + y + "C"].owner_id != userId) {
							moveArray.push(x.toString() + (y).toString())
							}
							block = true	
						}
					
				}
				for (var x = coordinates[0], y = coordinates[1] - 1, block = false; (y < 9) && (x < 9) && (y > 0) && (x > 0) && (block == false); y--) {

						if (battle["board"]["B" + x + "A" + y + "C"] == "empty" && block == false) {
							moveArray.push(x.toString() + (y).toString())
						}
						else {
							if (battle["board"]["B" + x + "A" + y + "C"].owner_id != userId) {
							moveArray.push(x.toString() + (y).toString())
							}
							block = true	
						}
					
				}
				for (var x = coordinates[0] + 1, y = coordinates[1], block = false; (y < 9) && (x < 9) && (y > 0) && (x > 0) && (block == false); x++) {

						if (battle["board"]["B" + x + "A" + y + "C"] == "empty" && block == false) {
							moveArray.push(x.toString() + (y).toString())
						}
						else {
							if (battle["board"]["B" + x + "A" + y + "C"].owner_id != userId) {
							moveArray.push(x.toString() + (y).toString())
							}
							block = true	
						}
					
				}
				for (var x = coordinates[0] - 1, y = coordinates[1], block = false; (y < 9) && (x < 9) && (y > 0) && (x > 0) && (block == false); x--) {

						if (battle["board"]["B" + x + "A" + y + "C"] == "empty" && block == false) {
							moveArray.push(x.toString() + (y).toString())
						}
						else {
							if (battle["board"]["B" + x + "A" + y + "C"].owner_id != userId) {
							moveArray.push(x.toString() + (y).toString())
							}
							block = true	
						}
				}
			}

		}
		else {

		}

		var tempMoveArray = []
		for (var i = 0; i < moveArray.length; i++) {
			if (parseInt(moveArray[i].charAt(0)) < 9 && parseInt(moveArray[i].charAt(0)) > 0 && parseInt(moveArray[i].charAt(1)) < 9 && parseInt(moveArray[i].charAt(1)) > 0) {
				tempMoveArray.push(moveArray[i])
			}
		}

		moveArray = tempMoveArray

					var tempArray  = []

					for (var i = 0; i < moveArray.length; i++) {
						if (battle["board"]["B" + moveArray[i].charAt(0) + "A" + moveArray[i].charAt(1) + "C"] != "empty") {
							if (battle["board"]["B" + moveArray[i].charAt(0) + "A" + moveArray[i].charAt(1) + "C"]["owner_id"] !=  userId) {
								tempArray.push(moveArray[i])
							}
						}
						else {

								tempArray.push(moveArray[i])
						}
					}
					moveArray = tempArray

		if (checkCheck == true) {
			for (var i = 0; i < moveArray.length; i++) {

				var tempBattle = jQuery.extend(true, {}, battle);
				tempBattle["board"]["B" + coordinates[0] + "A" + coordinates[1] + "C"] = "empty"
				tempBattle["board"]["B" + moveArray[i].charAt(0) + "A" + moveArray[i].charAt(1) + "C"] = pieceObject

				var king
				var kingCoordinates
				var possibleMoves = []

				for (var key in tempBattle["board"]) {

					if (tempBattle["board"][key].piece_type == "king" && tempBattle["board"][key].owner_id == userId) {

						king = tempBattle["board"][key]
						kingCoordinates = [parseInt(key.replace("B","").replace("A","").replace("C","").charAt(0)),parseInt(key.replace("B","").replace("A","").replace("C","").charAt(1))]
					}
				}

				for (var key in tempBattle["board"]) {

					if (tempBattle["board"][key].owner_id != pieceObject.owner_id && tempBattle["board"][key].id != king.id) {

						possibleMoves.push(demonstrateMovement(tempBattle, tempBattle["board"][key], [parseInt(key.replace("B","").replace("A","").replace("C","").charAt(0)),parseInt(key.replace("B","").replace("A","").replace("C","").charAt(1))], false))
					}
				}

				for (var y = 0; y < possibleMoves.length; y++) {

					for (var u = 0; u < possibleMoves[y].length; u++) {

						if (possibleMoves[i] == kingCoordinates[0].toString() + kingCoordinates[1].toString()) {

							moveArray[i] = -1;	
						}
					}
				}
				tempBattle["board"]["B" + coordinates[0] + "A" + coordinates[1] + "C"] = pieceObject
				tempBattle["board"]["B" + moveArray[i].charAt(0) + "A" + moveArray[i].charAt(1) + "C"] = "empty"
			}

			var tempMoveArray = []
			for (var i = 0; i < moveArray.length; i++) {

				if (moveArray[i] != -1) {

					tempMoveArray.push(moveArray[i])
				}
			}

		paintDemonstratedMovement(moveArray,pieceObject)
		}

		return moveArray


	}
	function paintDemonstratedMovement(moveArray,piece) {

		for (var i = 0; i < $("td").length; i++) {

			$($("td")[i]).css("background-color",$("." + $($("td")[i]).attr("class")).css("background-color"))
		}
		for (var i = 0; i < moveArray.length; i++) {

			$("#" + moveArray[i]).css("background-color","#" + players[piece.owner_id.toString()]["color"])


		}
	}

	function validateBattle(currentObject,oldObject) {

		var activeCanvas = document.getElementById('activeCanvas')
		var activeContext = activeCanvas.getContext("2d");
		var activeImage = document.getElementById('activeImage')
		activeContext.drawImage(activeImage,0,0);
		var activePixelData = activeContext.getImageData(0,0,$("#activeCanvas").width(),$("#activeCanvas").height())["data"];

		var battleType = "chess"
		var valid = true

		var oldxco = (oldObject[0]["xco"] + colors[oldObject[0]["territory"].replace("#","")][1][0])*0.1251425314
		var oldyco = (oldObject[0]["yco"] + colors[oldObject[0]["territory"].replace("#","")][1][1])*0.1251425314
		var xco = (currentObject[0]["xco"] + colors[currentObject[0]["territory"].replace("#","")][1][0])*0.1251425314
		var yco = (currentObject[0]["yco"] + colors[currentObject[0]["territory"].replace("#","")][1][1])*0.1251425314

		var globalScaleFactor = parseFloat($("#globalMap").children("g").attr("transform").split(")")[0].replace("scale(",""))

		var color = [colors[currentObject[0]["territory"].replace("#","")][0][0],colors[currentObject[0]["territory"].replace("#","")][0][1],colors[currentObject[0]["territory"].replace("#","")][0][2]]	

		var oldColor = [colors[oldObject[0]["territory"].replace("#","")][0][0],colors[oldObject[0]["territory"].replace("#","")][0][1],colors[oldObject[0]["territory"].replace("#","")][0][2]]	

		var xdistance = xco - oldxco
		var ydistance = yco - oldyco
		var slope = xdistance/ydistance

		for (var y = 0; y < Math.abs(ydistance); y++) {

			var xindex = Math.round(y*slope)

			var pixel = [activePixelData[((Math.round(oldyco + y)*439) + Math.round(oldxco + xindex))*4],activePixelData[((Math.round(oldyco + y)*439) + Math.round(oldxco + xindex))*4 +1],activePixelData[((Math.round(oldyco + y)*439) + Math.round(oldxco + xindex))*4 + 2],activePixelData[((Math.round(oldyco + y)*439) + Math.round(oldxco + xindex))*4 + 3]]

			if (pixel[0] == 73 && pixel[1] == 73 && pixel[2] == 73) {
				battleType = "battle_at_sea"
			}
			else if ((pixel[0] != color[0] || pixel[1] != color[1] || pixel[2] != color[2])){
				if ((pixel[0] != oldColor[0] || pixel[1] != oldColor[1] || pixel[2] != oldColor[2])) {

					valid = false
				}
			}

		}
		return [valid,battleType]
	}
	function renderBattle(locationOne, locationTwo) {

			$("#traderoutes").children("#battleLine").remove()

			var xcoOne
			var ycoOne
			var xcoTwo
			var ycoTwo

			if (zoomLevel[0] == "territorial") {

				var xcoOne = (locationOne.xco*$("#territorialMap").children("g").attr("transform").split("(")[1].split(")")[0]) + $("#territorialMap").offset().left - $("#background").offset().left
				var ycoOne = (locationOne.yco*$("#territorialMap").children("g").attr("transform").split("(")[1].split(")")[0]) + $("#territorialMap").offset().top - $("#background").offset().top

				var xcoTwo = (locationTwo.xco*$("#territorialMap").children("g").attr("transform").split("(")[1].split(")")[0]) + $("#territorialMap").offset().left - $("#background").offset().left
				var ycoTwo = (locationTwo.yco*$("#territorialMap").children("g").attr("transform").split("(")[1].split(")")[0]) + $("#territorialMap").offset().top - $("#background").offset().top

			}
			if (zoomLevel[0] == "continental") {

				var xcoOne = ((locationOne.xco + colors[locationOne.territory.replace("#","")][1][0] - color_key[$($("#continentalMap").children("g").children("path")[0]).attr("class")][1][0])*$("#continentalMap").children("g").attr("transform").split("(")[1].split(")")[0]) + $("#continentalMap").offset().left - $("#background").offset().left
				var ycoOne = ((locationOne.yco + colors[locationOne.territory.replace("#","")][1][1] - color_key[$($("#continentalMap").children("g").children("path")[0]).attr("class")][1][1])*$("#continentalMap").children("g").attr("transform").split("(")[1].split(")")[0]) + $("#continentalMap").offset().top - $("#background").offset().top

				var xcoTwo = ((locationTwo.xco + colors[locationTwo.territory.replace("#","")][1][0] - color_key[$($("#continentalMap").children("g").children("path")[0]).attr("class")][1][0])*$("#continentalMap").children("g").attr("transform").split("(")[1].split(")")[0]) + $("#continentalMap").offset().left - $("#background").offset().left
				var ycoTwo = ((locationTwo.yco + colors[locationTwo.territory.replace("#","")][1][1] - color_key[$($("#continentalMap").children("g").children("path")[0]).attr("class")][1][1])*$("#continentalMap").children("g").attr("transform").split("(")[1].split(")")[0]) + $("#continentalMap").offset().top - $("#background").offset().top

			}
			if (zoomLevel[0] == "global") {

				var xcoOne = (locationOne.xco + colors[locationOne.territory.replace("#","")][1][0])*($("#globalMap").children("g").attr("transform").split("(")[1].split(")")[0])
				var ycoOne = (locationOne.yco + colors[locationOne.territory.replace("#","")][1][1] + parseFloat($("#globalMap").children("g").attr("transform").split("translate(")[1].split(" ")[1]))*($("#globalMap").children("g").attr("transform").split("(")[1].split(")")[0])

				var xcoTwo = (locationTwo.xco + colors[locationTwo.territory.replace("#","")][1][0])*($("#globalMap").children("g").attr("transform").split("(")[1].split(")")[0])
				var ycoTwo = (locationTwo.yco + colors[locationTwo.territory.replace("#","")][1][1] + parseFloat($("#globalMap").children("g").attr("transform").split("translate(")[1].split(" ")[1]))*($("#globalMap").children("g").attr("transform").split("(")[1].split(")")[0])

			}


			var xco = (xcoOne + xcoTwo)/2
			var yco = (ycoTwo + ycoOne)/2

			var offsetFactor
			var size = ""
			if (zoomLevel[0] == "territorial") {
				offsetFactor = 16
			}
			else if (zoomLevel[0] == "continental") {
				offsetFactor = 12
				size = "Medium"
			}
			else if (zoomLevel[0] == "global") {
				offsetFactor = 4
				size = "Small"
			}

			$("#renderedSprites").append($("#battleLocation" + size).clone().attr("class","renderedSprite").css("top",yco + "px").css("left",xco + "px"))

			var lineOneStartXco =  (xcoOne + offsetFactor) - offsetFactor*((xcoOne - xco)/Math.abs(xcoOne - xco))
			var lineOneStartYco =  (ycoOne + offsetFactor) - offsetFactor*((ycoOne - yco)/Math.abs(ycoOne - yco))
			var lineOneEndXco = (xco + offsetFactor) - offsetFactor*((xco - xcoOne)/Math.abs(xco - xcoOne))
			var lineOneEndYco = (yco + offsetFactor) - offsetFactor*((yco - ycoOne)/Math.abs(yco - ycoOne))

			var lineTwoStartXco =  (xcoTwo + offsetFactor) - offsetFactor*((xcoTwo - xco)/Math.abs(xcoTwo - xco))
			var lineTwoStartYco =  (ycoTwo + offsetFactor) - offsetFactor*((ycoTwo - yco)/Math.abs(ycoTwo - yco))
			var lineTwoEndXco  = (xco + offsetFactor) - offsetFactor*((xco - xcoTwo)/Math.abs(xco - xcoTwo))
			var lineTwoEndYco = (yco + offsetFactor) - offsetFactor*((yco - ycoTwo)/Math.abs(yco - ycoTwo))


					var svg =  document.getElementById("traderoutes")
					var newPath = document.createElementNS("http://www.w3.org/2000/svg", 'path');
					newPath.setAttribute("d","M " + lineOneStartXco + " "  + lineOneStartYco + " L " + lineOneEndXco + " " + lineOneEndYco + "");
					newPath.setAttribute("id","battleLine")
					newPath.style.fill = "transparent";
					newPath.style.stroke = "#FFF";
					$(newPath).css("stroke-width","3px")
					svg.appendChild(newPath);

					var gOne = document.createElementNS("http://www.w3.org/2000/svg", 'g')
					var gTwo = document.createElementNS("http://www.w3.org/2000/svg", 'g')
	
					gOne.setAttribute("transform","translate(0 2)")
					gTwo.setAttribute("transform","translate(0 -2)")
					gOne.setAttribute("id","battleLine")
					gTwo.setAttribute("id","battleLine")
					svg.appendChild(gOne);
					svg.appendChild(gTwo);
					var newPathOne = document.createElementNS("http://www.w3.org/2000/svg", 'path');
					var newPathTwo = document.createElementNS("http://www.w3.org/2000/svg", 'path');
					newPathOne.style.fill = "transparent";
					newPathOne.style.stroke = "#000";
					newPathTwo.style.fill = "transparent";
					newPathTwo.style.stroke = "#000";
				
					newPathOne.setAttribute("d","M " + lineOneStartXco + " "  + lineOneStartYco + " L " + lineOneEndXco + " " + lineOneEndYco);
					newPathTwo.setAttribute("d","M " + lineOneStartXco + " " + lineOneStartYco + " L " + lineOneEndXco + " " + lineOneEndYco);
					gOne.appendChild(newPathOne);
					gTwo.appendChild(newPathTwo);

					var svg =  document.getElementById("traderoutes")
					var newPath = document.createElementNS("http://www.w3.org/2000/svg", 'path');
					newPath.setAttribute("d","M " + lineTwoStartXco + " " + lineTwoStartYco + " L " + lineTwoEndXco + " " + lineTwoEndYco);
					newPath.setAttribute("id","battleLine")
					newPath.style.fill = "transparent";
					newPath.style.stroke = "#FFF";
					$(newPath).css("stroke-width","3px")
					svg.appendChild(newPath);

					var gOne = document.createElementNS("http://www.w3.org/2000/svg", 'g')
					var gTwo = document.createElementNS("http://www.w3.org/2000/svg", 'g')
	
					gOne.setAttribute("transform","translate(0 2)")
					gTwo.setAttribute("transform","translate(0 -2)")
					gOne.setAttribute("id","battleLine")
					gTwo.setAttribute("id","battleLine")
					svg.appendChild(gOne);
					svg.appendChild(gTwo);
					var newPathOne = document.createElementNS("http://www.w3.org/2000/svg", 'path');
					var newPathTwo = document.createElementNS("http://www.w3.org/2000/svg", 'path');
					newPathOne.style.fill = "transparent";
					newPathOne.style.stroke = "#000";
					newPathTwo.style.fill = "transparent";
					newPathTwo.style.stroke = "#000";
				
					newPathOne.setAttribute("d","M " + lineTwoStartXco + " " + lineTwoStartYco + " L " + lineTwoEndXco + " " + lineTwoEndYco);
					newPathTwo.setAttribute("d","M " + lineTwoStartXco + " " + lineTwoStartYco + " L " + lineTwoEndXco + " " + lineTwoEndYco);
					gOne.appendChild(newPathOne);
					gTwo.appendChild(newPathTwo);



	
	}
	function renderActiveTrade() {
		for (var i = 0; i < rendered_trades.length; i++) {
			if (i == 0) {
			renderTrade(rendered_trades[i]["itinerary"], "active trade",true)
			}
			renderTrade(rendered_trades[i]["itinerary"], "active trade",false)
		}
	}
	function renderTrade(itinerary,context,removeActiveTrades) {
		if (context == "trade proposal") {

			tradeCost(itinerary)

			$("#traderoutes").children().not("#activeTrade").not("#battleLine").remove()

		}
		if (removeActiveTrades == true) {
			$("#traderoutes").children("#activeTrade").remove()
		}
		var oldxco
		var oldyco
		var oldObject
		for (var i = 0; i < itinerary.length; i++) {

			var currentObject
			var xco
			var yco

			if (context == "trade proposal") {
	 			if (typeof itinerary[i][1] === "undefined") {

					for (var key in itinerary[i]) {

						xco = itinerary[i][key]["xco"]
						yco = itinerary[i][key]["yco"]
					}
					currentObject = itinerary[i][key]
				}
				else {

					xco = itinerary[i][0]["xco"]
					yco = itinerary[i][0]["yco"]

					currentObject = itinerary[i][0]
				}
			}
			else if (context == "active trade") {
				if (itinerary[i]["location_type"] == "fort") {
					for (var y = 0; y < rendered_forts.length; y++) {
						if (rendered_forts[y][0]["id"] == itinerary[i]["id"]) {
							currentObject = rendered_forts[y][0]
							xco = rendered_forts[y][0]["xco"]
							yco = rendered_forts[y][0]["yco"]
						}
					}
				}
				else if (itinerary[i]["location_type"] == "encampment") {
					for (var y = 0; y < rendered_encampments.length; y++) {
						if (rendered_encampments[y][0]["id"] == itinerary[i]["id"]) {
							currentObject = rendered_encampments[y][0]
							xco = rendered_encampments[y][0]["xco"]
							yco = rendered_encampments[y][0]["yco"]
						}
					}
				}
				else if (itinerary[i]["location_type"] == "seapoint") {
					currentObject = {xco:itinerary[i]["location_id"].split(" ")[0],yco:itinerary[i]["location_id"].split(" ")[1],territory:"global"}
					xco = itinerary[i]["location_id"].split(" ")[0]
					xco = itinerary[i]["location_id"].split(" ")[1]
				}
			}
			if (zoomLevel[0] == "global") {

				if (currentObject["territory"] != "global") {

					var scaleFactor = parseFloat($("#globalMap").children("g").attr("transform").split(")")[0].replace("scale(",""))
					var ytransform = parseFloat($("#globalMap").children("g").attr("transform").split("(")[2].replace("0 ","").replace(")",""))
					var xtransform = parseFloat($("#globalMap").children("g").attr("transform").split(" ")[1].replace("translate(","").replace(")",""))

					xco = (xco + colors[currentObject["territory"].replace("#","")][1][0] + xtransform)*scaleFactor
					yco = (yco + colors[currentObject["territory"].replace("#","")][1][1] + ytransform)*scaleFactor

				}

				if (i != 0) {
					var scaleFactor = parseFloat($("#globalMap").children("g").attr("transform").split(")")[0].replace("scale(",""))
					var svg =  document.getElementById("traderoutes")
					var newPath = document.createElementNS("http://www.w3.org/2000/svg", 'path');
					newPath.setAttribute("d","M" + oldxco + " " + oldyco + " C" + (oldxco + (xco - oldxco)/4) + " " + (oldyco + (yco - oldyco)/4 - 45*scaleFactor) +  " "+ (oldxco + (xco - oldxco)*0.75) + " " + (oldyco + (yco - oldyco)*0.75 - 45*scaleFactor) + " " + xco + " " + yco);
					if (context == "active trade") {
						newPath.setAttribute("id","activeTrade")
					}
					newPath.style.fill = "transparent";
					newPath.style.stroke = "#286faa";
					if (context == "active trade") {
						newPath.style.stroke = "#fff";
					}
					$(newPath).css("stroke-width","3px")
					svg.appendChild(newPath);

					var gOne = document.createElementNS("http://www.w3.org/2000/svg", 'g')
					var gTwo = document.createElementNS("http://www.w3.org/2000/svg", 'g')
					if (context == "active trade") {
						gOne.setAttribute("id","activeTrade")
						gTwo.setAttribute("id","activeTrade")
					}
					gOne.setAttribute("transform","translate(0 2)")
					gTwo.setAttribute("transform","translate(0 -2)")
					svg.appendChild(gOne);
					svg.appendChild(gTwo);
					var newPathOne = document.createElementNS("http://www.w3.org/2000/svg", 'path');
					var newPathTwo = document.createElementNS("http://www.w3.org/2000/svg", 'path');
					newPathOne.style.fill = "transparent";
					newPathOne.style.stroke = "#bc3f3f";
					newPathTwo.style.fill = "transparent";
					newPathTwo.style.stroke = "#bc3f3f";
					if (context == "active trade") {
						newPathOne.style.stroke = "#000";
					}
					if (context == "active trade") {
						newPathTwo.style.stroke = "#000";
					}
					newPathOne.setAttribute("d","M" + oldxco + " " + oldyco + " C" + (oldxco + (xco - oldxco)/4) + " " + (oldyco + (yco - oldyco)/4 - 45*scaleFactor) +  " "+ (oldxco + (xco - oldxco)*0.75) + " " + (oldyco + (yco - oldyco)*0.75 - 45*scaleFactor) + " " + xco + " " + yco);
					newPathTwo.setAttribute("d","M" + oldxco + " " + oldyco + " C" + (oldxco + (xco - oldxco)/4) + " " + (oldyco + (yco - oldyco)/4 - 45*scaleFactor) +  " "+ (oldxco + (xco - oldxco)*0.75) + " " + (oldyco + (yco - oldyco)*0.75 - 45*scaleFactor) + " " + xco + " " + yco);
					gOne.appendChild(newPathOne);
					gTwo.appendChild(newPathTwo);


					}
				}
				if (zoomLevel[0] == "continental") {
						if (typeof oldObject !== "undefined") {
							var scaleFactor = parseFloat($("#continentalMap").children("g").attr("transform").split(")")[0].replace("scale(",""))
							var globalScaleFactor = parseFloat($("#globalMap").children("g").attr("transform").split(")")[0].replace("scale(",""))
							var oldDeclared = false
							var currentDeclared = false
							for (var y = 0; y < continents[zoomLevel[1]].length; y++) {

								if (continents[zoomLevel[1]][y] == currentObject["territory"].replace("#","") || continents[zoomLevel[1]][y] == oldObject["territory"].replace("#","")) {

									if (continents[zoomLevel[1]][y] == currentObject["territory"].replace("#","")) {
										xco = (xco + colors[currentObject["territory"].replace("#","")][1][0] - color_key[zoomLevel[1]][1][0])*scaleFactor + $("#continentalMap").offset().left - $("#background").offset().left	
										yco = (yco + colors[currentObject["territory"].replace("#","")][1][1] - color_key[zoomLevel[1]][1][1])*scaleFactor + $("#continentalMap").offset().top - $("#background").offset().top

									currentDeclared = true
									}
									if (continents[zoomLevel[1]][y] == oldObject["territory"].replace("#","")) {						

										oldDeclared = true;
									}
								}
							}
							if (currentDeclared == true || oldDeclared == true) {
								if (currentDeclared == false) {
											if (currentObject["territory"] != "global") {
												xco = oldxco + (xco + colors[currentObject["territory"].replace("#","")][1][0] - oldObject["xco"] - colors[oldObject["territory"].replace("#","")][1][0])*scaleFactor + $("#continentalMap").offset().left - $("#background").offset().left
												yco = oldyco + (yco + colors[currentObject["territory"].replace("#","")][1][1] - oldObject["yco"] - colors[oldObject["territory"].replace("#","")][1][1])*scaleFactor + $("#continentalMap").offset().top - $("#background").offset().top

											}
											else {

												xco = oldxco + (xco*(scaleFactor/globalScaleFactor)) - ((oldObject["xco"] + colors[oldObject["territory"].replace("#","")][1][0])*scaleFactor) + $("#continentalMap").offset().left - $("#background").offset().left
												yco = oldyco + (yco*(scaleFactor/globalScaleFactor)) - ((oldObject["yco"] + colors[oldObject["territory"].replace("#","")][1][1])*scaleFactor) + $("#continentalMap").offset().top - $("#background").offset().top									

											}
								}
								if (oldDeclared == false) {
										if (continents[zoomLevel[1]][y] != oldObject["territory"].replace("#","") && oldObject["territory"] != "global" && oldDeclared == false) {

											oldxco = xco + (oldxco + colors[oldObject["territory"].replace("#","")][1][0] - currentObject["xco"] - colors[currentObject["territory"].replace("#","")][1][0])*scaleFactor + $("#continentalMap").offset().left - $("#background").offset().left
											oldyco = yco + (oldyco + colors[oldObject["territory"].replace("#","")][1][1] - currentObject["yco"] - colors[currentObject["territory"].replace("#","")][1][1])*scaleFactor + $("#continentalMap").offset().top - $("#background").offset().top

										}
										if (oldObject["territory"] == "global"  && oldDeclared == false) {
											oldxco = xco + (oldxco*(scaleFactor/globalScaleFactor)) - ((currentObject["xco"] + colors[currentObject["territory"].replace("#","")][1][0])*scaleFactor) + $("#continentalMap").offset().left - $("#background").offset().left
											oldyco = yco + (oldyco*(scaleFactor/globalScaleFactor)) - ((currentObject["yco"] + colors[currentObject["territory"].replace("#","")][1][1])*scaleFactor) + $("#continentalMap").offset().top - $("#background").offset().top

										}
								}
									var scaleFactor = parseFloat($("#continentalMap").children("g").attr("transform").split(")")[0].replace("scale(",""))
									var svg =  document.getElementById("traderoutes")
									var newPath = document.createElementNS("http://www.w3.org/2000/svg", 'path');
									newPath.setAttribute("d","M" + oldxco + " " + oldyco + " C" + (oldxco + (xco - oldxco)/4) + " " + (oldyco + (yco - oldyco)/4 - 45*scaleFactor) +  " "+ (oldxco + (xco - oldxco)*0.75) + " " + (oldyco + (yco - oldyco)*0.75 - 45*scaleFactor) + " " + xco + " " + yco);
									if (context == "active trade") {
										newPath.setAttribute("id","activeTrade")
									}
									newPath.style.fill = "transparent";
									newPath.style.stroke = "#286faa";
									if (context == "active trade") {
										newPath.style.stroke = "#fff";
									}
									$(newPath).css("stroke-width","3px")
									svg.appendChild(newPath);

									var gOne = document.createElementNS("http://www.w3.org/2000/svg", 'g')
									var gTwo = document.createElementNS("http://www.w3.org/2000/svg", 'g')
									if (context == "active trade") {
										gOne.setAttribute("id","activeTrade")
										gTwo.setAttribute("id","activeTrade")
									}
									gOne.setAttribute("transform","translate(0 2)")
									gTwo.setAttribute("transform","translate(0 -2)")
									svg.appendChild(gOne);
									svg.appendChild(gTwo);
									var newPathOne = document.createElementNS("http://www.w3.org/2000/svg", 'path');
									var newPathTwo = document.createElementNS("http://www.w3.org/2000/svg", 'path');
									newPathOne.style.fill = "transparent";
									newPathOne.style.stroke = "#bc3f3f";
									newPathTwo.style.fill = "transparent";
									newPathTwo.style.stroke = "#bc3f3f";
									if (context == "active trade") {
										newPathOne.style.stroke = "#000";
									}
									if (context == "active trade") {
										newPathTwo.style.stroke = "#000";
									}
									newPathOne.setAttribute("d","M" + oldxco + " " + oldyco + " C" + (oldxco + (xco - oldxco)/4) + " " + (oldyco + (yco - oldyco)/4 - 45*scaleFactor) +  " "+ (oldxco + (xco - oldxco)*0.75) + " " + (oldyco + (yco - oldyco)*0.75 - 45*scaleFactor) + " " + xco + " " + yco);
									newPathTwo.setAttribute("d","M" + oldxco + " " + oldyco + " C" + (oldxco + (xco - oldxco)/4) + " " + (oldyco + (yco - oldyco)/4 - 45*scaleFactor) +  " "+ (oldxco + (xco - oldxco)*0.75) + " " + (oldyco + (yco - oldyco)*0.75 - 45*scaleFactor) + " " + xco + " " + yco);
									gOne.appendChild(newPathOne);
									gTwo.appendChild(newPathTwo);
							}
								
						}
						else {
							var scaleFactor = parseFloat($("#continentalMap").children("g").attr("transform").split(")")[0].replace("scale(",""))
							for (var y = 0; y < continents[zoomLevel[1]].length; y++) {

								if (continents[zoomLevel[1]][y] == currentObject["territory"].replace("#","")) {

									xco = (xco + colors[currentObject["territory"].replace("#","")][1][0] - color_key[zoomLevel[1]][1][0])*scaleFactor + $("#continentalMap").offset().left - $("#background").offset().left	
									yco = (yco + colors[currentObject["territory"].replace("#","")][1][1] - color_key[zoomLevel[1]][1][1])*scaleFactor + $("#continentalMap").offset().top - $("#background").offset().top	 
								
								}
							}
						}
				}
				if (zoomLevel[0] == "territorial") {

						if (typeof oldObject !== "undefined") {
							if (zoomLevel[1] == currentObject["territory"] || zoomLevel[1] == oldObject["territory"]) {

								var scaleFactor = parseFloat($("#territorialMap").children("g").attr("transform").split(")")[0].replace("scale(",""))
								var globalScaleFactor = parseFloat($("#globalMap").children("g").attr("transform").split(")")[0].replace("scale(",""))
								if (zoomLevel[1] == currentObject["territory"]) {
									xco = xco*scaleFactor + $("#territorialMap").offset().left - $("#background").offset().left	
									yco = yco*scaleFactor + $("#territorialMap").offset().top - $("#background").offset().top	 
								}
								else {
									if (currentObject["territory"] != "global") {
									xco = oldxco + ((xco + colors[currentObject["territory"].replace("#","")][1][0] - oldObject["xco"] + colors[oldObject["territory"].replace("#","")][1][0])*scaleFactor)
									yco = oldyco + ((yco + colors[currentObject["territory"].replace("#","")][1][1] - oldObject["yco"] + colors[oldObject["territory"].replace("#","")][1][1])*scaleFactor)
									}
									else {

										xco = oldxco + (xco*(scaleFactor/globalScaleFactor)) - ((oldObject["xco"] + colors[oldObject["territory"].replace("#","")][1][0])*scaleFactor)
										yco = oldyco + (yco*(scaleFactor/globalScaleFactor)) - ((oldObject["yco"] + colors[oldObject["territory"].replace("#","")][1][1])*scaleFactor)
									}
								}
								if (zoomLevel[1] != oldObject["territory"] && oldObject["territory"] != "global") {
									oldxco = xco + (oldxco + colors[oldObject["territory"].replace("#","")][1][0] - currentObject["xco"] - colors[currentObject["territory"].replace("#","")][1][0])*scaleFactor
									oldyco = yco + (oldyco + colors[oldObject["territory"].replace("#","")][1][1] - currentObject["yco"] - colors[currentObject["territory"].replace("#","")][1][1])*scaleFactor
								}
								if (oldObject["territory"] == "global") {

									oldxco = xco + (oldxco*(scaleFactor/globalScaleFactor)) - ((currentObject["xco"] + colors[currentObject["territory"].replace("#","")][1][0])*scaleFactor)
									oldyco = yco + (oldyco*(scaleFactor/globalScaleFactor)) - ((currentObject["yco"] + colors[currentObject["territory"].replace("#","")][1][1])*scaleFactor)
								}
								var scaleFactor = parseFloat($("#territorialMap").children("g").attr("transform").split(")")[0].replace("scale(",""))
								var svg =  document.getElementById("traderoutes")
								var newPath = document.createElementNS("http://www.w3.org/2000/svg", 'path');
								newPath.setAttribute("d","M" + oldxco + " " + oldyco + " C" + (oldxco + (xco - oldxco)/4) + " " + (oldyco + (yco - oldyco)/4 - 45*scaleFactor) +  " "+ (oldxco + (xco - oldxco)*0.75) + " " + (oldyco + (yco - oldyco)*0.75 - 45*scaleFactor) + " " + xco + " " + yco);
								if (context == "active trade") {
									newPath.setAttribute("id","activeTrade")
								}
								newPath.style.fill = "transparent";
								newPath.style.stroke = "#286faa";
								if (context == "active trade") {
									newPath.style.stroke = "#fff";
								}
								$(newPath).css("stroke-width","3px")
								svg.appendChild(newPath);

								var gOne = document.createElementNS("http://www.w3.org/2000/svg", 'g')
								var gTwo = document.createElementNS("http://www.w3.org/2000/svg", 'g')
								if (context == "active trade") {
									gOne.setAttribute("id","activeTrade")
									gTwo.setAttribute("id","activeTrade")
								}
								gOne.setAttribute("transform","translate(0 2)")
								gTwo.setAttribute("transform","translate(0 -2)")
								svg.appendChild(gOne);
								svg.appendChild(gTwo);
								var newPathOne = document.createElementNS("http://www.w3.org/2000/svg", 'path');
								var newPathTwo = document.createElementNS("http://www.w3.org/2000/svg", 'path');
								newPathOne.style.fill = "transparent";
								newPathOne.style.stroke = "#bc3f3f";
								newPathTwo.style.fill = "transparent";
								newPathTwo.style.stroke = "#bc3f3f";
								if (context == "active trade") {
									newPathOne.style.stroke = "#000";
								}
								if (context == "active trade") {
									newPathTwo.style.stroke = "#000";
								}
								newPathOne.setAttribute("d","M" + oldxco + " " + oldyco + " C" + (oldxco + (xco - oldxco)/4) + " " + (oldyco + (yco - oldyco)/4 - 45*scaleFactor) +  " "+ (oldxco + (xco - oldxco)*0.75) + " " + (oldyco + (yco - oldyco)*0.75 - 45*scaleFactor) + " " + xco + " " + yco);
								newPathTwo.setAttribute("d","M" + oldxco + " " + oldyco + " C" + (oldxco + (xco - oldxco)/4) + " " + (oldyco + (yco - oldyco)/4 - 45*scaleFactor) +  " "+ (oldxco + (xco - oldxco)*0.75) + " " + (oldyco + (yco - oldyco)*0.75 - 45*scaleFactor) + " " + xco + " " + yco);
								gOne.appendChild(newPathOne);
								gTwo.appendChild(newPathTwo);
							}
						}
						else {
							if (zoomLevel[1] == currentObject["territory"]) {
								var scaleFactor = parseFloat($("#territorialMap").children("g").attr("transform").split(")")[0].replace("scale(",""))
								xco = xco*scaleFactor + $("#territorialMap").offset().left - $("#background").offset().left	
								yco = yco*scaleFactor + $("#territorialMap").offset().top - $("#background").offset().top
							}
						}
				}

			oldxco = xco
			oldyco = yco
			oldObject = currentObject

		}

	}
	function tradeCost(itinerary) {

		var activeCanvas = document.getElementById('activeCanvas')
		var activeContext = activeCanvas.getContext("2d");
		var activeImage = document.getElementById('activeImage')
		activeContext.drawImage(activeImage,0,0);
		var activePixelData = activeContext.getImageData(0,0,$("#activeCanvas").width(),$("#activeCanvas").height())["data"];

		var oldxco
		var oldyco
		var oldObject

		var totalCost = 0;

		for (i = 0; i < itinerary.length; i++) {
			var xco
			var yco
			var currentObject

			if (typeof itinerary[i][1] === "undefined") {
				for (var key in itinerary[i]) {

					xco = (itinerary[i][key]["xco"] + colors[itinerary[i][key]["territory"].replace("#","")][1][0])*0.1251425314
					yco = (itinerary[i][key]["yco"] + colors[itinerary[i][key]["territory"].replace("#","")][1][1])*0.1251425314
				}
			}
			else {

				var globalScaleFactor = parseFloat($("#globalMap").children("g").attr("transform").split(")")[0].replace("scale(",""))
				xco = (itinerary[i][0]["xco"]/globalScaleFactor)*0.1251425314
				xco = (itinerary[i][0]["yco"]/globalScaleFactor)*0.1251425314
				currentObject = itinerary[i][0]
			}

			if (i != 0) {

				var xdistance = xco - oldxco
				var ydistance = yco - oldyco
				var slope = xdistance/ydistance

				for (var y = 0; y < Math.abs(ydistance); y++) {

					var xindex = Math.round(y*slope)

					var pixel = [activePixelData[((Math.round(yco + y)*439) + Math.round(xco + xindex))*4],activePixelData[((Math.round(yco + y)*439) + Math.round(xco + xindex))*4 +1],activePixelData[((Math.round(yco + y)*439) + Math.round(xco + xindex))*4 + 2],activePixelData[((Math.round(yco + y)*439) + Math.round(xco + xindex))*4 + 3]]

					for (key in colors) {

						if (colors[key][0][0] == pixel[0] && colors[key][0][1] == pixel[1] && colors[key][0][2] == pixel[2]) {

							var cost = Math.sqrt(1 + slope*slope)
							var avrgDistFromMiddle = Math.abs((yco + oldyco)/2 - 122.5)
							var mercaterDistFactor = -0.0003*avrgDistFromMiddle*avrgDistFromMiddle + 0.0281*avrgDistFromMiddle + 1.1574

							if (colors[key][0][0] == 73 && colors[key][0][1] == 73 && colors[key][0][2] == 73 ) {

								cost = cost*mercaterDistFactor*0.00003316794574
							}
							else {

								cost = (cost*mercaterDistFactor*0.002)*(1/colors[key][2][0])
							}

							totalCost = totalCost + cost
						}
					}
				}
			}
			oldxco = xco
			oldyco = yco
			oldObject = currentObject	
		}
		costToShip = totalCost
		if (totalCost != 0) {
			$("#user_trades_attributes_100000000000_cost").val(totalCost)
		}
		if (isNaN(parseFloat($("#user_trades_attributes_100000000000_quantity").val())) == false) {
			$("#cost").text("$"+Math.round(costToShip*parseInt($("#user_trades_attributes_100000000000_quantity").val()*100)/100))
		}

		return totalCost
	}
	function placeObject(object) {
		
		var canceled = false
		zooming = false
		var followMouse = true
		var x
		var y
			if (object == "fort") {

				newObject = {name:"",
				 ownership:"",
				 territory: "#" + $("#territorialMap").children("g").children("path").attr("id"),
				 xco:"",
				 yco:"",
				 owner:<%= @user.id %>,
				 date:""}

			}
			else if (object == "encampment") {

				newObject = {name:"",
				 territory: "#" + $("#territorialMap").children("g").children("path").attr("id"),
				 xco:"",
				 yco:"",
				 owner:<%= @user.id %>,
				 date:""}


			}

		$("#renderedSprites").append($("#" + object).clone().attr("id","curser" + object))
		$("#curser" + object).css("display","inline")
		$("#submitObject").css("display","inline")

		$("#territorialMap").mousemove( function(e) {

			if (followMouse == true) {

				$("#curser" + object).css("top", e.pageY - $("#background").offset().top - 32)
				$("#curser" + object).css("left", e.pageX - $("#background").offset().left - 32)
			}

		});
		
		$("path").click(function(e){
			if (zooming == false && newObject != rendered_forts[rendered_forts.length - 1] && newObject != rendered_encampments[rendered_encampments.length - 1]) {

				x = ((parseInt($("#curser" + object).css("left")) -  ($("#territorialMap").children("g").children("path").position().left))/parseFloat($("#territorialMap").children("g").attr("transform").split("(")[1].split(")")[0]))

				y =  ((parseInt($("#curser" + object).css("top")) - ($("#territorialMap").children("g").children("path").offset().top - $("#background").offset().top))/parseFloat($("#territorialMap").children("g").attr("transform").split("(")[1].split(")")[0]))

				followMouse = false
				$("#curser" + object).css("pointer-events","auto");
			}

		});
		
		$("#curser" + object).click( function() {
			followMouse = true
			$("#curser" + object).css("pointer-events","none");
		})


		$("#submitObject").click( function() { 
			if (canceled == false) {
				if (object == "fort") {

					newObject = {name:$("#user_forts_attributes_100000000000_name").val(),
					 ownership:$("#user_forts_attributes_100000000000_ownership").val(),
					 territory: "#" + $("#territorialMap").children("g").children("path").attr("id"),
					 xco:x,
					 yco:y,
					 owner:<%= @user.id %>,
					 date:new Date().getTime()}

					$("#user_forts_attributes_100000000000_date_created").val(newObject.date)
					$("#user_forts_attributes_100000000000_xco").val(newObject.xco)
					$("#user_forts_attributes_100000000000_yco").val(newObject.yco)
					$("#user_forts_attributes_100000000000_territory").val(newObject.territory)

					rendered_forts.push([newObject])

				}
				else if (object == "encampment") {

					newObject = {name:$("#user_encampments_attributes_100000000000_name").val(),
					 territory: "#" + $("#territorialMap").children("g").children("path").attr("id"),
					 xco:x,
					 yco:y,
					 owner:<%= @user.id %>,
					 date:new Date().getTime()}

					$("#user_encampments_attributes_100000000000_date_created").val(newObject.date)
					$("#user_encampments_attributes_100000000000_xco").val(newObject.xco)
					$("#user_encampments_attributes_100000000000_yco").val(newObject.yco)
					$("#user_encampments_attributes_100000000000_territory").val(newObject.territory)

					rendered_encampments.push([newObject])
				}

				renderObject("encampment",zoomLevel,true);
				renderObject("fort",zoomLevel);

				$(".fields").css("display","none")
				$("#curser" + object).remove()
				$("#submitObject").css("display","none")
				$("#cancelCreation").css("display","none")
				$("#curser" + object).css("pointer-events","none");
				$(".newObjectButton").css("display", "inline")
				zooming = true
			}
		});
		
		$("#cancelCreation").click( function() { 
			if (trading == false) {
				$("#curser" + object).remove()	
				$("#curser" + object).css("pointer-events","none");
				$("#curser" + object).css("display","none")
				$("#submitObject").css("display","none")
				$("#cancelCreation").css("display","none")
				$(".newObjectButton").css("display", "inline")
				$(".fields").remove()	
				zooming = true
				canceled = true
			}
		});

				

	}
//New Stuff 
	function initDisplay() {

		$("#sidePanel").css("height",$(window).height())
		$("#bottomPanel").css("height",$(window).height()*0.1)
		$("#bottomPanel").css("margin-top",$(window).height()*0.9)
		var map = Raphael($("#display")[0],"100%",$(window).height()*0.9)
		continents = {africa:map.set(),asia:map.set(),europe:map.set(),australia:map.set(),north_america:map.set(),south_america:map.set()}
		var allTerritories = map.set()
		var pathId = {}

		for (continent in territoryPaths) {

			for (territory in territoryPaths[continent]) {

				territoryPaths[continent][territory] = map.path(territoryPaths[continent][territory]).attr("stroke-width","0")
				pathId[territoryPaths[continent][territory].id] = territory
				pathId[territory] = territoryPaths[continent][territory].id
				territoryPaths[territory] = territoryPaths[continent][territory]
				continents[continent].push(territoryPaths[continent][territory])
				allTerritories.push(territoryPaths[continent][territory])
			}
		}
		var extremities = map.set(territoryPaths.north_america.non_contiguous_united_states.clone(),territoryPaths.south_america.coastal_south_america.clone(),territoryPaths.asia.russia.clone(),territoryPaths.north_america.greenland.clone())

		var allTerritoriesBBox = allTerritories.getBBox(true)
		var displayWidth = $("#display").width()
		var displayHeight = $("#display").height()
		if (allTerritoriesBBox.width/$("#display").width() < allTerritoriesBBox.height/$("#display").height()) {

			var scaleFactor = $("#display").height()/allTerritoriesBBox.height
			map.forEach( function(el) {

				el.scale(scaleFactor, scaleFactor,0,0) 
				el.translate(-1*((allTerritoriesBBox.x + (allTerritoriesBBox.width/2))) + ((displayWidth/2)/(scaleFactor)),-1*((allTerritoriesBBox.y + (allTerritoriesBBox.height/2))) + ((displayHeight/2)/(scaleFactor)))
			})
		}
		else {

			var scaleFactor = $("#display").width()/allTerritoriesBBox.width
			map.forEach( function(el) {

				el.scale(scaleFactor, scaleFactor,0,0) 
				el.translate(-1*((allTerritoriesBBox.x + (allTerritoriesBBox.width/2))) + ((displayWidth/2)/(scaleFactor)),-1*((allTerritoriesBBox.y + (allTerritoriesBBox.height/2))) + ((displayHeight/2)/(scaleFactor)))
			})
		}
		globalScale = allTerritories[0].matrix.a
		var sprites = {}
		sprites.fort = map.image("<%=image_path("fort.png")%>", 0, 0, 32, 32).hide() 
		sprites.fortSel = map.image("<%=image_path("fortsel.png")%>", 0, 0, 32, 32).hide() 
		sprites.fortSelPast = map.image("<%=image_path("fortselpast.png")%>", 0, 0, 32, 32).hide() 
		sprites.camp = map.image("<%=image_path("encampment.png")%>", 0, 0, 32, 32).hide() 
		sprites.campSel = map.image("<%=image_path("encampmentsel.png")%>", 0, 0, 32, 32).hide() 
		sprites.campSelPast = map.image("<%=image_path("encampmentselpast.png")%>", 0, 0, 32, 32).hide() 
		sprites.seapointSel = map.image("<%=image_path("seapointsel.png")%>", 0, 0, 24, 24).hide()  
		sprites.seapointSelPast = map.image("<%=image_path("seapointselpast.png")%>", 0, 0, 24, 24).hide() 
		sprites.forCamp = map.image("<%=image_path("forencampment.png")%>", 0, 0, 32, 32).hide() 
		sprites.forFort = map.image("<%=image_path("forfort.png")%>", 0, 0, 32, 32).hide() 
		sprites.inactiveCamp = map.image("<%=image_path("campinactive.png")%>", 0, 0, 32, 32).hide() 
		sprites.inactiveFort = map.image("<%=image_path("fortinactive.png")%>", 0, 0, 32, 32).hide() 
		sprites.battleLocation = map.image("<%=image_path("battlelocation.png")%>", 0, 0, 32, 32).hide() 


		for (i = 0; i < territoryColors.length; i++) {

			var firstSeg = territoryColors[i][1][0].toString(16)
			var secondSeg = territoryColors[i][1][1].toString(16)
			var thridSeg = territoryColors[i][1][2].toString(16)
			if (parseInt("0x" + firstSeg) < 16 ) {
				firstSeg = "0" + firstSeg
			}
			if (parseInt("0x" + secondSeg) < 16) {
				secondSeg = "0" + secondSeg
			}
			if (parseInt("0x" + thridSeg) < 16) {
				thridSeg = "0" + thridSeg
			}
			territoryPaths[territoryColors[i][0].replace("#","")].attr({fill:"#" + swatches[territoryColors[i][0].replace("#","")][("L" + firstSeg + secondSeg + thridSeg).toUpperCase()]})
		}
		territories = map.set(continents.asia,continents.africa,continents.australia,continents.europe,continents.south_america,continents.north_america)
		return {map:map, territoryPaths:territoryPaths, territories:territories, continents:continents, pathId:pathId,allTerritories:allTerritories,sprites:sprites,renderedSprites:map.set(),extremities:extremities}
	}
	mapContext = initDisplay()
	renderLocation(zoomLevel,mapContext)
	filterOne = mapContext.map.rect(0,0,mapContext.map.width,mapContext.map.height).attr({fill:"#000"}).attr("fill-opacity","0.0").toBack()
	filterTwo = mapContext.map.rect(0,0,mapContext.map.width,mapContext.map.height).attr({fill:"#000"}).attr("fill-opacity","0.0").toBack()
	filters = mapContext.map.set(filterOne,filterTwo)
	mapContext.territories.forEach( function(continent) {

		continent.click( function() {
			if (action.status == false || (action.status == true && action.type == "trade")) {
				if (zoomLevel[0] == "global") {

					filterOne.attr("fill-opacity","0.90").toFront()
					continent.toFront()
					continent.transform("")
					var tempClone = continent.clone()
					var continentBBox = tempClone.getBBox(true)
					tempClone.remove()
					var displayWidth = $("#display").width()
					var displayHeight = $("#display").height()
					var displayWidth = $("#display").width()
					var displayHeight = $("#display").height()
					if (continentBBox.width/$("#display").width() < continentBBox.height/$("#display").height()) {

						var scaleFactor = $("#display").height()/continentBBox.height
						continent.scale(scaleFactor, scaleFactor,0,0) 
						continent.translate(-1*((continentBBox.x + (continentBBox.width/2))) + ((displayWidth/2)/(scaleFactor)),-1*((continentBBox.y + (continentBBox.height/2))) + ((displayHeight/2)/(scaleFactor)))
					}
					else {

						var scaleFactor = $("#display").width()/continentBBox.width
						continent.scale(scaleFactor, scaleFactor,0,0) 
						continent.translate(-1*((continentBBox.x + (continentBBox.width/2))) + ((displayWidth/2)/(scaleFactor)),-1*((continentBBox.y + (continentBBox.height/2))) + ((displayHeight/2)/(scaleFactor)))
					}
					for (key in continentKey) {

						for (var i = 0 ; i < continentKey[key].length;i++) {

							if (continentKey[key][i] == mapContext.pathId[this.id].toLowerCase()) {

								zoomLevel = ["continental", key]
								updateZoom(zoomLevel,mapContext)
							}
						}
					}
				}
				else if (zoomLevel[0] == "continental") {

					if (typeof continentKey[zoomLevel[1]] !== "undefined") {

						for (var i = 0 ; i < continentKey[zoomLevel[1]].length;i++) {

							if (continentKey[zoomLevel[1]][i] == mapContext.pathId[this.id].toLowerCase()) {

								filterOne.attr("fill-opacity","0.45")
								filterTwo.attr("fill-opacity","0.6525").toFront()
								this.toFront()
								this.transform("")
								var territoryBBox = this.getBBox(true)
								if (territoryBBox.width/$("#display").width() < territoryBBox.height/$("#display").height()) {

									this.scale($("#display").height()/territoryBBox.height, $("#display").height()/territoryBBox.height,0,0) 
									this.translate(-1*((territoryBBox.x + (territoryBBox.width/2))) + (($("#display").width()/2)/($("#display").height()/territoryBBox.height)),-1*((territoryBBox.y + (territoryBBox.height/2))) + (($("#display").height()/2)/($("#display").height()/territoryBBox.height)))
								}
								else {

									this.scale($("#display").width()/territoryBBox.width, $("#display").width()/territoryBBox.width,0,0) 
								this.translate(-1*((territoryBBox.x + (territoryBBox.width/2))) + (($("#display").width()/2)/($("#display").width()/territoryBBox.width)),-1*((territoryBBox.y + (territoryBBox.height/2))) + (($("#display").height()/2)/($("#display").width()/territoryBBox.width))) 
								}

								zoomLevel = ["territorial",continentKey[zoomLevel[1]][i],zoomLevel[1],this]
								updateZoom(zoomLevel,mapContext)
								if (action.type == "trade") {
									$("#routeTrade").click()
								}
							}
						}
					}
				}
			}
		})
	})

	filters.click( function() {
		if (action.status == false || (action.status == true && action.type == "trade")) {
			if (zoomLevel[0] == "territorial") {

				filterOne.attr("fill-opacity","0.90")
				filterTwo.attr("fill-opacity","0").toBack()
				for (var i = 0, found = false;i < continentKey[zoomLevel[2]].length && found != true;i++) {

					if (continentKey[zoomLevel[2]][i] != mapContext.pathId[zoomLevel[3].id].toLowerCase()) {

						zoomLevel[3].transform(mapContext.map.getById(mapContext.pathId[continentKey[zoomLevel[2]][i]]).matrix.toTransformString())
						found = true
					}
				}
				zoomLevel = ["continental",zoomLevel[2]]
				updateZoom(zoomLevel,mapContext)
			}
			else if (zoomLevel[0] == "continental") {

				filterOne.attr("fill-opacity","0").toBack()
				var found = false
				for (var key in mapContext.continents) {

					if (key.toLowerCase() != zoomLevel[1] && found == false) {

						mapContext.continents[zoomLevel[1]].transform(mapContext.continents[key][0].matrix.toTransformString())
						found = true
					}
				}
				zoomLevel = ["global","globe"]
				updateZoom(zoomLevel,mapContext)
			}
		}
	})
	$(".mainbutton").click( function() {

		if (action.status == false || (action.status == true && action.type == "trade")) {
			if ($(this).parent().children("div").css("display") == "none") {
				$(this).parent().children("div").css("display","inline")
			}
			else {
				$(this).parent().children("div").css("display","none")
			}
		}
		$(".mainbutton").parent().children("div").not($(this).parent().children("div")).css("display","none")
		if (level = "territorial") {
			if (territoryOwners[zoomLevel[1].replace("east_africa","east_africa")].owner_id != User.id) {
				$("#buildFort").css("display","none")
				$("#leaveFort").css("display","none")
			}
			else {
				$("#leaveFort").css("display","inline")
				$("#buildFort").css("display","inline")
			}
		}

	})


	$(".actionButton").click( function() {
		if (action.status == false) {
			window[this.id](zoomLevel,mapContext)
			$(".action").css("display","block")
			$(".subfields").css("display","none")
			$("#" + this.id + "Fields").css("display","inline")
			action.status = true
			action.type = this.id
		}
	})


//End of Zooming

});
	function renderLocation(zoomLevel,mapContext) {

		if (typeof levelSprites !== "undefined") {
			levelSprites.remove()
		}
		var visibleLocations = mapContext.map.set()
		if (zoomLevel[0] == "territorial") {
			for (var i = 0; i < Locations.length; i++) {
				if (Locations[i].territory.replace("#","") == zoomLevel[1]) {
					var location
					if (Locations[i].owner_id == User.id && Locations[i].active == "true") {
						location = mapContext.sprites[Locations[i].kind].clone()
						visibleLocations.push(location.translate((Locations[i].xco*zoomLevel[3].matrix.a) + zoomLevel[3].getBBox().x,(Locations[i].yco*zoomLevel[3].matrix.a) + zoomLevel[3].getBBox().y).show())
					}
					else if (Locations[i].owner_id != User.id && Locations[i].active == "true") {
						location = mapContext.sprites["for" + Locations[i].kind.charAt(0).toUpperCase() + Locations[i].kind.slice(1)].clone()
						visibleLocations.push(location.translate((Locations[i].xco*zoomLevel[3].matrix.a) + zoomLevel[3].getBBox().x,(Locations[i].yco*zoomLevel[3].matrix.a) + zoomLevel[3].getBBox().y).show())
					}
					else if (Locations[i].active != "t") {
						location = mapContext.sprites["inactive" + Locations[i].kind.charAt(0).toUpperCase() + Locations[i].kind.slice(1)].clone()
						visibleLocations.push(location.translate((Locations[i].xco*zoomLevel[3].matrix.a) + zoomLevel[3].getBBox().x,(Locations[i].yco*zoomLevel[3].matrix.a) + zoomLevel[3].getBBox().y).show())
					}
					LocationsDirectory[location.id] = Locations[i]
					LocationsDirectory["object" + Locations[i].id] = location
					if (action.type == "trade") {
						for (var y = 0; y < globalItinerary.length; y++) {
							if (globalItinerary[y].id == Locations[i].id) {
								if (y == globalSelectedIndex || (y == globalSelectedIndex - 1 && globalSelectedIndex == globalItinerary.length)) {
									location.attr({src:mapContext.sprites[Locations[i].kind + "Sel"].attr("src")})
								}
								else {
									location.attr({src:mapContext.sprites[Locations[i].kind + "SelPast"].attr("src")})
								}
							}
						}
					}
				}
			}
		}
		else if (zoomLevel[0] == "continental") {
			var scaleFactor
			mapContext.continents[zoomLevel[1]].forEach( function(el) {scaleFactor = el.matrix.a; return false})
			for (var i = 0; i < Locations.length; i++) {
				if (continentFromTerritory(Locations[i].territory.replace("#","")) == zoomLevel[1]) {
					var location
					if (Locations[i].owner_id == User.id && Locations[i].active == "true") {
						location = mapContext.sprites[Locations[i].kind].clone()
						visibleLocations.push(location.scale(0.5,0.5,0,0).translate(2*((Locations[i].xco*scaleFactor) + mapContext.territoryPaths[Locations[i].territory.replace("#","")].getBBox().x),2*((Locations[i].yco*scaleFactor) + mapContext.territoryPaths[Locations[i].territory.replace("#","")].getBBox().y)).show())

					}
					else if (Locations[i].owner_id != User.id && Locations[i].active == "true") {
						location = mapContext.sprites["for" + Locations[i].kind.charAt(0).toUpperCase() + Locations[i].kind.slice(1)].clone()
						visibleLocations.push(location.scale(0.5,0.5,0,0).translate(2*((Locations[i].xco*scaleFactor) + mapContext.territoryPaths[Locations[i].territory.replace("#","")].getBBox().x),2*((Locations[i].yco*scaleFactor) + mapContext.territoryPaths[Locations[i].territory.replace("#","")].getBBox().y)).show())
					}
					else if (Locations[i].active != "t") {
						location = mapContext.sprites["inactive" + Locations[i].kind.charAt(0).toUpperCase() + Locations[i].kind.slice(1)].clone()
						visibleLocations.push(location.scale(0.5,0.5,0,0).translate(2*((Locations[i].xco*scaleFactor) + mapContext.territoryPaths[Locations[i].territory.replace("#","")].getBBox().x),2*((Locations[i].yco*scaleFactor) + mapContext.territoryPaths[Locations[i].territory.replace("#","")].getBBox().y)).show())
					}
					LocationsDirectory[location.id] = Locations[i]
					LocationsDirectory["object" + Locations[i].id] = location
					if (action.type == "trade") {
						for (var y = 0; y < globalItinerary.length; y++) {
							if (globalItinerary[y].id == Locations[i].id) {
								if (y == globalSelectedIndex || (y == globalSelectedIndex - 1 && globalSelectedIndex == globalItinerary.length)) {
									location.attr({src:mapContext.sprites[Locations[i].kind + "Sel"].attr("src")})
								}
								else {
									location.attr({src:mapContext.sprites[Locations[i].kind + "SelPast"].attr("src")})
								}
							}
						}
					}
				}
			}
		}
		else if (zoomLevel[0] == "global") {
			for (var i = 0; i < Locations.length; i++) {
				var location
				if (Locations[i].owner_id == User.id && Locations[i].active == "true") {
					location = mapContext.sprites[Locations[i].kind].clone()
					visibleLocations.push(location.scale(0.25,0.25,0,0).translate(((Locations[i].xco*mapContext.map.getById(1).matrix.a) + mapContext.territoryPaths[Locations[i].territory.replace("#","")].getBBox().x)*4,((Locations[i].yco*mapContext.map.getById(1).matrix.a) + mapContext.territoryPaths[Locations[i].territory.replace("#","")].getBBox().y)*4).show().toFront())
				}
				else if (Locations[i].owner_id != User.id && Locations[i].active == "true") {
					location = mapContext.sprites["for" + Locations[i].kind.charAt(0).toUpperCase() + Locations[i].kind.slice(1)].clone()
					visibleLocations.push(location.scale(0.25,0.25,0,0).translate(((Locations[i].xco*mapContext.map.getById(1).matrix.a) + mapContext.territoryPaths[Locations[i].territory.replace("#","")].getBBox().x)*4,((Locations[i].yco*mapContext.map.getById(1).matrix.a) + mapContext.territoryPaths[Locations[i].territory.replace("#","")].getBBox().y)*4).show().toFront())
				}
				else if (Locations[i].active != "t") {
					location = mapContext.sprites["inactive" + Locations[i].kind.charAt(0).toUpperCase() + Locations[i].kind.slice(1)].clone()
					visibleLocations.push(location.scale(0.25,0.25,0,0).translate(((Locations[i].xco*mapContext.map.getById(1).matrix.a) + mapContext.territoryPaths[Locations[i].territory.replace("#","")].getBBox().x)*4,((Locations[i].yco*mapContext.map.getById(1).matrix.a) + mapContext.territoryPaths[Locations[i].territory.replace("#","")].getBBox().y)*4).show().toFront())
				}
				LocationsDirectory[location.id] = Locations[i]
				LocationsDirectory["object" + Locations[i].id] = location
				if (action.type == "trade") {
					for (var y = 0; y < globalItinerary.length; y++) {
						if (globalItinerary[y].id == Locations[i].id) {
							if (y == globalSelectedIndex || (y == globalSelectedIndex - 1 && globalSelectedIndex == globalItinerary.length)) {
								location.attr({src:mapContext.sprites[Locations[i].kind + "Sel"].attr("src")})
							}
							else {
								location.attr({src:mapContext.sprites[Locations[i].kind + "SelPast"].attr("src")})
							}
						}
					}
				}
			}
		}
		levelSprites = visibleLocations
	}
	function buildFort(zoomLevel,mapContext) {
		buildLocation("fort",zoomLevel,mapContext)
	}
	function buildCamp(zoomLevel,mapContext) {
		buildLocation("camp",zoomLevel,mapContext)
	}
	function deselect(itinerary) {
		for (var i = 0; i < itinerary.length; i++) {
			LocationsDirectory["object" + itinerary[i].id].attr({src:mapContext.sprites[itinerary[i].kind + "SelPast"].attr("src")})
		}
	}
	function clearItinerary(itinerary) {
		for (var i = 0; i < itinerary.length; i++) {
			if (itinerary[i].kind != "seapoint") {
				LocationsDirectory["object" + itinerary[i].id].attr({src:mapContext.sprites[itinerary[i].kind].attr("src")})
			}
		}
	}
	function select(location) {
		location.attr({src:mapContext.sprites[LocationsDirectory[location.id].kind + "Sel"].attr("src")})
	}
	function trade(empty,forarchitchture) {
		itinerary = []
		globalItinerary = itinerary
		tradeLines = mapContext.map.set()

		cost = 0
		quantity = 0

		seapoints = mapContext.map.set()
		selectedIndex = 0

		globalSelectedIndex = selectedIndex
		$("#quantity,#forquantity,#forwhat,#what").change( function() {

			quantity = 0
			if ($.isNumeric($("#quantity").val()) == true) {
				quantity = parseInt($("#quantity").val())
				if ($("#what").val() == "energy_units") {
					quantity = quantity*3
				}
				else if ($("#what").val() == "militants") {
					quantity = quantity*110
				}
				else if ($("#what").val() == "money") {
					quantity = 0
				}
				else if ($("#what").val() == "population") {
					quantity = quantity*80
				}
			}
			if ($.isNumeric($("#forquantity").val()) == true) {
				if ($("#forwhat").val() == "energy_units") {
					quantity = quantity + parseInt($("#forquantity").val())*3
				}
				else if ($("#forwhat").val() == "militants") {
					quantity = quantity + parseInt($("#forquantity").val())*110
				}
				else if ($("#forwhat").val() == "population") {
					quantity = quantity + parseInt($("#forquantity").val())*80
				}
				else if ($("#forwhat").val() == "food_units") {
					quantity = quantity + parseInt($("#forquantity").val())
				}
			}
			$("#routeTrade").text(addCommas((Math.round(cost*quantity)).toString()))
		})
		$("#routeTrade").click( function() {
			$("#routeTrade").addClass("hover")
			levelSprites.click( function() {
				if (this.attr("src") == mapContext.sprites.fort.attr("src") || this.attr("src") == mapContext.sprites.camp.attr("src")) {
					var valid = true
					if (selectedIndex == 0) {
						if (LocationsDirectory[this.id].owner_id != User.id) {
							valid = false
							promptAlert("You must start a trade from one of your own locations." ["Okay"])
							$("#Okay").click( function() {
								$("#Okay").off("click")
								$("#alertBox").css("display","none")
							})
						}
					}
					var fakeItinerary = itinerary.slice()
					fakeItinerary[selectedIndex] = LocationsDirectory[this.id]
					if (validateTradeRoute(fakeItinerary) == false) {
						valid = false
					}
					if (valid == true) {
						if (typeof itinerary[selectedIndex] !== "undefined") {
							if (itinerary[selectedIndex].kind == "seapoint") {
								LocationsDirectory["object" + itinerary[selectedIndex].id].remove()
							}
							else {
								LocationsDirectory["object" + itinerary[selectedIndex].id].attr({src:mapContext.sprites[itinerary[selectedIndex].kind].attr("src")})
							}
						}

						itinerary[selectedIndex] = LocationsDirectory[this.id]
						if (selectedIndex == itinerary.length - 1) {
							selectedIndex++
						}
						globalItinerary = itinerary
						globalSelectedIndex = selectedIndex
						selectedLocation = LocationsDirectory[this.id]
						//if (typeof tradeLines !== "undefined") {

						//	tradeLines.remove()
						//}
						deselect(itinerary)
						this.attr({src:mapContext.sprites[LocationsDirectory[this.id].kind + "Sel"].attr("src")})
		 				//tradeLines = renderTrade(zoomLevel,mapContext,itinerary)
						cost = calculateTradeCost(mapContext,itinerary)
						$("#routeTrade").text(addCommas((Math.round(cost*quantity)).toString()))
					}
				}
				else if (this.attr("src") == mapContext.sprites.fortSel.attr("src") || this.attr("src") == mapContext.sprites.campSel.attr("src")) {
					deselect(itinerary)
					select(LocationsDirectory["object" + itinerary[itinerary.length - 1].id])
					selectedIndex = itinerary.length
					globalSelectedIndex = selectedIndex
					}
				else if (this.attr("src") == mapContext.sprites.fortSelPast.attr("src") || this.attr("src") == mapContext.sprites.campSelPast.attr("src")) {
					deselect(itinerary)
					select(this)
					for (var i = 0; i < itinerary.length; i++) {
						if (itinerary[i].id == LocationsDirectory[this.id].id) {
							selectedIndex = i
						}
					}
					globalSelectedIndex = selectedIndex
				}
			})
			seapoints.click( function() {

				if (this.attr("src") == mapContext.sprites.seapointSel.attr("src")) {
					deselect(itinerary)
					select(LocationsDirectory["object" + itinerary[itinerary.length - 1].id])
					selectedIndex = itinerary.length
					globalSelectedIndex = selectedIndex
				}
				else if (this.attr("src") == mapContext.sprites.seapointSelPast.attr("src")) {
					deselect(itinerary)
					select(this)
					for (var i = 0; i < itinerary.length; i++) {
						if (itinerary[i].id == LocationsDirectory[this.id].id) {
							selectedIndex = i
						}
					}
					globalSelectedIndex = selectedIndex
				}
			})
			$(mapContext.map.canvas).click( function(e) {
				if (zoomLevel[0] == "global") {
					if (promptSeapoint == true) {
						if (itinerary.length != 0) {

							if ( mapContext.map.getElementByPoint(e.pageX,e.pageY).id == filterTwo.id ||  mapContext.map.getElementByPoint(e.pageX,e.pageY).id == filterOne.id) {
								var fakeItinerary = itinerary.slice()
								var extremitiesBBox = mapContext.extremities.getBBox()
								var xco 
								var yco
								if (extremitiesBBox.width/$("#display").width() > extremitiesBBox.height/$("#display").height()) {
									xco = e.pageX/(mapContext.map.bottom.matrix.a)
									yco = (e.pageY/(mapContext.map.bottom.matrix.a)) + extremitiesBBox.y
								}
								else {
									yco = e.pageY/(mapContext.map.bottom.matrix.a)
									xco = (e.pageX/(mapContext.map.bottom.matrix.a)) + extremitiesBBox.x
								}
								fakeItinerary[selectedIndex] = {kind:"seapoint",yco:yco,xco:xco,id:Math.random()}
								if (true) {
									promptAlert("Would you like to place a seapoint?", ["Yes","No"])
									$("#No").click( function() {
										$("#alertBox").css("display","none")
										$("#Yes,#No").off("click")
									})
									$("#Yes").click( function() {
										$("#alertBox").css("display","none")
										$("#Yes,#No").off("click")
										deselect(itinerary)
										var extremitiesBBox = mapContext.extremities.getBBox()
										var xco 
										var yco
										if (extremitiesBBox.width/$("#display").width() > extremitiesBBox.height/$("#display").height()) {
											xco = e.pageX/(mapContext.allTerritories[0].matrix.a)
											yco = (e.pageY - extremitiesBBox.y)/mapContext.allTerritories[0].matrix.a
										}
										else {

											yco = e.pageY/(mapContext.allTerritories[0].matrix.a)
											xco = (e.pageX - extremitiesBBox.x)/mapContext.allTerritories[0].matrix.a
										}
										var seapointObject = {kind:"seapoint",yco:yco,xco:xco,id:Math.random()}

										var seapoint = mapContext.sprites.seapointSel.clone().show().translate(e.pageX,e.pageY)
										LocationsDirectory["object" + seapointObject.id] = seapoint
										LocationsDirectory[seapoint.id] = seapointObject
										if (typeof itinerary[selectedIndex] !== "undefined") {
											if (itinerary[selectedIndex].kind == "seapoint") {
											LocationsDirectory["object" + itinerary[selectedIndex].id].remove()
											}
											else {
												LocationsDirectory["object" + itinerary[selectedIndex].id].attr({src:mapContext.sprites[itinerary[selectedIndex].kind].attr("src")})
											}
										}
										itinerary[selectedIndex] = seapointObject
										globalItinerary = itinerary

										if (selectedIndex == itinerary.length - 1) {
											selectedIndex++
											globalSelectedIndex = selectedIndex
										}
										selectedLocation = seapointObject
										seapoints.push(seapoint)
										//if (typeof tradeLines !== "undefined") {
										//	tradeLines.remove()
										//}
						 				//tradeLines = renderTrade(zoomLevel,mapContext,itinerary)
										cost = calculateTradeCost(mapContext,itinerary)
										$("#routeTrade").text(addCommas((Math.round(cost*quantity)).toString()))
									})
								}
								else {
									promptAlert("You must stop at a location in every foreign territory you pass through.", ["Okay"])
									$("#Okay").click( function() {
										$("#Okay").off("click")
										$("#alertBox").css("display","none")
									})
								}
							}
						}
					}
					else {
						promptSeapoint = true
					}
				}
			})			
		})
		$("#submit").click( function() {
			if (itinerary[0][$("#what").val()] > $("#quantity").val() && itinerary[0].money > cost) {
				$("#trade_fields").remove()
				$("#leg_fields").remove()
				$(".edit_user")[0].reset()
				$("#create_trade").click()
				$("#user_trades_attributes_100000000000_what").val($("#what").val())
				$("#user_trades_attributes_100000000000_quantity").val($("#quantity").val())
				$("#user_trades_attributes_100000000000_forwhat").val($("#forwhat").val())
				$("#user_trades_attributes_100000000000_forquantity").val($("#forquantity").val())
				$("#user_trades_attributes_100000000000_cost").val(cost)
				$("#user_trades_attributes_100000000000_notes").val($("#notes").val())
				for (var i = 0; i < itinerary.length; i++) {
					$("#create_leg").click()
					$("#user_trades_attributes_100000000000_legs_attributes_" + 99999999999 + i + 1 + "_location_id").val(itinerary[i].id)
					$("#user_trades_attributes_100000000000_legs_attributes_" + 99999999999 + i + 1 + "_trade_index").val(i)
				}
				$("#submitObject").click()
				clearItinerary(itinerary)
				seapoints.unclick()
				seapoints.remove()
				$("#quantity,#forquantity,#forwhat,#what").off("change")
				levelSprites.unclick()
				$("#routeTrade").off("click")
				action.status = false
				action.type = false
				updateSideBar(zoomLevel) 
				$("#routeTrade").text("Route")
				$("#routeTrade").removeClass("hover")
				itinerary = []
				$("#what").val("")
				$("#quantity").val("")
				$("#forwhat").val("")
				$("#forquantity").val("")
				$("#notes").val("")
				tradeLines.remove()
				promptSeapoint = false
			}
			else {
				promptAlert("Insufficient Resources",["Okay"])
				$("#Okay").click( function() {
					$("#Okay").off("click")
					$("#alertBox").css("display","none")
				})
			}
		})
		$("#cancel").click( function() {
			clearItinerary(itinerary)
			seapoints.unclick()
			seapoints.remove()
			$("#quantity,#forquantity,#forwhat,#what").off("change")
			levelSprites.unclick()
			$("#routeTrade").off("click")
			action.status = false
			action.type = false
			updateSideBar(zoomLevel) 
			$("#routeTrade").text("Route")
			$("#routeTrade").removeClass("hover")
			itinerary = []
			promptSeapoint = false
			tradeLines.remove()
			$("#what").val("")
			$("#quantity").val("")
			$("#forwhat").val("")
			$("#forquantity").val("")
			$("#notes").val("")

		})
	}
	function renderTrade(blah,blah,itinerary) {
		var tradeLines = mapContext.map.set()
		for (var i = 0; i < itinerary.length; i++) {
			if (i != itinerary.length - 1) {
				if (LocationsDirectory["object" + itinerary[i].id][0] != null) {


					var firstLocationBBox
					var secondLocationBBox
					var midxco
					var midyco
					if (LocationsDirectory["object" + itinerary[i + 1].id][0] != null) {

						if (itinerary[i + 1].kind != "seapoint" && itinerary[i].kind != "seapoint") {
								firstLocationBBox = LocationsDirectory["object" + itinerary[i].id].getBBox()
								secondLocationBBox = LocationsDirectory["object" + itinerary[i + 1].id].getBBox()
								midxco = (firstLocationBBox.x + secondLocationBBox.x)/2
								midyco = (firstLocationBBox.y + secondLocationBBox.y)/2 - (firstLocationBBox.x + secondLocationBBox.x)*0.05
						}
						else if (itinerary[i].kind != "seapoint"  && itinerary[i + 1].kind == "seapoint") {

							if (zoomLevel[0] != "global") {

								firstLocationBBox = LocationsDirectory["object" + itinerary[i].id].getBBox()
								secondLocationBBox = {x:firstLocationBBox.x + (itinerary[i + 1].xco - (itinerary[i].xco + colors[itinerary[i].territory.replace("#","")][1][0])),y:firstLocationBBox.y + (itinerary[i + 1].yco - (itinerary[i].yco + colors[itinerary[i].territory.replace("#","")][1][1]))}
								midxco = (firstLocationBBox.x + secondLocationBBox.x)/2
								midyco = (firstLocationBBox.y + secondLocationBBox.y)/2 - (firstLocationBBox.x + secondLocationBBox.x)*0.05
							}
							else {
								firstLocationBBox = LocationsDirectory["object" + itinerary[i].id].getBBox()
								secondLocationBBox = LocationsDirectory["object" + itinerary[i + 1].id].getBBox()
								midxco = (firstLocationBBox.x + secondLocationBBox.x)/2
								midyco = (firstLocationBBox.y + secondLocationBBox.y)/2 - (firstLocationBBox.x + secondLocationBBox.x)*0.05
							}
						}
						else if (itinerary[i].kind == "seapoint"  && itinerary[i + 1].kind != "seapoint") {
							if (zoomLevel[0] != "global") {
								secondLocationBBox = LocationsDirectory["object" + itinerary[i + 1].id].getBBox()
								firstLocationBBox = {x:secondLocationBBox.x + (itinerary[i].xco - (itinerary[i + 1].xco + colors[itinerary[i + 1].territory.replace("#","")][1][0])),y:secondLocationBBox.y + (itinerary[i].yco - (itinerary[i + 1].yco + colors[itinerary[i + 1].territory.replace("#","")][1][1]))}
								midxco = (firstLocationBBox.x + secondLocationBBox.x)/2
								midyco = (firstLocationBBox.y + secondLocationBBox.y)/2 - (firstLocationBBox.x + secondLocationBBox.x)*0.05
							}
							else {
								firstLocationBBox = LocationsDirectory["object" + itinerary[i].id].getBBox()
								secondLocationBBox = LocationsDirectory["object" + itinerary[i + 1].id].getBBox()
								midxco = (firstLocationBBox.x + secondLocationBBox.x)/2
								midyco = (firstLocationBBox.y + secondLocationBBox.y)/2 - (firstLocationBBox.x + secondLocationBBox.x)*0.05
							}
						}
						else {
							if (zoomLevel[0] == "global") {
								firstLocationBBox = LocationsDirectory["object" + itinerary[i].id].getBBox()
								secondLocationBBox = LocationsDirectory["object" + itinerary[i + 1].id].getBBox()
								midxco = (firstLocationBBox.x + secondLocationBBox.x)/2
								midyco = (firstLocationBBox.y + secondLocationBBox.y)/2 - (firstLocationBBox.x + secondLocationBBox.x)*0.05
							}
						}
					}
					else {
						if (itinerary[i].kind != "seapoint") {
							firstLocationBBox = LocationsDirectory["object" + itinerary[i].id].getBBox()
							secondLocationBBox = {x:firstLocationBBox.x + ((itinerary[i + 1].xco + colors[itinerary[i + 1].territory.replace("#","")][1][0]) - (itinerary[i].xco + colors[itinerary[i].territory.replace("#","")][1][0])),y:firstLocationBBox.y + ((itinerary[i + 1].yco + colors[itinerary[i + 1].territory.replace("#","")][1][1]) - (itinerary[i].yco + colors[itinerary[i].territory.replace("#","")][1][1]))}
							midxco = (firstLocationBBox.x + secondLocationBBox.x)/2
							midyco = (firstLocationBBox.y + secondLocationBBox.y)/2 - (firstLocationBBox.x + secondLocationBBox.x)*0.05	
						}
					}
					var first = mapContext.map.path("M" + firstLocationBBox.x + "," + firstLocationBBox.y + "Q" + midxco + "," + midyco + "," + secondLocationBBox.x + "," + secondLocationBBox.y).attr({stroke:"#FFFFFF"}).attr("stroke-width","4px")
					var pathString = Raphael.parsePathString(first.attr("path"))
					tradeLines.push(first,first.clone().attr({stroke:"#000000"}).attr("stroke-width","2px").attr("path", pathString[0][0] + parseInt(pathString[0][1]) + 1 + "," + parseInt(pathString[0][2]) + 1 + pathString[1][0] + parseInt(pathString[1][1]) + 1  + "," + parseInt(pathString[1][2]) + 1 + "," + parseInt(pathString[1][3]) + 1  + "," + parseInt(pathString[1][4]) + 1 + "," + parseInt(pathString[1][5]) + 1),first.clone().attr({stroke:"#000000"}).attr("stroke-width","2px").attr("path",pathString[0][0] + parseInt(pathString[0][1]) - 1 + "," + parseInt(pathString[0][2]) - 1 + pathString[1][0] + parseInt(pathString[1][1]) - 1  + "," + parseInt(pathString[1][2]) - 1 + "," + parseInt(pathString[1][3]) - 1  + "," + parseInt(pathString[1][4]) - 1 + "," + parseInt(pathString[1][5]) - 1))
				}
				else if ( LocationsDirectory["object" + itinerary[i].id][0] == null &&  LocationsDirectory["object" + itinerary[i + 1].id][0] != null) {
					var firstLocationBBox
					var secondLocationBBox
					var midxco
					var midyco
					if (LocationsDirectory["object" + itinerary[i + 1].id][0] != null && itinerary[i + 1].kind != "seapoint") {
						secondLocationBBox = LocationsDirectory["object" + itinerary[i + 1].id].getBBox()
						firstLocationBBox = {x:secondLocationBBox.x + ((itinerary[i].xco + colors[itinerary[i].territory.replace("#","")][1][0]) - (itinerary[i + 1].xco + colors[itinerary[i + 1].territory.replace("#","")][1][0])),y:secondLocationBBox.y + ((itinerary[i].yco + colors[itinerary[i].territory.replace("#","")][1][1]) - (itinerary[i + 1].yco + colors[itinerary[i + 1].territory.replace("#","")][1][1]))}
						midxco = (firstLocationBBox.x + secondLocationBBox.x)/2
						midyco = (firstLocationBBox.y + secondLocationBBox.y)/2 - (firstLocationBBox.x + secondLocationBBox.x)*0.05
					}
					var first = mapContext.map.path("M" + firstLocationBBox.x + "," + firstLocationBBox.y + "Q" + midxco + "," + midyco + "," + secondLocationBBox.x + "," + secondLocationBBox.y).attr({stroke:"#FFFFFF"}).attr("stroke-width","4px")
					var pathString = Raphael.parsePathString(first.attr("path"))
					tradeLines.push(first,first.clone().attr({stroke:"#000000"}).attr("stroke-width","2px").attr("path", pathString[0][0] + parseInt(pathString[0][1]) + 1 + "," + parseInt(pathString[0][2]) + 1 + pathString[1][0] + parseInt(pathString[1][1]) + 1  + "," + parseInt(pathString[1][2]) + 1 + "," + parseInt(pathString[1][3]) + 1  + "," + parseInt(pathString[1][4]) + 1 + "," + parseInt(pathString[1][5]) + 1),first.clone().attr({stroke:"#000000"}).attr("stroke-width","2px").attr("path",pathString[0][0] + parseInt(pathString[0][1]) - 1 + "," + parseInt(pathString[0][2]) - 1 + pathString[1][0] + parseInt(pathString[1][1]) - 1  + "," + parseInt(pathString[1][2]) - 1 + "," + parseInt(pathString[1][3]) - 1  + "," + parseInt(pathString[1][4]) - 1 + "," + parseInt(pathString[1][5]) - 1))
				}
			}
			else if (LocationsDirectory["object" + itinerary[i].id][0] != null &&  LocationsDirectory["object" + itinerary[i - 1].id][0] == null) {
				if (itinerary[i].kind != "seapoint") {
					var secondLocationBBox = LocationsDirectory["object" + itinerary[i].id].getBBox()
					var firstLocationBBox = {x:secondLocationBBox.x + ((itinerary[i].xco + colors[itinerary[i].territory.replace("#","")][1][0]) - (itinerary[i + 1].xco + colors[itinerary[i + 1].territory.replace("#","")][1][0])),y:secondLocationBBox.y + ((itinerary[i].yco + colors[itinerary[i].territory.replace("#","")][1][1]) - (itinerary[i + 1].yco + colors[itinerary[i + 1].territory.replace("#","")][1][1]))}
					var midxco = (firstLocationBBox.x + secondLocationBBox.x)/2
					var midyco = (firstLocationBBox.y + secondLocationBBox.y)/2 - (firstLocationBBox.x + secondLocationBBox.x)*0.05
					var first = mapContext.map.path("M" + firstLocationBBox.x + "," + firstLocationBBox.y + "Q" + midxco + "," + midyco + "," + secondLocationBBox.x + "," + secondLocationBBox.y).attr({stroke:"#FFFFFF"}).attr("stroke-width","4px")
					var pathString = Raphael.parsePathString(first.attr("path"))
					tradeLines.push(first,first.clone().attr({stroke:"#000000"}).attr("stroke-width","2px").attr("path", pathString[0][0] + parseInt(pathString[0][1]) + 1 + "," + parseInt(pathString[0][2]) + 1 + pathString[1][0] + parseInt(pathString[1][1]) + 1  + "," + parseInt(pathString[1][2]) + 1 + "," + parseInt(pathString[1][3]) + 1  + "," + parseInt(pathString[1][4]) + 1 + "," + parseInt(pathString[1][5]) + 1),first.clone().attr({stroke:"#000000"}).attr("stroke-width","2px").attr("path",pathString[0][0] + parseInt(pathString[0][1]) - 1 + "," + parseInt(pathString[0][2]) - 1 + pathString[1][0] + parseInt(pathString[1][1]) - 1  + "," + parseInt(pathString[1][2]) - 1 + "," + parseInt(pathString[1][3]) - 1  + "," + parseInt(pathString[1][4]) - 1 + "," + parseInt(pathString[1][5]) - 1))
				}
			}
		}
		return tradeLines
	}
	function validateTradeRoute(itinerary) {
		var valid = true
		var activeCanvas = document.getElementById('activeCanvas')
		var activeContext = activeCanvas.getContext("2d");
		var activeImage = document.getElementById('activeImage')
		activeContext.drawImage(activeImage,0,0);
		var activePixelData = activeContext.getImageData(0,0,$("#activeCanvas").width(),$("#activeCanvas").height())["data"];

		var oldxco
		var oldyco
		var oldObject



		var totalCost = 0;

		for (i = 0; i < itinerary.length; i++) {
			var colorsList = []
			var xco
			var yco
			var currentObject

			if (itinerary[i].kind != "seapoint") {
					xco = (itinerary[i]["xco"] + colors[itinerary[i]["territory"].replace("#","")][1][0])*0.1251425314
					yco = (itinerary[i]["yco"] + colors[itinerary[i]["territory"].replace("#","")][1][1])*0.1251425314
			}
			else {

				xco = itinerary[i]["xco"]*0.1251425314
				yco = itinerary[i]["yco"]*0.1251425314

			}

			currentObject = itinerary[i]
			if (i != 0) {
				var xdistance = xco - oldxco
				var ydistance = yco - oldyco
				var slope = xdistance/ydistance

				for (var y = 0; y < Math.abs(ydistance); y++) {

					var xindex = Math.round(y*slope)
					var pixel = [activePixelData[((Math.round(yco - y)*439) + Math.round(xco - xindex))*4],activePixelData[((Math.round(yco - y)*439) + Math.round(xco - xindex))*4 +1],activePixelData[((Math.round(yco - y)*439) + Math.round(xco - xindex))*4 + 2],activePixelData[((Math.round(yco - y)*439) + Math.round(xco - xindex))*4 + 3]]

					if (pixel[0] != 73 && pixel[1] != 73 && pixel[2] != 73 ) {
						var newPixel = true
						for (var y = 0; y < colorsList.length; y++) {
							if (colorsList[y] == pixel) {
								newPixel = false
							}
						}
						if (newPixel == true) {
							colorList.push(pixel)
						}
					}
				}
			}

			if (colorsList.length > 2) {
				return false
			}
			else {
				return true
			}
			oldxco = xco
			oldyco = yco
			oldObject = currentObject	
		}

	}
	function calculateTradeCost(mapContext,itinerary) {
		var activeCanvas = document.getElementById('activeCanvas')
		var activeContext = activeCanvas.getContext("2d");
		var activeImage = document.getElementById('activeImage')
		activeContext.drawImage(activeImage,0,0);
		var activePixelData = activeContext.getImageData(0,0,$("#activeCanvas").width(),$("#activeCanvas").height())["data"];

		var oldxco
		var oldyco
		var oldObject

		var totalCost = 0;

		for (i = 0; i < itinerary.length; i++) {

			var xco
			var yco
			var currentObject

			if (itinerary[i].kind != "seapoint") {

					xco = (itinerary[i]["xco"] + colors[itinerary[i]["territory"].replace("#","")][1][0])*0.1251425314
					yco = (itinerary[i]["yco"] + colors[itinerary[i]["territory"].replace("#","")][1][1])*0.1251425314
			}
			else {

				xco = itinerary[i]["xco"]*0.1251425314
				yco = itinerary[i]["yco"]*0.1251425314

			}

			currentObject = itinerary[i]
			if (i != 0) {
				var xdistance = xco - oldxco
				var ydistance = yco - oldyco
				var slope = xdistance/ydistance

				for (var y = 0; y < Math.abs(ydistance); y++) {

					var xindex = Math.round(y*slope)
					var pixel = [activePixelData[((Math.round(yco - y)*439) + Math.round(xco - xindex))*4],activePixelData[((Math.round(yco - y)*439) + Math.round(xco - xindex))*4 +1],activePixelData[((Math.round(yco - y)*439) + Math.round(xco - xindex))*4 + 2],activePixelData[((Math.round(yco - y)*439) + Math.round(xco - xindex))*4 + 3]]

					var cost = Math.sqrt((slope*slope) + 1)
					var avrgDistFromMiddle = Math.abs((yco + oldyco)/2 - 122.5)
					var mercaterDistFactor = -0.0003*avrgDistFromMiddle*avrgDistFromMiddle + 0.0281*avrgDistFromMiddle + 1.1574
					for (key in colors) {

						if (colors[key][0][0] == pixel[0] && colors[key][0][1] == pixel[1] && colors[key][0][2] == pixel[2]) {


								cost = (cost*mercaterDistFactor*0.002*9.1699542334)*(1/colors[key][2][0])


						}

					}
					if (pixel[0] == 73 && pixel[1] == 73 && pixel[2] == 73 ) {
						cost = cost*mercaterDistFactor*0.00003316794574*9.1699542334
					}
					totalCost = totalCost + cost
				}
			}
			oldxco = xco
			oldyco = yco
			oldObject = currentObject	
		}
		return totalCost
	}
	function buildLocation(locationType,zoomLevel,mapContext) {
		if (zoomLevel[0] == "territorial") {
			var location = mapContext.sprites[locationType].clone().show().toFront().transform("").scale(1,1,0,0)
			mapContext.renderedSprites.push(location)
			var coordinates = [0,0]
			var moving = true
			var object 
			zoomLevel[3].mousemove( function(event) {
				location.transform("T" + event.clientX + "," + event.clientY)
				coordinates = [event.pageX,event.pageY]
			})
			location.click( function(event) {
				if (moving == true) {
					if (zoomLevel[3].isPointInside(coordinates[0],coordinates[1]) == true) {
						zoomLevel[3].unmousemove()
						moving = false
					}
				}
				else {

					zoomLevel[3].mousemove( function(event) {
						location.transform("T" + event.clientX + "," + event.clientY)
						coordinates = [event.clientX,event.clientY]
						moving = true
					})
				}	
			})
			$("#sponsorLocation" + locationType).on("click", function() {
				$("#sponsorLocation" + locationType).addClass("hover")
				levelSprites.click( function(location) {
					object = LocationsDirectory[this.id]
					var cost
					if (locationType == "fort") {
						cost = 1553000000
					}
					else {
						cost = 100000000
					} 
					if (object.owner_id == User.id) {
						if (object.money >= cost) {
							$("#sponsorLocation" + locationType).text(object.name)
							levelSprites.unclick()
							$("#sponsorLocation" + locationType).removeClass("hover")
						}
						else {
							promptAlert("Insufficient Funds",["Okay"])
							$(document).on('click', '#Okay', function(){ 
								$("#alertBox").css("display","none")
								$("#Okay").off("click")
							})
						}
					}
				})
			})
			$("#submit").click( function() {
				$("#location_fields").remove()
				$(".edit_user")[0].reset()
				var xco 
				var yco
				var scaleFactor = ((mapContext.extremities.getBBox().width/3498)*zoomLevel[3].matrix.a)/mapContext.map.bottom.matrix.a
				if ($("#display").width() - zoomLevel[3].getBBox().width > $("#display").height() - zoomLevel[3].getBBox().height) {
					xco = Math.round((coordinates[0] - zoomLevel[3].getBBox().x)/scaleFactor)
					yco = Math.round(coordinates[1]/scaleFactor)
				}
				else {
					xco = Math.round(coordinates[0]/scaleFactor)
					yco = Math.round((coordinates[1] - zoomLevel[3].getBBox().y)/scaleFactor)
				}
				$("#create_location").click()
				$("#user_locations_attributes_100000000000_name").val($("#" + locationType + "Name" ).val())
				$("#user_locations_attributes_100000000000_kindType").val(locationType)
				$("#user_locations_attributes_100000000000_xco").val(xco)
				$("#user_locations_attributes_100000000000_yco").val(yco)
				$("#user_locations_attributes_100000000000_sponsor_location_id").val(object.id)
				$("#user_locations_attributes_100000000000_territory").val("#" + zoomLevel[1])
				$("#submitObject").click()

				$("#sponsorLocation" + locationType).removeClass("hover")
				zoomLevel[3].unmousemove()
				location.unclick()
				mapContext.renderedSprites.exclude(location)
				location.remove()
				$("#cancel,#submit").off("click")
				updateSideBar(zoomLevel) 
				action.status = false
				$("#sponsorLocation" + locationType).text("Select Sponsor")
			})
			$("#cancel").click( function() {
				zoomLevel[3].unmousemove()
				location.unclick()
				mapContext.renderedSprites.exclude(location)
				location.remove()
				$("#cancel,#submit").off("click")
				updateSideBar(zoomLevel) 
				action.status = false
				$("#sponsorLocation" + locationType).text("Select Sponsor")
				$("#sponsorLocation" + locationType).removeClass("hover")

			})
		}
	}
	function promptAlert(message,buttons) {
		$("#alertBox").css("display","inline")
		$("#alertBox").children().remove()
		$("#alertBox").append("<p>" + message + "</p><BR>")
		for (var i = 0; i < buttons.length; i++) {
			$("#alertBox").append("<button class='gala alertButton' id='" + buttons[i] + "' >" + buttons[i] + "</button><BR>")
		}
		$("#alertBox").css("margin-top",($("#display").height() - $("#alertBox").height()/2)/2)
	}
	function continentFromTerritory(territory) {
		return continentFromTerritoryList[territory]
	}
	function test() {}
	function updateZoom(zoomLevel,mapContext) {
		renderLocation(zoomLevel,mapContext)
		if (zoomLevel[0] != "global" && action.type == "trade") {
			promptSeapoint = false
		}
		if (action.type == "trade") {
			//if (typeof tradeLines !== "undefined") {
			//	tradeLines.remove()
			//}
			//tradeLines = renderTrade(zoomLevel,mapContext,itinerary)
		}
		updateSideBar(zoomLevel)

		
	}
	function updateSideBar(zoomlevel) {
		if (action.type != "trade") {
			$(".sidebar").css("display","none")
			$("." + zoomlevel[0]).css("display","inline")
			$(".action").css("display","none")
			$(".subfields").css("display","none")
			$(".dropdown").css("display","none")
		}
	}
	function parseResponseObject(type,object) {
console.log(type)
		if (type == "location") {
			if (typeof object.money === "undefined" && object.owner_id != User.id) {
				Locations.push(object)
				renderLocation(zoomLevel,mapContext)
			}
			else if (typeof object.money !== "undefined" && object.owner_id == User.id) {
				Locations.push(object)
				renderLocation(zoomLevel,mapContext)
			}
		}
		if (type == "midnight") {
			for (var i = 0; i < Locations.length; i++) {
				if (Locations[i].id == object.id) {
					Locations[i] = object
				}
			}
		}
	}
	function removeClicks(set) {

		set.forEach( function(el){
			if ( typeof el.events !== "undefined") {

				for (var i = 0; i < el.events.length; i++) {
					if (el.events[i]["name"] == "click") {
						el.events.slice(i,1)
					}
				}
			}
		})
	}
	function addCommas(nStr)
	{
	    nStr += '';
	    x = nStr.split('.');
	    x1 = x[0];
	    x2 = x.length > 1 ? '.' + x[1] : '';
	    var rgx = /(\d+)(\d{3})/;
	    while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	    }
	    return x1 + x2;
	}
	var action = {status:false,type:-1}
	var levelSprites
	var zoomLevel = ["global","globe"];
	var mapContext
	var filters
	var filterOne
	var filterTwo
	var promptSeapoint = false



