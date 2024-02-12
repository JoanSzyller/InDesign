// The script closes all currently open documents.

var openDocuments = app.documents.everyItem().getElements();

var myDialog = app.dialogs.add({canCancel: true});
	with(myDialog.dialogColumns.add()){
		staticTexts.add({staticLabel:"Close all open files?"});
	}
	var myResult = myDialog.show();
	if(myResult == true){
        var myNewDialog = app.dialogs.add({canCancel: true});
        app.dialogs.add({canCancel: true});
            with(myNewDialog.dialogColumns.add()){
                staticTexts.add({staticLabel:"Save changes to closed files?"});
            }
            var myNewResult = myNewDialog.show();
            if(myNewResult == true){
                for (i = openDocuments.length-1; i > -1; i--){
                    app.documents[i].close(SaveOptions.yes);
                    }
                }
            else{
                for (i = openDocuments.length-1; i > -1; i--){
                    app.documents[i].close(SaveOptions.no);
                    }                
                }
        myNewDialog.destroy();
        }       
	else{}
    myDialog.destroy();


// 06.2020 Joanna Szyller



