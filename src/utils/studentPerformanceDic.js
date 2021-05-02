

export const OPACITYPERFORMCOLORS = ["rgba(218,28,28,0.4)", "rgba(255,184,0,0.4)", "rgba(69,158,72,0.4)", "rgba(52,25,219,0.4)"]
export const PERFORMCOLORS = ["rgba(218,28,28)", "rgba(255,184,0)", "rgba(69,158,72)", "rgba(52,25,219)"]
export const PERFORMLEVEL = {
    participation: { "": -1, "needs more participation": 0, "somewhat participating": 1, "actively participating": 2, "excellent": 3 },
    behavior: { "": -1, "interrupts class": 0, "often distracted": 1, "socializes with friends well": 2, "follows rules well": 3 },
    teamwork: { "": -1, "disruptive or irresponsive": 0, "reserved": 1, "working well with others": 2, "showing leadership": 3 },
    assignment: { "": -1, "turns in none/little": 0, "turns in some assignments": 1, "turns in most assignments": 2, "turns in all assignments": 3 }
}
export const PERFORMARRAY = {
    participation: ["needs more participation", "somewhat participating", "actively participating", "excellent"],
    behavior: ["interrupts class", "often distracted", "socializes with friends well", "follows rules well"],
    teamwork: ["disruptive or irresponsive", "reserved", "working well with others", "showing leadership"],
    assignment: ["turns in none/little", "turns in some assignments", "turns in most assignments", "turns in all assignments"]
}
export const PERFORMTYPES = ["participation", "behavior", "teamwork", "assignment"]