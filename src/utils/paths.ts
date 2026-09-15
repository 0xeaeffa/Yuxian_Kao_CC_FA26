
export const repoName = "Yuxian_Kao_CC_FA26";

const assignmentTotal = 2;
const routeMappings = [{ name: 'landing page', route: '/' }];

// seperate landing from assignments
export function getRouteMappings() {
  for (let i = 0; i < assignmentTotal; i++) {
    routeMappings.push({
      name: `week-${i + 1} assignment`,
      route: `/${repoName}/week${i + 1}-assignment`,
    });
  }

  return routeMappings;
}
