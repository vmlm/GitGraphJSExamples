var graphConfig = new GitGraph.Template({
    branch: {
        color: "#000000",
        lineWidth: 3,
        spacingX: 60,
        mergeStyle: "straight",
        showLabel: true,                // display branch names on graph
        labelFont: "normal 10pt Arial",
        labelRotation: 0
    },
    commit: {
        spacingY: -30,
        dot: {
            size: 8,
            strokeColor: "#000000",
            strokeWidth: 4
        },
        tag: {
            font: "normal 10pt Arial",
            color: "yellow"
        },
        message: {
            color: "black",
            font: "normal 12pt Arial",
            displayAuthor: false,
            displayBranch: false,
            displayHash: false,
        }
    },
    arrow: {
        size: 8,
        offset: 3
    }
});

var config = {
  template: graphConfig,
  mode: "extended",
  orientation: "horizontal"
};

var gitgraph = new GitGraph(config);

var uat1Col = 0;
var uat2Col = 1;
var masterCol = 2;
var sprintCol = 3;

var master = gitgraph.branch({name: "master", column: masterCol })
    .commit({ message: "Commit inicial"});

var sprint1 = gitgraph.branch({ parentBranch: master, name: "SP1", column: sprintCol})
    .commit()
    .commit();
sprint1.merge(master, {tag: "1.0.0", dotStrokeWidth: 10});

var uat = gitgraph.branch({ parentBranch: master, name: "UAT 1.0.0", column: uat1Col})
    .commit();

var sprint2 = gitgraph.branch({ parentBranch: master, name: "SP2", column: sprintCol })
    .commit();

uat.checkout();
gitgraph.commit();

sprint2.checkout();
gitgraph.commit();
sprint2.merge(master, {tag: "1.1.0", dotStrokeWidth: 10});

uat.checkout();
gitgraph.commit({ tag: "PROD 1.0.0", tagColor: "gray", dotStrokeWidth: 10 });
uat.merge(master);

var sprint3 = gitgraph.branch({ parentBranch: master, name: "SP3", column: sprintCol })
    .commit();

uat.checkout();
gitgraph.commit({ tag: "1.0.1", tagColor: "gray", dotStrokeWidth: 10 });
uat.merge(master);

var uat2 = gitgraph.branch({ parentBranch: master, name: "UAT 1.1.0", column: uat2Col })
    .commit();


uat.checkout();
gitgraph.commit({ tag: "1.0.2", tagColor: "gray", dotStrokeWidth: 10 });
uat.merge(uat2);

uat2.checkout();
gitgraph.commit({ tag: "PROD 1.1.0", tagColor: "gray", tagY: 100, dotStrokeWidth: 10 });
uat2.commits[2].y = 100;
uat2.merge(master);


sprint3.checkout();
gitgraph.commit();
sprint3.merge(master);