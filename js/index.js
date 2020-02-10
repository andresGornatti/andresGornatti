
window.addEventListener("load",()=>{

// -------- INTERACTIVIDAD -------- //

	// -- Buttons Interactions -- //
	// Projects
	let projectInfoOpen = document.querySelectorAll("#projects .proyecto .to-detailed-info");
	let projectInfoClose = document.querySelectorAll("#projects .proyecto .close-detailed-info");
	let projectsInfo = document.querySelectorAll("#projects .proyecto .detailed-info");
	let proyectoImg = document.querySelectorAll("#projects .proyecto .img");
	function openProjectInfo(project){
		projectsInfo[project].style.animation="slideInUp .4s";
		projectsInfo[project].style.display="block";
	};
	function closeProjectInfo(project){
		projectsInfo[project].style.animation="slideOutDown .25s";
		setTimeout(()=>{projectsInfo[project].style.display="none";},125);
	};
	projectInfoOpen.forEach((val,i)=> val.addEventListener("click", ()=>openProjectInfo(i)));
	proyectoImg.forEach((val,i)=> val.addEventListener("click", ()=>openProjectInfo(i)));
	projectInfoClose.forEach((val,i)=> val.addEventListener("click", ()=>closeProjectInfo(i)));
	let logo = document.querySelector("#name-logo span");
	logo.addEventListener("click",()=>window.scrollTo(0,0));
	// Home
	let buttonHome = document.querySelector("#home div .button-home"), scrollTop = document.getElementById("scroll-top");
	scrollTop.addEventListener("click",()=>window.scrollTo(0,0));
	buttonHome.addEventListener("click",()=>window.scrollTo(0,(window.innerHeight+document.querySelector("header").offsetHeight)));
	// Nav
	let navLinks = document.querySelectorAll("header nav a");
	let section = document.querySelectorAll("body > section")
	let sectionY=[];
	section.forEach((val,i)=>sectionY[i]=val.getBoundingClientRect().top);
	function goTo(seccion){
		window.scrollTo(0,sectionY[seccion]);
		//Array.from(section)[seccion].scrollIntoView();
	}
	navLinks.forEach((val,i)=>val.addEventListener("click",()=>goTo(i)))	
	// Header
	let menuButton = document.querySelector("#to-menu"), headerNav = document.querySelector("header nav");	
	menuButton.addEventListener("click", ()=>{
		if(menuButton.classList.contains("show")){
		headerNav.style.animation="slideOutUp .1s"
		setTimeout(()=>{headerNav.classList.remove("show");},20);
		} else if(!menuButton.classList.contains("show")){
		setTimeout(()=>{headerNav.classList.add("show");},20);
		headerNav.style.animation="slideInDown .1s";
		} 
		menuButton.classList.toggle("show");
	});

		    // --- NAV LINK SELECTED --- //
			function selectedLink(link) {
				navLinks.forEach((val,i)=> val.classList.contains("selected") ? val.classList.remove("selected") : false);
				link.classList.add("selected");
			}
		    // Resaltar al Clickear
			navLinks.forEach((val,i)=>val.addEventListener("click",()=>selectedLink(val)));

			// Resaltar al Scrollear
			let scrollY = window.pageYOffset;
			if(scrollY>0){
				sectionY.forEach((val,i)=>sectionY[i]=val+scrollY);
			}
			window.addEventListener("scroll",()=>{
				scrollY = window.pageYOffset;
				switch(true){
					case (scrollY>=sectionY[1] && scrollY<sectionY[2]): selectedLink(navLinks[1]);
					break;
																		// Ajuste ya que #CONTACT no ocupa toda la pana
					case (scrollY>=sectionY[2] && scrollY<(sectionY[3])-(.2*window.innerHeight)): selectedLink(navLinks[2]);
					break;
					case (scrollY>=sectionY[3] || scrollY>(sectionY[3]-document.querySelector("body .separador").offsetHeight)): selectedLink(navLinks[3]);
					break;
					case (scrollY<(sectionY[1]-(.5*window.innerHeight))): selectedLink(navLinks[0]);
					default:;
					break;
				}
			})
// -------- ANIMACIONES -------- //

	// little Home Anmiation
		setTimeout(()=>{
		document.querySelector("#home h1").style.animation="zoomIn 1.2s";
		document.querySelector("#home h1").style.opacity="1";
		document.querySelector("#home h3").style.animation="fadeIn 2.25s";
		document.querySelector("#home h3").style.opacity="1";
		document.querySelector("#home .button-home").style.opacity="1";
		},275)

	// ----- CONTENT ANIMATIONS ----- //
	let title, underline, content, contentClass;
	function showSection(section){
		title = document.querySelector(`#${section} h2`);
		title.style.opacity=1;
		content = document.querySelector(`#${section} .title + div`);
		content.style.opacity=1;
		title.style.animation="slideInLeft .8s";
		title.classList.add("animate");
			// Chequear si ya hubo animación del contenido
			if (content.style.getPropertyValue("animation")===""){
				contentClass = content.className;
				switch (true){
					case (contentClass.includes("sobre-mi")): content.style.animation="fadeIn 1.4s";
					break;
					case (contentClass.includes("proyectos")): content.style.animation="fadeInUp 1s";
					break;
					case (contentClass.includes("form")): setTimeout(()=>content.style.animation="heartBeat 1s",600);
					break;
					default: ;
					break;
				}			
			}
	}
	function sectionAnimation(){
		scrollY = window.pageYOffset;
			// Chequeando si el scroll llega a ver a las secciones.
			// La animación comienza un poco antes de llegar a ella (por eso la resta del 87% de la altura del window).
			switch(true){
				case (
					// Para scroll Down
					(scrollY>=sectionY[1]-(.87*window.innerHeight)) && (scrollY<sectionY[2]-(window.innerHeight*.5))
					// Para scroll Up
					|| (scrollY>(sectionY[1]+section[1].offsetHeight) && scrollY<(sectionY[2]+(section[2].offsetHeight*.5)) )
					   // 				 || (scrollY>(sectionY[1]+section[1].offsetHeight) && scrollY<(sectionY[2]+section[2].offsetHeight))
					): showSection("about");
				break;
				case (
					( scrollY>=sectionY[2]-(.87*window.innerHeight)) && (scrollY<sectionY[3]-(window.innerHeight*.5) )
					|| ( scrollY>(sectionY[2]+section[2].offsetHeight) && scrollY<(sectionY[3]+(section[3].offsetHeight*.5)) )
					  //				|| (scrollY>(sectionY[2]+section[2].offsetHeight) && scrollY<sectionY[3]+section[3].offsetHeight))
					): showSection("projects");
				break;
				case (
					(scrollY>=sectionY[3]-(.87*window.innerHeight)) || scrollY>(sectionY[3]-document.querySelector("body #contact .separador").offsetHeight)
					// || (scrollY>sectionY[3]&&scrollY<sectionY[4])
					): showSection("contact");
				break;
				default:;
				break;
			}	
	}
	window.addEventListener("scroll",sectionAnimation);
	window.addEventListener("load",sectionAnimation);	 


// -------- #PROJECTS -------- //

	// -- Iconos sección Tools de cada Proyecto -- //

		function addTool(tools,proyecto){
			let toolsDiv = document.querySelector(`#projects .proyecto:nth-child(${proyecto}) .tools`);
				let toolName = tools;
				let tool = document.createElement("div");
				tool.setAttribute("class","tool");
			if (typeof toolName === "string"){
				let img = new Image();
				if(tools==="ajax"){ img.src=`img/tools/${toolName}.jpg`;} else {	img.src=`img/tools/${toolName}.png`; }
				img.setAttribute("title",toolName); 
				tool.appendChild(img);
				toolsDiv.appendChild(tool);
			} else {
				toolName.forEach((val,i)=>{
				tool = document.createElement("div");
				tool.setAttribute("class","tool");
				if(tools[i]==="ajax"){
				let img = new Image();	
				img.src=`img/tools/${toolName[i]}.jpg`;
				img.setAttribute("title",toolName[i]);
				tool.appendChild(img);
				toolsDiv.appendChild(tool); 
				} else {
				tool.style.color="red";
				let img = new Image();
				img.src=`img/tools/${toolName[i]}.png`;
				img.setAttribute("title",toolName[i]);
				tool.appendChild(img);
				toolsDiv.appendChild(tool);
				};	
				});
			}
		}

		addTool(["html","css","js","jquery","ajax","php","mysql"],1);	// PuraMistura
		addTool("js",2);												// TheGameColor
		addTool(["jquery","css","html"],3);								// Maqueta1
		addTool("js",4);												// SleepTime
		addTool(["js","css","html"],5);									// Layouts
		addTool(["css","jquery"],6);									// Maqueta2
		addTool(["html","css","js","jquery"],7);						// CV2016
		addTool("bootstrap",8);											// MaquetaB1
		addTool("bootstrap",9);											// MaquetaB2


		// -- Movimiento de Imagen de Proyecto -- //
		function moveImg(val,i,action){
			let img = document.querySelector(`#projects .proyecto:nth-child(${i+1}) .img img`);
				img.style.zIndex="1";
			if(img.classList.contains("large")){
				if(action==="over"){
				img.style.animation="MoveUpDown 8s linear infinite alternate";
				} else if(action==="out"){
				img.style.animation="none";	
				}
			}
		}
		proyectoImg.forEach((val,i)=>{val.addEventListener("mouseover",()=>{moveImg(val,i,"over")});});
		proyectoImg.forEach((val,i)=>{val.addEventListener("mouseout",()=>{moveImg(val,i,"out")});});


});