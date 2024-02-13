var DEFAULTVALUES = {
    position: "top-right",
    autoClose: 5,
    manuallyClose: true,
    append: "before",
    textColor: "#000",
    backgroundColor: "#fff",
    progressColor: "linear-gradient(90deg, rgba(255,0,0,1) 20%, rgba(250,146,0,1) 40%, rgba(250,192,0,1) 60%, rgba(250,230,0,1) 80%, rgba(236,250,0,1) 100%)",
    progressBar: false,
    border: true,
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/></svg>'
}

export default class DLToaster{

    #toaster
    #intervall
    #append
    #progressIntervall
    #container

    constructor(options){
        this.#toaster = document.createElement("div");
        this.#toaster.classList.add("dl-toast");
        
        var infoContainer = document.createElement("div");
        infoContainer.classList.add("dl-toast-info-container");
        infoContainer.style.color = options.textColor || DEFAULTVALUES.textColor;
        infoContainer.style.backgroundColor = options.backgroundColor || DEFAULTVALUES.backgroundColor;
        
        var icon = document.createElement("div");
        icon.classList.add("dl-toast-icon");
        icon.innerHTML = options.icon || DEFAULTVALUES.icon;
        
        var textContainer = document.createElement("div");
        textContainer.classList.add("dl-toast-text-container");
        var mainText = document.createElement("div");
        mainText.classList.add("dl-toast-text-main");
        var detailText = document.createElement("div");
        detailText.classList.add("dl-toast-text-detail");
        textContainer.appendChild(mainText);
        textContainer.appendChild(detailText);

        var dissmis = document.createElement("div");
        dissmis.classList.add("dl-toast-dismiss");
        dissmis.innerHTML = "&times;";

        infoContainer.appendChild(icon);
        infoContainer.appendChild(textContainer);
        infoContainer.appendChild(dissmis);

        var progressContainer = document.createElement("div");
        progressContainer.classList.add("dl-toast-progress-bar-container");
        var progressBar = document.createElement("div");
        progressBar.classList.add("dl-toast-progress-bar");
        progressBar.style.background = options.progressColor || DEFAULTVALUES.progressColor;
        progressContainer.appendChild(progressBar);

        this.#toaster.appendChild(infoContainer);
        if(options.progressBar === true){
            this.#toaster.appendChild(progressContainer);
        }

        if(options.border === false){
            this.#toaster.style.border = "none"
        }

        this.#append = options.append || DEFAULTVALUES.append;
        Object.entries({...DEFAULTVALUES, ...options}).forEach(([key,value]) =>{            
            this[key] = value
        });
    }

    set mainText(value){
        this.#toaster.querySelector(".dl-toast-text-main").textContent = value;
    }

    set detailText(value){
        this.#toaster.querySelector(".dl-toast-text-detail").textContent = value;
    }

    // set autoClose(value){
    //     if(value === false){return}
    //     var setDate = new Date();
    //     this.#progressIntervall = setInterval(()=>{
    //         var x = (100-(((((setDate - new Date() ) / 1000) * (-1)) / value )*100)).toString();
    //         this.#toaster.querySelector(".dl-toast-progress-bar").style.width = x + "%";
    //     },10)
    //     this.#intervall = setTimeout(()=>{
    //         this.remove();
    //     },value*1000)
    // }

    set manuallyClose(value){
        if(value === false){
            this.#toaster.querySelector(".dl-toast-dismiss").remove();
            return
        }

        var c = this;
        this.#toaster.addEventListener("click",function(){
            clearTimeout(c.#intervall);
            c.remove();
        })
    }

    show(value){
        var autoClose;
        if(Object.keys(value).includes("autoClose")){
            autoClose = value.autoClose;
        }else{
            autoClose = this.autoClose;
        }

        this.#toaster.querySelector(".dl-toast-progress-bar").style.width = "100%";

        if(autoClose != false){
            var setDate = new Date();
            this.#progressIntervall = setInterval(()=>{
                var x = (100-(((((setDate - new Date() ) / 1000) * (-1)) / autoClose )*100)).toString();
                this.#toaster.querySelector(".dl-toast-progress-bar").style.width = x + "%";
            },10)
            this.#intervall = setTimeout(()=>{
                this.remove();
            },autoClose*1000)
        }


        if(value){
            value.mainText ? this.#toaster.querySelector(".dl-toast-text-main").innerHTML = value.mainText : null;
            value.detailText ? this.#toaster.querySelector(".dl-toast-text-detail").innerHTML = value.detailText : null;
        }
        
        var position = value ?  value.position : this.position;

        var selector = `.dl-toast-container[data-position=${position}]`;
        this.#container = document.querySelector(selector) || createContainer(position);       
        
        if(this.#append == "before"){
            this.#container.insertBefore(this.#toaster, this.#container.firstChild);
        }else{
            this.#container.append(this.#toaster);
        }

        const event = new CustomEvent("dlToast:show",{detail: this.#toaster});
        document.dispatchEvent(event);
    }

    remove(){
        const container = this.#toaster.parentElement;
        this.#toaster.classList.add("closeing"); 
        const event = new CustomEvent("dlToast:closeing",{detail: this.#toaster});
        document.dispatchEvent(event);
        setTimeout(()=>{
            this.#toaster.remove(); //remove from dom
            this.#toaster.classList.remove("closeing"); 
            clearInterval(this.#progressIntervall);
            
            const event = new CustomEvent("dlToast:close",{detail: this.#toaster});
            document.dispatchEvent(event);

            
            if(container != null && !container.hasChildNodes()){
                container.remove();
            }
        },500)
    }
}

function createContainer(position){
    const container = document.createElement("div");
    container.classList.add("dl-toast-container");
    container.dataset.position = position;
    document.body.append(container);
    return container;
}