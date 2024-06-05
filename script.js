function selectCheckboxes(section, select) {
	const checkboxes = document.querySelectorAll(`fieldset.${section} input[type="checkbox"]`);
	checkboxes.forEach(checkbox => {
		checkbox.checked = select;
	});
}

const frame_urls = [["frame_b_1.png","frame_r_1.png","frame_g_1.png"],["frame_b_2.png","frame_r_2.png","frame_g_2.png"]];
const cp_urls=[["cp1_b.png","cp1_r.png","cp1_g.png"],["cp2_b.png","cp2_r.png","cp2_g.png"]];
const phase_urls=[["command_b.png","command_b.png","command_b.png"],["movement_b.png","movement_r.png","movement_g.png"],["shooting_b.png","shooting_r.png","shooting_g.png"],["charge_b.png","charge_r.png","charge_g.png"],["fight_b.png","fight_r.png","fight_g.png"],["any_b.png","any_r.png","any_g.png"]];
const colour_codes=["color:096691","color:#910909","color:#0c542e"];

function addStrategem(){
	if(document.getElementById("strategem_list").childNodes.length >= 7){
		if (!confirm('You are about to exceed 6 Strategems, print readiness is not guaranteed. Do you want to continue?')) {
			return
		}
	}
	
	const title = document.getElementById("title").value;
	const type = document.getElementById("type").value;
	const when = document.getElementById("when").value;
	const target = document.getElementById("target").value;
	const effect = document.getElementById("effect").value;
	const restrictions = document.getElementById("restrictions").value;
	const cp = parseInt(document.getElementById("cp").value);
	
    var fields = document.querySelectorAll(`fieldset.${'phase'} input[type="checkbox"]:checked`);
    const phase = Array.from(fields).map(checkbox => checkbox.value);
	
    var fields = document.querySelectorAll(`fieldset.${'turn'} input[type="checkbox"]:checked`);
    const turn = Array.from(fields).map(checkbox => checkbox.value);
    
	const BLUE = 0;
	const RED = 1;
	const GREEN = 2;
	var colour = -1;
	
	if(turn.length==2){
		colour = GREEN;
	}
	else if(turn[0]=="your_turn"){
		colour = BLUE;
	}
	else if(turn[0]=="opponent_turn"){
		colour = RED;
	}
	else{
		colour = 0;
	}
	
	var phaseURL=[];
	// needs case for "any phase" as well as images for any, command, and charge phases
	if(phase.length ==0){
		alert("No phase selected");
		return;
	}
	else if(phase.length == 2){
		frameURL = frame_urls[1][colour];
		switch(phase[0]){
			case "command": phaseURL.push(phase_urls[0][colour]);break;
			case "movement": phaseURL.push(phase_urls[1][colour]);break;
			case "shooting": phaseURL.push(phase_urls[2][colour]);break;
			case "charge": phaseURL.push(phase_urls[3][colour]);break;
			case "fight": phaseURL.push(phase_urls[4][colour]);break;
		}
		switch(phase[1]){
			case "command": phaseURL.push(phase_urls[0][colour]);break;
			case "movement": phaseURL.push(phase_urls[1][colour]);break;
			case "shooting": phaseURL.push(phase_urls[2][colour]);break;
			case "charge": phaseURL.push(phase_urls[3][colour]);break;
			case "fight": phaseURL.push(phase_urls[4][colour]);break;
		}
	}
	else if(phase.length ==5){
		frameURL = frame_urls[0][colour];
		phaseURL.push(phase_urls[5][colour])
	}
	else{
		frameURL = frame_urls[0][colour];
		switch(phase[0]){
			case "command": phaseURL.push(phase_urls[0][colour]);break;
			case "movement": phaseURL.push(phase_urls[1][colour]);break;
			case "shooting": phaseURL.push(phase_urls[2][colour]);break;
			case "charge": phaseURL.push(phase_urls[3][colour]);break;
			case "fight": phaseURL.push(phase_urls[4][colour]);break;
		}
	}
	// frame 2's need to be shrunk 3.5*,13*,70,55
	
	if(cp==1){
		cpURL=cp_urls[0][colour];
	}
	else{
		cpURL=cp_urls[1][colour];
	}
	
	const input = {
		TITLE:title,
		TYPE:type,
		WHEN:when,
		TARGET:target,
		EFFECT:effect,
		RESTRICTIONS:restrictions,
		FRAME:frameURL,
		CP:cpURL,
		PHASE1:phaseURL[0],
		PHASE2:phaseURL[1],
		COLOUR:colour_codes[colour]
	};
	
	if(phase.length ==2){
		if(restrictions == ""){
			var source = document.getElementById("strategem_template_2_reduced").innerHTML;
		}
		else{
			var source = document.getElementById("strategem_template_2").innerHTML;
		}
	}
	else{
		if(restrictions == ""){
			var source = document.getElementById("strategem_template_1_reduced").innerHTML;
		}
		else{
			var source = document.getElementById("strategem_template_1").innerHTML;
		}
	}

	// Compile the template
	var template = Handlebars.compile(source);

	var html = template(input);
	const tempDiv = document.createElement('div');
	tempDiv.innerHTML = html;

	// Append the new strategem to the strategem list
	document.getElementById("strategem_list").appendChild(tempDiv.firstElementChild);
}

const back_splats= ["back-splat1.png","back-splat2.png","back-splat3.png","back-splat4.png","back-splat5.png"];

function randomBackSplat(){
	document.getElementById("back-splat").src=back_splats[Math.floor(Math.random() * back_splats.length)];
}

randomBackSplat();

function printReady(){
	document.getElementById("inputForm").style.display="None";
	document.getElementById("container").style.gridTemplateColumns="1fr";
}