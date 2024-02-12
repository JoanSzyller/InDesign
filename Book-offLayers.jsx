// In all book files changes the properties of the selected layer.

var myBook = getBook ();
var myDocuments = myBook.bookContents.everyItem().getElements();
var myAllLayers = [];
var myDoc = [];

main()
function main(){
    var openCounter = 0;
    var openDocuments = app.documents.everyItem().getElements();
    var myIncrement = 400/myDocuments.length;
    myCreateProgressPanel(400,400);
    myProgressPanel.show();
    for(j=0; j < myDocuments.length; j++){
        myProgressPanel.myProgressBar.value = Math.round((j+1)*myIncrement);
        var myDocument = myDocuments[j];
        switch(openDocuments.length){
        case 0: myDoc[j] = app.open(File(myDocument.fullName));
                    break;
        default: 
            for(i=0; i < openDocuments.length; i++){
                if (myDocument.name==openDocuments[i].name){
                    myDoc[j] = openDocuments[i];
//                    app.documents[j].label = "open";
                    }
                else{
                    myDoc[j] = app.open(File(myDocument.fullName));
                    openCounter++;
                    }
                }    
            }
        var myLayer = myDoc[j].layers;
        for(i=0; i < myLayer.length; i++){
            addLayer(myLayer.item(i).name);
            }        
    }    
    myProgressPanel.hide();
    var myDialog = app.dialogs.add({name: "Ustawienie własności wybranej warstwy", canCancel: true})   
    with(myDialog){
        with (dialogColumns.add()){
            staticTexts.add({staticLabel: "Wybierz warstwę:"});
            var myCheckbox1 = checkboxControls.add({staticLabel: "widzialna", checkedState: true});
            var myCheckbox2 = checkboxControls.add({staticLabel: "zablokowana", checkedState: false});
        }   
        with(dialogColumns.add()){
            var myLayerList = dropdowns.add({stringList: myAllLayers, selectedIndex: 0});
        }
    }
	var myResult = myDialog.show();    
//    var pickedLayer = myAllLayers.item[myLayerList.selectedIndex];
    var pickedLayer = myLayerList.stringList[myLayerList.selectedIndex];
	if(myResult == true){
        if (myCheckbox1.checkedState == true){
            changeLayer(pickedLayer, true);
            }
            else{
            changeLayer(pickedLayer, false);
            }
        if (myCheckbox2.checkedState == true){
            blockLayer(pickedLayer, true);
            }
            else{
            blockLayer(pickedLayer, false);
            }
	}
	else{}
	myDialog.destroy();
    var openDocuments = app.documents.everyItem().getElements();
    for (i = openDocuments.length-1; i > -1; i--){
//        app.documents[i].close(SaveOptions.yes);
        app.documents[i].save();
        }
}

function addLayer(newLayer){
    var counter = 0;
    var koniec = true;
    if (myAllLayers.length==0){ 
        myAllLayers.push(newLayer);
        }
    else{
        while ((counter<myAllLayers.length)||(koniec)){
            if (newLayer==myAllLayers[counter]){
                counter = myAllLayers.length;
                koniec = false;
                }
            else{
                counter++;
                if  (counter==myAllLayers.length){ 
                    myAllLayers.push(newLayer);
                    koniec = false;
                    }
                else{
                    koniec = true;
                    }
                }
            }
        }
}    



function changeLayer(myTargetLayer, OnOff){
    for(j=0; j < myDocuments.length; j++){
        var myLayer = myDoc[j].layers;
        for(i=0; i < myLayer.length; i++){
            if (myTargetLayer==myLayer.item(i).name) {
                myDoc[j].layers.item(i).visible = OnOff;
//                myDoc[j].layers.item(i).printable = OnOff;
                }
            else{}
        }
    }    
}


function blockLayer(myTargetLayer, OnOff){
    for(j=0; j < myDocuments.length; j++){
        var myLayer = myDoc[j].layers;
        for(i=0; i < myLayer.length; i++){
            if (myTargetLayer==myLayer.item(i).name) {
                myDoc[j].layers.item(i).locked = OnOff;
                }
            else{}
        }
    }    
}


function getBook (){
	switch (app.books.length){
		case 0: alert ('Brak otwartej księgi. Otwórz księgę.'); exit ();
		case 1: return app.books[0];
		default: return pickBook ();
	}
}


function pickBook (){
	var w = new Window ('dialog', 'Wybierz księgę:');
	w.alignChildren = 'right';
	var g = w.add ('group');
		var list = g.add ('listbox', undefined, app.books.everyItem().name);
		list.minimumSize.width = 250;
		list.selection = 0;
	var b = w.add ('group');
		b.add ('button', undefined, 'OK', {name: 'ok'})
		b.add ('button', undefined, 'Anuluj', {name: 'cancel'})
	if (w.show () == 1){
		return app.books[list.selection.index];
	}else{
		exit ();
	}
}

// ProgressBar
function myCreateProgressPanel(myMaximumValue, myProgressBarWidth){
	myProgressPanel = new Window('window', 'Progress');
	with(myProgressPanel){
		myProgressPanel.myProgressBar = add('progressbar', [12, 12,
	myProgressBarWidth, 24], 0, myMaximumValue);
	}
}

// 05.2020 Joanna Szyller
// 12.2020 +ProgressBar

