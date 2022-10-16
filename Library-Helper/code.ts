
figma.showUI(__html__,{
  height:300,
  width:300
});




figma.ui.onmessage = (msg) => {
  if(msg.type=='evaluate'){
    let JSONFILE={}as any;
    const doc=figma.currentPage.parent as DocumentNode;
    doc.children.forEach(page => {
      const Components=page.findAll(n=>n.type=="COMPONENT_SET"||n.type=="COMPONENT");
      Components.forEach(child=>{
        if(child.type=="COMPONENT_SET"||child.type=="COMPONENT"){
          try {
           let _Component={
            name:child.name,
            description:child.description,
            definitions:child.type=="COMPONENT_SET"&&child.componentPropertyDefinitions,
            references:child.type=="COMPONENT_SET"&&child.componentPropertyReferences,
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
    figma.ui.postMessage({
      type:"Loading",
      done:true,
  })
  }
};
