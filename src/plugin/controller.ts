figma.showUI(__html__, {
    height: 320,
    width: 350,
});

let progress = 0;
let CancelOp = false;
figma.ui.onmessage = async (msg) => {
    if (msg.type == 'Close') {
        CancelOp = true;
    }
    if (msg.type == 'getProgress') {
        figma.ui.postMessage({
            type: 'Progress',
            message: {
                progress: progress,
                done: false,
            },
        });
    }
    if (msg.type == 'evaluate') {
        CancelOp = false;
        figma.ui.postMessage({
            type: 'Loading',
            message: {
                progress: 0,
                done: false,
            },
        });

        let progress = 0;
        let AllComponents = await GetComponents();
        if (AllComponents.length > 0) {
            let errorComponents = [];
            let JSONData = {};
            function* loopThis(nodes) {
                for (var i = 0; i < nodes.length; i++) {
                    var node = nodes[i];
                    progress = (i / nodes.length) * 100;
                    let _Component;
                    try {
                        if (node.type == 'COMPONENT_SET') {
                            JSONData[node.name] = {
                                name: node.name,
                                type: 'component_set',
                                description: node.description,
                                link: node.documentationLinks,
                                definitions: node.componentPropertyDefinitions,
                                references: node.componentPropertyReferences,
                                id: node.id,
                            };
                        } else {
                            if (node.parent.type != 'COMPONENT_SET') {
                                JSONData[node.name] = {
                                    name: node.name,
                                    type: 'component',
                                    description: node.description,
                                    link: node.documentationLinks,
                                    id: node.id,
                                };
                            } else {
                                let value = JSONData[node.parent.name]['variants'];
                                if (value == undefined) {
                                    JSONData[node.parent.name]['variants'] = [];
                                    JSONData[node.parent.name]['variants'].push({
                                        name: node.name,
                                        type: 'component_variant',
                                        description: node.description,
                                        link: node.documentationLinks,
                                        id: node.id,
                                    });
                                } else {
                                    JSONData[node.parent.name]['variants'].push({
                                        name: node.name,
                                        type: 'component_variant',
                                        description: node.description,
                                        link: node.documentationLinks,
                                        id: node.id,
                                    });
                                }
                            }
                        }
                    } catch (error) {
                        errorComponents.push(node);
                        console.log(error);
                    }

                    if (i > 1) {
                        figma.ui.postMessage({
                            type: 'Cancel',
                            message: {
                                cancel: true,
                            },
                        });
                    }
                    if (CancelOp) {
                        i = nodes.length + 1;
                    }
                    yield _Component;
                }
            }
            let Loop = loopThis(AllComponents);
            let status = Loop.next();
            const Process = setInterval(CheckProcess, 20);
            function CheckProcess() {
                if (!status.done) {
                    figma.ui.postMessage({
                        type: 'Progress',
                        message: {
                            progress: Math.floor(progress),
                            done: false,
                            results: null,
                        },
                    });
                    status = Loop.next();
                } else {
                    figma.ui.postMessage({
                        type: 'Progress',
                        message: {
                            progress: 100,
                            done: true,
                            results: JSON.stringify(JSONData),
                        },
                    });
                    figma.ui.resize(400, 800);
                    CancelOp = false;
                    progress = 0;
                    clearInterval(Process);
                }
            }
        } else {
            figma.notify('No components found in file', {
                //@ts-ignore
                error: true,
                onDequeue: () => {
                    figma.ui.postMessage({
                        type: 'Cancel',
                        message: {
                            cancel: true,
                        },
                    });
                },
            });
        }
    }
};

async function GetComponents() {
    const doc = figma.currentPage.parent as DocumentNode;
    const AllComponents = [];
    for (let p = 0; p < doc.children.length; p++) {
        const page = doc.children[p];
        const Components = page.findAll((n) => n.type == ('COMPONENT_SET' || n.type == 'COMPONENT'));
        for (let i = 0; i < Components.length; i++) {
            const component = Components[i] as any;
            const status = await component.getPublishStatusAsync();
            if (status != 'UNPUBLISHED') {
                AllComponents.push(component);
            }
        }
    }

    return AllComponents;
}

function PostError(message) {
    figma.ui.postMessage({
        type: 'Error',
        message: message,
    });
}
