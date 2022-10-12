
figma.showUI(__html__);



figma.ui.onmessage = (msg) => {
  if(msg.type=='evaluate'){
    let JSONFILE={}as any;
    const doc=figma.currentPage.parent as DocumentNode;
    doc.children.forEach(page => {
      page.children.forEach(child=>{
        if(child.type=="COMPONENT_SET"||child.type=="COMPONENT"){
          try {
           let _Component={
            name:child.name,
            description:child.description,
            definitions:child.componentPropertyDefinitions,
            references:child.componentPropertyReferences,
            link:child.documentationLinks};

            JSONFILE[child.name]=(_Component);
            console.log(_Component);
          } catch (error) {
            console.log(child.name+" Error:"+error)
          }
        }
      })
    });
    console.log(JSON.stringify(JSONFILE))
  }
};
