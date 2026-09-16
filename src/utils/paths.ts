
export const repoName = "Yuxian_Kao_CC_FA26";

export const landingTab = { name: 'landing page', route: `/${repoName}` };

export function getAssignmentTabs(total: number) {
  const assignmentTabs = [];
  for (let i = 0; i < total; i++) {
    assignmentTabs.push({
      name: `week-${i + 1} assignment`,
      route: `/${repoName}/week${i + 1}-assignment`,
    });
  }
  return assignmentTabs;
}

export function getAssignmentPaths(total: number) {
  const assignmentPaths = [];
  for (let i = 0; i < total; i++) {
    assignmentPaths.push(`/${repoName}/week${i + 1}-assignment`);
  }
  return assignmentPaths;
}
