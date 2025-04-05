var Imported = Imported || {};
Imported.UCHU_MobileOperation_Modified_Ext = "1.2";

var UCHU_MobileOperation_Modified_Ext = {};

var EliUCHU = EliUCHU || {};

(function() {
    "use strict";
    
    //-----------------------------------------------------------------------------
    // Setup
    
var PRM = PRM || {};

PRM.url=[];
PRM.visible=[];
PRM.size=[];
PRM.pos=[];
PRM.spot=[];

PRM.pcBtn = false;
PRM.pcExt = true;
PRM.url[0] = "./img/VirtualButtons/Dpad.png";
PRM.url[1] = "./img/VirtualButtons/ZButton.png";
PRM.url[2] = "./img/VirtualButtons/Back.png"; // Eliaquim
PRM.url[3] = "./img/VirtualButtons/HideButton.png"; // Eliaquim
PRM.url[4] = "./img/VirtualButtons/ShiftButton.png"; // Eliaquim
PRM.url[5] = "./img/VirtualButtons/.png"; // Eliaquim
PRM.url[6] = "./img/VirtualButtons/.png"; // Eliaquim
PRM.url[7] = "./img/VirtualButtons/.png"; // Eliaquim
PRM.blinkButton = false; // Eliaquim
PRM.blinkButtonOpacity = 1;
PRM.opacity = 0.7;
PRM.vZoom = 0.9;
PRM.tabZoom = 0.8;
PRM.tabvZoom = 0.9;
PRM.hideBtn = false;
PRM.visible[0] = true;
PRM.size[0] = 128;
PRM.pos[0] = [20, 20];
PRM.spot[0] = ["left", "bottom"];
PRM.pad_scale = 1;
PRM.pad_dia = Math.max(0,Math.min(1,(1-0.3)));
PRM.visible[1] = true;
PRM.size[1] = 55;
PRM.pos[1] = [70, 20];
PRM.spot[1] = ["right", "bottom"];
PRM.visible[2] = true;
PRM.cancelasMenu =  false;
PRM.size[2] = 55;
PRM.pos[2] = [5, 40];
PRM.spot[2] = ["right", "bottom"];
PRM.visible[3] = true; // Eliaquim
PRM.size[3] = 55; // Eliaquim
PRM.pos[3] = [0, 0]; // Eliaquim
PRM.spot[3] = ["right", "top"]; // Eliaquim
PRM.visible[4] = true; // Eliaquim
PRM.size[4] = 55; // Eliaquim
PRM.pos[4] = [10, 150]; // Eliaquim
PRM.spot[4] = ["right", "bottom"]; // Eliaquim
PRM.visible[5] = false; // Eliaquim
PRM.size[5] = 55; // Eliaquim
PRM.pos[5] = [70, 90]; // Eliaquim
PRM.spot[5] = ["right", "bottom"]; // Eliaquim
PRM.visible[6] = false; // Eliaquim
PRM.size[6] = 55; // Eliaquim
PRM.pos[6] = [5, 110]; // Eliaquim
PRM.spot[6] = ["right", "bottom"] // Eliaquim
PRM.visible[7] = false; // Eliaquim
PRM.size[7] = 55; // Eliaquim
PRM.pos[7] = [0, 0]; // Eliaquim
PRM.spot[7] = ["left", "top"]; // Eliaquim
PRM.flickpage = true;
PRM.holdaction = true;
PRM.outcansel = false;
PRM.outaction = false;
PRM.sensitivity = 1.8;
//改変者による機能追加
PRM.hideBtnSwitch = 0;
PRM.hideBtnSwitchValue = false;

if(PRM.cancelasMenu) {
var cancelmode = "escape";
var cancelmode2 = "escapeBtn"
}else{
var cancelmode = "cancel";
var cancelmode2 = "cancelBtn"
};
var btn_id=["DirPad","ok",cancelmode,"menu","shift","pageup","pagedown","extra"];
var current_zoom=1;   
var st_x = 0;
var st_y = 0;
var pad_range=PRM.size[0]*PRM.pad_scale;
var pad_size=pad_range*current_zoom/2;
var Btn_ready=false;
var Btn_hide=false;
var PressBtn=false;
var dirx=0;
var diry=0;
var touchx=0;
var touchy=0;
var autofire=false;
var hvzoom=[1, PRM.vZoom];
var DirPadOp=false; // Eliaquim
var okOp=false; // Eliaquim
var cancelOp=false; // Eliaquim
var menuOp=false; // Eliaquim
var shiftOp=false; // Eliaquim
var pageupOP=false; // Eliaquim
var pagedownOP=false; // Eliaquim
var extraOp=false; // Eliaquim
var ua = (function(u){
    return {
    Tablet:(u.indexOf("windows") != -1 && u.indexOf("touch") != -1) || u.indexOf("ipad") != -1 || (u.indexOf("android") != -1 && u.indexOf("mobile") == -1) || (u.indexOf("firefox") != -1 && u.indexOf("tablet") != -1) || u.indexOf("kindle") != -1 || u.indexOf("silk") != -1 || u.indexOf("playbook") != -1
    };
})(window.navigator.userAgent.toLowerCase());

if(ua.Tablet){
    hvzoom=[PRM.tabZoom, PRM.tabvZoom];
}
if (!Utils.isMobileDevice() && !PRM.pcBtn) {PRM.visible[0]=PRM.visible[1]=PRM.visible[2]=PRM.visible[3]=PRM.visible[4]=PRM.visible[5]=PRM.visible[6]=PRM.visible[7]=false;} //add

//-----------------------------------------------------------------------------
// Locate_DirPad

function Locate_DirPad() {
    this.initialize.apply(this, arguments);
}


Locate_DirPad.prototype.initialize = function() {
    var img = new Image();
    var url = PRM.url[0];
    img.onerror = function() {Graphics.printError('DirPad Image was Not Found:',url);};
    img.src = url;
    img = null;
    this.Div = document.createElement("div");
    this.Div.id = 'Dirpad';
    this.Div.style.position = 'fixed';
    this.Div.style[PRM.spot[0][0].replace(/\s+/g, "")] = String(PRM.pos[0][0]-(pad_range-PRM.size[0])/2)+'px';
    this.Div.style[PRM.spot[0][1].replace(/\s+/g, "")] = String(PRM.pos[0][1]-(pad_range-PRM.size[0])/2)+'px';
    this.Div.style.width = pad_range+'px';
    this.Div.style.height = pad_range+'px';
    this.Div.style.opacity = PRM.opacity;
    this.Div.style.zIndex = '11';
    this.Div.style.userSelect="none";
    this.Div.style["-webkit-tap-highlight-color"]="rgba(0,0,0,0)";
    this.Div.style.background = 'url('+PRM.url[0]+') 50% 50% / '+String(Math.round(PRM.size[0]/pad_range*100))+'% no-repeat';
    
    if(!Utils.isMobileDevice() && PRM.pcBtn){
        this.Div.addEventListener('mousedown', function(e) {
            if (!SceneManager.isSceneChanging()){dirope(e.layerX,e.layerY,true);PressBtn=true;}
        }, false);
        this.Div.addEventListener('mousemove', function(e) {
            if(PressBtn && !SceneManager.isSceneChanging()){dirope(e.layerX,e.layerY,false);}
        }, false);
        this.Div.addEventListener('mouseup', function() {
            disope();PressBtn=false;
        }, false);
        this.Div.addEventListener('mouseout', function() {
            disope();PressBtn=false;
        }, false);
    }
    this.Div.addEventListener('touchstart', function(e) {
        PressBtn=true;
        if (!SceneManager.isSceneChanging()){
            dirope(e.touches[0].clientX-dirx, e.touches[0].clientY-diry,true)};
    }, false);
    this.Div.addEventListener('touchmove', function(e) {
        if (!SceneManager.isSceneChanging()){
            dirope(e.touches[0].clientX-dirx, e.touches[0].clientY-diry,false)};
        PressBtn=true;
    }, false);
    this.Div.addEventListener('touchend', function() {
        disope();PressBtn=false;
    }, false);
        document.body.appendChild(this.Div);
};

function dirope(xx,yy,st) {
    touchx=(xx-pad_size)/pad_size;
    touchy=(yy-pad_size)/pad_size;
    if(st && Math.sqrt(touchx*touchx+touchy*touchy)>1){
        disope();
    }else{
        //Blink the button!
        if(PRM.blinkButton && Btn_hide === false && DirPadOp === false) {
            document.getElementById("Dirpad").style.opacity = PRM.blinkButtonOpacity;
        }
        if(touchx>Math.abs(touchy)*PRM.pad_dia){
            Input._currentState['right']=true;
            Input._currentState['left']=false;
        } else if(touchx<-Math.abs(touchy)*PRM.pad_dia){
            Input._currentState['left']=true;
            Input._currentState['right']=false;
        } else {
            Input._currentState['left']=false;
            Input._currentState['right']=false;
        }
        if(touchy>Math.abs(touchx)*PRM.pad_dia){
            Input._currentState['down']=true;
            Input._currentState['up']=false;}
        else if(touchy<-Math.abs(touchx)*PRM.pad_dia){
            Input._currentState['up']=true;
            Input._currentState['down']=false;
            } else {
            Input._currentState['up']=false;
            Input._currentState['down']=false;
            }
    }
};

function disope() {
    touchx=0; touchy=0;
    Input._currentState['up']=false;
    Input._currentState['down']=false;
    Input._currentState['left']=false;
    Input._currentState['right']=false;
    //blink dpad
    if(PRM.blinkButton && Btn_hide === false && DirPadOp === false) {
        document.getElementById("Dirpad").style.opacity = PRM.opacity;
    }
};

EliUCHU.Scene_Base_update = Scene_Base.prototype.update;
    Scene_Base.prototype.update = function() {
        EliUCHU.Scene_Base_update.call(this);
    if(PRM.blinkButton && Btn_hide === false) {
        // OK BUTTON
        if(PRM.visible[1] && !okOp) {
            if(Input._currentState['ok'] == true) {
                document.getElementById("okBtn").style.opacity = PRM.blinkButtonOpacity;
            }else{
                document.getElementById("okBtn").style.opacity = PRM.opacity;
            }
        }
            // CANCEL BUTTON
        if(PRM.visible[2] && !cancelOp) {
            if(Input._currentState[cancelmode] == true) {
                document.getElementById(cancelmode2).style.opacity = PRM.blinkButtonOpacity;
            }else{
                document.getElementById(cancelmode2).style.opacity = PRM.opacity;
            }
        }
            // MENU BUTTON
        if(PRM.visible[3] && !menuOp) {
            if(Input._currentState['menu'] == true) {
                document.getElementById("menuBtn").style.opacity = PRM.blinkButtonOpacity;
            }else{
                document.getElementById("menuBtn").style.opacity = PRM.opacity;
            }
        }
            // SHIFT BUTTON
        if(PRM.visible[4] && !shiftOp) {
            if(Input._currentState['shift'] == true ) {
                document.getElementById("shiftBtn").style.opacity = PRM.blinkButtonOpacity;
            }else{
                document.getElementById("shiftBtn").style.opacity = PRM.opacity;
            }
        }
            // PAGE UP BUTTON
        if(PRM.visible[5] && !pageupOP) {
            if(Input._currentState['pageup'] == true) {
                document.getElementById("pageupBtn").style.opacity = PRM.blinkButtonOpacity;
            }else{
                document.getElementById("pageupBtn").style.opacity = PRM.opacity;
            }
        }
            // PAGEDOWN BUTTON
        if(PRM.visible[6] && !pagedownOP) {
            if(Input._currentState['pagedown'] == true) {
                document.getElementById("pagedownBtn").style.opacity = PRM.blinkButtonOpacity;
            }else{
                document.getElementById("pagedownBtn").style.opacity = PRM.opacity;
            }
        }
            // Extra Button
        if(PRM.visible[7] && !extraOp) {
            if(Input._currentState['extra'] == true) {
                document.getElementById("extraBtn").style.opacity = PRM.blinkButtonOpacity;
            }else{
                document.getElementById("extraBtn").style.opacity = PRM.opacity;
            }
        }
    }
};

//-----------------------------------------------------------------------------
// Locate_Button

function Locate_Button() {
    this.initialize.apply(this, arguments);
}
Locate_Button.prototype.initialize = function(type) {
    var img = new Image();
    var url = PRM.url[type];
    img.onerror = function() {Graphics.printError('Button Image was Not Found:',url);};
    img.src = url;
    img = null;
    this.Div = document.createElement("div");
    this.Div.id = btn_id[type]+'Btn';
    this.Div.style.position = 'fixed';
    this.Div.style[PRM.spot[type][0].replace(/\s+/g, "")] = PRM.pos[type][0]+'px';
    this.Div.style[PRM.spot[type][1].replace(/\s+/g, "")] = PRM.pos[type][1]+'px';
    this.Div.style.width = PRM.size[type]+'px';
    this.Div.style.height = PRM.size[type]+'px';
    this.Div.style.opacity = PRM.opacity;
    this.Div.style.zIndex = '11';
    this.Div.style.userSelect="none";
    this.Div.style.background = 'url('+PRM.url[type]+') 0 0 / cover no-repeat';
    
    if(!Utils.isMobileDevice() && PRM.pcBtn){
        this.Div.addEventListener('mousedown', function() {
            Input._currentState[btn_id[type]] = true;
            PressBtn=true;
        }, false);
        this.Div.addEventListener('mouseover', function() {
            if(TouchInput.isPressed()){
                Input._currentState[btn_id[type]] = true;
                PressBtn=true;
                return false;}
        }, false);
        this.Div.addEventListener('mouseup', function() {
            Input._currentState[btn_id[type]] = false;
            PressBtn=false;
        }, false);
        this.Div.addEventListener('mouseout', function() {
            Input._currentState[btn_id[type]] = false;
            PressBtn=false;
        }, false);
    }
    
    this.Div.addEventListener('touchstart', function() {
        if (!SceneManager.isSceneChanging()){
            Input._currentState[btn_id[type]] = true;
            PressBtn=true;
        }
    }, false);
    this.Div.addEventListener('touchend', function() {
        Input._currentState[btn_id[type]] = false;
        PressBtn=false;
    }, false);
    
    document.body.appendChild(this.Div);
};

//-----------------------------------------------------------------------------
// Replace function
        
var Scene_Base_start = Scene_Base.prototype.start;
Scene_Base.prototype.start = function() {
        Scene_Base_start.call(this);
    if (Utils.isMobileDevice() || PRM.pcBtn) {
        if(!Btn_ready){
            Btn_ready=true;
            if(PRM.visible[0]){this.DirPad = new Locate_DirPad();}
            if(PRM.visible[1]){this.okButton = new Locate_Button(1);}
            if(PRM.visible[2]){this.canselButton = new Locate_Button(2);}
            if(PRM.visible[3]){this.mennuButton = new Locate_Button(3);} // Eliaquim
            if(PRM.visible[4]){this.shiftiButton = new Locate_Button(4);} // Eliaquim
            if(PRM.visible[5]){this.pgupButton = new Locate_Button(5);} // Eliaquim
            if(PRM.visible[6]){this.pgdwiButton = new Locate_Button(6);} // Eliaquim
            if(PRM.visible[7]){this.extriButton = new Locate_Button(7);} // Eliaquim
            Graphics._updateRealScale();
            document.documentElement.style["-webkit-user-select"]="none";
            document.addEventListener("touchmove", function(evt) {evt.preventDefault();}, {passive: false});
        }
    }
};
    // Added other buttons (Eliaquim)
    if(PRM.visible[0] || PRM.visible[1] || PRM.visible[2] || PRM.visible[3] || PRM.visible[4] || PRM.visible[5] || PRM.visible[6] || PRM.visible[7]){
        var Game_Temp_setDestination = Game_Temp.prototype.setDestination;
        Game_Temp.prototype.setDestination = function(x, y) {
            Game_Temp_setDestination.apply(this, arguments);
            if(PressBtn){
                this._destinationX = null;
                this._destinationY = null;
            }
        };
        
        var Graphics_updateRealScale = Graphics._updateRealScale;
        Graphics._updateRealScale = function() {
            Graphics_updateRealScale.call(this);
            if (this._stretchEnabled) {
                if(document.getElementById("Dirpad")){
                if(window.innerWidth<window.innerHeight){current_zoom=hvzoom[1];}else{current_zoom=hvzoom[0];}
                pad_size=pad_range*current_zoom/2;
                if(PRM.visible[0]){
                        document.getElementById("Dirpad").style.zoom=current_zoom;
                        dirx=document.getElementById("Dirpad").offsetLeft*current_zoom;
                        diry=document.getElementById("Dirpad").offsetTop*current_zoom;
                }// Added other buttons (Eliaquim)
                if(PRM.visible[1]){document.getElementById("okBtn").style.zoom=current_zoom;}
                if(PRM.visible[2]){document.getElementById(cancelmode2).style.zoom=current_zoom;}
                if(PRM.visible[3]){document.getElementById("menuBtn").style.zoom=current_zoom;} // Eliaquim
                if(PRM.visible[4]){document.getElementById("shiftBtn").style.zoom=current_zoom;} // Eliaquim
                if(PRM.visible[5]){document.getElementById("pageupBtn").style.zoom=current_zoom;} // Eliaquim
                if(PRM.visible[6]){document.getElementById("pagedownBtn").style.zoom=current_zoom;} // Eliaquim
                if(PRM.visible[7]){document.getElementById("extraBtn").style.zoom=current_zoom;} // Eliaquim
                }
            }
        };
}

//-----------------------------------------------------------------------------
// Option
    // UCHU_MobileOperation_Modified_Extからの改変が多い箇所
    
    //UCHU_MobileOperation_Modified_Extの同名メソッドとほぼ同じ
    Scene_Base.prototype.hideUserInterface = function() {
        if (Utils.isMobileDevice() || PRM.pcBtn) {
            Btn_hide = true;
            //元々のUCHU_MobileOperation_Modified_Extの処理 - // Added other buttons (Eliaquim)
            if(PRM.visible[0]){document.getElementById("Dirpad").style.zIndex = '0';}
            if(PRM.visible[1]){document.getElementById("okBtn").style.zIndex = '0';}
            if(PRM.visible[2]){document.getElementById(cancelmode2).style.zIndex = '0';}
            if(PRM.visible[3]){document.getElementById("menuBtn").style.zIndex = '0';} // Eliaquim
            if(PRM.visible[4]){document.getElementById("shiftBtn").style.zIndex = '0';} // Eliaquim
            if(PRM.visible[5]){document.getElementById("pageupBtn").style.zIndex = '0';} // Eliaquim
            if(PRM.visible[6]){document.getElementById("pagedownBtn").style.zIndex = '0';} // Eliaquim
            if(PRM.visible[7]){document.getElementById("extraBtn").style.zIndex = '0';} // Eliaquim
            if(PRM.hideBtnSwitch != 0){
                //透明度をゼロにする処理 - // Added other buttons (Eliaquim)
                if(PRM.visible[0]){document.getElementById("Dirpad").style.opacity = '0';}
                if(PRM.visible[1]){document.getElementById("okBtn").style.opacity = '0';}
                if(PRM.visible[2]){document.getElementById(cancelmode2).style.opacity = '0';}
                if(PRM.visible[3]){document.getElementById("menuBtn").style.opacity = '0';} // Eliaquim
                if(PRM.visible[4]){document.getElementById("shiftBtn").style.opacity = '0';} // Eliaquim
                if(PRM.visible[5]){document.getElementById("pageupBtn").style.opacity = '0';} // Eliaquim
                if(PRM.visible[6]){document.getElementById("pagedownBtn").style.opacity = '0';} // Eliaquim
                if(PRM.visible[7]){document.getElementById("extraBtn").style.opacity = '0';} // Eliaquim
            }
        }
    };
    
    //UCHU_MobileOperation_Modified_Extの同名メソッドとほぼ同じ
    Scene_Base.prototype.showUserInterface = function() {
        if (Utils.isMobileDevice() || PRM.pcBtn) {
            Btn_hide = false;
            //元々のUCHU_MobileOperation_Modified_Extの処理 - // Added other buttons (Eliaquim)
            if(PRM.visible[0]){document.getElementById("Dirpad").style.zIndex = '11';}
            if(PRM.visible[1]){document.getElementById("okBtn").style.zIndex = '11';}
            if(PRM.visible[2]){document.getElementById(cancelmode2).style.zIndex = '11';}
            if(PRM.visible[3]){document.getElementById("menuBtn").style.zIndex = '11';} // Eliaquim
            if(PRM.visible[4]){document.getElementById("shiftBtn").style.zIndex = '11';} // Eliaquim
            if(PRM.visible[5]){document.getElementById("pageupBtn").style.zIndex = '11';} // Eliaquim
            if(PRM.visible[6]){document.getElementById("pagedownBtn").style.zIndex = '11';} // Eliaquim
            if(PRM.visible[7]){document.getElementById("extraBtn").style.zIndex = '11';} // Eliaquim
            if(PRM.hideBtnSwitch != 0){
                //透明度を設定値にする処理 - // Added other buttons (Eliaquim)
                if(PRM.visible[0]){document.getElementById("Dirpad").style.opacity = PRM.opacity;}
                if(PRM.visible[1]){document.getElementById("okBtn").style.opacity = PRM.opacity;}
                if(PRM.visible[2]){document.getElementById(cancelmode2).style.opacity = PRM.opacity;}
                if(PRM.visible[3]){document.getElementById("menuBtn").style.opacity = PRM.opacity;} // Eliaquim
                if(PRM.visible[4]){document.getElementById("shiftBtn").style.opacity = PRM.opacity;} // Eliaquim
                if(PRM.visible[5]){document.getElementById("pageupBtn").style.opacity = PRM.opacity;} // Eliaquim
                if(PRM.visible[6]){document.getElementById("pagedownBtn").style.opacity = PRM.opacity;} // Eliaquim
                if(PRM.visible[7]){document.getElementById("extraBtn").style.opacity = PRM.opacity;} // Eliaquim               
            }
        }
    };

    //updateMainで表示状態をチェックする
    var dice2000_Scene_Map_updatemain = Scene_Map.prototype.updateMain;
    Scene_Map.prototype.updateMain = function() {
        dice2000_Scene_Map_updatemain.apply(this, arguments);
        if(PRM.hideBtnSwitch != 0){
            if($gameSwitches.value(PRM.hideBtnSwitch) != PRM.hideBtnSwitchValue){
                if(!Btn_hide) this.hideUserInterface();
            }else{
                if(Btn_hide) this.showUserInterface();
            }
        }else if(PRM.hideBtn){
            if($gameMessage.hasText() && !$gameMessage.scrollMode() && $gameMessage.positionType() == 2){
                if(!Btn_hide) this.hideUserInterface();
            }else{
                if(Btn_hide) this.showUserInterface();
            }
        }
            
    };

    var dice2000_Scene_Battle_update = Scene_Battle.prototype.update;
    Scene_Battle.prototype.update = function() {
        dice2000_Scene_Battle_update.apply(this, arguments);
        if(PRM.hideBtnSwitch != 0){
            if($gameSwitches.value(PRM.hideBtnSwitch) != PRM.hideBtnSwitchValue){
                if(!Btn_hide) this.hideUserInterface();
            }else{
                if(Btn_hide) this.showUserInterface();
            }
        }else if(PRM.hideBtn){
            if($gameMessage.hasText() && !$gameMessage.scrollMode() && $gameMessage.positionType() == 2){
                if(!Btn_hide) this.hideUserInterface();
            }else{
                if(Btn_hide) this.showUserInterface();
            }
        }
    };

if(Utils.isMobileDevice() || PRM.pcExt){
    if(PRM.holdaction){
        var TouchInput_update = TouchInput.update;
        TouchInput.update = function() {
            TouchInput_update.call(this);
            if (!PressBtn && TouchInput.isLongPressed()) {
                Input._currentState['ok']=true;autofire=true;
            }
            if(!TouchInput.isPressed() && autofire){
                Input._currentState['ok']=false;autofire=false;
            }
        };
    }
    
    if(PRM.flickpage || PRM.outcansel || PRM.outaction){
        TouchInput._endRequest= function(type) {
            Input._currentState[type]=false;
        }
        if(Utils.isMobileDevice()){
            var TouchInput_onTouchStart = TouchInput._onTouchStart;
            TouchInput._onTouchStart = function(event) {
                TouchInput_onTouchStart.apply(this, arguments);
                var touch = event.changedTouches[0];
                if(!PressBtn){
                    st_x = Graphics.pageToCanvasX(touch.pageX);
                    st_y = Graphics.pageToCanvasY(touch.pageY);
                    if(st_x<0 || st_y<0 || st_x>Graphics.boxWidth || st_y>Graphics.boxHeight){
                        // if(PRM.cancelasMenu){
                        //     if(PRM.outcansel){Input._currentState['escape']=true;setTimeout("TouchInput._endRequest('escape');", 100);}
                        // }else {
                            if(PRM.outcansel){Input._currentState[cancelmode]=true;setTimeout("TouchInput._endRequest(cancelmode);", 100);}
                        // }
                        if(PRM.outaction){Input._currentState['ok']=true;setTimeout("TouchInput._endRequest('ok');", 100);}
                    }
                }
            };
        }else{
            var TouchInput_onLeftButtonDown = TouchInput._onLeftButtonDown;
            TouchInput._onLeftButtonDown = function(event) {
                TouchInput_onLeftButtonDown.apply(this, arguments);
                if(!PressBtn){
                    st_x = Graphics.pageToCanvasX(event.pageX);
                    st_y = Graphics.pageToCanvasY(event.pageY);
                    if(st_x<0 || st_y<0 || st_x>Graphics.boxWidth || st_y>Graphics.boxHeight){
                        // if(PRM.cancelasMenu){
                        // if(PRM.outcansel){Input._currentState['escape']=true;setTimeout("TouchInput._endRequest('escape');", 100);}
                        // }else {
                        if(PRM.outcansel){Input._currentState[cancelmode]=true;setTimeout("TouchInput._endRequest(cancelmode);", 100);}
                        // }
                        if(PRM.outaction){Input._currentState['ok']=true;setTimeout("TouchInput._endRequest('ok');", 100);}
                    }
                }
            };
        }
    }
        
    if(PRM.flickpage){
        var TouchInput_onMove = TouchInput._onMove;
        TouchInput._onMove = function(x, y) {
            TouchInput_onMove.apply(this, arguments);
            if(!PressBtn){
                if((st_x-x)<-50 && Math.abs(st_y-y)<100){st_y=9999;Input._currentState['pageup']=true;setTimeout("TouchInput._endRequest('pageup');", 100);}
                if((st_x-x)>50 && Math.abs(st_y-y)<100){st_y=9999;Input._currentState['pagedown']=true;setTimeout("TouchInput._endRequest('pagedown');", 100);}
            }
        }
    }
}

//AnalogMove.js
if(PRM.analogmove && Utils.isMobileDevice() || PRM.analogmove && PRM.pcBtn){
    Input.leftStick = function() {
        var threshold = 0.1;
        var x = touchx;
        var y = touchy;
        var tilt = Math.min(1,Math.sqrt(touchx*touchx+touchy*touchy)*PRM.sensitivity);
        var direction = 0.0;
        if (x === 0.0) {
            direction = (-y > 0 ? Math.PI * 0.0 : Math.PI * 1.0);
        } else if (y === 0.0) {
            direction = (-x > 0 ? Math.PI * 0.5 : Math.PI * 1.5);
        } else {
            direction = Math.atan2(-x, -y);
        }
        return {tilt: tilt, direction: direction};
    };
}
// New Function by Eliaquim
EliUCHU.hideall = function () {
    // Btn_hide = true;
    DirPadOp=true;
    okOp=true;
    cancelOp=true;
    menuOp=true;
    shiftOp=true;
    pageupOP=true;
    pagedownOP=true;
    extraOp=true;
    if(PRM.visible[0]){document.getElementById("Dirpad").style.opacity = '0';}
    if(PRM.visible[1]){document.getElementById("okBtn").style.opacity = '0';}
    if(PRM.visible[2]){document.getElementById(cancelmode2).style.opacity = '0';}
    if(PRM.visible[3]){document.getElementById("menuBtn").style.opacity = '0';} // add
    if(PRM.visible[4]){document.getElementById("shiftBtn").style.opacity = '0';} // add
    if(PRM.visible[5]){document.getElementById("pageupBtn").style.opacity = '0';} // add
    if(PRM.visible[6]){document.getElementById("pagedownBtn").style.opacity = '0';} // add
    if(PRM.visible[7]){document.getElementById("extraBtn").style.opacity = '0';} // add
};
// New Function by Eliaquim
EliUCHU.showall = function () {
    // Btn_hide = false;
    DirPadOp=false;
    okOp=false;
    cancelOp=false;
    menuOp=false;
    shiftOp=false;
    pageupOP=false;
    pagedownOP=false;
    extraOp=false;
    if(PRM.visible[0]){document.getElementById("Dirpad").style.opacity = PRM.opacity;}
    if(PRM.visible[1]){document.getElementById("okBtn").style.opacity = PRM.opacity;}
    if(PRM.visible[2]){document.getElementById(cancelmode2).style.opacity = PRM.opacity;}
    if(PRM.visible[3]){document.getElementById("menuBtn").style.opacity = PRM.opacity;}    // add
    if(PRM.visible[4]){document.getElementById("shiftBtn").style.opacity = PRM.opacity;}    // add
    if(PRM.visible[5]){document.getElementById("pageupBtn").style.opacity = PRM.opacity;}    // add   
    if(PRM.visible[6]){document.getElementById("pagedownBtn").style.opacity = PRM.opacity;}    // add
    if(PRM.visible[7]){document.getElementById("extraBtn").style.opacity = PRM.opacity;}    // add
};

// New Function by Eliaquim - Added plugin commands.
EliUCHU.Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
    EliUCHU.Game_Interpreter_pluginCommand.call(this, command, args);
    switch(command.toLowerCase()) {
        case "hide":
            switch(args[0].toLowerCase()) {
                case "dirpad":
                    DirPadOp = true;
                    document.getElementById("Dirpad").style.opacity = '0';
                break;
                case "ok":
                    okOp = true;
                    document.getElementById("okBtn").style.opacity = '0';
                break;
                case "cancel":
                    cancelOp = true;
                    document.getElementById(cancelmode2).style.opacity = '0';
                break;
                case "menu":
                    menuOp = true;
                    document.getElementById("menuBtn").style.opacity = '0';
                break;
                case "shift":
                    shiftOp = true;
                    document.getElementById("shiftBtn").style.opacity = '0';
                break;   
                case "pageup":
                    pageupOP = true;
                    document.getElementById("pageupBtn").style.opacity = '0';
                break;
                case "pagedown":
                    pagedownOP = true;
                    document.getElementById("pagedownBtn").style.opacity = '0';
                break;
                case "extra":
                    extraOp = true;
                    document.getElementById("extraBtn").style.opacity = '0';
                break;
                case "all":
                    EliUCHU.hideall();
                break;
            }
        break;
        case "show":
                switch(args[0].toLowerCase()) {
                    case "dirpad":
                        DirPadOp = false;
                        document.getElementById("Dirpad").style.opacity = PRM.opacity;
                    break;
                    case "ok":
                        okOp = false;
                        document.getElementById("okBtn").style.opacity = PRM.opacity;
                    break;
                    case "cancel":
                        cancelOp = false;
                        document.getElementById(cancelmode2).style.opacity = PRM.opacity;
                    break;
                    case "menu":
                        menuOp = false;
                        document.getElementById("menuBtn").style.opacity = PRM.opacity;
                    break;
                    case "shift":
                        shiftOp = false;
                        document.getElementById("shiftBtn").style.opacity = PRM.opacity;
                    break;   
                    case "pageup":
                        pageupOP = false;
                        document.getElementById("pageupBtn").style.opacity = PRM.opacity;
                    break;
                    case "pagedown":
                        pagedownOP = false;
                        document.getElementById("pagedownBtn").style.opacity = PRM.opacity;
                    break;
                    case "extra":
                        extraOp = false;
                        document.getElementById("extraBtn").style.opacity = PRM.opacity;
                    break;
                    case "all":
                        EliUCHU.showall();
                }
        break;
    }
};
})(UCHU_MobileOperation_Modified_Ext);