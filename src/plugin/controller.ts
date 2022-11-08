figma.showUI(__html__, {
    height: 320,
    width: 350,
});
let progress = 0;
figma.ui.onmessage = async (msg) => {
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
        figma.ui.postMessage({
            type: 'Loading',
            message: {
                progress: 0,
                done: false,
            },
        });

        let progress = 0;
        let AllComponents = await GetComponents();
        function* loopThis(nodes) {
            for (var i = 0; i < nodes.length; i++) {
                var node = nodes[i];
                progress = (i / nodes.length) * 100;
                let _Component = {
                    name: node.name,
                };
                yield _Component;
            }
        }

        let Loop = loopThis(AllComponents);
        let status = Loop.next();
        const Process = setInterval(CheckProcess, 500);
        function CheckProcess() {
            if (!status.done) {
                figma.ui.postMessage({
                    type: 'Progress',
                    message: {
                        progress: Math.floor(progress),
                        done: false,
                    },
                });
                status = Loop.next();
            } else {
                figma.ui.postMessage({
                    type: 'Loading',
                    message: {
                        progress: 100,
                        done: true,
                    },
                });
                clearInterval(Process);
            }
        }
    }
};

async function GetComponents() {
    const doc = figma.currentPage.parent as DocumentNode;
    const AllComponents = [];
    doc.children.forEach((page) => {
        const Components = page.findAll((n) => n.type == 'COMPONENT_SET' || n.type == 'COMPONENT');
        AllComponents.push([...Components]);
    });
    return AllComponents;
}
