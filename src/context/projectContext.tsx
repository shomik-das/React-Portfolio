/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import type { Project, ProjectContextType } from "../types/types";



const ProjectContext = createContext<ProjectContextType>({
  projects: [],
  loading: true,
});

export const useProjectContext = () => useContext(ProjectContext);

export const ProjectProvider = ({ children }: { children: React.ReactNode }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://raw.githubusercontent.com/Rohan04022003/my-project-data-repo/main/data/projects.json")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch project data:", err);
        setLoading(false);
      });
  }, []);

  return (
    <ProjectContext.Provider value={{ projects, loading }}>
      {children}
    </ProjectContext.Provider>
  );
};
