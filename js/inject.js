

function showNumbers(){

    if(document==null){
        return;
    }
    
    //if(document.links[0].innerHTML.indexOf('<nk') == -1){
        hideNumbers();
    //}
    

          for (var i=0;i<document.links.length;i++){ 
                 try{                                
                     var startTag = "<nk style=color:#FFF;padding-left:.3em;padding-right:.3em;font-weight:bold;border-radius:.12em; class=label-niki>";
                     var endTag = "</nk>";
                     
                     document.links[i].innerHTML+=startTag + i + endTag;
                }
                catch(ex){
                     console.log("Error adding number to link: " + ex.message);
                 }
        }
     
              
}


function hideNumbers(){
    
    for (var i=0;i<document.links.length;i++){ 
             try{                                
                 var index = document.links[i].innerHTML.indexOf('<nk');
                 if(index>0){
                    document.links[i].innerHTML=document.links[i].innerHTML.substring(0,index);
                 }
            }
            catch(ex){
                 console.log("Error adding number to link: " + ex.message);
             }
    }
    
}